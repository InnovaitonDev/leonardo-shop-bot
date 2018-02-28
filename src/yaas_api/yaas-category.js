'use strict';

var pathCategoryBase = '/hybris/category/v1/{{projectId}}/categories?expand=assignments%2Csubcategories%2Cparent';
var pathCartBase = '/hybris/cart/v1/{{projectId}}/carts';

var Category = function (rh) {
	this.requestHelper = rh;

	this.getCategory = function () {
		return this.requestHelper.get(pathCategoryBase);
	};
	this.getCart = function() {
		return this.requestHelper.get(pathCartBase);
	};
	function checkParameters(queryParameters) {
		var qp = {};
		qp.q = queryParameters.q;

		if (queryParameters.sort) {
			qp.sort = queryParameters.sort;
		}
		if (queryParameters.pageNumber) {
			qp.pageNumber = queryParameters.pageNumber;
		}
		if (queryParameters.pageSize) {
			qp.pageSize = queryParameters.pageSize;
		}
		if (queryParameters.effectiveDate) {
			qp.effectiveDate = queryParameters.effectiveDate;
		}

		return qp;
	}

};

module.exports = Category;
