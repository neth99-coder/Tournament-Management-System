const organizerModel = require("../models/organizerModel");
const getProfile = async (req, res) => {
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

const addRequest = async (req, res) => {
  await organizerModel
    .addRequest(req.body)
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

const emailExist = async (req, res) => {
  await organizerModel
    .emailExist(req.params.email)
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
  addRequest,
  emailExist,
  getTeamRequest,
  acceptTeamRequest,
  rejectTeamRequest,
};
