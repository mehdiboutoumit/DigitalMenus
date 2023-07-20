const express = require("express");
const router = express.Router();
const subController = require("../controllers/subController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");

  router.route("/").get(
    //verifyJWT,
    // verifyPermission(["admin"]),
    subController.getAllSubs
  );


router
  .route("/one/:id") //
  .get(
    verifyJWT,
    // verifyPermission(["admin"]),
    subController.getSubById
  )
 router.route("/:id") .put(
    verifyJWT,
    // verifyPermission(["admin"]),
    subController.updateSub
  );
//router.route("/delete").delete(subController.deletesub);

module.exports = router;
