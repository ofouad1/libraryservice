const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig');

const pool = mysql.createPool({
    connectionLimit: dbConfig.connectionLimit, // Customize as needed
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
});

module.exports = pool;