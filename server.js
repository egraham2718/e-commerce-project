import express from "express"
import process from 'process';
import * as db from './dbconnection.js'
import path from 'path'

const app = express();
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


////////////////////
//  API routes    //
////////////////////

// routes for application users
// home page
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
// home page
app.get('/home', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// orders
app.get('/orders', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'orders.html'));
});

// login
app.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// account
app.get('/account', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'account.html'));
});

app.get('/sample', (req, res) => {
    // Sample data
    const data = {
        title: 'Dynamic Content',
        items: ['Item 1', 'Item 2', 'Item 3']
    };

     res.render('products', data); // Render 'products.ejs' with data
});

// products page - this is the same as the home page?
// app.get('/products', async (req, res) => {
//     console.log(req.params);
//     res.send({data: 'Products Page'});    
// });

// product_page - individual product information
app.get('/products/:product_id', async (req, res) => {
    console.log(req.params);
    //res.send({data: 'Product Page'});
    res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

// checkout
app.get('/checkout', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'checkout.html'));
});

// shopping_cart
app.get('/shopping_cart', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shopping_cart.html'));
});

// order_confirmation
app.get('/order_confirmation', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'order_confirmation.html'));
});


// Admin routes for Admain Panel
// get users
app.get('/api/users', async (req, res) => {
    res.send({
        success: true,
        message: await db.getUsers()
    })
});
// get user with id
app.get('/api/user/:id', async (req, res) => {
    res.send({
        success: true,
        message: await db.getUser(req.params.id)
    })
});

// update user
// *** TEMPORARY ***
// For testing just pass in the data in a query string
app.get('/api/updateUser/:id', async (req, res) => {
    const id = req.params.id;
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    const login = req.query.login;
    const email = req.query.email;
    res.send({
        success: true,
        message: await db.updateUser(id, firstname, lastname, login, email)
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