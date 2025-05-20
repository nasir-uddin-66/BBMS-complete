

const User = require('../models/user.model');
const BloodRequestDonation = require('../models/allRequst.model');
const User2=require("../models/allUser.model");
const BloodStock = require("../models/bloodstock");



// ✅ Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all donation history
exports.getAllDonationHistory = async (req, res) => {
  try {
    const history = await BloodRequestDonation.find({ blood: "donate" }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching donation history:", error);
    res.status(500).json({ message: "Failed to fetch donation history" });
  }
};

// ✅ Get all blood request history
exports.getAllBloodRequestsHistory = async (req, res) => {
  try {
    const history = await BloodRequestDonation.find({ blood: "request" }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching blood request history:", error);
    res.status(500).json({ message: "Failed to fetch blood request history" });
  }
};

// ✅ Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User2.find().select('-password'); // exclude password
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// ✅ Delete user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User2.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await BloodRequestDonation.find({ status: 'pending', blood: 'request' });
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
};
exports.updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // expect 'approved' or 'rejected'

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const updatedRequest = await BloodRequestDonation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json({ message: `Request ${status}`, request: updatedRequest });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Failed to update request status' });
  }
};

exports.getPendingDonations = async (req, res) => {
  try {
    const donations = await BloodRequestDonation.find({ status: 'pending', blood: 'donate' });
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donation requests:', error);
    res.status(500).json({ message: 'Failed to fetch donation requests' });
  }
};

// Update donation request status
exports.updateDonationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const updatedDonation = await BloodRequestDonation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation request not found' });
    }

    res.json({ message: `Donation request ${status}`, donation: updatedDonation });
  } catch (error) {
    console.error('Error updating donation status:', error);
    res.status(500).json({ message: 'Failed to update donation status' });
  }
};






exports.getBloodStock = async (req, res) => {
  try {
    // Step 1: Get initial stock from BloodStock collection
    const stock = await BloodStock.find({});
    const stockMap = {};

    stock.forEach(item => {
      stockMap[item.blood_group] = item.quantity;
    });

    // Step 2: Get all approved requests
    const approvedRequests = await BloodRequestDonation.find({ status: "approved" });

    // Step 3: Update the stock based on approved requests
    approvedRequests.forEach(req => {
      const { userType, blood, blood_group, quantity } = req;

      if (!stockMap[blood_group]) {
        stockMap[blood_group] = 0;
      }

      if (userType === "donor") {
        if (blood === "donate") {
          stockMap[blood_group] += quantity;
        } else if (blood === "request") {
          stockMap[blood_group] -= quantity;
        }
      } else if (userType === "patient") {
        stockMap[blood_group] -= quantity;
      }
    });

    // Step 4: Format the final result
    const updatedStock = Object.keys(stockMap).map(group => ({
      blood_group: group,
      quantity: stockMap[group],
    }));

    // Step 5: Return the result
    res.status(200).json(updatedStock);
  } catch (err) {
    console.error("Error fetching blood stock:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



