const express = require("express");
const cookieParser = require("cookie-parser");
const admin = require("../routes/admin");
const superAdmin = require("../routes/superAdmin");
const role = require("../routes/role");
const user = require("../routes/user");
const restaurant = require("../routes/restaurant");
const menu = require("../routes/menu");
const category = require("../routes/category");
const dish = require("../routes/dish");
const extra = require("../routes/extra");
const portion = require("../routes/portion");
const tag = require("../routes/tag");
const table = require("../routes/table");
const order = require("../routes/order");

module.exports = function (app) {
  //json parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  //routers
  app.use("/api/admin", admin);
  app.use("/api/superAdmin", superAdmin);
  app.use("/api/role", role);
  app.use("/api/restaurant", restaurant);
  app.use("/api/user", user);
  app.use("/api/menus", menu);
  app.use("/api/category", category);
  app.use("/api/dish", dish);
  app.use("/api/portion", portion);
  app.use("/api/extra", extra);
  // app.use("/api/v1/tag", tag);
  app.use("/api/table", table);
  app.use("/api/order", order);

  //error
  //   app.use(errorHandler);
};
