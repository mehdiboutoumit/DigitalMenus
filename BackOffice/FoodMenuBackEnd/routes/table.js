const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");
router
  .route("/add") //
  .post(
    verifyJWT,
    // verifyPermission(["admin"]),
    tableController.createTable
  )
  router
  .route("/") .get(
    verifyJWT, //
    // verifyPermission(["admin"]),
    tableController.getAllTables
  );
router //
  .route("/restaurant/:idRestaurant")
  .get(tableController.getAllTablesOfRestaurant);

router
  .route("/update/:id") //
  //.get(verifyJWT, tableController.getTableById)
  .put(
    verifyJWT,
    // verifyPermission(["admin"]),
    tableController.updateTable
  );

 router.route("/delete/:id").delete(tableController.deleteTable);
module.exports = router;
