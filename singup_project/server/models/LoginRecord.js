// models/LoginRecord.js
const mongoose = require('mongoose');

const loginRecordSchema = new mongoose.Schema({
 
  email: { type: String, required: true },
  password: { type: String, required: true },

});

const LoginRecord = mongoose.model('LoginRecord', loginRecordSchema);
module.exports = LoginRecord;
