/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
  	email: {
  		required: true,
  		type: 'email',
  		unique: true,
  	},
  	encryptedPass: {
  		type: 'string',
  	}
  },
  beforeCreate: function(values, next) {
  	require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPass) {
  		if (err) return next(err);
  		values.encryptedPass = encryptedPass;
  		next();
  	});
  }
};

