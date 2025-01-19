// models/LoginRecord.js
const mongoose = require('mongoose');

const loginRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  loginTime: { type: Date, default: Date.now },
});

const LoginRecord = mongoose.model('LoginRecord', loginRecordSchema);
module.exports = LoginRecord;
