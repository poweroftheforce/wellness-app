/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users/me/stores              ->  index
 * POST    /api/users/me/stores              ->  create
 * GET     /api/users/me/stores/:id          ->  show
 * PUT     /api/users/me/stores/:id          ->  update
 * DELETE  /api/users/me/stores/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Store from './store.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Stores
export function index(req, res) {
  // if there is a query, handle it!
  if (req.query) {
    return Store.find(req.query).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
  else {
    return Store.find().exec()
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}

// Gets a single Store from the DB
export function show(req, res) {
  return Store.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Store in the DB
export function create(req, res) {
  return Store.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Store in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Store.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Store from the DB
export function destroy(req, res) {
  return Store.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
