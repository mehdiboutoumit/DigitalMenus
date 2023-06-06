const express = require("express");
const router = express.Router();
const superAdminController = require("../controllers/superAdminController");

router //
  .route("/login")
  .post(superAdminController.login);

router //
  .route("/register")
  .post(superAdminController.register);
router //
  .route("/refreshToken")
  .get(superAdminController.refreshToken);

router //
  .route("/logout")
  .get(superAdminController.logout);

module.exports = router;
