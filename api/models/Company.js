/**
* Company.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var Promise = require("bluebird");
module.exports = {
   schema: true,
   attributes: {
  	title: {
  	    type: 'STRING',
  	    required: true
  	},
  	email: {
  	    type: 'STRING',
  	    required: true
  	},
  	phone: {
  	    type: 'STRING',
  	    required: true
  	},
  	responsible: {
  	    type: 'STRING',
  	    required: true
  	},
    address1: {
        type: 'STRING',
        defaultsTo: ''
    },
    address2: {
        type: 'STRING',
        defaultsTo: ''
    },
  	hrate: {
  	    type: 'float',
  	},
  	drate: {
  	    type: 'float',
  	},
  	horate: {
  	    type: 'float',
  	},
  	dorate: {
  	    type: 'float',
  	},
    encryptedPass: {
      type: 'string',
    },
    role: {
        type: 'string',
        defaultsTo: 'company'
    },
  },
  beforeCreate: function(values, next) {
    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPass) {
      if (err) return next(err);
      values.encryptedPass = encryptedPass;
      next();
    });
  },
  beforeValidate: function(values, next) {
    if(values.password) {
      require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPass) {
        if (err) return next(err);
        values.encryptedPass = encryptedPass;
        next();
      });
    } else {
      next();
    }
  }
};

