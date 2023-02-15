import * as dotenv from 'dotenv'
import mysql2 from 'mysql2'

dotenv.config();
// mysql database connection pool
const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

function save(userId, token) {
    connection.connect();
    connection.query(
        `SELECT * FROM TOKENS
         WHERE userId = ${userId};`, (error, results) => {
        if (error) {
            console.log(error);
            return false;
        }
        else if (results[0] == null) {
            connection.query(
                `INSERT INTO TOKENS(userId, token)
                 VALUES(${userId}, ${token});
                 SELECT LAST_INSERT_ID();`, (error, results) => {
                if (error || results[0] == null) {
                    console.log(error);
                    return false;
                }
                return results[0];
            });
        }
        console.log('Utilisateur existant')
        return false;
    })
    connection.end();
}

function get(userId) {
    connection.connect();
    connection.query(
        `SELECT * FROM TOKENS
         WHERE userId = ${userId}`, (error, results) => {
        if (error || results[0] == null) {
            console.log(error);
            return false;
        }
        return results[0];
    })
    connection.end();
}

function forget(token) {
    connection.connect();
    connection.query(
        `DELETE FROM TOKENS
         WHERE token = ${token}`, (error, results) => {
        if (error || results[0] == null) {
            console.log(error);
            return false;
        }
        return true;
    })
    connection.end();
}

module.exports = { save, get, forget };