const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");
const upload = require("../middlewares/fileUpload");
router
  .route("/add") //
  .post(
    verifyJWT,
    // verifyPermission(["admin"]),
    upload.single("image"),
    restaurantController.createRestaurant
  )
  router
  .route("/") .get(
    verifyJWT,
    // verifyPermission(["admin"]),
    restaurantController.getAllRestaurants
  );

 //
  // .get(
  //   verifyJWT,
  //   // verifyPermission(["admin"]),
  //   restaurantController.getRestaurantById
  // )
  router
  .route("/update/:id").put(
    verifyJWT,
    // verifyPermission(["admin"]),
   upload.single("image"),
    restaurantController.updateRestaurant
  );

  router.route("/delete/:id").delete(
    restaurantController.deleteRestaurant
  );
module.exports = router;
