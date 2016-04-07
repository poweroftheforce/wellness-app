'use strict';

import mongoose from 'mongoose';

var StoreSchema = new mongoose.Schema({
  name: String,
  url: String
});

export default mongoose.model('Store', StoreSchema);
