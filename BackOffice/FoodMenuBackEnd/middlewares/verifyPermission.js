const adminService = require("../services/adminService");
const userService = require("../services/userService");
const verifyPermission = function (roles) {
  return async (req, res, next) => {
    const { user } = req;
    let access = false;
    if (roles.includes("admin")) {
      console.log("is admin");
      const data = await adminService.findAdminById(user.id);
      access = data == null ? false : true;
      // if (access) req.is_admin = true;
    }
    if (roles.includes("user")) {
      console.log("is user");
      const data = await userService.findUserById(user.id);
      access = data == null ? false : true;
    }
    if (!access) {
      console.log("access denied");
      return res.sendStatus(403);
    } else {
      console.log("access granted");

      next();
    }
  };
};

module.exports = verifyPermission;
