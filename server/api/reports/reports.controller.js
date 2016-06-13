/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/addendums              ->  index
 * POST    /api/addendums              ->  create
 * GET     /api/addendums/:id          ->  show
 * PUT     /api/addendums/:id          ->  update
 * DELETE  /api/addendums/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Reports from './reports.model';

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

// Gets a list of reports
export function index(req, res) {
  // if there is a query, handle it!
  if (req.query) {
    return Reports.find(req.query).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
  else {
    return Reports.find().exec()
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}

// Gets a single report from the DB
export function show(req, res) {
  return Reports.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
};
