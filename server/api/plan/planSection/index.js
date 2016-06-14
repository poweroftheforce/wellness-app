'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _express = require('express');

var _planSectionController = require('./planSection.controller');

var controller = _interopRequireWildcard(_planSectionController);

var _authAuthService = require('../../../auth/auth.service');

var auth = _interopRequireWildcard(_authAuthService);

var router = new _express.Router({ mergeParams: true });

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.get('/:id', controller.show);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router['delete']('/:id', auth.isAuthenticated(), controller.destroy);

// Custom Routes
router.post('/:id/focusItems/:focusItem_id', auth.isAuthenticated(), controller.addFocusItem);
router['delete']('/:id/focusItems/:focusItem_id', auth.isAuthenticated(), controller.removeFocusItem);

router.post('/:id/addendums/:addendum_id', auth.isAuthenticated(), controller.addAddendum);
router['delete']('/:id/addendums/:addendum_id', auth.isAuthenticated(), controller.removeAddendum);

exports['default'] = router;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
