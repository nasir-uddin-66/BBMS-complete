

const mongoose = require("mongoose");

const allRequestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  email: { type: String, required: true },
  blood_group: { type: String, required: true },
  disease: { type: String ,defulat:""},
  reason: { type: String, default:""},
  quantity: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  donatedBefore: { type: String,  default:"No" },
  lastDonationDate: { type: Date },
  appointmentDate: { type: String, default:""},
  appointmentTime: { type: String, default:""},
  userType:{  type:String, default:""},
  blood:{type:String, default:""},
  description: { type: String },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("allrequest", allRequestSchema);




