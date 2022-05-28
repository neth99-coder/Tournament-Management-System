const express = require("express");
const router = express.Router();
const organizerController = require("../controllers/organizerController");

router.get("/getProfile/:organizerID", organizerController.getProfile);
router.get("/tournaments/:organizerID",organizerController.getTournaments);
router.get("/games-type",organizerController.getGameTypes);
router.get("/email-exist/:email",organizerController.emailExist);
router.put("/updateProfile", organizerController.updateProfile);
router.post("/confirmPasswords", organizerController.confirmPasswords);
router.post("/submit-new-tournament-form",organizerController.createNewTournament);
router.post("/submit-new-organizer-form",organizerController.addRequest);

module.exports = router;
