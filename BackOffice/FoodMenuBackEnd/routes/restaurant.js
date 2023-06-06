const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");
const upload = require("../middlewares/fileUpload");
router
  .route("/") //
  .post(
    verifyJWT,
    // verifyPermission(["admin"]),
    upload.single("image"),
    restaurantController.createRestaurant
  )
  .get(
    verifyJWT,
    // verifyPermission(["admin"]),
    restaurantController.getAllRestaurants
  );

router
  .route("/:id") //
  .get(
    verifyJWT,
    // verifyPermission(["admin"]),
    restaurantController.getRestaurantById
  )
  .put(
    verifyJWT,
    // verifyPermission(["admin"]),
    upload.single("image"),
    restaurantController.updateRestaurant
  );
module.exports = router;
