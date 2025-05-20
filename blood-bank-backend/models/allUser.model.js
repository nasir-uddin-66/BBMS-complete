



// models/User.js

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,  // Ensures email is saved in lowercase
    },
    password: {
      type: String,
      required: true,
      
    },
     age: {
      type: Number,
      default: null,
    },
    blood_group: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    userType:{
      type:String,
      default:""
    }
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

// Export the User model
module.exports = mongoose.model('alluser', userSchema);
