const config = require('./config.js');
const YaaS = require('./yaas_api/yaas.js');

// we don't need any scopes here
var scopes = "";
var yaas = new YaaS();
var cartId = '';

function discoverCart(sessionId){

	var finalres = new Array();
	// YaaS 초기화 및 언어 설정
	yaas.init(sessionId, config.CLIENT_ID, config.CLIENT_SECRET, scopes, config.PRODUCT_ID);
	yaas.setLanguage('ko');


  // 사용자의 sessionid에 맞는 카트가 있는지 조회 (없으면 카트 생성)

	// YaaS에서 모든 카테고리 가져오고 사용자 input과 Matching하는 카테고리 있는지 확인
	return yaas.cart.getCart(sessionId)
		.then(results => {
			// 카테고리 정보가 존재하지 않음
			console.log(results.body);

			return [{
				type: 'quickReplies',
				content: {
					title: '카트가 존재합니다!!.',
					buttons: [{ title: 'Start over', value: 'Start over'}],
				},
			}];

	}).catch((err) => {
		console.error('yaasApi::discoverCart error: ', err)
		console.log('No Cart')

		yaas.cart.create(sessionId, null, 'USD', 'main').then(
			results => {
				console.log('Created new cart');
				console.log(results);
				cartId=results.body.cartId;
				console.log(cartId);

				return [{
					type: 'quickReplies',
					content: {
						title: 'New Cart Created!!',
						buttons: [{ title: 'Start over', value: 'Start over'}],
					},
				}];
			}
		).catch((err) => {console.error('yaasApi::create error: ', err)});
  });
}

module.exports = discoverCart;
