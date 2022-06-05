const { json } = require("express");
const db = require("../db/db");

function getTournaments() {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT TOURNAMENT.TOURNAMENT_ID,TOURNAMENT.NAME,ORGANIZER.NAME AS ORGANIZER,GAME.NAME AS GAME,DATE_FORMAT(TOURNAMENT.START_DATETIME,'%D-%M-%Y %H:%I') AS DATE,DATE_FORMAT(TOURNAMENT.REGISTERCLOSE_DATETIME,'%D-%M-%Y') AS REG_CLOSE FROM TOURNAMENT,ORGANIZER,GAME WHERE TOURNAMENT.GAME_ID=GAME.GAME_ID AND TOURNAMENT.ORGANIZER_ID=ORGANIZER.ORGANIZER_ID AND TOURNAMENT.REGISTERCLOSE_DATETIME >= CURDATE();";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function isInTeam(data) {
  return new Promise((resolve, reject) => {
    var sql = `SELECT TEAM_ID FROM PLAYER_TEAM WHERE PLAYER_ID=${data.playerId} AND TEAM_ID IN (SELECT TEAM_ID FROM TEAM,PLAYER_TOURNAMENT WHERE TEAM.LEADER_TOURNAMENT_ID=PLAYER_TOURNAMENT.PLAYER_TOURNAMENT_ID AND TOURNAMENT_ID=${data.tournamentID});
    `;
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function isRegistered(data) {
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM PLAYER_TOURNAMENT WHERE PLAYER_ID=${data.playerId} AND TOURNAMENT_ID=${data.tournamentID};`;
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function register(data) {
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO PLAYER_TOURNAMENT VALUES(NULL,${data.playerId},${data.tournamentID});`;
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function unregister(data) {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM PLAYER_TOURNAMENT WHERE PLAYER_ID=${data.playerId} AND TOURNAMENT_ID=${data.tournamentID};`;
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function addNewTeamRequest(data) {
  return new Promise((resolve, reject) => {
    let playerId = data.playerID;
    let tournamentId = data.tournamentID;
    let team = data.teamName;

    const sql = `INSERT INTO PLAYER_TOURNAMENT VALUES(NULL,${playerId},${tournamentId});`;
    const sql2 = `SELECT PLAYER_TOURNAMENT_ID FROM PLAYER_TOURNAMENT WHERE PLAYER_ID=${playerId} AND TOURNAMENT_ID=${tournamentId};`;

    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        db.query(sql2, (err2, result2) => {
          if (err2) {
            return reject(err2);
          } else {
            const p_t_id = result2[0].PLAYER_TOURNAMENT_ID;

            const sql3 = `INSERT INTO TEAM_REQUEST(PLAYER_TOURNAMENT_ID,TEAM_NAME) VALUES(${p_t_id},"${team}");`;
            db.query(sql3, (err3, result3) => {
              if (err3) {
                return reject(err3);
              } else {
                resolve(result3);
              }
            });
          }
        });
      }
    });
  });
}

function getTeams(data) {
  return new Promise((resolve, reject) => {
    var sql = `SELECT TEAM_ID,NAME FROM TEAM,PLAYER_TOURNAMENT WHERE TEAM.LEADER_TOURNAMENT_ID=PLAYER_TOURNAMENT.PLAYER_TOURNAMENT_ID AND PLAYER_TOURNAMENT.TOURNAMENT_ID=${data.tournamentID};`;
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function joinTeam(data) {
  return new Promise((resolve, reject) => {
    db.beginTransaction(function (err) {
      if (err) {
        // console.log(err);
        reject(err);
      }
      db.query(
        `INSERT INTO PLAYER_TEAM VALUES(NULL,${data.playerId},${data.teamID});`,
        function (err, result) {
          if (err) {
            db.rollback(function () {
              reject(err);
            });
          }
          db.query(
            `INSERT INTO PLAYER_TOURNAMENT VALUES(NULL,${data.playerId},${data.tournamentID});`,
            function (err, result) {
              if (err) {
                db.rollback(function () {
                  reject(err);
                });
              }
              db.commit(function (err, result) {
                if (err) {
                  db.rollback(function () {
                    reject(err);
                  });
                } else {
                  return resolve(result);
                }
              });
            }
          );
        }
      );
    });
  });
}

function leaveTeam(data) {
  return new Promise((resolve, reject) => {
    db.beginTransaction(function (err) {
      if (err) {
        // console.log(err);
        reject(err);
      }
      db.query(
        `DELETE FROM PLAYER_TEAM WHERE PLAYER_ID=${data.playerId} AND TEAM_ID=${data.teamID};`,
        function (err, result) {
          if (err) {
            db.rollback(function () {
              reject(err);
            });
          }
          db.query(
            `DELETE FROM PLAYER_TOURNAMENT WHERE PLAYER_ID=${data.playerId} AND TOURNAMENT_ID=${data.tournamentID};`,
            function (err, result) {
              if (err) {
                db.rollback(function () {
                  reject(err);
                });
              }
              db.commit(function (err, result) {
                if (err) {
                  db.rollback(function () {
                    reject(err);
                  });
                } else {
                  return resolve(result);
                }
              });
            }
          );
        }
      );
    });
  });
}

async function addOrganizerRequest(data) {
  return await new Promise((resolve, reject) => {
    const name = data.name;
    const email = data.email;
    const proof = data.proof;

    // await db.query("SELECT * FROM organizer WHERE EMAIL = ?",[email]).then((err,res)=>{
    //   if(res.length === 0){
    const sql =
      "INSERT INTO ORGANIZER_REQUEST (NAME,EMAIL,PROOF) VALUES (?,?,?)";

    db.query(sql, [name, email, proof], (err, result) => {
      if (result) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
}

function emailExist(email) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM ORGANIZER WHERE EMAIL = ?",
      [email],
      (err, result) => {
        if (result) {
          return resolve(result);
        } else {
          return reject(err);
        }
      }
    );
  });
}

module.exports = {
  getTournaments,
  addNewTeamRequest,
  getTeams,
  joinTeam,
  leaveTeam,
  register,
  unregister,
  isRegistered,
  isInTeam,
  addOrganizerRequest,
  emailExist,
};
