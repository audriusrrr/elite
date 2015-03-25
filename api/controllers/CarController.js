/**
 * CarController
 *
 * @description :: Server-side logic for managing cars
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Promise = require("bluebird");
module.exports = {
	list: function(req, res, next) {
	    Car.find(function(err, cars) {
	        if (err) {
	            return console.log(err);
	        }else{
	            res.view('admin/car/list', {
	                cars: cars,
	                title: 'admin-Cars'
	            });
	        }
	    });
	},
	show: function(request, response) {
		var orders = Order
			.find({car: request.param('id')})
			.populate('driver').populate('company');
		var car = Car.findOne(request.param('id'));

		Promise.props({
		  orders: orders,
		  car: car,
		  title: 'admin-Cars'
		}).then(function(result) {
		  response.view('admin/car/show', result);
		});
	},
	create: function(req, res, next) {
		Car.create(req.params.all(), function(err, car) {
			if (err) return next(err);
			res.redirect('admin/car/'+car.id);
		});
	},
	update: function(req, res, next) {
		Car.update(req.param('id'), req.params.all(), function carUpdated (err) {
			if (err) {
				return res.redirect('admin/car/' + req.param('id'));
				console.log('error');
			}

			res.redirect('admin/car/' + req.param('id'));
		});
	},
	destroy: function(req, res, next) {
		Car.findOne(req.param('id'), function foundCar (err, car) {
			if (err) return next(err);
			if (!car) return next ('Car does not exist');
			Car.destroy(req.param('id'), function userDestroyed(err) {
				if (err) return next(err);
			});
			res.redirect('admin/cars');
		});
	}
};

