const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");
const upload = require("../middlewares/fileUpload");
router
  .route("/") //
  .post(
    verifyJWT,
    // verifyPermission(["admin"]),
    upload.single("image"),
    dishController.createDish
  )
  .get(
    verifyJWT, //
    // verifyPermission(["admin"]),
    dishController.getAllDishes
  );
router //
  .route("/category/:idCategory")
  .get(dishController.getAllDishesOfCategory);

router
  .route("/:id") //
  .get(verifyJWT, dishController.getDishById)
  .put(
    verifyJWT,
    // verifyPermission(["admin"]),
    upload.single("image"),
    dishController.updateDish
  );
module.exports = router;
