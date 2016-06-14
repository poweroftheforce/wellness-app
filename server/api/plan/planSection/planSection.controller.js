/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/plans/:plan_id/sections       ->  index (unecessary)
 * POST    /api/plans/:plan_id/sections       ->  create
 * GET     /api/plans/:plan_id/sections/:id   ->  show (unnecessary)
 * PUT     /api/plans/:plan_id/sections/:id   ->  update
 * DELETE  /api/plans/:plan_id/sections/:id   ->  destroy
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
exports.addFocusItem = addFocusItem;
exports.removeFocusItem = removeFocusItem;
exports.addAddendum = addAddendum;
exports.removeAddendum = removeAddendum;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Plan = require('../plan.model');
var PlanSection = require('./planSection.model');

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

function addItem(updatedFocusItem) {
  return function (entity) {
    // entity.focusItems = updatedFocusItems;
    console.log(updatedFocusItem._id);
    // return entity.saveAsync();
    entity.focusItems.push(updatedFocusItem);
    return entity.saveAsync().then(function (data) {
      return Plan.findOne({ _id: entity._plan_id }).populate({
        path: 'sections',
        model: 'PlanSection',
        populate: [{ path: 'focusItems', model: 'FocusItem' }, { path: 'addendums', model: 'Addendum' }]
      });
    });
  };
}

function addAddendumToSection(updatedAddendum) {
  return function (entity) {
    entity.addendums.push(updatedAddendum);
    return entity.saveAsync().then(function (data) {
      return Plan.findOne({ _id: entity._plan_id }).populate({
        path: 'sections',
        model: 'PlanSection',
        populate: [{ path: 'focusItems', model: 'FocusItem' }, { path: 'addendums', model: 'Addendum' }]
      });
    });
  };
}

function removeItem(body, params) {
  return function (entity) {
    console.log(params.focusItem_id);
    var index = entity.focusItems.indexOf(params.focusItem_id);

    entity.focusItems.splice(index, 1);

    return entity.saveAsync().then(function (data) {
      return Plan.findOne({ _id: entity._plan_id }).populate({
        path: 'sections',
        model: 'PlanSection',
        populate: [{ path: 'focusItems', model: 'FocusItem' }, { path: 'addendums', model: 'Addendum' }]
      });
    });
  };
}

function removeAddendumFromSection(body, params) {
  return function (entity) {
    var index = entity.addendums.indexOf(params.addendum_id);
    entity.addendums.splice(index, 1);
    return entity.saveAsync().then(function (data) {
      return Plan.findOne({ _id: entity._plan_id }).populate({
        path: 'sections',
        model: 'PlanSection',
        populate: [{ path: 'focusItems', model: 'FocusItem' }, { path: 'addendums', model: 'Addendum' }]
      });
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

// Gets a list of Plan Sections For Plan

function index(req, res) {
  PlanSection.findAsync({ _plan_id: req.params.plan_id }).then(responseWithResult(res))['catch'](handleError(res));
}

// Gets a single Plan Section from the DB

function show(req, res) {
  PlanSection.findOne({ _plan_id: req.params.plan_id, _id: req.params.id }).then(handleEntityNotFound(res)).then(responseWithResult(res))['catch'](handleError(res));
}

// Creates a new Plan Section in the DB

function create(req, res) {
  PlanSection.createAsync(req.body).then(responseWithResult(res, 201))['catch'](handleError(res));
}

// Updates an existing Plan Section in the DB

function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  PlanSection.findByIdAsync({ _plan_id: req.params.plan_id, _id: req.params.id }).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(responseWithResult(res))['catch'](handleError(res));
}

function addFocusItem(req, res) {
  PlanSection.findByIdAsync({ _plan_id: req.params.plan_id, _id: req.params.id }).then(handleEntityNotFound(res)).then(addItem(req.body)).then(responseWithResult(res))['catch'](handleError(res));
}

function removeFocusItem(req, res) {
  PlanSection.findByIdAsync({ _plan_id: req.params.plan_id, _id: req.params.id }).then(removeItem(req.body, req.params)).then(responseWithResult(res))['catch'](handleError(res));
}

function addAddendum(req, res) {
  var planid = req.params.plan_id;
  PlanSection.findByIdAsync({ _plan_id: planid, _id: req.params.id }).then(handleEntityNotFound(res)).then(addAddendumToSection(req.body)).then(responseWithResult(res))['catch'](handleError(res));
}

function removeAddendum(req, res) {
  PlanSection.findByIdAsync({ _plan_id: req.params.plan_id, _id: req.params.id }).then(removeAddendumFromSection(req.body, req.params)).then(responseWithResult(res))['catch'](handleError(res));
}

// Deletes a Plan Section from the DB

function destroy(req, res) {
  PlanSection.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(removeEntity(res))['catch'](handleError(res));
}
//# sourceMappingURL=planSection.controller.js.map
