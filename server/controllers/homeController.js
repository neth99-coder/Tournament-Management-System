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
  await homeModel
    .addNewTeamRequest(req.body)
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

const register = async (req, res) => {
  await homeModel
    .register(req.body)
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

const unregister = async (req, res) => {
  await homeModel
    .unregister(req.body)
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

const isRegistered = async (req, res) => {
  await homeModel
    .isRegistered(req.body)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          success: true,
          registered: true,
        });
      } else {
        res.json({
          success: true,
          registered: false,
        });
      }
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      });
    });
};

const isInTeam = async (req, res) => {
  await homeModel
    .isInTeam(req.body)
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

const addOrganizerRequest = async (req, res) => {
  await homeModel
    .addOrganizerRequest(req.body)
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
  await homeModel
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

module.exports = {
  getTournaments,
  addNewTeamRequest,
  getTeams,
  joinTeam,
  leaveTeam,
  register,
  unregister,
  isRegistered,
  isInTeam,
  addOrganizerRequest,
  emailExist,
};
