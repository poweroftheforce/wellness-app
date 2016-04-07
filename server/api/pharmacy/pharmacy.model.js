'use strict';

import mongoose from 'mongoose';

var PharmacySchema = new mongoose.Schema({
  name: String,
  phone: String,
  fax: String,
  email: String,
  contact: String
});

export default mongoose.model('Pharmacy', PharmacySchema);
