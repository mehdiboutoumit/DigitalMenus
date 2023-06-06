const { response } = require("express");
const whiteList = require("../config/whiteList");
const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (whiteList.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
    // res.header(
    //   "Access-Control-Allow-Methods",
    //   "GET, OPTIONS,POST,DELETE,UPDATE"
    // );
    // res.header("Access-Control-Allow-Headers", "Content-Type");
  }
  res.set("Access-Control-Allow-Credentials", true);
  return next();
};

module.exports = credentials;
