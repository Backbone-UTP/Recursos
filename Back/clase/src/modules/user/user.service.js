
const mysql2 = require('mysql2/promise');

const sql = mysql2.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

async function getAllUsers() {
    const [result] = await sql.query("SELECT * FROM users");
    return result;
}

async function getUserById(id) {
    const [result] = await sql.query("SELECT * FROM users WHERE id = ?", [id]);
    return result[0];
}


module.exports = {
    getAllUsers,
    getUserById
}
