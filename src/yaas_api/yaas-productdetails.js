'use strict';

var pathProductBase = '/hybris/productdetails/v2/{{projectId}}/productdetails';

var Productdetails = function (rh) {
	this.requestHelper = rh;

	this.getProductdetails = function () {
		return this.requestHelper.get(pathProductBase);
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

  this.getProductdetailsId = function (productId) {
    var path = pathProductBase + '/' + productId;
    return this.requestHelper.get(path);
  };

};

module.exports = Productdetails;
