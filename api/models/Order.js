/**
* Order.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var Promise = require("bluebird");
module.exports = {
  schema: true,
  attributes: {
    company: {
  	    model:'company',
  	    required: true
  	},
    referencenr: {
  	    type: 'STRING',
  	},
    driver: {
  	    model:'driver',
  	    required: true
  	},
    car: {
  	    model:'car',
  	    required: true
  	},
    pickuplocation: {
  	    type: 'STRING',
  	    required: true
  	},
    otherstops: {
  	    type: 'STRING'
  	},
    finaldestination: {
  	    type: 'STRING',
  	    required: true
  	},
    pickupdate: {
  	    type: 'string',
  	    required: true
  	},
    pickuptime: {
  	    type: 'STRING',
  	    required: true
  	},
    flightnumber: {
  	    type: 'STRING',
  	},
    extranotes: {
  	    type: 'STRING',
  	},
    clientfname: {
  	    type: 'STRING',
  	    required: true
  	},
    clientlname: {
  	    type: 'STRING',
  	    required: true
  	},
    clientemail: {
  	    type: 'email',
  	},
    clientphone: {
  	    type: 'STRING',
  	},
  	status: {
  		type: 'string',
  		required: true,
  		defaultsTo: 'not started',
      enum: ['not started', 'in progress', 'did not show up', 'delivered', 'invoiced']
  	},
    ordertime: {
      type: 'integer',
      defaultsTo: 1427124720
    },
    orderid: {
      type: 'integer',
    },
    timelogged: {
      type: 'integer',
      defaultsTo: 0
    },
    invoice: {
          model:'invoice',
    },
    ratetype: {
         type: 'string',
         enum: ['hrate', 'drate', 'horate', 'dorate']
    },
  },
  beforeCreate: function(values, next) {
        var orders = Order.count();
        var orderids = Order.find();
        Promise.props({
          orders: orders,
          orderids: orderids
        }).then(function(result) {
            values.orderid = 100000 + result.orders;
            newDate = new Date(values.pickupdate + ' ' + values.pickuptime + ':00');
            var unixtime = Date.parse(newDate)/1000;
            values.ordertime = unixtime;
            next();
        });
  },
  beforeUpdate: function(values, next) {
        newDate = new Date(values.pickupdate + ' ' + values.pickuptime + ':00');
        Promise.props({
          newDate: newDate
        }).then(function(result){
          if(typeof values.pickupdate != 'undefined' &&  typeof values.pickuptime != 'undefined') {
            console.log(values.pickuptime);
            var unixtime = Date.parse(result.newDate)/1000;
            values.ordertime = unixtime;
          }
        next();

        });
    }
};

