/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/templates              ->  index
 * POST    /api/templates              ->  create
 * GET     /api/templates/:id          ->  show
 * PUT     /api/templates/:id          ->  update
 * DELETE  /api/templates/:id          ->  destroy
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
exports.latest = latest;
exports.updateSection = updateSection;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Template = require('./template.model');
var TemplateSection = require('./templateSection/templateSection.model');

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

// Gets a list of Templates

function index(req, res) {
  Template.findAsync()
  // .populate('sections')
  .then(responseWithResult(res))['catch'](handleError(res));
}

// Gets a single Template from the DB

function show(req, res) {

  Template.findOne({ _id: req.params.id }).populate('sections').execAsync().then(handleEntityNotFound(res)).then(responseWithResult(res))['catch'](handleError(res));

  // Template.findByIdAsync(req.params.id)
  //   .then(handleEntityNotFound(res))
  //   .then(responseWithResult(res))
  //   .catch(handleError(res));
}

// Creates a new Template in the DB

function create(req, res) {
  Template.createAsync(req.body).then(responseWithResult(res, 201))['catch'](handleError(res));
}

// Updates an existing Template in the DB

function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Template.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(responseWithResult(res))['catch'](handleError(res));
}

// Deletes a Template from the DB

function destroy(req, res) {
  Template.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(removeEntity(res))['catch'](handleError(res));
}

// Returns the last updated Template - this is so wrong!

function latest(req, res) {
  Template.find().sort({ version: -1 }).limit(1).populate('sections').execAsync().then(handleEntityNotFound(res)).then(responseWithResult(res))['catch'](handleError(res));
}

// Update Template Section

function updateSection(req, res, next) {
  var templateId = req.templateId;
  var sectionId = req.sectionId;

  Template.findByIdAsync(templateId).then(function (template) {
    return template.saveAsync().then(function () {
      res.status(204).end();
    })['catch'](handleError(res));
  });
}
//# sourceMappingURL=template.controller.js.map
