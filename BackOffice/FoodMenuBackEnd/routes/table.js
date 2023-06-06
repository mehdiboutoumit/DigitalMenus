const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");
router
  .route("/") //
  .post(
    verifyJWT,
    // verifyPermission(["admin"]),
    tableController.createTable
  )
  .get(
    verifyJWT, //
    // verifyPermission(["admin"]),
    tableController.getAllTables
  );
router //
  .route("/restaurant/:idRestaurant")
  .get(tableController.getAllTablesOfRestaurant);

router
  .route("/:id") //
  .get(verifyJWT, tableController.getTableById)
  .put(
    verifyJWT,
    // verifyPermission(["admin"]),
    tableController.updateTable
  );
module.exports = router;
