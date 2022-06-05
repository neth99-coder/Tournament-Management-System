const { json } = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db");
const transporter = require("../transporter/transporter");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";

function getProfile(adminID) {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM ADMIN WHERE ADMIN_ID=?";
    db.query(sql, [adminID], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function getRequests() {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM ORGANIZER_REQUEST WHERE STATUS=0",
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
    let sql = `UPDATE ADMIN SET ${key}=? WHERE ADMIN_ID=?`;
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

    let sql1 = "SELECT PASSWORD FROM ADMIN WHERE ADMIN_ID=?";
    db.query(sql1, [admin_id], (err, result, fields) => {
      if (err) {
        return reject(err);
      } else {
        const password = result[0].PASSWORD;

        if (password == currentPassword) {
          let sql2 = "UPDATE ADMIN SET PASSWORD=? WHERE ADMIN_ID=?";

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

function acceptRequest(data) {
  return new Promise((resolve, reject) => {
    const id = data.reqId;
    const password = data.password.toString();
    const email = data.email;
    const status = 1;
    const name = data.orgName;

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        try {
          db.beginTransaction((err) => {
            if (err) {
              throw err;
            }

            const sql =
              "UPDATE ORGANIZER_REQUEST SET STATUS = ?, PASSWORD = ? WHERE REQUEST_ID = ?";

            db.query(sql, [status, hash, id], (err, result) => {
              if (result) {
                const sql =
                  "INSERT INTO ORGANIZER (NAME, EMAIL, PASSWORD) VALUES (?,?,?)";
                db.query(sql, [name, email, hash], (err, result) => {
                  if (err) {
                    throw err;
                  } else {
                    db.commit((err) => {
                      if (err) {
                        throw err;
                      } else {
                        //db.end();
                      }
                    });
                    var mailOptions = {
                      from: "ijgames1@hotmail.com",
                      to: email,
                      subject:
                        "Temporary Password For IJGmaes Organizer account",
                      text: "Password: " + password,
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                      if (error) {
                        console.log(error);
                        throw err;
                      } else {
                        console.log("Email sent: " + info.response);
                        return resolve("Email Sent");
                      }
                    });
                    // const msg = {
                    //   to: email, // Change to your recipient
                    //   from: "ijgames1@hotmail.com", // Change to your verified sender
                    //   subject:
                    //     "Temporary Password For IJGmaes Organizer account",
                    //   text: "Password: " + password,
                    // };
                    // sgMail
                    //   .send(msg)
                    //   .then(() => {
                    //     console.log("Email sent");
                    //   })
                    //   .catch((error) => {
                    //     console.error(error);
                    //   });
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
    });
  });
}

function rejectRequest(data) {
  return new Promise((resolve, reject) => {
    const id = data.reqId;
    const email = data.email;
    const status = -1;

    const sql = "UPDATE ORGANIZER_REQUEST SET STATUS = ? WHERE REQUEST_ID = ?";

    db.query(sql, [status, id], (err, result) => {
      if (result) {
        //console.log('updated');
        var mailOptions = {
          from: "ijgames1@hotmail.com",
          to: email,
          subject: "Request Rejection from IJGmaes",
          text: "We are sorry to say that your account request has been rejected by IJGmaes",
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return reject(error);
          } else {
            console.log("Email sent: " + info.response);
            return resolve("Email sent");
          }
        });
        //   const msg = {
        //     to: email,
        //     from: "ijgames1@hotmail.com",
        //     subject: "Request Rejection from IJGmaes",
        //     text: "We are sorry to say that your account request has been rejected by IJGmaes",
        //   };
        //   sgMail
        //     .send(msg)
        //     .then(() => {
        //       console.log("Email sent");
        //     })
        //     .catch((error) => {
        //       console.error(error);
        //     });
        //
      } else {
        return reject(err);
      }
    });
  });
}

module.exports = {
  getProfile,
  getRequests,
  updateProfile,
  confirmPasswords,
  acceptRequest,
  rejectRequest,
};
