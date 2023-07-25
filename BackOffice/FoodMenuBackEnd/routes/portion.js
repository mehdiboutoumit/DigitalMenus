const express = require("express");
const router = express.Router();
const portionController = require("../controllers/portionController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");
router
  .route("/add") //
  .post(
    //verifyJWT,
    // verifyPermission(["admin"]),
    portionController.createPortion
  )
  router.route("/").get(
    //verifyJWT, //
    // verifyPermission(["admin"]),
    portionController.getAllPortions
  );
router //
  .route("/dish/:idDish")
  .get(portionController.getAllPortionsOfDish);

router
  .route("/:id")
  .put(
    verifyJWT,
    // verifyPermission(["admin"]),
    portionController.updatePortion
  );

  router
  .route("/:id") //
  .get(portionController.getPortionById)
 
  router.route("/delete/:id").delete(
    portionController.deletePortion
  )
module.exports = router;
