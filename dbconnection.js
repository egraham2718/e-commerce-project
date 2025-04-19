'use strict'

import mysql from "mysql2"

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
}).promise();

// CRUD Operations

//////////////////////////////
// Users table operations
//////////////////////////////

async function createUser(firstname, lastname, login, email) {
    const result = await pool.query("INSERT INTO users (firstname, lastname, login, email) VALUES(?, ?, ?, ?)", [firstname, lastname, login, email]);
}

async function getUsers() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}

async function getUser(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?;', [id]);
    return rows[0];
}

async function updateUser(id, firstname, lastname, login, email) {
    const [rows] = await pool.query('UPDATE users \
                                     SET firstname = ?, lastname = ?, login = ?, email = ? \
                                     WHERE id = ?;', 
                                    [firstname, lastname, login, email, id]);
    return rows[0];
}

async function deleteUser(id) {
    const result = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
}

//////////////////////////////
// Permissions table operations
//////////////////////////////

// createPermission(...)

async function getPermission(id) {
    const [rows] = await pool.query('SELECT * FROM permissions WHERE id = ?;', [id]);
    return rows[0];
}

async function getPermissions() {
    const [rows] = await pool.query("SELECT * FROM permissions");
    return rows;
}

// updatePermission(id)

// deletePermission(id)

//////////////////////////////
// Accounts table operations
//////////////////////////////

// createAccount(...)

// getAccounts()

// getAccount(id)

// updateAccount(id)

// deleteAccount(id)

//////////////////////////////
// Orders table operations
//////////////////////////////

// createOrder(...)

// getOrders()

// getOrder(id)

// updateOrder(id)

// deleteOrder(id)

//////////////////////////////
// Products table operations
//////////////////////////////

// createProduct(...)

// getProducts()

// getProduct(id)

// updateProduct(id)

// deleteProduct(id)

//////////////////////////////
// Inventory table operations
//////////////////////////////

// createInventory(...)

// getInventories()

// getInventory(id)

// updateInventory(id)

// deleteInventory(id)

//console.log(await getUser(1));

//console.log(await createUser('NameTest1', 'SurnameTest1', 'loginTest1', 'test1@test.com'));
//console.log(await getUser(6));

//console.log(await deleteUser(6));

export {getUsers, getUser, createUser, updateUser, deleteUser, getPermission, getPermissions}