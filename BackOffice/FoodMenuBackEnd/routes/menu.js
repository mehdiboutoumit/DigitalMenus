const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPermission = require("../middlewares/verifyPermission");
const upload = require("../middlewares/fileUpload");
router
  .route("/add") //
  .post(
   // verifyJWT,
    // verifyPermission(["admin"]),
    //upload.single("image"),
    menuController.createMenu
  )
router  
  .route("/")
  .get(
   // verifyJWT, //
    // verifyPermission(["admin"]),
    menuController.getAllMenus
  );
router //
  .route("/restaurant/:idRestaurant")
  .get(menuController.getAllMenusOfRestaurant);

router
  .route("/:id") //
  .get(verifyJWT, menuController.getMenuById)
  .put(
    verifyJWT,
    // verifyPermission(["admin"]),
    upload.single("image"),
    menuController.updateMenu
  );
module.exports = router;
