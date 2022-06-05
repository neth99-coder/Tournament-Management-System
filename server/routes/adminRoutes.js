const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/getProfile/:adminID", adminController.getProfile);
router.get("/requests",adminController.getRequests);
router.put("/updateProfile", adminController.updateProfile);
router.post("/confirmPasswords", adminController.confirmPasswords);
router.post("/submit-org-accept-form",adminController.acceptRequest);
router.post("/submit-org-reject-form",adminController.rejectRequest);
module.exports = router;
