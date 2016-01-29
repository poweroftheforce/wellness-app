'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ReferenceSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Reference', ReferenceSchema);
