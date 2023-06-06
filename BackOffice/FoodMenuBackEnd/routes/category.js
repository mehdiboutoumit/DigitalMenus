const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");
const upload = require("../middlewares/fileUpload");
router
  .route("/") //
  .post(
    verifyJWT,
    // verifyPermission(["admin"]),
    upload.single("image"),
    categoryController.createCategory
  )
  .get(
    verifyJWT, //
    // verifyPermission(["admin"]),
    categoryController.getAllCategories
  );
router //
  .route("/menu/:idMenu")
  .get(categoryController.getAllCategoriesOfMenu);

router
  .route("/:id") //
  .get(verifyJWT, categoryController.getCategoryById)
  .put(
    verifyJWT,
    // verifyPermission(["admin"]),
    upload.single("image"),
    categoryController.updateCategory
  );
module.exports = router;
