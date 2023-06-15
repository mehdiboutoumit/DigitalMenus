const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");
const upload = require("../middlewares/fileUpload");
router
  .route("/add") //
  .post(
    verifyJWT,
    // verifyPermission(["admin"]),
    upload.single("image"),
    dishController.createDish
  );
 router.route("/").get(
    verifyJWT, //
    // verifyPermission(["admin"]),
    dishController.getAllDishes
  );
router //
  .route("/category/:idCategory")
  .get(dishController.getAllDishesOfCategory);

router
  .route("/:id") //
  //.get( dishController.getDishById)
  .put(
    //verifyJWT,
    // verifyPermission(["admin"]),
    //upload.single("image"),
    dishController.updateDish
  );

  router.delete("/delete/:id", dishController.deleteDish);
module.exports = router;
