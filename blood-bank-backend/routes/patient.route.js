


const express=require("express");
const { pregister, plogin, pprofile, updatepProfile, createBloodRequest, getBloodRequestHistory, patientDashboard, changePatientPassword } = require("../controllers/patient.controller");
const router=express.Router();



router.post("/signup",pregister);
router.post("/login",plogin);
router.get("/profile/:id",pprofile);
router.put("/updateprofile/:id", updatepProfile);
router.post("/bloodRequest/:email",createBloodRequest);
router.get("/requestHistory/:email",getBloodRequestHistory);
router.get("/dashboard/:email",patientDashboard);
router.put("/changePassword/:email",changePatientPassword);

module.exports=router;