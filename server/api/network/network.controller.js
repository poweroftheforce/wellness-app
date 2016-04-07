/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users/me/networks              ->  index
 * POST    /api/users/me/networks              ->  create
 * GET     /api/users/me/networks/:id          ->  show
 * PUT     /api/users/me/networks/:id          ->  update
 * DELETE  /api/users/me/networks/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Network from './network.model';

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

// Gets a list of Networks
export function index(req, res) {
  // if there is a query, handle it!
  if (req.query) {
    return Network.find(req.query).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
  else {
    return Network.find().exec()
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}

// Gets a single Network from the DB
export function show(req, res) {
  return Network.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Network in the DB
export function create(req, res) {
  return Network.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Network in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Network.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Network from the DB
export function destroy(req, res) {
  return Network.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
