const pool = require('../database/pool');

const query = async (sql, params, connection = null) => {
    if (connection) {
        return await connection.execute(sql, params);
    } else {
        return await pool.execute(sql, params);
    }
};

module.exports = {
    query
};
