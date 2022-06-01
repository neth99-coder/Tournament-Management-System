const playerModel = require("../models/playerModel");
const getProfile = async (req, res) => {
  await playerModel
    .getProfile(req.params.playerID)
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      });
    });
};

const getRegisteredTournaments = async (req, res) => {
  await playerModel
    .getRegisteredTournaments(req.params.playerID)
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      });
    });
};


const updateProfile = async (req, res) => {
  await playerModel
    .updateProfile(req.body)
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      });
    });
};

const confirmPasswords = async (req, res) => {
  await playerModel
    .confirmPasswords(req.body)
    .then((result) => {
      res.json({ success: true, result });
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      });
    });
};
module.exports = {
  getProfile,
  getRegisteredTournaments,
  updateProfile,
  confirmPasswords,
};
