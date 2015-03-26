/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Promise = require("bluebird");
module.exports = {
	list: function(req, res, next) {
	    Company.find(function(err, companies) {
	        if (err) {
	            return console.log(err);
	        }else{
	            res.view('admin/company/list', {
	                companies: companies,
	                title: 'admin-Clients'
	            });
	        }
	    });
	},
	show: function(request, response) {
		var orders = Order
			.find({company: request.param('id')})
			.populate('driver').populate('car');
		var invoices = Invoice
			.find({company: request.param('id')});
		var company = Company.findOne(request.param('id'));

		Promise.props({
		  orders: orders,
		  company: company,
		  invoices: invoices,
		  title: 'admin-Clients'
		}).then(function(result) {
		  response.view('admin/company/show', result);
		});
	},
	create: function(req, res, next) {
		Company.create(req.params.all(), function(err, company) {
			if (err) return next(err);
			res.redirect('admin/company/'+company.id);
		});
	},
	update: function(req, res, next) {
		Company.update(req.param('id'), req.params.all(), function companyUpdated (err) {
			if (err) {
				return res.redirect('admin/company/' + req.param('id'));
				console.log('error');
			}

			res.redirect('admin/company/' + req.param('id'));
		});
	},
	destroy: function(req, res, next) {
		Company.findOne(req.param('id'), function foundDriver (err, company) {
			if (err) return next(err);
			if (!company) return next ('company does not exist');
			Company.destroy(req.param('id'), function companyDestroyed(err) {
				if (err) return next(err);
			});
			res.redirect('admin/companies');
		});
	},
};

