'use strict';

//var CartService = require('./yaas-cart.js');
var RequestHelper = require('./yaas-requesthelper.js');
var ProductService = require('./yaas-product.js');
var ProductDetails = require('./yaas-productdetails.js');
var Category = require('./yaas-category.js');
var CartService = require('./yaas-cart.js');

var language = undefined;

var Yaas = function() {
    this.init = function(hybrisSessionId, theClientId, theClientSecret, theScope, theProjectId, yaasExtensions, overrideApiUrl) {
        this.requestHelper = new RequestHelper(hybrisSessionId, theClientId, theClientSecret, theScope, theProjectId, overrideApiUrl);
        this.requestHelper.setDebug(this.debugCallback);
        this.requestHelper.setLanguage(language);
        this.cart = new CartService(this.requestHelper);
        this.product = new ProductService(this.requestHelper);
        this.productdetials = new ProductDetails(this.requestHelper);
        this.category = new Category(this.requestHelper);

        if (yaasExtensions) {
          yaasExtensions.forEach(function(extension) {
            var Service = require(extension.path);
            this[extension.serviceName] = new Service(this.requestHelper);
            Service = undefined;
          }.bind(this));
        }

        return Promise.resolve(this);
    };

    this.setDebugCallback = function(callback) {
        this.debugCallback = callback;
    };

    this.setLanguage = function(value) {
        language = value;
        if (this.requestHelper) {
            this.requestHelper.setLanguage(value);
        }
    }
};

module.exports = Yaas;
