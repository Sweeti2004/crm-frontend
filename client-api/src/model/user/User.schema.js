const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  company: {
    type: String,
    maxlength: 50,
    required: true,
  },
  address: {
    type: String,
    maxlength: 100,
  },
  phone: {
    type: String,
    maxlength: 15,
  },
  email: {
    type: String,
    maxlength: 100,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true,
  },
  // Role-based access control
  role: {
    type: String,
    enum: ['client', 'support', 'admin'],
    default: 'client',
    required: true,
  },
  // Support staff department
  department: {
    type: String,
    maxlength: 50,
    default: null,
  },
  // Account status
  isActive: {
    type: Boolean,
    default: true,
  },
  refreshJWT: {
    token: {
      type: String,
      maxlength: 500,
      default: "",
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  lastLogin: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

module.exports = {
  UserSchema: mongoose.model("User", UserSchema),
};