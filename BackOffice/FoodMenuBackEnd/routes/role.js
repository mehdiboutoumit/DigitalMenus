const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");

router
  .route("/") //
  .get(
    verifyJWT,
    // verifyPermission(["admin"]),
    roleController.getAllRoles
  );

// router
//   .route("/:id") //
//   .get(roleController.getRoleById)
//   .put(roleController.updateRole)
//   .delete(roleController.deleteRole);

module.exports = router;
