const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyJWT = function (req, res, next) {
  const authHeader = req.headers["authorization"];
 // if (!authHeader) return res.sendStatus(401); // no token
 // const token = authHeader.split(" ")[1];
 const token = "";
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // invalid token
    // if (err) {
    //   console.log(err.message);
    //   return res.sendStatus(403);
    // }
    req.user = user;
    next();
  });
};
module.exports = verifyJWT;
