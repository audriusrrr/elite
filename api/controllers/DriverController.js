/**
 * DriverController
 *
 * @description :: Server-side logic for managing drivers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Promise = require("bluebird");
module.exports = {
	list: function(req, res, next) {
	    Driver.find(function(err, drivers) {
	        if (err) {
	            return console.log(err);
	        }else{
	            res.view('admin/driver/list', {
	                drivers: drivers,
	                title: 'admin-Drivers'
	            });
	        }
	    });
	},
	show: function(request, response) {
		var orders = Order
			.find({driver: request.param('id')})
			.populate('company').populate('car');
		var driver = Driver.findOne(request.param('id'));

		Promise.props({
		  orders: orders,
		  driver: driver,
		  title: 'admin-Drivers'
		}).then(function(result) {
		  response.view('admin/driver/show', result);
		});
	},
	create: function(req, res, next) {
		Driver.create(req.params.all(), function(err, driver) {
			if (err) return next(err);
			res.redirect('admin/driver/'+driver.id);
		});
	},
	update: function(req, res, next) {
		Driver.update(req.param('id'), req.params.all(), function driverUpdated (err) {
			if (err) {
				return res.redirect('admin/driver/' + req.param('id'));
				console.log('error');
			}

			res.redirect('admin/driver/' + req.param('id'));
		});
	},
	destroy: function(req, res, next) {
		Driver.findOne(req.param('id'), function foundDriver (err, driver) {
			if (err) return next(err);
			if (!driver) return next ('Driver does not exist');
			Driver.destroy(req.param('id'), function driverDestroyed(err) {
				if (err) return next(err);
			});
			res.redirect('admin/drivers');
		});
	}
};

