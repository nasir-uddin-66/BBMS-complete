

const express=require("express");
const { dregister, dlogin, changeDonorPassword, dprofile, updatedProfile, createDonorBloodRequest, getDonorBloodRequestHistory, donateBlood, getDonorBloodDonateHistory } = require("../controllers/donor.controller");
const router=express.Router();

router.post("/signup",dregister);
router.post("/login",dlogin);
router.put("/changePassword/:email",changeDonorPassword);
router.get("/profile/:id",dprofile);
router.put("/updateprofile/:id", updatedProfile);
router.post("/bloodRequest/:email",createDonorBloodRequest);
router.get("/requestHistory/:email",getDonorBloodRequestHistory);
router.post("/bloodDonate/:email",donateBlood);
router.get("/donateHistory/:email",getDonorBloodDonateHistory);
module.exports=router;
