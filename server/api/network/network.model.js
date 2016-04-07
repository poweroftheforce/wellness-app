'use strict';

import mongoose from 'mongoose';

var NetworkSchema = new mongoose.Schema({
  name: String,
  url: String
});

export default mongoose.model('Network', NetworkSchema);
