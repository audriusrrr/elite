/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Promise = require("bluebird");
module.exports = {
	list: function(req, res, next) {
	    User.find(function(err, users) {
	        if (err) {
	            return console.log(err);
	        }else{
	            res.view('admin/user/list', {
	                users: users,
	                title: 'admin-User'
	            });
	        }
	    });
	},
	show: function(request, response) {
		var user = User.findOne(request.param('id'));

		Promise.props({
		  user: user,
		  title: 'admin-User'
		}).then(function(result) {
		  response.view('admin/user/show', result);
		});
	},
	create: function(req, res, next) {
		User.create(req.params.all(), function(err, user) {
			if (err) return next(err);
			res.redirect('admin/user/'+user.id);
		});
	},
	update: function(req, res, next) {
			console.log('aaa');
		User.update(req.param('id'), req.params.all(), function userUpdated (err) {
			if (err) {
				return res.redirect('admin/user/' + req.param('id'));
				console.log('error');
			}
			res.redirect('admin/user/' + req.param('id'));
		});
	},
	destroy: function(req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if (err) return next(err);
			if (!user) return next ('User does not exist');
			User.destroy(req.param('id'), function userDestroyed(err) {
				if (err) return next(err);
			});
			res.redirect('admin/users');
		});
	}
};

