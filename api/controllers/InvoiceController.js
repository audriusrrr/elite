/**
 * InvoiceController
 *
 * @description :: Server-side logic for managing invoices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Promise = require("bluebird");
module.exports = {
	create: function(req, res, next) {
		Invoice.create(req.params.all(), function(err, invoice) {
			if (err) return next(err);
			res.redirect('admin/invoice/'+invoice.id);
		});
	},
	show: function(request, response) {
	    var invoice = Invoice.findOne(request.param('id'));
	    var orders = Order.find({invoice: request.param('id')}).populate('company');
	    Promise.props({
	      invoice: invoice,
	      orders: orders,
	      title: 'admin-Invoice'
	    }).then(function(result) {
	      response.view('admin/invoice/show', result);
	    });
	},
	complist: function(request, response) {
		var invoices = Invoice.find({company: request.session.passport.user.id}).populate('orders');

		Promise.props({
		  invoices: invoices,
		}).then(function(result) {
		  response.view('company/invoices/list', {invoices: result.invoices, company: request.session.passport.user.id, title: 'client-Invoices'});
		});
	},
	compshow: function(request, response) {
	    var invoice = Invoice.findOne({id: request.param('id'), company: request.session.passport.user.id});
	    var orders = Order.find({invoice: request.param('id')}).populate('company');
	    Promise.props({
	      invoice: invoice,
	      orders: orders,
	      title: 'client-Invoices'
	    }).then(function(result) {
	      response.view('company/invoices/show', {invoice: result.invoice, orders: result.orders, company: request.session.passport.user.id, title: 'client-Invoices'});
	    });
	},
};

