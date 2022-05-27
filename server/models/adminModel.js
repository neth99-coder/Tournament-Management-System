const { json } = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db");
const transporter = require("../transporter/transporter");

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

function getRequests(){
  return new Promise((resolve, reject)=>{
    db.query("SELECT * FROM organizer_request WHERE STATUS=0",(err,result)=>{
      if(result){
          // console.log(result); 
          return resolve(result);
      }
      else{return reject(err);}
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

function acceptRequest(data){
  return new Promise((resolve,reject) =>{
    const id = data.reqId;
    const password = data.password.toString();
    const email = data.email;
    const status = 1;
    const name = data.orgName;
    
    if(emailExist){
       return reject(new Error("Email exisits!!"));
    }
  
  bcrypt.genSalt(10, function (err, salt) {
  bcrypt.hash(password, salt, function (err, hash) {

    try{
      db.beginTransaction((err)=>{

      if(err){throw err;}
        
      const sql = "UPDATE organizer_request SET STATUS = ?, PASSWORD = ? WHERE REQUEST_ID = ?";
  
      db.query(sql,[status,hash,id],(err,result)=>{

          if(result){
              //console.log(id+ " this is email");
            const sql = "INSERT INTO organizer (NAME, EMAIL, PASSWORD) VALUES (?,?,?)";
            db.query(sql,[name,email,hash],(err,result)=>{
              if(err){throw err;}
              else{
                db.commit((err)=>{
                  if(err){
                    throw err;
                  }else{
                    //db.end();
                  }   
                });
                var mailOptions = {
                  from: 'squ4doption@gmail.com',
                  to: email,
                  subject: 'Temporary Password For IJGmaes Organizer account',
                  text: 'Password: '+ password
                };
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                    throw err;
                  } else {
                    console.log('Email sent: ' + info.response);
                    return resolve("Email Sent");
                  }
                });
              }
            });

          }
          else{throw err;}
      });      
      });

    }
    catch (err){
        db.rollback();
        return reject(err);
    }

  });
  });

  }); 

}

function rejectRequest(data){
  return new Promise ((resolve,reject)=>{
    const id = data.reqId;
    const email = data.email;
    const status = -1;

    const sql = "UPDATE organizer_request SET STATUS = ? WHERE REQUEST_ID = ?";

    db.query(sql,[status,id],(err,result)=>{
        if(result){//console.log('updated');
            var mailOptions = {
                from: 'squ4doption@gmail.com',
                to: email,
                subject: 'Request Rejection from IJGmaes',
                text: "We are sorry to say that your account request has been rejected by IJGmaes"
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  return reject(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  return resolve("Email sent");
                }
              });
        }
        else{console.log(err); return reject(err);}
    });    
  })
}

function emailExist(email){
  db.query("SELECT * FROM organizer WHERE EMAIL = ?",[email],(err,res)=>{
      if(res != []){
        return true;
      }else{
        return false;
      }
  });
}

module.exports = { getProfile, getRequests, updateProfile, confirmPasswords, acceptRequest, rejectRequest };
