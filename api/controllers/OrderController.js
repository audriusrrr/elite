/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var  Promise = require("bluebird");
module.exports = {
	list: function(request, response) {
		var orders = Order
			.find({or : [{ status: 'delivered' },{ status: 'invoiced' }]})
			.populate('company').populate('driver').populate('car');

		Promise.props({
		  orders: orders,
		  title: 'admin-Orders'
		}).then(function(result) {
		  response.view('admin/order/list', result);
		});
	},
	dashboard: function(request, response) {
		var orders = Order
			.find({or : [
				{ status: 'not started' },
				{ status: 'in progress' },
				{ status: 'did not show up' },
			]})
			.populate('company').populate('driver').populate('car');

		Promise.props({
		  orders: orders,
		  title: 'admin-Dashboard'
		}).then(function(result) {
		  response.view('admin/dashboard/list', result);
		});
	},
	calendar: function(request, response) {
		var orders = Order.find().populate('company').populate('driver').populate('car');

		var eventsArr = [];
		var evn = _.each(orders, function(m) {eventsArr.push(m);});

		Promise.props({
		  orders: orders,
		  events: evn,
		  title: 'admin-Calendar'
		}).then(function(result) {
		  response.view('admin/calendar/list', result);
		});
	},
	events: function(request, response) {
		var orders = Order.find().populate('company').populate('driver').populate('car');


		Promise.props({
		  orders: orders,
		}).then(function(result) {
			var eventsArr = [];
			var events = result.orders;
			for (var i = events.length - 1; i >= 0; i--) {
				var id    = events[i].id;
				var title = 'HD-' + events[i].orderid;
				var url   = '/admin/order/'+events[i].id;
				if(events[i].status == 'delivered') {
					var alass = 'event-success';
				}
				if(events[i].status == 'not started') {
					var alass = 'event-default';
				}
				if(events[i].status == 'did not show up') {
					var alass = 'event-danger';
				}
				if(events[i].status == 'in progress') {
					var alass = 'event-danger';
				}
				var start = events[i].ordertime * 1000;
				var aend  = (start + 20000);

				var options = {
				  'id'   : id,
				  'title': title,
				  'url'  : url,
				  'class': alass,
				  'start': start,
				  'end'  : aend
				};

				eventsArr.push(options);
			};
		  	response.send({
		  		    success: 1,
		  		    result: eventsArr
		  		});
		}).catch(function(err){
			console.log(err);
		});
	},
	add: function add(request, response) {
	    var companies = Company.find();
	    var drivers = Driver.find();
	    var cars = Car.find();

	    Promise.props({
	      companies: companies,
	      drivers: drivers,
	      cars: cars,
	      title: 'admin-Orders'
	    }).then(function(result) {
	      response.view('admin/order/add', result);
	    });
	},
	show: function show(request, response) {
		var companies = Company.find();
	    var drivers = Driver.find();
	    var cars = Car.find();
	    var order = Order.findOne(request.param('id')).populate('company').populate('driver').populate('car');

	    Promise.props({
	      companies: companies,
	      drivers: drivers,
	      cars: cars,
	      order: order,
	      title: 'admin-Orders'
	    }).then(function(result) {
	      response.view('admin/order/show', result);
	    });
	},
	create: function(req, res, next) {
		Order.create(req.params.all(), function(err, order) {
			if (err) return next(err);
			res.redirect('admin/order/'+order.id);
		});
	},
	update: function(req, res, next) {
		Order.update(req.param('id'), req.params.all(), function orderUpdated (err) {
			if (err) {
				return res.redirect('admin/order/' + req.param('id'));
				console.log('error');
			}

			res.redirect('admin/order/' + req.param('id'));
		});
	},
	destroy: function(req, res, next) {
		Order.findOne(req.param('id'), function foundOrder (err, order) {
			if (err) return next(err);
			if (!order) return next ('Order does not exist');
			Order.destroy(req.param('id'), function orderDestroyed(err) {
				if (err) return next(err);
			});
			res.redirect('admin/orders');
		});
	},
	jobs: function(request, response) {
		var orders = Order
			.find({driver: request.session.passport.user.id})
			.populate('company').populate('car');
		var driver = Driver.findOne(request.session.passport.user.id);

		Promise.props({
		  orders: orders,
		  driver: driver,
		  title: 'driver-Dashboard'
		}).then(function(result) {
		  response.view('driver/jobs/list', result);
		});
	},
	job: function(request, response) {
		var order = Order.findOne({id: request.param('id'), driver: request.session.passport.user.id}).populate('company').populate('driver').populate('car');
		Promise.props({
		  order: order,
		  title: 'driver-Job'
		}).then(function(result) {
		  response.view('driver/jobs/show', result);
		});
	},
	complist: function(request, response) {
		var orders = Order
			.find({company: request.session.passport.user.id})
			.populate('driver').populate('car');
		var company = Company.findOne(request.session.passport.user.id);
		console.log(request.session.passport.user);

		Promise.props({
		  orders: orders,
		  company: company,
		  title: 'client-Orders'
		}).then(function(result) {
		  response.view('company/orders/list', result);
		});
	},
	compshow: function(request, response) {
		var order = Order.findOne({id: request.param('id'), company: request.session.passport.user.id}).populate('company').populate('driver').populate('car');
		Promise.props({
		  order: order,
		}).then(function(result) {
		  var order = result.order;
		  return order;
		}).then(function(order) {
			response.view('company/orders/show', {order: order, company: request.session.passport.user.id, title: 'client-Orders'});
		});
	},
};

