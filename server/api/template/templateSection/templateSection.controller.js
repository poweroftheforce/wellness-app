/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/templates/:template_id/sections       ->  index (unecessary)
 * POST    /api/templates/:template_id/sections       ->  create
 * GET     /api/templates/:template_id/sections/:id   ->  show (unnecessary)
 * PUT     /api/templates/:template_id/sections/:id   ->  update
 * DELETE  /api/templates/:template_id/sections/:id   ->  destroy
 */

'use strict';

import _ from 'lodash';
var Template = require('../template.model');
var TemplateSection = require('./templateSection.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Template Sections (From One Template!)
export function index(req, res) {
  TemplateSection.findAsync({_template_id: req.params.template_id})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// // Gets a single Template Section from the DB
// export function show(req, res) {
//   TemplateSection.findByIdAsync(req.params.id)
//     .then(handleEntityNotFound(res))
//     .then(responseWithResult(res))
//     .catch(handleError(res));
// }

// Creates a new Template Section in the DB (In The Correct Section)
export function create(req, res) {
  req.body._template_id = req.params.template_id;
  TemplateSection.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Template Section in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  TemplateSection.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Template Section from the DB
export function destroy(req, res) {
  TemplateSection.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}