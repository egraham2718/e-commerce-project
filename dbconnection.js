'use strict'

import mysql from "mysql2"

const pool = mysql.createPool({
    host: 'localhost',
    user: 'dbuser',
    password: 'dbuser',
    database: 'ecommerce'
}).promise();
// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     port: process.env.MYSQL_PORT
// }).promise();

async function getUsers() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}

async function getUser(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?;', [id]);
    return rows[0];
}

async function getPermission(id) {
    const [rows] = await pool.query('SELECT * FROM permissions WHERE id = ?;', [id]);
    return rows[0];
}

// async function getPermissions() {
//     const [rows] = await pool.query('SELECT * FROM permissions');
//     return rows;
// }

async function getPermissions() {
    const [rows] = await pool.query("SELECT * FROM permissions");
    return rows;
}

async function createUser(firstname, lastname, login, email) {
    const result = await pool.query("INSERT INTO users (firstname, lastname, login, email) VALUES(?, ?, ?, ?)", [firstname, lastname, login, email]);
}

async function deleteUser(id) {
    const result = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
}


//console.log(await getUser(1));

//console.log(await createUser('NameTest1', 'SurnameTest1', 'loginTest1', 'test1@test.com'));
//console.log(await getUser(6));

//console.log(await deleteUser(6));

export {getUsers, getUser, createUser, deleteUser, getPermission, getPermissions}