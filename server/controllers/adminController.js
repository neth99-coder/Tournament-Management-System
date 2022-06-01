const adminModel = require("../models/adminModel");

const getProfile = async (req, res) => {
 
  if (
    req.params.adminID.toString() !== req.tokenUserID.toString() ||
    req.tokenUserType.toString() !== "2"
  ) {
    res.json({
      sucess: false,
      err: "User don't have access",
    });
    return false;
  }
  await adminModel
    .getProfile(req.params.adminID)
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

const getRequests = async (req,res) =>{
  await adminModel
  .getRequests()
  .then((result)=>{
    res.json({
      success: true,
      result,
    });
  })
  .catch((err)=>{
    res.json({
      success: false,
      err,
    });
  });
};

const updateProfile = async (req, res) => {
   if (
     req.body.ID.toString() !== req.tokenUserID.toString() ||
     req.tokenUserType.toString() !== "2"
   ) {
     res.json({
       sucess: false,
       err: "User don't have access",
     });
     return;
   }
  await adminModel
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
    req.tokenUserType.toString() !== "2"
  ) {
    res.json({
      sucess: false,
      err: "User don't have access",
    });
    return;
  }
  await adminModel
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

const acceptRequest = async (req,res) =>{
  if (
    req.tokenUserType.toString() !== "2"
  ) {
    res.json({
      sucess: false,
      err: "User don't have access",
    });
    return;
  }
  await adminModel
  .acceptRequest(req.body)
  .then((result)=>{
    res.json({success:true, result});
  })
  .catch((err)=>{
    res.json({
      success:false,
      err,
    });
  });
};

const rejectRequest = async (req,res) =>{
   if (req.tokenUserType.toString() !== "2") {
     res.json({
       sucess: false,
       err: "User don't have access",
     });
     return;
   }
  await adminModel
  .rejectRequest(req.body)
  .then((result)=>{
    res.json({success:true, result});
  })
  .catch((err)=>{
    res.json({
      success:false,
      err,
    });
  });
};
module.exports = {
  getProfile,
  getRequests,
  updateProfile,
  confirmPasswords,
  acceptRequest,
  rejectRequest
};
