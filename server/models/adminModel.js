const { json } = require("express");
const db = require("../db/db");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";

function getProfile(adminID) {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM admin where admin_ID=?;";
    db.query(sql, [adminID], (err, result) => {
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
    let admin_id = data.ID;
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
    let sql = `UPDATE admin SET ${key}=? where admin_id=?`;
    db.query(sql, [value, admin_id], (err, result) => {
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
    let admin_id = data.ID;
    let currentPassword = data.currentPassword;
    let newPassword = data.newPassword;

    let sql1 = "SELECT PASSWORD FROM admin WHERE admin_ID=?";
    db.query(sql1, [admin_id], (err, result, fields) => {
      if (err) {
        return reject(err);
      } else {
        const password = result[0].PASSWORD;
       
        if (password == currentPassword) {
          let sql2 = "UPDATE admin SET PASSWORD=? WHERE admin_ID=?";

          db.query(sql2, [newPassword, admin_id], (err, result) => {
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
