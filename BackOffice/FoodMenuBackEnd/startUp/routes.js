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
  app.use("/api/v1/admin", admin);
  app.use("/api/v1/superAdmin", superAdmin);
  app.use("/api/v1/role", role);
  app.use("/api/v1/restaurant", restaurant);
  app.use("/api/v1/user", user);
  app.use("/menu", menu);
  app.use("/api/v1/category", category);
  app.use("/api/v1/dish", dish);
  app.use("/api/v1/portion", portion);
  app.use("/api/v1/extra", extra);
  // app.use("/api/v1/tag", tag);
  app.use("/api/v1/table", table);
  app.use("/api/v1/order", order);

  //error
  //   app.use(errorHandler);
};
