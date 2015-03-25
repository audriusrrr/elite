/**
* Driver.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

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
  	}
  }
};

