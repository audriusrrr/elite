/**
* Order.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

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
  		defaultsTo: 'not started'
  	},
    ordertime: {
      type: 'integer',
      defaultsTo: 1427124720
    },
    orderid: {
      type: 'integer',
      unique: true,
      size: 6,
      autoIncrement: true,
    },
    timelogged: {
      type: 'integer',
      defaultsTo: 0
    },
    invoice: {
          model:'invoice',
    },
  },
  beforeCreate: function(values, next) {
        newDate = new Date(values.pickupdate + ' ' + values.pickuptime + ':00');
        var unixtime = Date.parse(newDate)/1000;
        values.ordertime = unixtime;
        next();
  },
  beforeUpdate: function(values, next) {
        newDate = new Date(values.pickupdate + ' ' + values.pickuptime + ':00');
        var unixtime = Date.parse(newDate)/1000;
        values.ordertime = unixtime;
        next();
    }
};

