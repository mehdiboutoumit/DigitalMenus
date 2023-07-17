const express = require("express");
const router = express.Router();
const extraController = require("../controllers/extraController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");
router
  .route("/add") //
  .post(
    //verifyJWT, //
    // verifyPermission(["admin"]),
    extraController.createExtra
  )
  router.route("/").get(
    //verifyJWT, //
    // verifyPermission(["admin"]),
    extraController.getAllExtras
  );
router //
  .route("/dish/:idDish")
  .get(extraController.getAllExtrasOfDish);

router
  .route("/:id") //
  .get(verifyJWT, extraController.getExtraById)
  .put(
    verifyJWT, //
    // verifyPermission(["admin"]),
    extraController.updateExtra
  );

router.route("/delete/:id").delete(
  extraController.deleteExtra
)
module.exports = router;
