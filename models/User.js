const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  passwordForUpdate: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  // FOR MESSAGE
  toAdminMessages: {
    type: Number,
    default: 0
  },
  toClientMessages: {
    type: Number,
    default: 0
  },
  toAdminUnread: {
    type: Number,
    default: 0
  },
  toClientUnread: {
    type: Number,
    default: 0
  },
  // FOR CUSTOMERS
  state: {
    type: String,
    default: 'InActive'
  },
  phone: {
    type: String
  },
  subscription: {
    type: String,
    default: 'Bronze Membership'
  },
  currentPeriodStart: {
    type: Number
  },
  currentPeriodEnd: {
    type: Number
  }
});

module.exports = mongoose.model('user', UserSchema);
