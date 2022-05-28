const { json } = require("express");
const db = require("../db/db");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";

function getProfile(organizerID) {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM organizer where ORGANIZER_ID=?;";
    db.query(sql, [organizerID], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function getTournaments(organizerID) {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM tournament WHERE ORGANIZER_ID = ? ";
    db.query(sql, [organizerID], (err, result) => {
      if (result) {
        // console.log(result);
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
    db.query("SELECT * FROM game", (err, result) => {
      if (result) {
        // console.log(result);
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
    let sql = `UPDATE organizer SET ${key}=? where ORGANIZER_ID=?`;
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
      "INSERT INTO tournament (ORGANIZER_ID, NAME, GAME_ID, START_DATETIME, END_DATETIME, REGISTERCLOSE_DATETIME) VALUES (?,?,?,?,?,?)";
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

function getTeamRequest() {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT team_request.request_id,player_tournament.player_id,player.name,team_request.team_name from (team_request NATURAL JOIN player_tournament) NATURAL JOIN player WHERE team_request.status='0'";
    db.query(sql, (err, result) => {
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
    const sql = "UPDATE team_request SET status=? WHERE request_id=?";
    db.query(sql, [status, request_id], (err, result) => {
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
    const leader_tournament_id = data.player_id;
    const name = data.team_name;

    try {
      db.beginTransaction((err) => {
        if (err) {
          throw err;
        }

        const sql_1 = "UPDATE team_request SET status=? WHERE request_id=?";

        db.query(sql_1, [status, request_id], (err, result) => {
          if (result) {
            const sql_2 =
              "INSERT INTO team (name,leader_tournament_id) VALUES (?,?)";
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
    const sql = "UPDATE team_request SET status=? WHERE request_id=?;";
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
