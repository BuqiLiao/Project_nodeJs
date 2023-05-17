const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'g1039384t',
    database: 'project1_db'
});

module.exports = db;