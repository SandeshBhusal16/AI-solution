const multer = require("multer");
const fs = require("fs");
const helper = require("../../config/helper");
const mystorage = multer.diskStorage({
  destination(req, file, cb) {
    let path = req.uploadPath;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true,
      });
    }
    cb(null, path);
  },
  filename(req, file, cb) {
    let fname =
      Date.now() + "-" + helper.generateFilename(30) + "-" + file.originalname;
    cb(null, fname);
  },
});

const uploader = multer({
  storage: mystorage,
});

module.exports = uploader;
