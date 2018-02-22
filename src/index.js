const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const discoverShop = require('./discoverShop.js');
var path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/errors', (req,res) => {
	console.error(req.body);
	res.sendStatus(200);
});

app.post('/discover-products', (req, res) => {
	console.log('[POST] /discover-products');
	const memory = req.body.conversation.memory;
	const products = memory.product.value;

	return discoverShop(products)
		.then((carouselle) => res.json({
			replies: carouselle,
		})).catch((err) => console.error('yaasApi::discoverShop error: ', err));
});

app.listen(config.PORT, () => console.log('App started on port ${config.PORT}'));
