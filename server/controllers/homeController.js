const homeModel = require("../models/homeModel");

const getTournaments = async (req, res) => {
  await homeModel
    .getTournaments()
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

const addNewTeamRequest = async (req, res) => {
  await homeModel.addNewTeamRequest(req.body).then((result) => {
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
}

const getTeams = async (req, res) => {
 
  await homeModel
    .getTeams(req.body)
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

const joinTeam = async (req, res) => {
 
  await homeModel
    .joinTeam(req.body)
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

const leaveTeam = async (req, res) => {
 
  await homeModel
    .leaveTeam(req.body)
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

module.exports = {
  getTournaments,addNewTeamRequest,getTeams,joinTeam,leaveTeam
};
