/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/addendums              ->  index
 * POST    /api/addendums              ->  create
 * GET     /api/addendums/:id          ->  show
 * PUT     /api/addendums/:id          ->  update
 * DELETE  /api/addendums/:id          ->  destroy
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.index = index;
exports.show = show;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reportsModel = require('./reports.model');

var _reportsModel2 = _interopRequireDefault(_reportsModel);

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2['default'].merge(entity, updates);
    return updated.save().then(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of reports

function index(req, res) {
  // if there is a query, handle it!
  if (req.query) {
    return _reportsModel2['default'].find(req.query).exec().then(handleEntityNotFound(res)).then(respondWithResult(res))['catch'](handleError(res));
  } else {
    return _reportsModel2['default'].find().exec().then(respondWithResult(res))['catch'](handleError(res));
  }
}

// Gets a single report from the DB

function show(req, res) {
  return _reportsModel2['default'].findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res))['catch'](handleError(res));
}

;
//# sourceMappingURL=reports.controller.js.map
