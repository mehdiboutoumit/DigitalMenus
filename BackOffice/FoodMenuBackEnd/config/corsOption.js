const whiteList = require("../config/whiteList");
const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log("not allowed by CORS");
      callback(new Error("not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOption;
