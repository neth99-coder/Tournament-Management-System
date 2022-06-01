const playerModel = require("../models/playerModel");
const getProfile = async (req, res) => {
  if (
    req.params.playerID.toString() !== req.tokenUserID.toString() ||
    req.tokenUserType.toString() !== "0"
  ) {
    res.json({
      sucess: false,
      err: "User don't have access",
    });
    return false;
  }
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
  if (
    req.params.playerID.toString() !== req.tokenUserID.toString() ||
    req.tokenUserType.toString() !== "0"
  ) {
    res.json({
      sucess: false,
      err: "User don't have access",
    });
    return;
  }
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
  console.log(req.body);
  if (
    req.body.ID.toString() !== req.tokenUserID.toString() ||
    req.tokenUserType.toString() !== "0"
  ) {
    res.json({
      sucess: false,
      err: "User don't have access",
    });
    return;
  }
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
  if (
    req.body.ID.toString() !== req.tokenUserID.toString() ||
    req.tokenUserType.toString() !== "0"
  ) {
    res.json({
      sucess: false,
      err: "User don't have access",
    });
    return;
  }
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
