const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");


router.get("/tournaments", homeController.getTournaments);
router.post("/teamreq", homeController.addNewTeamRequest);
router.post("/viewteams", homeController.getTeams);
router.post("/jointeam", homeController.joinTeam);
router.post("/leaveteam", homeController.leaveTeam);


module.exports = router;
