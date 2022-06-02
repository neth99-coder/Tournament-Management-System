const organizerModel = require("../models/organizerModel");
const getProfile = async (req, res) => {
  if (
    req.params.organizerID.toString() !== req.tokenUserID.toString() ||
    req.tokenUserType.toString() !== "1"
  ) {
    res.json({
      sucess: false,
      err: "User don't have access",
    });
    return false;
  }
  await organizerModel
    .getProfile(req.params.organizerID)
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

const getTournaments = async (req, res) => {
  if (
    req.params.organizerID.toString() !== req.tokenUserID.toString() ||
    req.tokenUserType.toString() !== "1"
  ) {
    res.json({
      sucess: false,
      err: "User don't have access",
    });
    return false;
  }
  await organizerModel
    .getTournaments(req.params.organizerID)
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

const getGameTypes = async (req, res) => {
  if (req.tokenUserType.toString() !== "1") {
    res.json({
      sucess: false,
      err: "User don't have access",
    });
    return false;
  }
  await organizerModel
    .getGameTypes()
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
  if (
    req.body.ID.toString() !== req.tokenUserID.toString() ||
    req.tokenUserType.toString() !== "1"
  ) {
    res.json({
      sucess: false,
      err: "User don't have access",
    });
    return;
  }
  await organizerModel
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
    req.tokenUserType.toString() !== "1"
  ) {
    res.json({
      sucess: false,
      err: "User don't have access",
    });
    return;
  }
  await organizerModel
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

const createNewTournament = async (req, res) => {
  if (
    req.body.organizerID.toString() !== req.tokenUserID.toString() ||
    req.tokenUserType.toString() !== "1"
  ) {
    res.json({
      sucess: false,
      err: "User don't have access",
    });
    return;
  }
  await organizerModel
    .createNewTournament(req.body)
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

const getTeamRequest = async (req, res) => {
  await organizerModel
    .getTeamRequest(req.params.organizerID)
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

const acceptTeamRequest = async (req, res) => {
  await organizerModel
    .acceptTeamRequest(req.body)
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

const rejectTeamRequest = async (req, res) => {
  await organizerModel
    .rejectTeamRequest(req.body)
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
  updateProfile,
  confirmPasswords,
  getTournaments,
  getGameTypes,
  createNewTournament,
  getTeamRequest,
  acceptTeamRequest,
  rejectTeamRequest,
};
