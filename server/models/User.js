const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  publicKey: String,
});

module.exports = mongoose.model('User', userSchema);
