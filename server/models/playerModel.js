const { json } = require("express");
const db = require("../db/db");
const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";

function getProfile(playerID) {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM PLAYER WHERE PLAYER_ID=?;";
    db.query(sql, [playerID], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function getRegisteredTournaments(PlayerID) {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT TOURNAMENT.TOURNAMENT_ID,TOURNAMENT.ORGANIZER_ID,TOURNAMENT.NAME,TOURNAMENT.GAME_ID,DATE_FORMAT(TOURNAMENT.START_DATETIME,'%d-%m-%y %H:%i') as START_DATETIME,DATE_FORMAT(TOURNAMENT.END_DATETIME,'%d-%m-%y %H:%i') as END_DATETIME,DATE_FORMAT(TOURNAMENT.REGISTERCLOSE_DATETIME,'%d-%m-%y %H:%i') as REGISTERCLOSE_DATETIME FROM PLAYER_TOURNAMENT NATURAL JOIN TOURNAMENT WHERE PLAYER_TOURNAMENT.PLAYER_ID = ? ";

    db.query(sql, [PlayerID], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function updateProfile(data) {
  return new Promise((resolve, reject) => {
    let player_id = data.ID;
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
    let sql = `UPDATE PLAYER SET ${key}=? WHERE PLAYER_ID=?`;
    db.query(sql, [value, player_id], (err, result) => {
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
    let player_id = data.ID;
    let currentPassword = data.currentPassword;
    let newPassword = data.newPassword;

    let sql1 = "SELECT PASSWORD FROM PLAYER WHERE PLAYER_ID=?";
    db.query(sql1, [player_id], (err, result, fields) => {
      if (err) {
        return reject("Passwords do not match");
      } else {
        const password = result[0].PASSWORD;
        bcrypt.compare(
          currentPassword,
          result[0].PASSWORD,
          function (err, result) {
            if (result) {
              bcrypt.hash(newPassword, 8, function (err, hash) {
                let sql2 = "UPDATE PLAYER SET PASSWORD=? WHERE PLAYER_ID=?";

                db.query(sql2, [hash, player_id], (err, result) => {
                  if (err) {
                    return reject("password does not hashed");
                  }
                  return resolve("Password Updated");
                });
              });
            } else {
              return reject("Password do not matching");
            }
          }
        );
      }
    });
  });
}

module.exports = {
  getProfile,
  getRegisteredTournaments,
  updateProfile,
  confirmPasswords,
};
