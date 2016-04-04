/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/plans/:plan_id/sections       ->  index (unecessary)
 * POST    /api/plans/:plan_id/sections       ->  create
 * GET     /api/plans/:plan_id/sections/:id   ->  show (unnecessary)
 * PUT     /api/plans/:plan_id/sections/:id   ->  update
 * DELETE  /api/plans/:plan_id/sections/:id   ->  destroy
 */

'use strict';

import _ from 'lodash';
var Plan = require('../plan.model');
var PlanSection = require('./planSection.model');

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

function addItem(updatedFocusItem) {
  return function(entity) {
    // entity.focusItems = updatedFocusItems;
    console.log(updatedFocusItem._id);
    // return entity.saveAsync();
    entity.focusItems.push(updatedFocusItem);
    return entity.saveAsync()
    .then((data) => {
      return Plan.findOne({_id: entity._plan_id})
      .populate({
        path: 'sections',
        model: 'PlanSection',
        populate: {
          path: 'focusItems',
          model: 'FocusItem'
        }
      })
    });
  }
}

function removeItem(body, params) {
  return function(entity) {
    console.log(params.focusItem_id);
    var index = entity.focusItems.indexOf(params.focusItem_id);

    entity.focusItems.splice(index, 1);

    return entity.saveAsync()
    .then((data) => {
      return Plan.findOne({_id: entity._plan_id})
      .populate({
        path: 'sections',
        model: 'PlanSection',
        populate: {
          path: 'focusItems',
          model: 'FocusItem'
        }
      })
    });
  }
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

// Gets a list of Plan Sections For Plan
export function index(req, res) {
  PlanSection.findAsync({_plan_id: req.params.plan_id})
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Plan Section from the DB
export function show(req, res) {
  PlanSection.findOne({_plan_id: req.params.plan_id, _id: req.params.id})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Plan Section in the DB
export function create(req, res) {
  PlanSection.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Plan Section in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  PlanSection.findByIdAsync({_plan_id: req.params.plan_id, _id: req.params.id})
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

export function addFocusItem(req, res) {
  PlanSection.findByIdAsync({_plan_id: req.params.plan_id, _id: req.params.id})
    .then(handleEntityNotFound(res))
    .then(addItem(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

export function removeFocusItem(req, res) {
  PlanSection.findByIdAsync({_plan_id: req.params.plan_id, _id: req.params.id})
    .then(removeItem(req.body, req.params))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Plan Section from the DB
export function destroy(req, res) {
  PlanSection.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
