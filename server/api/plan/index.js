'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _express = require('express');

var _planController = require('./plan.controller');

var controller = _interopRequireWildcard(_planController);

var _authAuthService = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_authAuthService);

var router = new _express.Router();

// Need to attach user to the request to make sure to only get their own plans!
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router['delete']('/:id', auth.isAuthenticated(), controller.destroy);

exports['default'] = router;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
