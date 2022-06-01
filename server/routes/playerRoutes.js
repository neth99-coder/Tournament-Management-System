const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.get("/getProfile/:playerID",playerController.getProfile);
router.get("/tournaments/:playerID",playerController.getRegisteredTournaments);
router.put("/updateProfile",playerController.updateProfile);
router.post("/confirmPasswords",playerController.confirmPasswords);
module.exports=router;           