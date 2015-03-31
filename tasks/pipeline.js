/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)

var cssFilesToInject = [
  'styles/**/*.css',
  'js/dependencies/bootstrap/css/bootstrap.min.css',
  'global/plugins/font-awesome/**/*.css',
  'global/plugins/animate/**/*.css',
  'global/plugins/datatables/**/*.css',
  'global/plugins/bootstrap-taginput/bootstrap-tagsinput.css',
  'global/plugins/jasny-bootstrap-fileinput/css/jasny-bootstrap-fileinput.min.css',
  'global/plugins/bootstrap-calendar/css/calendar.min.css',
  'global/plugins/chosen/chosen.css',
  'admin/css/layout.css',
  'admin/css/components.css',
  'admin/css/plugins.css',
  'admin/css/custom.css'

];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/jquery/jquery.min.js',
  'js/dependencies/jquery-cookie/**/*.js',
  'js/dependencies/bootstrap/js/bootstrap.min.js',
  'js/dependencies/typeahead/**/*.js',
  'js/dependencies/jquery-niceScroll/**/*.js',
  'js/dependencies/jquery-sparkline/**/*.js',
  'js/dependencies/jpreloader-v2/**/*.js',
  'js/dependencies/jquery-easing/**/*.js',
  // 'js/dependencies/**/*.js',
  // All of the rest of your client-side js files
  // will be injected here in no particular order.

  'global/plugins/datatables/js/jquery.dataTables.min.js',
  'global/plugins/datatables/js/dataTables.bootstrap.js',
  'global/plugins/datatables/js/datatables.responsive.js',
  'global/plugins/bootstrap-taginput/bootstrap-tagsinput.min.js',
  'global/plugins/jasny-bootstrap-fileinput/js/jasny-bootstrap.fileinput.min.js',
  'global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
  'global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
  'global/plugins/jquery-validation/jquery.validate.js',
  'global/plugins/autosize/jquery.autosize.min.js',
  'global/plugins/underscore/underscore.js',
  'global/plugins/jstimezonedetect/jstz.min.js',
  'global/plugins/bootstrap-calendar/js/calendar.js',
  'global/plugins/chosen/chosen.jquery.js',
  'global/plugins/holder/holder.js',
  'admin/js/apps.js',
  'admin/js/pages/blankon.form.js',
  'admin/js/pages/blankon.table.js',
  'admin/js/pages/blankon.calendar.js',
  'admin/js/demo.js',
  // 'js/**/*.js',
  // 'global/plugins/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
