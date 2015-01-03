/**
 * Module dependencies
 */

var fs = require('fs');
var util = require('util');
var responses = require('./lib/responses');
var generateView = false;

/**
 * sails-generate-responses
 *
 * Usage:
 * `sails generate response`
 *
 * @description Generates a response
 * @help See http://links.sailsjs.org/docs/generators
 */

module.exports = {

  /**
   * `before()` is run before executing any of the `targets`
   * defined below.
   *
   * This is where we can validate user input, configure default
   * scope variables, get extra dependencies, and so on.
   *
   * @param  {Object} scope
   * @param  {Function} cb    [callback]
   */

  before: function (scope, cb) {

    if (!scope.args[0]) {
      return cb( new Error('Please provide the response using the status code or camel cased description. e.g: sails generate response 204 or sails generate response noContent') );
    }
    
    // The first command-line argument will be the response to generate
    scope.response = responses.getData(scope.args[0]);

    if( !scope.response )
    {
      return cb( new Error('Please provide one of the allowed responses: ' + Object.keys(responses.data).join(', ') ) );
    }

    // scope.rootPath is the base path for this generator
    //
    // e.g. if this generator specified the target:
    // './Foobar.md': { copy: 'Foobar.md' }
    //
    // And someone ran this generator from `/Users/dbowie/sailsStuff`,
    // then `/Users/dbowie/sailsStuff/Foobar.md` would be created.
    if (!scope.rootPath) {
      return cb( INVALID_SCOPE_VARIABLE('rootPath') );
    }

    // Path to responses dir within the project
    scope.responsesDirectory = 'api/responses';

    // Decide the output filename for use in targets below:
    scope.responseFilename = scope.response.camelCasedDescription + '.js';

    if( !scope['no-view'] )
    {
      scope.viewsDirectory = 'views';
      scope.viewFilename = scope.response.code + '.ejs';
      var viewPath = scope.viewsDirectory + '/' + scope.viewFilename;
      if (fs.existsSync(this.templatesDirectory + '/' + viewPath))
      {
        this.targets['./:viewsDirectory/:viewFilename'] = { copy: viewPath };
      }
    }

    // Log type within the response: silent, error, warn, debug, info, verbose, silly
    // (set using --log-level)
    scope.response.logLevel = scope['log-level'] || scope.response.logLevel;

    // When finished, we trigger a callback with no error
    // to begin generating files/folders as specified by
    // the `targets` below.
    cb();
  },

  /**
   * The files/folders to generate.
   * @type {Object}
   */

  targets: {

    // Usage:
    // './path/to/destination.foo': { someHelper: opts }
    './:responsesDirectory/:responseFilename': { template: 'response.js' }
    
  },

  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname, './templates')
};

/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE (varname, details, message) {
  var DEFAULT_MESSAGE =
  'Issue encountered in generator "response":\n'+
  'Missing required scope variable: `%s`"\n' +
  'If you are the author of `sails-generate-response`, please resolve this '+
  'issue and publish a new patch release.';

  message = (message || DEFAULT_MESSAGE) + (details ? '\n'+details : '');
  message = util.inspect(message, varname);

  return new Error(message);
}