// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const donorRoutes = require("./routes/donor.routes");

const userRoutes = require("./routes/user.routes");
const patientRoutes=require('./routes/patient.route');
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Middleware

app.use(express.json());

// write simple home route to test
app.get("/", (req, res) => {
  res.send("Welcome to the Blood Donation API");
});

// Routes
app.use("/api/donor", donorRoutes);
app.use("/api/admin", userRoutes);
app.use("/api/patient",patientRoutes);



// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running successfully http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
