const { json } = require("express");
const db = require("../db/db");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";

function getProfile(organizerID) {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM ORGANIZER where ORGANIZER_ID=?;";
    db.query(sql, [organizerID], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

async function getTournaments(organizerID) {
  return await new Promise((resolve, reject) => {
    var sql =
      "SELECT TOURNAMENT_ID,ORGANIZER_ID,NAME,GAME_ID,DATE_FORMAT(START_DATETIME,'%d-%m-%y %H:%i') as START_DATETIME,DATE_FORMAT(END_DATETIME,'%d-%m-%y %H:%i') as END_DATETIME,DATE_FORMAT(REGISTERCLOSE_DATETIME,'%d-%m-%y %H:%i') as REGISTERCLOSE_DATETIME  FROM TOURNAMENT WHERE ORGANIZER_ID = ? ";
    db.query(sql, [organizerID], (err, result) => {
      if (result) {
        return resolve(result);
      } else {
        console.log(err);
        return reject(err);
      }
    });
  });
}

function getGameTypes() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM GAME", (err, result) => {
      if (result) {
        return resolve(result);
      } else {
        console.log(err);
        return reject(err);
      }
    });
  });
}

function updateProfile(data) {
  return new Promise((resolve, reject) => {
    let organizer_id = data.ID;
    let key, value;
    for (var prop in data) {
      if (prop == "ID") {
        continue;
      }

      key = prop;
      value = data[prop];
      if (key === "gender") {
        value === "Male" ? (value = 0) : (value = 1);
      }
    }
    let sql = `UPDATE ORGANIZER SET ${key}=? where ORGANIZER_ID=?`;
    db.query(sql, [value, organizer_id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function confirmPasswords(data) {
  return new Promise((resolve, reject) => {
    let organizer_id = data.ID;
    let currentPassword = data.currentPassword;
    let newPassword = data.newPassword;

    let sql1 = "SELECT PASSWORD FROM ORGANIZER WHERE ORGANIZER_ID=?";
    db.query(sql1, [organizer_id], (err, result, fields) => {
      if (err) {
        return reject(err);
      } else {
        const password = result[0].PASSWORD;
        if (password == currentPassword) {
          let sql2 = "UPDATE ORGANIZER SET PASSWORD=? WHERE ORGANIZER_ID=?";

          db.query(sql2, [newPassword, organizer_id], (err, result) => {
            return resolve("Password Updated");
          });
        } else {
          return reject("Password do not matching");
        }
      }
    });
  });
}

function createNewTournament(data) {
  return new Promise((resolve, reject) => {
    const organizerId = data.organizerId;
    const name = data.name;
    const gameId = data.gameId;
    const startDateTime = data.startDateTime;
    const endDateTime = data.endDateTime;
    const closingDateTime = data.closingDateTime;

    const sql =
      "INSERT INTO TOURNAMENT (ORGANIZER_ID, NAME, GAME_ID, START_DATETIME, END_DATETIME, REGISTERCLOSE_DATETIME) VALUES (?,?,?,?,?,?)";
    db.query(
      sql,
      [organizerId, name, gameId, startDateTime, endDateTime, closingDateTime],
      (err, result) => {
        if (result) {
          console.log("inserted");
          return resolve(result);
        } else {
          console.log(err);
          return reject(err);
        }
      }
    );
  });
}

function getTeamRequest(organizerID) {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT TEAM_REQUEST.REQUEST_ID,TEAM_REQUEST.PLAYER_TOURNAMENT_ID,PLAYER_TOURNAMENT.PLAYER_ID,PLAYER.NAME,TEAM_REQUEST.TEAM_NAME,TOURNAMENT.NAME as TOURNAMENT_NAME FROM ((TEAM_REQUEST NATURAL JOIN PLAYER_TOURNAMENT) NATURAL JOIN PLAYER) JOIN TOURNAMENT using(TOURNAMENT_ID) WHERE TEAM_REQUEST.STATUS='0' and TOURNAMENT.ORGANIZER_ID=?;";
    db.query(sql, [organizerID], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function acceptTeamRequest(data) {
  return new Promise((resolve, reject) => {
    const request_id = data.request_id;
    const status = 1;
    const leader_tournament_id = data.player_tournament_id;
    const name = data.team_name;

    try {
      db.beginTransaction((err) => {
        if (err) {
          throw err;
        }

        const sql_1 = "UPDATE TEAM_REQUEST SET STATUS=? WHERE REQUEST_ID=?";

        db.query(sql_1, [status, request_id], (err, result) => {
          if (result) {
            const sql_2 =
              "INSERT INTO TEAM (NAME,LEADER_TOURNAMENT_ID) VALUES (?,?)";
            db.query(sql_2, [name, leader_tournament_id], (err, result) => {
              if (err) {
                throw err;
              } else {
                db.commit((err) => {
                  if (err) {
                    throw err;
                  } else {
                  }
                });
              }
            });
          } else {
            throw err;
          }
        });
      });
    } catch (err) {
      db.rollback();
      return reject(err);
    }
  });
}

function rejectTeamRequest(data) {
  return new Promise((resolve, reject) => {
    const request_id = data.request_id;
    const status = -1;
    const sql = "UPDATE TEAM_REQUEST SET STATUS=? WHERE REQUEST_ID=?;";
    db.query(sql, [status, request_id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

module.exports = {
  getProfile,
  getTournaments,
  getGameTypes,
  updateProfile,
  confirmPasswords,
  createNewTournament,
  getTeamRequest,
  acceptTeamRequest,
  rejectTeamRequest,
};
