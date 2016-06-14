'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _express = require('express');

var _userController = require('./user.controller');

var controller = _interopRequireWildcard(_userController);

var _authAuthService = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_authAuthService);

var router = new _express.Router();

// router.get('/', auth.hasRole('admin'), controller.index);
router.get('/', controller.index);
router['delete']('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id', auth.isAuthenticated(), controller.update);
// router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);

// Custom Routes
// router.post('/me/pharmacies', auth.isAuthenticated(), controller.addPharmacy);
// router.put('/me/pharmacies/:id', auth.isAuthenticated(), controller.removePharmacy);
// router.post('/me/stores', auth.isAuthenticated(), controller.addStore);
// router.put('/me/stores/:id', auth.isAuthenticated(), controller.removeStore);
// router.post('/me/networks', auth.isAuthenticated(), controller.addNetwork);
// router.put('/me/networks/:id', auth.isAuthenticated(), controller.removeNetwork);

exports['default'] = router;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
