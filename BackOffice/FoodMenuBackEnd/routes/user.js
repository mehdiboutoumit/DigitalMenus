const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");
router
  .route("/") //
  .post(
    verifyJWT,
    // verifyPermission(["admin"]),
    userController.createUser
  )
  .get(
    verifyJWT,
    // verifyPermission(["admin"]),
    userController.getAllUsers
  );

router
  .route("/login") //
  .post(userController.login);

router //
  .route("/refreshToken")
  .get(userController.refreshToken);

router //
  .route("/logout")
  .get(userController.logout);

router //
  .route("/restaurant/:idRestaurant")
  .get(userController.getAllUsersOfRestaurant);

router
  .route("/:id") //
  .get(
    verifyJWT,
    // verifyPermission(["admin"]),
    userController.getUserById
  )
  .put(
    verifyJWT,
    // verifyPermission(["admin"]),
    userController.updateUser
  );
//   .delete(userController.deleteUser);

module.exports = router;
