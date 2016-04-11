'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function respondWithResult(res, statusCode) {
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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end();
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync();
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  User.findAsync({}, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.saveAsync()
    .spread(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Update a user
 */
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  if (req.body.__v) {
    delete req.body.__v;
  }
  User.findByIdAsync(req.user._id)
    .then(user => {
      var updated = _.merge(user, req.body);
      updated.pharmacies = req.body.pharmacies;
      updated.stores = req.body.stores;
      updated.networks = req.body.networks;
      return updated.saveAsync()
        .then(() => {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
}


export function addPharmacy(req, res, next) {
  console.log('called api controller');
  var userId = req.user._id;

  User.findByIdAsync(userId)
    .then(user => {
      if (user.pharmacies) {
        user.pharmacies.push(req.body._id);
      }
      else {
        user.pharmacies = [];
        user.pharmacies.push(req.body._id);
      }
      return user.saveAsync()
        .then(() => {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
}

export function addStore(req, res, next) {
  var userId = req.user._id;
  User.findByIdAsync(userId)
    .then(user => {
      if (user.stores) {
        user.stores.push(req.body._id);
      }
      else {
        user.stores = [];
        user.stores.push(req.body._id);
      }
      return user.saveAsync()
        .then(() => {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
}

export function addNetwork(req, res, next) {
  var userId = req.user._id;
  User.findByIdAsync(userId)
    .then(user => {
      if (user.networks) {
        user.networks.push(req.body._id);
      }
      else {
        user.networks = [];
        user.networks.push(req.body._id);
      }
      return user.saveAsync()
        .then(() => {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  User.findOne({ _id: userId }, '-salt -password')
    .populate([
      {path: 'pharmacies', model: 'Pharmacy'},
      {path: 'networks', model: 'Network'},
      {path: 'stores', model: 'Store'},
      ])
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
