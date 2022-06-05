const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = async (req, res, next) => {
  // Option 1
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1]; // Bearer Token
  // Option 2

  const token = req.header("x-auth-token");
  // console.log("===============");
  // const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  // console.log(user);

  // If token not found, send error message

  if (!token) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  // Authenticate token
  try {
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.tokenUserEmail = user.email;
    req.tokenUserType = user.type;
    req.tokenUserID = user.ID;

    next();
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
};

module.exports = authToken;
