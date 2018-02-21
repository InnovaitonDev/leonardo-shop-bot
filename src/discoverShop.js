const config = require('./config.js');
const YaaS = require('./yaas_api/yaas.js');

// we don't need any scopes here
var scopes = "";
var yaas = new YaaS();
var finalres = [];
var tmp;

function discoverShop(products){
	yaas.init(config.CLIENT_ID, config.CLIENT_SECRET, scopes, config.PRODUCT_ID);
	yaas.setLanguage('ko');

	return yaas.category.getCategory()
		.then(results => {
			if(results.length === 0){
				return [{
					type: 'quickReplies',
					content: {
						title: 'Sorry, but I could not find any results for your request :(',
						buttons: [{ title: 'Start over', value: 'Start over'}],
					},
				}];
			}

			var productExist = false;



			for(var category in results.body){
				console.log('=======');
				console.log(results.body[category].assignments);
				if(results.body[category].name === prod){
					productExist = true;
					var assignments = results.body[category].assignments

					console.log('PRODUCT EXISTS');
					break;
				}

				//console.log('=======');
				//console.log(results.body[category].name)

			}

			if(productExist == false){
				console.log('No Product');
				return [{
					type: 'quickReplies',
					content: {
						title: '해당 제품은 존재하지 않습니다.',
						buttons: [{ title: 'Start over', value: 'Start over'}],
					},
				}];
			}else{
				console.log('Yes Product');
				for(key in assignments){
					console.log(assignments[key].ref.id);

					var rf = yaas.productdetials.getProductdetailsId(assignments[key].ref.id)
						.then(results => {

							console.log(results);
							tmp = results.body.product.name;
							finalres.push({name: results.body.product.name});
							console.log(finalres);
						});

				}
			}
			console.log(finalres);
			console.log(tmp);
			// 사용자가 input한 text와 일치하는 Category 찾기
			//if(products ===)
			//


			const cards = results.body.slice(0,10).map(product => ({
				title: product.name,
				imageUrl: product.media[0].url,
				buttons: [
					{
						type: 'web_url',
						value: 'https://www.naver.com/',
						title: 'View More',
					},
				],
			}));

			//console.log(cards);

			return [
				{
					type: 'text',
					content: "Here's what I found for you!",
				},
				{ type: 'carousel', content: cards },
			];
	});
}
prod = '우유'
discoverShop(prod)


module.exports = discoverShop;
