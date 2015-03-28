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
  	  price: {
  	   	type: 'float',
  	   	defaultsTo: 0,
  	   	required: true
  	  },
  	  snapshot: {
  	  	type: 'text'
  	  },
      invoiceid: {
        type: 'integer',
        unique: true,
        size: 4,
        autoIncrement: true,

      }
  	},
  	beforeCreate: function(values, next) {
        var aggprice = 0;
        var ordersArr = values.orders;
        // var update = Order.update({id: ordersArr},{status:'invoiced'});
        var orders = Order.find({id: ordersArr}).populate('company');

        Promise.props({
          orders: orders,
          // update: update,
        }).then(function(result) {
        	var orders = result.orders;
        	for (var i = orders.length - 1; i >= 0; i--) {
        		if(orders[i].ratetype == 'hrate') {
        			values.price = (values.price + orders[i].timelogged * parseInt(orders[i].company.hrate) / 3600);
        		}
        		if (orders[i].ratetype == 'horate') {
        			values.price = (values.price + orders[i].timelogged * parseInt(orders[i].company.horate) / 3600);
        		}
        		if (orders[i].ratetype == 'drate') {
        			values.price = (values.price + parseInt(orders[i].company.drate));
        		}
        		if (orders[i].ratetype == 'dorate') {
        			values.price = (values.price + parseInt(orders[i].company.dorate));
        		}
        	};
        }).then(function(result) {
        	Order.update({id: ordersArr},{status:'invoiced'}).then(function(){
        	next();

        	});
        });
	},
	// beforeUpdate: function(values, next) {
	//       newDate = new Date(values.pickupdate + ' ' + values.pickuptime + ':00');
	//       var unixtime = Date.parse(newDate)/1000;
	//       values.ordertime = unixtime;
	//       next();
	// }
};

