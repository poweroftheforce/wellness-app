/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pharmacies              ->  index
 * POST    /api/pharmacies              ->  create
 * GET     /api/pharmacies/:id          ->  show
 * PUT     /api/pharmacies/:id          ->  update
 * DELETE  /api/pharmacies/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Pharmacy from './pharmacy.model';

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

// Gets a list of Pharmacies
export function index(req, res) {
  // if there is a query, handle it!
  if (req.query) {
    return Pharmacy.find(req.query).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
  else {
    return Pharmacy.find().exec()
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}

// Gets a single Pharmacy from the DB
export function show(req, res) {
  return Pharmacy.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Pharmacy in the DB
export function create(req, res) {
  return Pharmacy.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Pharmacy in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Pharmacy.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Pharmacy from the DB
export function destroy(req, res) {
  return Pharmacy.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
