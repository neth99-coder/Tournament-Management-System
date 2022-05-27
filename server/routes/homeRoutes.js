const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");


router.get("/tournaments", homeController.getTournaments);
router.post("/teamreq", homeController.addNewTeamRequest);


module.exports = router;
