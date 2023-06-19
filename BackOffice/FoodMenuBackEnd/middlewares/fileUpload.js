const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  console.log("Upload");
  const fileSize = parseInt(req.headers["content-length"]);
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    if (fileSize <= 20000000) {
      cb(null, true);
    } else {
      console.log("size is too large");
    }
  } else {
    console.log("only 'png' 'jpeg' 'jpg' are accepted");
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
