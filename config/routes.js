/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  // CARS

  'get /admin/cars': {
    controller: 'CarController',
    action: 'list'
  },
  'get /admin/car/:id': {
    controller: 'CarController',
    action: 'show'
  },
  'get /admin/cars/create': {
    controller: 'CarController',
    action: 'create',
  },
  'post /admin/car/update/:id': {
    controller: 'CarController',
    action: 'update',
  },
  'post /admin/car/destroy/:id': {
    controller: 'CarController',
    action: 'destroy',
  },

  // DRIVERS
  'get /admin/drivers': {
    controller: 'DriverController',
    action: 'list'
  },
  'get /admin/driver/:id': {
    controller: 'DriverController',
    action: 'show'
  },
  'get /admin/drivers/create': {
    controller: 'DriverController',
    action: 'create',
  },
  'post /admin/driver/update/:id': {
    controller: 'DriverController',
    action: 'update',
  },
  'post /admin/driver/destroy/:id': {
    controller: 'DriverController',
    action: 'destroy',
  },

  // COMPANIES
  'get /admin/companies': {
    controller: 'CompanyController',
    action: 'list'
  },
  'get /admin/company/:id': {
    controller: 'CompanyController',
    action: 'show'
  },
  'get /admin/companies/create': {
    controller: 'CompanyController',
    action: 'create',
  },
  'post /admin/company/update/:id': {
    controller: 'CompanyController',
    action: 'update',
  },
  'post /admin/company/destroy/:id': {
    controller: 'CompanyController',
    action: 'destroy',
  },

  // ORDERS
  'get /admin/orders': {
    controller: 'OrderController',
    action: 'list'
  },
  'get /admin/dashboard': {
    controller: 'OrderController',
    action: 'dashboard'
  },
  'get /admin/calendar': {
    controller: 'OrderController',
    action: 'calendar'
  },
  'get /admin/events': {
    controller: 'OrderController',
    action: 'events'
  },
  'get /admin/order/:id': {
    controller: 'OrderController',
    action: 'show'
  },
  'get /admin/orders/create': {
    controller: 'OrderController',
    action: 'create',
  },
  'get /admin/orders/add': {
    controller: 'OrderController',
    action: 'add',
  },
  'post /admin/order/update/:id': {
    controller: 'OrderController',
    action: 'update',
  },
  'post /admin/order/destroy/:id': {
    controller: 'OrderController',
    action: 'destroy',
  },

// INVOICES
'get /admin/invoices/create': {
    controller: 'InvoiceController',
    action: 'create',
  },
'get /admin/invoice/:id': {
    controller: 'InvoiceController',
    action: 'show',
  },


// DRIVER AREA

// JOBS
'get /driver/jobs/:id': {
  controller: 'OrderController',
  action: 'jobs'
},
'get /driver/job/:id': {
  controller: 'OrderController',
  action: 'job'
},



  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};