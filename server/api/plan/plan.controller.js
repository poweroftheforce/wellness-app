/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/plans              ->  index
 * POST    /api/plans              ->  create
 * GET     /api/plans/:id          ->  show
 * PUT     /api/plans/:id          ->  update
 * DELETE  /api/plans/:id          ->  destroy
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Auth = require('../../auth/auth.service');
var Plan = require('./plan.model');
var Template = require('../template/template.model');

//db.templates.find().sort({updated_at: -1}).limit(1)
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2['default'].merge(entity, updates);
    return updated.saveAsync().spread(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.removeAsync().then(function () {
        res.status(204).end();
      });
    }
  };
}

// Gets a list of Plans (for the current user)

function index(req, res) {
  Plan.findAsync({ _author_id: req.user._id }).then(responseWithResult(res))['catch'](handleError(res));
}

// Gets a single Plan from the DB

function show(req, res) {
  Plan.findOne({ _id: req.params.id }).populate({
    path: 'sections',
    model: 'PlanSection',
    populate: [{ path: 'focusItems', model: 'FocusItem' }, { path: 'addendums', model: 'Addendum' }]
  }).then(handleEntityNotFound(res)).then(responseWithResult(res))['catch'](handleError(res));
}

// Creates a new Plan in the DB

function create(req, res) {
  Plan.createAsync(req.body).then(responseWithResult(res, 201))['catch'](handleError(res));
}

// Updates an existing Plan in the DB

function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Plan.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(responseWithResult(res))['catch'](handleError(res));
}

// Deletes a Plan from the DB

function destroy(req, res) {
  Plan.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(removeEntity(res))['catch'](handleError(res));
}
//# sourceMappingURL=plan.controller.js.map
