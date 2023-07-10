const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router //
  .route("/login")
  .post(adminController.login);

router //
  .route("/register")
  .post(adminController.register);
router //
  .route("/refreshToken")
  .get(adminController.refreshToken);

router //
  .route("/logout")
  .get(adminController.logout);



module.exports = router;
