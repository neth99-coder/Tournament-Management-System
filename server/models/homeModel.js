const { json } = require("express");
const db = require("../db/db");

function getTournaments() {
  return new Promise((resolve, reject) => {
    var sql = "select TOURNAMENT.TOURNAMENT_ID,TOURNAMENT.NAME,ORGANIZER.name as ORGANIZER,GAME.name as GAME,DATE_FORMAT(TOURNAMENT.START_DATETIME,'%d-%m-%y %H:%i') as DATE,DATE_FORMAT(TOURNAMENT.REGISTERCLOSE_DATETIME,'%d-%m-%y') as REG_CLOSE from TOURNAMENT,ORGANIZER,GAME where TOURNAMENT.GAME_ID=GAME.GAME_ID and TOURNAMENT.ORGANIZER_ID=ORGANIZER.ORGANIZER_ID;";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function isInTeam(data){

  return new Promise((resolve, reject) => {
    
    var sql = `select TEAM_ID from PLAYER_TEAM where PLAYER_ID=${data.playerId} and TEAM_ID in (select TEAM_ID from TEAM,PLAYER_TOURNAMENT where TEAM.LEADER_TOURNAMENT_ID=PLAYER_TOURNAMENT.PLAYER_TOURNAMENT_ID and TOURNAMENT_ID=${data.tournamentID});
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
    var sql = `select * from PLAYER_TOURNAMENT where PLAYER_ID=${data.playerId} and TOURNAMENT_ID=${data.tournamentID};`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}


function register(data) {
  return new Promise((resolve, reject) => {
    var sql = `insert into PLAYER_TOURNAMENT values(null,${data.playerId},${data.tournamentID});`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function unregister(data) {
  return new Promise((resolve, reject) => {
    var sql = `delete from PLAYER_TOURNAMENT where PLAYER_ID=${data.playerId} and TOURNAMENT_ID=${data.tournamentID};`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
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


    const sql = `insert into PLAYER_TOURNAMENT values(null,${playerId},${tournamentId});`;
    const sql2 = `select PLAYER_TOURNAMENT_ID from PLAYER_TOURNAMENT where PLAYER_ID=${playerId} and TOURNAMENT_ID=${tournamentId};`

    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {

        db.query(sql2, (err2, result2) => {
          if (err2) {
            console.log(err2);
            return reject(err2);
          } else {

            const p_t_id = result2[0].PLAYER_TOURNAMENT_ID;

            const sql3 = `insert into TEAM_REQUEST(PLAYER_TOURNAMENT_ID,TEAM_NAME) values(${p_t_id},"${team}");`;
            db.query(sql3, (err3, result3) => {
              if (err3) {
                return reject(err3);
              } else {
                resolve(result3)
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

    var sql = `select TEAM_ID,NAME from TEAM,PLAYER_TOURNAMENT WHERE TEAM.LEADER_TOURNAMENT_ID=PLAYER_TOURNAMENT.PLAYER_TOURNAMENT_ID and PLAYER_TOURNAMENT.TOURNAMENT_ID=${data.tournamentID};`;
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

// function joinTeam(data) {

//   return new Promise((resolve, reject) => {
//     console.log(data);
//     var sql = `start  transaction;insert into PLAYER_TEAM values(null,${data.playerId},${data.teamID});insert into PLAYER_TOURNAMENT values(null,${data.playerId},${data.tournamentID});commit ;`;
//     db.query(sql, (err, result) => {
//       if (err) {
//         console.log(err)
//         return reject(err);
//       } else {

//         return resolve(result);
//       }
//     });
//   });
// }
function joinTeam(data) {

  return new Promise((resolve, reject) => {
    db.beginTransaction(function (err) {
      if (err) { console.log(err);reject(err); }
      db.query(`insert into PLAYER_TEAM values(null,${data.playerId},${data.teamID});`, function (err, result) {
        if (err) {
          db.rollback(function () {
            console.log(err);
            reject(err);
          });
        }
        db.query(`insert into PLAYER_TOURNAMENT values(null,${data.playerId},${data.tournamentID});`, function (err, result) {
          if (err) {
            db.rollback(function () {
              console.log(err);
              reject(err);
            });
          }
          db.commit(function (err,result) {
            if (err) {
              db.rollback(function () {
                console.log(err);
                reject(err);
              });
            }else {
              return resolve(result);
            }
          });
        });
      });
    });
  });
}

// function leaveTeam(data) {

//   return new Promise((resolve, reject) => {

//     var sql = `start transaction;
//     delete from  PLAYER_TEAM where PLAYER_ID=${data.playerId} and TEAM_ID=${data.teamID};
//     delete from PLAYER_TOURNAMENT where PLAYER_ID=${data.playerId} and TOURNAMENT_ID=${data.tournamentID};
//     commit;`;
//     db.query(sql, (err, result) => {
//       if (err) {

//         return reject(err);
//       } else {

//         return resolve(result);
//       }
//     });
//   });
// }

function leaveTeam(data) {

  return new Promise((resolve, reject) => {
    db.beginTransaction(function (err) {
      if (err) { console.log(err);reject(err); }
      db.query(`delete from  PLAYER_TEAM where PLAYER_ID=${data.playerId} and TEAM_ID=${data.teamID};`, function (err, result) {
        if (err) {
          db.rollback(function () {
            console.log(err);
            reject(err);
          });
        }
        db.query(`delete from PLAYER_TOURNAMENT where PLAYER_ID=${data.playerId} and TOURNAMENT_ID=${data.tournamentID};`, function (err, result) {
          if (err) {
            db.rollback(function () {
              console.log(err);
              reject(err);
            });
          }
          db.commit(function (err,result) {
            if (err) {
              db.rollback(function () {
                console.log(err);
                reject(err);
              });
            }else {
              return resolve(result);
            }
          });
        });
      });
    });
  });
}

module.exports = { getTournaments, addNewTeamRequest, getTeams, joinTeam, leaveTeam,register,unregister,isRegistered ,isInTeam};
