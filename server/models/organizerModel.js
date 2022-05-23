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
module.exports = { getProfile, updateProfile, confirmPasswords };
