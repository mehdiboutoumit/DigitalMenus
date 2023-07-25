const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");

router.route("/start/:id").put(
  orderController.startOrder
)

router.route("/finish/:id").put(
  orderController.finishOrder
)

router //
  .route("/restaurant/:idRestaurant")
  .get(orderController.getAllOrdersOfRestaurant);

router.route("/details/:id").get(orderController.getAllIndivOrdersOfGlobalOrder)

  router
  .route("/") //
  // .post(
  //   verifyJWT, //
  //   // verifyPermission(["admin"]),
  //   orderController.createOrder
  // )
  .get(
    verifyJWT, //
    // verifyPermission(["admin"]),
   // orderController.getAllOrders
  );

  router.route('/statistics').get(orderController.getData)

  router.route('/delete/:id').delete(orderController.deleteOrder)
module.exports = router;
