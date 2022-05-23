const express = require("express");
const router = express.Router();
const organizerController = require("../controllers/organizerController");

router.get("/getProfile/:organizerID", organizerController.getProfile);
router.put("/updateProfile", organizerController.updateProfile);
router.post("/confirmPasswords", organizerController.confirmPasswords);
module.exports = router;
