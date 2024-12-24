const GalleryCtrl = require("../src/controller/gallery.controller");
const uploader = require("../src/middleware/uploder");
const AuthCheck = require("../src/rbac/authcheck");
const { IsAdmin } = require("../src/rbac/rbac");

const galleryRoutes = require("express").Router();

const dirPath = (req, res, next) => {
  req.uploadPath = "./public/upload";
  next();
};

galleryRoutes.post(
  "/image",
  dirPath,
  uploader.single("image"),
  GalleryCtrl.UploadImage
);
galleryRoutes.get("/active/:id");
galleryRoutes.get("/allpost", GalleryCtrl.getAllPost);
galleryRoutes.get("/hello", GalleryCtrl.test);
galleryRoutes.patch(
  "/post/update/:id",
  // AuthCheck,
  // IsAdmin,
  dirPath,
  uploader.single("image"),
  GalleryCtrl.UpdatePost
);
galleryRoutes.delete("/delete/:id", GalleryCtrl.deletePost);

module.exports = galleryRoutes;
