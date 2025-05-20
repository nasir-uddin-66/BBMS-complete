



const User2=require("../models/allUser.model");
const BloodReqestDonation=require("../models/allRequst.model");


// Register new patient
exports.pregister = async (req, res) => {
  const { name, email, password } = req.body;  // Get data from request body
  try {
    // Check if user already exists
    const exists = await User2.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already exists' });
    }
      
    userType="patient";
    // Create new patient (User)
    const user = new User2({ name, email, userType, password });

    // Save patient to the database
    await user.save();

    // Respond with success
    res.status(201).json({ message: 'Patient registered successfully', user });
  } catch (err) {
    // Catch any error and respond with a failure message
    res.status(500).json({ error: err.message });
  }
};

// Login patient
exports.plogin = async (req, res) => {
  const { email, password } = req.body;  // Get email and password from request body
  try {
    // Find user by email
    const user = await User2.findOne({ email });

    // Check if user exists and if the password is correct
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Respond with success and user details (you may want to exclude password or use a token)
    res.json({ message: 'Login successful', user });
  } catch (err) {
    // Catch any error and respond with a failure message
    res.status(500).json({ error: err.message });
  }
};

//make controller for patient profile

// Get patient profile by ID
exports.pprofile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User2.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update patient profile by ID
exports.updatepProfile = async (req, res) => {
  const { id } = req.params;  // Patient ID from URL
  const { name, age, blood_group, address, phone } = req.body;  // Data to update

  try {
    // Find user by ID and update the provided fields
    const updatedUser = await User2.findByIdAndUpdate(
      id,
      {
        name,
        age,
        blood_group,
        address,
        phone,
      },
      { new: true } // Return the updated document
    );

    // If user not found
    if (!updatedUser) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Respond with updated user
    res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//blood request
exports.createBloodRequest = async (req, res) => {
  const { email } = req.params;
  const {
    firstName,
    lastName,
    age,
    gender,
    blood_group,
    reason,
    quantity,
    address,
    phone,
    description,
  } = req.body;

  try {
    userType="patient";
    blood="request";
    const newRequest = new BloodReqestDonation({
      firstName,
      lastName,
      age,
      gender,
      email, // email comes from the URL
      blood_group,
      reason,
      quantity,
      address,
      phone,
      description,
      userType,
      blood
    });

    await newRequest.save();

    return res.status(201).json({ message: "Blood request created successfully", request: newRequest });
  } catch (error) {
    console.error("Error creating blood request:", error);
    return res.status(500).json({ message: "Server error while creating blood request." });
  }
};

exports.getBloodRequestHistory = async (req, res) => {
  try {
    const { email } = req.params;
    const requests = await BloodReqestDonation.find({ email }).sort({ date: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};


exports.patientDashboard = async (req, res) => {
  try {
    const { email } = req.params;
    const requests = await BloodReqestDonation.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};


exports.changePatientPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and new password are required." });
  }

  try {
    const patient = await User2.findOne({ email });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    patient.password = password; // Plain text — NOT recommended for production

    await patient.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Failed to update password." });
  }
};