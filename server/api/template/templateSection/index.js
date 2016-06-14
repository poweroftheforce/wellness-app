'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _express = require('express');

var _templateSectionController = require('./templateSection.controller');

var controller = _interopRequireWildcard(_templateSectionController);

var _authAuthService = require('../../../auth/auth.service');

var auth = _interopRequireWildcard(_authAuthService);

var router = new _express.Router({ mergeParams: true });

router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router['delete']('/:id', controller.destroy);

exports['default'] = router;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
