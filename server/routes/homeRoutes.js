const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");


router.get("/tournaments", homeController.getTournaments);
router.post("/teamreq", homeController.addNewTeamRequest);
router.post("/viewteams", homeController.getTeams);
router.post("/jointeam", homeController.joinTeam);
router.post("/leaveteam", homeController.leaveTeam);
router.post("/register", homeController.register);
router.post("/unregister", homeController.unregister);
router.post("/getReg", homeController.isRegistered);
router.post("/isInTeam", homeController.isInTeam);


module.exports = router;
