const userService = require("../services/userService");
const verifyPermission = function (roles) {
  return async (req, res, next) => {
    const idHeader = req.headers["id"];
    const id = idHeader.split(" ")[1];
    //const {id} = req.params;
    let access = false;
    if (roles.includes("admin")) {
      console.log("is admin");
      const user = await userService.findUserById(id);
      access = user.accessType == "admin" || "superadmin" ? true : false; //every superadmin is an admin
      // if (access) req.is_admin = true;
    }
    if (roles.includes("superadmin")) {
      console.log("is user");
      const user = await userService.findUserById(id);
      access = user.accessType == "superadmin" ? true : false;
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
