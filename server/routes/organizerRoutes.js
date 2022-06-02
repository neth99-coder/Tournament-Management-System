const express = require("express");
const router = express.Router();
const organizerController = require("../controllers/organizerController");

router.get("/getProfile/:organizerID", organizerController.getProfile);
router.get("/tournaments/:organizerID", organizerController.getTournaments);
router.get("/games-type", organizerController.getGameTypes);
router.put("/updateProfile", organizerController.updateProfile);
router.post("/confirmPasswords", organizerController.confirmPasswords);
router.post(
  "/submit-new-tournament-form",
  organizerController.createNewTournament
);
router.get("/teamRequests/:organizerID", organizerController.getTeamRequest);
router.post("/accept-teamrequest", organizerController.acceptTeamRequest);
router.post("/reject-teamrequest", organizerController.rejectTeamRequest);

module.exports = router;
