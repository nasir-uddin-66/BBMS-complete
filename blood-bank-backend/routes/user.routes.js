const express = require("express");
const router = express.Router();
const {

  login,
  getAllUsers,

  getAllDonationHistory,
  getAllBloodRequestsHistory,
  deleteUser,
  getPendingRequests,
  updateRequestStatus,
  getPendingDonations,
  updateDonationStatus,
  
  getBloodStock,
 
} = require("../controllers/user.controller");



router.post("/login", login);
router.get("/allDonateHistory",getAllDonationHistory);
router.get("/allRequestHistory",getAllBloodRequestsHistory);
router.get('/getAllUsers', getAllUsers);

router.delete('/deleteUser/:id',deleteUser);
router.get('/getPendingRequests', getPendingRequests);
router.put('/updateRequestStatus/:id',updateRequestStatus);
router.get("/getPendingDonations",getPendingDonations);
router.put("/updateDonationStatus/:id",updateDonationStatus);
router.get("/getblood",getBloodStock);





module.exports = router;

