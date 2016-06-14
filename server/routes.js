/**
 * Main application routes
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _componentsErrors = require('./components/errors');

var _componentsErrors2 = _interopRequireDefault(_componentsErrors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

exports['default'] = function (app) {
	// Insert routes below
	app.use('/api/reports', require('./api/reports'));
	app.use('/api/addendums', require('./api/addendum'));
	// app.use( '/api/nutraceuticals', require('./api/nutraceutical' ) );
	// app.use( '/api/prescriptions', require('./api/prescription' ) );
	app.use('/api/focusItems', require('./api/focusItem'));
	// app.use( '/api/drugReactions', require('./api/drugReaction' ) );
	app.use('/api/plans', require('./api/plan'));
	app.use('/api/plans/:plan_id/sections', require('./api/plan/planSection'));
	app.use('/api/templates', require('./api/template'));
	app.use('/api/templates/:template_id/sections', require('./api/template/templateSection'));
	app.use('/api/users', require('./api/user'));
	app.use('/api/pharmacies', require('./api/pharmacy'));
	app.use('/api/networks', require('./api/network'));
	app.use('/api/stores', require('./api/store'));

	app.use('/auth', require('./auth'));

	// All undefined asset or api routes should return a 404
	app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_componentsErrors2['default'][404]);

	// All other routes should redirect to the index.html
	app.route('/*').get(function (req, res) {
		res.sendFile(_path2['default'].resolve(app.get('appPath') + '/index.html'));
	});
};

module.exports = exports['default'];
//# sourceMappingURL=routes.js.map
