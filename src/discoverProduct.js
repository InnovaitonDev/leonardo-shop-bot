const config = require('./config.js');
const YaaS = require('./yaas_api/yaas.js');
// we don't need any scopes here
var scopes = "";
var yaas = new YaaS();
var promises = [];


function discoverProduct(sessionId, category){

	// YaaS 초기화 및 언어 설정
	yaas.init(sessionId, config.CLIENT_ID, config.CLIENT_SECRET, scopes, config.PRODUCT_ID);
	yaas.setLanguage('ko');

	// YaaS에서 모든 카테고리 가져오고 사용자 input과 Matching하는 카테고리 있는지 확인
	return yaas.category.getCategory()
		.then(results => {
			var productExist = false;

			// 카테고리 정보가 존재하지 않음
			if(results.length === 0){
				return [{
					type: 'quickReplies',
					content: {
						title: 'Sorry, but I could not find any results for your request :(',
						buttons: [{ title: 'Start over', value: 'Start over'}],
					},
				}];
			}

			// YaaS에서 받아온 카테고리와 사용자 input 정보 비교
			// Matching하는 정보가 있으면 productExist 변수 true로 바꾸고 for loop 나옴
			// Matching하는 정보가 없으면 productExist 변수는 그대로 false 상태
			for(var cat in results.body){
				//console.log('=======');
				console.log(results.body[cat].assignments);
				if(results.body[cat].name === category){
					productExist = true;
					var assignments = results.body[cat].assignments

					console.log('PRODUCT EXISTS');
					break;
				}
			}

			// Matching 정보가 없으면 "해당 제품은 존재하지 않습니다"라는 메세지를 Recast AI로 전달
			if(productExist == false){
				console.log('No Product');
				return [{
					type: 'quickReplies',
					content: {
						title: '해당 제품은 존재하지 않습니다.',
						buttons: [{ title: 'Start over', value: 'Start over'}],
					},
				}];
			}
			// Matching하는 정보가 있으면 해당 카테고리에 있는 제품들을 YaaS에서 받아옴
			else{
				console.log('Yes Product');
				for(key in assignments){
// 제품 정보 추가
					promises.push(yaas.productdetials.getProductdetailsId(assignments[key].ref.id)
					)
				}
			}
			return Promise.all(promises).then(values => {
				console.log(values[0].body.prices[0].originalAmount)

				const cards = values.slice(0,10).map(product => ({
					title: product.body.product.name,
					imageUrl: product.body.product.media[0].url,
					subtitle: product.body.prices[0].originalAmount + '원',
					//price: product.body.prices[0].originalAmount,
					//category: product.body.categories[0].name,
					buttons: [
						{
							type: 'web_url',
							value: '장바구니 담기',
							title: '장바구니 담기',
						},
						{
							type: 'web_url',
							value: '구매하기',
							title: '구매하기',
						},
					],
				}));
				promises = []

				//console.log(cards)

				// 카드들을 carousel 형식으로 Recast AI에 보냄
				return [
					{
						type: 'text',
						content: category + " 에 대한 결과입니다:",
					},
					{ type: 'carousel', content: cards },
				];

			}).catch(errorResponse => console.log(errorResponse));
			// 최종적으로 추출한 제품 정보들을 Card 형식으로 저장
			return [{
				type: 'quickReplies',
				content: {
					title: '제품이 존재합니다!',
					buttons: [{ title: 'Start over', value: 'Start over'}],
				},
			}];

	}).catch(errorResponse => console.log(errorResponse));
}
module.exports = discoverProduct;
