/**
* Driver.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  attributes: {
  	fname: {
  	    type: 'STRING',
  	    required: true
  	},
  	lname: {
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
    encryptedPass: {
      type: 'string',
    },
    role: {
        type: 'string',
        defaultsTo: 'driver'
    }
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

