const Gallery2ctrl = require("../src/controller/gallery2.controller");
const uploader = require("../src/middleware/uploder");

const Gallery2Routes = require("express").Router();
const dirPath = (req, res, next) => {
  req.uploadPath = "./public/upload";
  next();
};

Gallery2Routes.post(
  "/createGallery",
  dirPath,
  uploader.single("image"),
  Gallery2ctrl.createGallery
);
Gallery2Routes.get("/getall", Gallery2ctrl.getall);

module.exports = Gallery2Routes;
