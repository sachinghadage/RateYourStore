const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, minlength: 20, maxlength: 60 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, maxlength: 400 },
  role: { type: String, enum: ['admin', 'user', 'owner'], default: 'user' },
});

module.exports = mongoose.model('User', UserSchema);
