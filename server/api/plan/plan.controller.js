/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/plans              ->  index
 * POST    /api/plans              ->  create
 * GET     /api/plans/:id          ->  show
 * PUT     /api/plans/:id          ->  update
 * DELETE  /api/plans/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Auth = require('../../auth/auth.service');
var Plan = require('./plan.model');
var Template = require('../template/template.model');


//db.templates.find().sort({updated_at: -1}).limit(1)
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

// Gets a list of Plans (for the current user)
export function index(req, res) {
    Plan.findAsync({author: req.user._id})
    .then(responseWithResult(res))
    .catch(handleError(res));  
}

// Gets a single Plan from the DB
export function show(req, res) {
  Plan.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Plan in the DB
export function create(req, res) {
  Plan.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Plan in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Plan.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Plan from the DB
export function destroy(req, res) {
  Plan.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
