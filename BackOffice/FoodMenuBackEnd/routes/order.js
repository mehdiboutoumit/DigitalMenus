const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");
router
  .route("/") //
  .post(
    verifyJWT, //
    // verifyPermission(["admin"]),
    orderController.createOrder
  )
  // .get(
  //   verifyJWT, //
  //   // verifyPermission(["admin"]),
  //   orderController.getAllOrders
  // );
router //
  .route("/restaurant/:idRestaurant")
  .get(orderController.getAllOrdersOfRestaurant);

// router
//   .route("/:id") //
//   .get(verifyJWT, orderController.getOrderById)
//   .put(verifyJWT, verifyPermission(["admin"]), orderController.updateOrder);
module.exports = router;
