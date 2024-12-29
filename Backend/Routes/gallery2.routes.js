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
Gallery2Routes.put(
  "/updateImage/:id",
  dirPath,
  uploader.single("image"),
  Gallery2ctrl.UpdateGallery
);
Gallery2Routes.delete("/deleteImage/:id", Gallery2ctrl.deleteGallery);

module.exports = Gallery2Routes;
