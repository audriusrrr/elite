/**
* Invoice.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var Promise = require("bluebird");
module.exports = {

  attributes: {
  		client: {
  			model: 'company'
  		},
  		orders: {
	      collection: 'order',
    	  via: 'invoice'
  		},
  	 	rate: {
  	    	type: 'integer',
  	    	defaultsTo: 0
  	  	},
  	  	price: {
  	    	type: 'string',
  	    	defaultsTo: 0
  	  	},
  	},
  	beforeCreate: function(values, next) {
        var aggprice = 0;
        var rate = values.rate;
        var orders = values.orders;
        var orders = Order.find({id: orders});

        Promise.props({
          orders: orders,
        }).then(function(result) {
        	var orders = result.orders;
        	for (var i = orders.length - 1; i >= 0; i--) {
        		values.price = values.price + orders[i].timelogged * rate / 3600;
        	};
        	next();
        });
	},
	// beforeUpdate: function(values, next) {
	//       newDate = new Date(values.pickupdate + ' ' + values.pickuptime + ':00');
	//       var unixtime = Date.parse(newDate)/1000;
	//       values.ordertime = unixtime;
	//       next();
	// }
};

