/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

   '*': "authenticated",
    UserController: {
        "*": 'isAdmin',
    },
    SessionController: {
        '*': true,
    },
    CarController: {
      '*': 'isAdmin'
    },
    CompanyController: {
      '*': 'isAdmin'
    },
    DriverController: {
      '*': 'isAdmin'
    },
    InvoiceController: {
      'show': 'isAdmin',
      'create': 'isAdmin',
      'complist': 'isCompany',
      'compshow': 'isCompany'
    },
    OrderController: {
      'list': 'isAdmin',
      'dashboard': 'isAdmin',
      'calendar': 'isAdmin',
      'events': 'isAdmin',
      'add': 'isAdmin',
      'show': 'isAdmin',
      'create': 'isAdmin',
      'update': true,
      'destroy': 'isAdmin',
      'job': 'isDriver',
      'jobs': 'isDriver',
      'complist': 'isCompany',
      'compshow': 'isCompany'
    },
};
