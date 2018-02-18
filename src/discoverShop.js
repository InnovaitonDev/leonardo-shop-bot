// use require to load our credentials from yaas-credentials.json
var config = require('./config.js');

// we don't need any scopes here
var scopes = "";

// requre our sdk
var YaaS = require('yaas.js');

// create a new instance
var yaas = new YaaS();

// and fill it with our config and scopes
yaas.init(config.CLIENT_ID, config.CLIENT_SECRET, scopes, config.PRODUCT_ID);

yaas.setLanguage('kr');
// now we can build an object that includes query parameter
// we put the sku or product number of our product here
//  in the end, this will be reformatted to a string included in the url
var query = {
	q : {
		sku : "prod12"
	}
};

// now, we start the request
// we use Promise for that - they enable use to do some easy-to-read functional programming
result = yaas.product.getProducts("milk01")
.then(response => console.log(JSON.stringify(response.body[0], null, "       ")))
.catch(errorResponse => console.log(errorResponse));


// yaas.product.getProduct(theProductId)
// yaas.cart.deleteCart(cartId)
//
//
// var reqParams = {
//     pageNumber: 1,
//     pageSize: 10,
//     totalCount: true
// };
// yaas.document.getAll(clientApplicationId, documentType, reqParams).then(
//     function(response) {
//         console.log('Fetched', response.data.length, 'of', response.headers['hybris-count'], 'documents.');
//     },
//     function(err) {
//         console.error('Error: ', err);
//     }
// );
