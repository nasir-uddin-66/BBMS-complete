// models/bloodStock.js
const mongoose = require("mongoose");

const bloodStockSchema = new mongoose.Schema({
  blood_group: { type: String, required: true, unique: true }, // Example: "A+", "O-", etc.
  quantity: { type: Number, required: true, default: 0 }, // in ml
});

module.exports = mongoose.model("BloodStock", bloodStockSchema);
