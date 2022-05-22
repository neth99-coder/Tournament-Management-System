const mysql = require('mysql');
const dbConfig = require('../config/db.config');
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.db,
});
connection.connect(err => {
    if (err) {
        throw err;
    } else {
        console.log('Mysql connected!!');
    }
});
module.exports = connection;