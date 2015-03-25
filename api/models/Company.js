/**
* Company.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

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
  	hrate: {
  	    type: 'STRING',
  	},
  	drate: {
  	    type: 'STRING',
  	},
  	horate: {
  	    type: 'STRING',
  	},
  	dorate: {
  	    type: 'STRING',
  	},
  }
};

