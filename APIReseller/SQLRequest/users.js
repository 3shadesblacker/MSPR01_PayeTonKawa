import * as dotenv from 'dotenv'
import mysql2 from 'mysql2'

dotenv.config();
// mysql database connection pool
const connection = mysql2.createConnection({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME
});

function save(email, passwd) {
    connection.connect();
    connection.query(
        `INSERT INTO USERS(email, passwd)
         VALUES(${email}, ${passwd});
         SELECT LAST_INSERT_ID();`, (error, results) => {
        if (error || results[0] == null) {
            console.log(error);
            return false;
        }
        return results[0];
    })
    connection.end();
}

function authenticate(email, passwd) {
    connection.connect();
    connection.query(
        `SELECT token FROM USERS
         WHERE email = ${email}
         AND passwd = ${passwd}`, (error, results) => {
        if (error || results[0] == null) {
            console.log(error);
            return false;
        }
        return results[0];
    })
    connection.end();
}

function get(id) {
    connection.connect();
    connection.query(
        `SELECT * FROM USERS
         WHERE id = ${id}`, (error, results) => {
        if (error || results[0] == null) {
            console.log(error);
            return false;
        }
        return results[0];
    })
    connection.end();
}

function forget(id) {
    connection.connect();
    connection.query(
        `DELETE FROM USERS
         WHERE id = ${id}`, (error, results) => {
        if (error || results[0] == null) {
            console.log(error);
            return false;
        }
        return true;
    })
    connection.end();
}

module.exports = { save, get, authenticate, forget };