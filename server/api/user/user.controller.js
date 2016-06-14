'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.index = index;
exports.create = create;
exports.show = show;
exports.update = update;
exports.addPharmacy = addPharmacy;
exports.addStore = addStore;
exports.addNetwork = addNetwork;
exports.destroy = destroy;
exports.changePassword = changePassword;
exports.me = me;
exports.authCallback = authCallback;

var _userModel = require('./user.model');

var _userModel2 = _interopRequireDefault(_userModel);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _configEnvironment = require('../../config/environment');

var _configEnvironment2 = _interopRequireDefault(_configEnvironment);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    res.status(statusCode).json(err);
  };
}

function respondWithResult(res, statusCode) {
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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function () {
    res.status(statusCode).end();
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2['default'].merge(entity, updates);
    return updated.saveAsync();
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */

function index(req, res) {
  _userModel2['default'].findAsync({}, '-salt -password').then(function (users) {
    res.status(200).json(users);
  })['catch'](handleError(res));
}

/**
 * Creates a new user
 */

function create(req, res, next) {
  var newUser = new _userModel2['default'](req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.saveAsync().spread(function (user) {
    var token = _jsonwebtoken2['default'].sign({ _id: user._id }, _configEnvironment2['default'].secrets.session, {
      expiresIn: 60 * 60 * 5
    });
    res.json({ token: token });
  })['catch'](validationError(res));
}

/**
 * Get a single user
 */

function show(req, res, next) {
  var userId = req.params.id;

  _userModel2['default'].findByIdAsync(userId).then(function (user) {
    if (!user) {
      return res.status(404).end();
    }
    res.json(user.profile);
  })['catch'](function (err) {
    return next(err);
  });
}

/**
 * Update a user
 */

function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  if (req.body.__v) {
    delete req.body.__v;
  }
  _userModel2['default'].findByIdAsync(req.user._id).then(function (user) {
    var updated = _lodash2['default'].merge(user, req.body);
    updated.pharmacies = req.body.pharmacies;
    updated.stores = req.body.stores;
    updated.networks = req.body.networks;
    return updated.saveAsync().then(function () {
      res.status(204).end();
    })['catch'](validationError(res));
  });
}

function addPharmacy(req, res, next) {
  console.log('called api controller');
  var userId = req.user._id;

  _userModel2['default'].findByIdAsync(userId).then(function (user) {
    if (user.pharmacies) {
      user.pharmacies.push(req.body._id);
    } else {
      user.pharmacies = [];
      user.pharmacies.push(req.body._id);
    }
    return user.saveAsync().then(function () {
      res.status(204).end();
    })['catch'](validationError(res));
  });
}

function addStore(req, res, next) {
  var userId = req.user._id;
  _userModel2['default'].findByIdAsync(userId).then(function (user) {
    if (user.stores) {
      user.stores.push(req.body._id);
    } else {
      user.stores = [];
      user.stores.push(req.body._id);
    }
    return user.saveAsync().then(function () {
      res.status(204).end();
    })['catch'](validationError(res));
  });
}

function addNetwork(req, res, next) {
  var userId = req.user._id;
  _userModel2['default'].findByIdAsync(userId).then(function (user) {
    if (user.networks) {
      user.networks.push(req.body._id);
    } else {
      user.networks = [];
      user.networks.push(req.body._id);
    }
    return user.saveAsync().then(function () {
      res.status(204).end();
    })['catch'](validationError(res));
  });
}

/**
 * Deletes a user
 * restriction: 'admin'
 */

function destroy(req, res) {
  _userModel2['default'].findByIdAndRemoveAsync(req.params.id).then(function () {
    res.status(204).end();
  })['catch'](handleError(res));
}

/**
 * Change a users password
 */

function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  _userModel2['default'].findByIdAsync(userId).then(function (user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      return user.saveAsync().then(function () {
        res.status(204).end();
      })['catch'](validationError(res));
    } else {
      return res.status(403).end();
    }
  });
}

/**
 * Get my info
 */

function me(req, res, next) {
  var userId = req.user._id;

  _userModel2['default'].findOne({ _id: userId }, '-salt -password').populate([{ path: 'pharmacies', model: 'Pharmacy' }, { path: 'networks', model: 'Network' }, { path: 'stores', model: 'Store' }]).then(function (user) {
    // don't ever give out the password or salt
    if (!user) {
      return res.status(401).end();
    }
    res.json(user);
  })['catch'](function (err) {
    return next(err);
  });
}

/**
 * Authentication callback
 */

function authCallback(req, res, next) {
  res.redirect('/');
}
//# sourceMappingURL=user.controller.js.map
