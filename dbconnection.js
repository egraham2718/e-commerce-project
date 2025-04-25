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

async function updateUser(id, firstname, lastname, login, password, email) {
    const [rows] = await pool.query('UPDATE users \
                                     SET firstname = ?, lastname = ?, login = ?, password = ?, email = ? \
                                     WHERE id = ?;', 
                                    [firstname, lastname, login, password, email, id]);
    return rows[0];
}

async function deleteUser(id) {
    const result = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
}

// Login user
async function loginUser(login, password) {
    const [rows] = await pool.query('SELECT * FROM users WHERE login = ? AND password = ?;', [login, password]);
    return rows[0];
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

export async function createProduct(productName, productDescription, price, creatdeAt) {
    const result = await pool.query("INSERT INTO products (product_name, product_description, price, created_at) VALUES(?, ?, ?, ?)", 
                                    [productName, productDescription, price, creatdeAt]);
}

export async function getProducts() {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
}

export async function getProduct(id) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?;', [id]);
    return rows[0];
}

export async function updateProduct(id, productName, productDescription, price) {
    const [rows] = await pool.query('UPDATE products \
                                     SET product_name = ?, product_description = ?, price = ? \
                                     WHERE id = ?;', 
                                    [productName, productDescription, price, id]);
    return rows[0];
}

export async function deleteProduct(id) {
    const result = await pool.query("DELETE FROM products WHERE id = ?", [id]);
    return result;
}

//////////////////////////////
// Inventory table operations
//////////////////////////////

// createInventory(...)

// getInventories()

// getInventory(id)

// updateInventory(id)

// deleteInventory(id)

export {getUsers, getUser, createUser, updateUser, deleteUser, loginUser, getPermission, getPermissions}