/**
 * Given a string of dash-delimited words, return a conventional
 * (and ECMAScript-compatible) camel-cased variable-name-looking thing.
 *
 * @param {String} id
 * @return {String}
 */

module.exports = {
	getData: function(response)
	{
		var code;
		switch(response){
		case '200': case 'ok': case 'OK':
			code = 200;
			break;
		case '201': case 'created': case 'Created':
			code = 201;
			break;
		case '204': case 'noContent': case 'No Content':
			code = 204;
			break;
		case '304': case 'notModified': case 'Not Modified':
			code = 304;
			break;
		case '400': case 'badRequest': case 'Bad Request':
			code = 400;
			break;
		case '401': case 'unauthorized': case 'Unauthorized':
			code = 401;
			break;
		case '403': case 'forbiden': case 'Forbiden':
			code = 403;
			break;
		case '404': case 'notFound': case 'Not Found':
			code = 404;
			break;
		case '409': case 'conflict': case 'Conflict':
			code = 409;
			break;
		case '500': case 'serverError': case 'Server Error':
			code = 500;
			break;
		}
		return code ? this.data[code] : false;
	},
	data: {
		'200': {
			code: 200,
			description: 'OK',
			camelCasedDescription: 'ok',
			logLevel: 'silent',
			example: {
				data: 'data',
				options: '\'auth/login\''
			}
		},
		'201': {
			code: 201,
			description: 'Created',
			camelCasedDescription: 'created',
			logLevel: 'silly',
			example: {
				data: 'data'
			}
		},
		'204': {
			code: 204,
			description: 'No Content',
			camelCasedDescription: 'noContent',
			logLevel: 'silly',
			example: {
				data: '',
				options: ''
			}
		},
		'304': {
			code: 304,
			description: 'Not Modified',
			camelCasedDescription: 'notModified',
			logLevel: 'verbose',
			example: {
				data: '',
				options: ''
			}
		},
		'400': {
			code: 400,
			description: 'Bad Request',
			camelCasedDescription: 'badRequest',
			logLevel: 'verbose',
			example: {
				data: '',
				options: ''
			}
		},
		'401': {
			code: 401,
			description: 'Unauthorized',
			camelCasedDescription: 'unauthorized',
			logLevel: 'verbose',
			example: {
				data: '',
				options: ''
			}
		},
		'403': {
			code: 403,
			description: 'Forbiden',
			camelCasedDescription: 'forbiden',
			logLevel: 'verbose',
			example: {
				data: '',
				options: ''
			}
		},
		'404': {
			code: 404,
			description: 'Not Found',
			camelCasedDescription: 'notFound',
			logLevel: 'verbose',
			example: {
				data: '',
				options: ''
			}
		},
		'409': {
			code: 409,
			description: 'Conflict',
			camelCasedDescription: 'conflict',
			logLevel: 'verbose',
			example: {
				data: '',
				options: ''
			}
		},
		'500': {
			code: 500,
			description: 'Server Error',
			camelCasedDescription: 'serverError',
			logLevel: 'error',
			example: {
				data: '',
				options: ''
			}
		}
	}
};