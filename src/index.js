const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const discoverShop = require('./discoverShop.js');

const app = express();

app.use(bodyParser.json());

app.post('/errors', (req,res) => {
	console.error(req.body);
	res.sendStatus(200);
});

app.post('/discover-products', (req, res) => {
	console.log('[POST] /discover-products');
	const memory = req.body.conversation.memory;
	const products = memory.product.value;
	console.log('###');
	console.log(products);
	console.log('###');

	return discoverShop(products)
		.then((carouselle) => res.json({
			replies: carouselle,
		})).catch((err) => console.error('yaasApi::discoverShop error: ', err));
});

app.listen(config.PORT, () => console.log('App started on port ${config.PORT}'));
