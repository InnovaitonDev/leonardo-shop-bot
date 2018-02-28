const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const discoverProduct = require('./discoverProduct.js');
const discoverCart = require('./discoverCart.js');
var path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

var cookieParser = require('cookie-parser');
var session = require('express-session')
app.use(cookieParser());
app.use(session({
    secret: '34SDgsdgspxxxxxxxdfsG', // just a long random string
    resave: false,
    saveUninitialized: true
}));
/*
app.get('/login', function(req, res) {
  // Show the login form
  res.render('login');
})

app.post('/login', function(req, res) {

  if (req.session.loggedin) {
    // User is already logged in, send them to the main page
    return res.redirect('/')
  }

  else if (req.body.username) {
    // User is not logged in, set the username for the user's session
    req.session.userName = req.body.username;
    // Then redirect to the main page
    return res.redirect('/')
  }

  else {
		console.log(req.session.id)
		res.send({sessionid: req.session.id, cartres: discoverCart(req.session.id)})

    // No username was entered
    //res.send('Please enter a username')
  }
})
*/
app.post('/errors', (req,res) => {
	console.error(req.body);
	res.sendStatus(200);
});

app.post('/discover-product', (req, res) => {
	console.log('[POST] /discover-product');
	const memory = req.body.conversation.memory;
	const products = memory.product.value;

	return discoverProduct(req.session.id, products)
		.then((carouselle) => res.json({
			replies: carouselle,
		})
  ).catch((err) => console.error('yaasApi::discoverProduct error: ', err));
});


app.post('/discover-cart', (req, res) => {
	console.log('[POST] /discover-cart');
	const memory = req.body.conversation.memory;
	//const cart = memory.cart.value;

	return discoverCart(req.session.id)
		.then((carouselle) => res.json({
			replies: carouselle,
		})).catch((err) => console.error('yaasApi::discoverCart error: ', err));
});



app.post('/discover-order', (req, res) => {
	console.log('[POST] /discover-order');
	const memory = req.body.conversation.memory;
	const order = memory.order.value;

	return discoverOrder()
		.then((carouselle) => res.json({
			replies: carouselle,
		})).catch((err) => console.error('yaasApi::discoverOrder error: ', err));
});


app.listen(config.PORT, () => console.log('App started on port ${config.PORT}'));
