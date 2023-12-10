const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
  versionKey: false,
};

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    minLength: 3,
    maxLength: 10,
    required: true,
  },
  Email: {
    type: String,
    minLength: 1,
    maxLength: 30,
  },
  is_Agent: {
    type: Boolean,
    required: true,
    default: false,
  },
  is_Manager: {
    type: Boolean,
    required: true,
    default: false,
  },
  Phone_Number: {
    type: String,
  },
  Rate: {
    type: Number,
    required: false,
    default: 0,
  },
  role: {
    type: String,
    required: true,
    default: 'user', // Set default value to 'user'
    }
}, schemaOptions);

// Use UserSchema as the model for the "Users" collection
module.exports = mongoose.model('Users', UserSchema);