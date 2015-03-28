/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	show: function(request, response) {
		response.view('admin/user/show', {title: 'admin-User'});
	},
	create: function(req, res, next) {
		User.create(req.params.all(), function(err, user) {
			if (err) return next(err);
			// res.redirect('admin/user/'+car.id);
		});
	},
};

