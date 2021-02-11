require('dotenv').config();
const mysql = require('mysql2/promise');

module.exports = mysql.createConnection({
    host: `${process.env.DBHOST}`,
    user: `${process.env.DBUSER}`,
    password: `${process.env.DBPASS}`,
    database: `${process.env.DATABASE}`,
});