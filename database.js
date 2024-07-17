import mysql from 'mysql2'
import 'dotenv/config'

let pool;
try {
    pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }).promise()
}
catch (error) {
    console.log('Cant connect to the database ' + error)
}



//get all user records
async function getTable() {
    if (!pool) {
        console.error('Pool is not initialized.');
        return;
    }
    try {
        const [rows] = await pool.query(`SELECT *  FROM user`)
        return rows
    } catch (error) {
        console.log(error)
    }
}

// POST new user
async function createUser(data) {
    let id = null;
    try {
        const [result] = await pool.query(`
            INSERT INTO user(firstname, lastname)
            VALUES (?, ?)
         `, [data.firstname, data.lastname])
        id = result.insertId
    }
    catch (err) {
        console.log('cant create user: ' + err)
    }
    console.log('userId: ' + id)
    try {
        const [result] = await pool.query(`
            INSERT INTO account(username, password, userId)
            VALUES (?, ?, ?)
         `, [data.username, data.password, id])
        console.log(result.insertId)
    }
    catch (err) {
        console.log('cant create account: ' + err)
    }
    console.log('Post successful')
}



export { getTable, createUser };