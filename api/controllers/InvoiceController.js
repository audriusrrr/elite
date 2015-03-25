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
	    var invoice = Invoice.findOne(request.param('id')).populate('orders');

	    Promise.props({
	      invoice: invoice,
	      title: 'admin-Invoice'
	    }).then(function(result) {
	      response.view('admin/invoice/show', result);
	    });
	},
};

