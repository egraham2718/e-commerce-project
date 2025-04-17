import express from "express"
import * as db from './dbconnection.js'
import path from 'path'

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// web routes
app.use(express.static(path.join(__dirname, 'public')));

////////////////////
//  API routes    //
////////////////////

// routes for application users
// home page
app.get('/', async (req, res) => {
    res.send({data: 'Home Page'});
});

// orders
app.get('/orders', async (req, res) => {
    res.send({data: 'Orders Page'});
});

// login
app.get('/login', async (req, res) => {
    res.send({data: 'Login Page'});
});

// account
app.get('/account', async (req, res) => {
    res.send({data: 'Account Page'});
});

// products page - this is the same as the home page?
app.get('/products', async (req, res) => {
    console.log(req.params);
    res.send({data: 'Products Page'});
});

// product_page - individual product information
app.get('/products/:product_id', async (req, res) => {
    console.log(req.params);
    res.send({data: 'Product Page'});
});

// checkout
app.get('/checkout', async (req, res) => {
    res.send({data: 'Checkout Page'});
});

// shopping_cart
app.get('/shopping_cart', async (req, res) => {
    res.send({data: 'Shopping Cart Page'});
});

// order_confirmation
app.get('/order_confirmation', async (req, res) => {
    res.send({data: 'Order Confirmation Page'});
});


// Admin routes for Admain Panel
// get users
app.get('/api/users', async (req, res) => {
    res.send({
        success: true,
        message: await db.getUsers()
    })
});

// get permissions
app.get('/api/permissions', async (req, res) => {
    res.send({
        success: true,
        message: await db.getPermissions()
    })
});

// get logging information
app.get('/api/logging', async (req, res) => {
    //
});

// 
app.get('/api/admin_panel/:admin_user', async (req, res) => {
    //
});

// 
app.get('/api/:model/:id', async (req, res) => {
    console.log(req.params);
    let result = [];

    if(req.params.model == 'user' || req.params.model == 'users') {
        result = await db.getUser(req.params.id);
    }
    else if (req.params.model == 'permission' || req.params.model == 'permissions') {
        result = await db.getPermission(req.params.id);
    }

    res.send({
        success: true,
        message: result
    })
});


// Setup server for listening
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});