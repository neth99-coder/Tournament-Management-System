const authModel = require("../models/authModel");
const loginUser = async (req, res) => {
  await authModel
    .loginUser(req.body)
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

const signupUser = async (req, res) => {
  await authModel
    .signupUser(req.body)
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
  loginUser,
  signupUser,
};
