const { json } = require("express");
const db = require("../db/db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { use } = require("../transporter/transporter");
// const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";

function loginUser(obj) {
  const { email, password, type } = obj;
  let user = "";
  return new Promise((resolve, reject) => {
    switch (type) {
      case 0:
        user = "PLAYER";
        break;
      case 1:
        user = "ORGANIZER";
        break;
      case 2:
        user = "ADMIN";
        break;
      default:
        break;
    }
    var sql = "SELECT " + user + "_ID AS ID,EMAIL FROM " + user + ";";
    var isUserIn;
    db.query(sql, (err, result) => {
      console.log(err);
      isUserIn = result.find((element) => {
        return element.EMAIL === email;
      });
      if (isUserIn === undefined) {
        return reject("User Not found");
      }

      if (isUserIn.EMAIL) {
        let qry = "SELECT PASSWORD FROM " + user + " WHERE EMAIL=?";
        db.query(qry, [email], (err, result) => {
          //   bcrypt.hash(password, saltRounds, function (err, hash) {
          bcrypt.compare(password, result[0].PASSWORD, function (err, result) {
            if (result) {
              const token = JWT.sign(
                { email, type, ID: isUserIn.ID },
                process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: "2d",
                }
              );
              // const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
              // console.log(user);
              return resolve(token);
            } else {
              return reject(err);
            }
          });
          //   });
        });
      }
    });
  });
}

function signupUser(obj) {
  const { name, email, password, gender, dob, country, type } = obj;

  let user = "";
  return new Promise((resolve, reject) => {
    var sql = "SELECT PLAYER_ID AS ID,EMAIL FROM PLAYER";

    var isUserIn;
    db.query(sql, (err, result) => {
      isUserIn = result.find((element) => {
        return element.EMAIL === email;
      });
      if (isUserIn === undefined) {
        bcrypt.hash(password, 8, function (err, hash) {
          db.query(
            "INSERT INTO PLAYER (NAME, EMAIL, PASSWORD, GENDER, DOB, COUNTRY) VALUES (?, ?, ?, ?, ?, ?)",
            [name, email, hash, gender, dob, country],
            function (err, result) {
              if (result) {
                return resolve(result);
              } else {
                console.log(err);
                return reject(err);
              }
            }
          );
        });
      } else {
        return resolve("user found");
      }
    });
  });
}

module.exports = {
  loginUser,
  signupUser,
};
