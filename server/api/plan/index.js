'use strict';

var express = require('express');
var controller = require('./plan.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// Need to attach user to the request to make sure to only get their own plans!
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
