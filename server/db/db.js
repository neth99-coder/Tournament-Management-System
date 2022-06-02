const mysql = require("mysql");

const config = require("config");

const connection = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6497215",
  password: "eIEikkL2aD",
  database: "sql6497215",
});
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Mysql connected!!");
  }
});
module.exports = connection;
