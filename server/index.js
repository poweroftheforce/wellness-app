'use strict';

// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  // Register the Babel require hook
  require('babel-core/register')({
	  ignore: /\/lib\/|\/node_modules\//
  });
}

// Export the application
exports = module.exports = require('./app');
