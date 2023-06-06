const express = require("express");
const router = express.Router();
const portionController = require("../controllers/portionController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");
router
  .route("/") //
  .post(
    verifyJWT,
    // verifyPermission(["admin"]),
    portionController.createPortion
  )
  .get(
    verifyJWT, //
    // verifyPermission(["admin"]),
    portionController.getAllPortions
  );
router //
  .route("/dish/:idDish")
  .get(portionController.getAllPortionsOfDish);

router
  .route("/:id") //
  .get(verifyJWT, portionController.getPortionById)
  .put(
    verifyJWT,
    // verifyPermission(["admin"]),
    portionController.updatePortion
  );
module.exports = router;
