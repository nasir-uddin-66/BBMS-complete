
const BloodReqestDonation=require("../models/allRequst.model");
const Donor2=require("../models/allUser.model");

// Register new patient
exports.dregister = async (req, res) => {
  const { name, email, password } = req.body;  // Get data from request body
  try {
    // Check if user already exists
    const exists = await Donor2.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    userType="Donor";

    // Create new patient (User)
    const user = new Donor2({ name, email, userType, password });

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
exports.dlogin = async (req, res) => {
  const { email, password } = req.body;  // Get email and password from request body
  try {
    // Find user by email
    const user = await Donor2.findOne({ email });

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

// donor.controller.js

exports.changeDonorPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and new password are required." });
  }

  try {
    const donor = await Donor2.findOne({ email });

    if (!donor) {
      return res.status(404).json({ message: "Donor not found." });
    }

    donor.password = password; // Plain text — NOT recommended for production

    await donor.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Failed to update password." });
  }
};

// donor.controller.js

exports.dprofile = async (req, res) => {
  const { id } = req.params;

  try {
    const donor = await Donor2.findById(id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.json({ user: donor }); // Keeping the key as "user" for consistency
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update donor profile by ID
exports.updatedProfile = async (req, res) => {
  const { id } = req.params; // Donor ID from URL
  const { name, age, blood_group, address, phone } = req.body; // Data to update

  try {
    const updatedDonor = await Donor2.findByIdAndUpdate(
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

    if (!updatedDonor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: updatedDonor,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Create donor blood request
exports.createDonorBloodRequest = async (req, res) => {
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
     userType="donor";
     blood="request";
    const newRequest = new BloodReqestDonation({
      firstName,
      lastName,
      age,
      gender,
      email, // email from URL param
      blood_group,
      reason,
      quantity,
      address,
      phone,
      userType,
      blood,
      description
       // optional: mark the request type if you want to differentiate donors vs patients
    });

    await newRequest.save();

    return res.status(201).json({ message: "Donor blood request created successfully", request: newRequest });
  } catch (error) {
    console.error("Error creating donor blood request:", error);
    return res.status(500).json({ message: "Server error while creating donor blood request." });
  }
};

// Get donor blood request history
exports.getDonorBloodRequestHistory = async (req, res) => {
  try {
    const { email } = req.params;
    const requests = await BloodReqestDonation.find({ email, blood: 'request'  }).sort({ date: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching donor requests:", error);
    res.status(500).json({ message: "Failed to fetch donor requests" });
  }
};



exports.donateBlood = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      blood_group,
      disease,
      quantity,
      address,
      phone,
      donatedBefore,
      lastDonationDate,
      appointmentDate,
      appointmentTime
    } = req.body;

    const email = req.params.email; // Get email from URL
    userType="donor";
    blood="donate";

    const newDonation = new BloodReqestDonation({
      firstName,
      lastName,
      age,
      gender,
      email,
      blood_group,
      disease,
      quantity,
      address,
      phone,
      userType,
      blood,
      donatedBefore,
      lastDonationDate,
      appointmentDate,
      appointmentTime
    });

    await newDonation.save();

    res.status(201).json({ message: "Donation record submitted successfully!" });
  } catch (error) {
    console.error("Error saving donation:", error);
    res.status(500).json({ error: "Server error" });
  }
};



exports.getDonorBloodDonateHistory = async (req, res) => {
  try {
    const { email } = req.params;
    const requests = await BloodReqestDonation.find({
      email,
      blood: 'donate'   // Filter condition added here
    }).sort({ date: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching donor requests:", error);
    res.status(500).json({ message: "Failed to fetch donor requests" });
  }
};

exports.donorDashboard = async (req, res) => {
  try {
    const { email } = req.params;

    // Assuming you have a model named BloodDonation
    const donations = await BloodReqestDonation.find({ email }).sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donation history:", error);
    res.status(500).json({ message: "Failed to fetch donation history" });
  }
};
