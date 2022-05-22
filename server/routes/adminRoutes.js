const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/getProfile/:adminID", adminController.getProfile);
router.put("/updateProfile", adminController.updateProfile);
router.post("/confirmPasswords", adminController.confirmPasswords);
module.exports = router;
