const GallerySrv = require("../service/gallery.service");

class GalleryController {
  UploadImage = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = `http://localhost:3005/public/upload/${req.file.filename}`;
      } else {
        console.log("image is required");
      }
      let response2 = await GallerySrv.imagevalidation(data);

      let response = await GallerySrv.UploadImage(data);
      res.json({
        data: response,
        msg: "post created Sucessfully",
        code: 200,
        meta: null,
      });
    } catch (error) {
      console.log("error while uploading image ", error);
      next({
        data: "",
        msg: "Image not uploded",
        code: 401,
        meta: null,
      });
    }
  };
  test = (req, res, next) => {
    res.json({
      msg: "hello i am Sandesh",
    });
  };

  getAllPost = async (req, res, next) => {
    try {
      const response = await GallerySrv.GetallPost();
      res.json({
        data: response,
        msg: "All post",
        code: true,
        meta: null,
      });
    } catch (error) {
      next({
        msg: "error in get all post",
      });
    }
  };

  UpdatePost = async (req, res, next) => {
    try {
      let postDetails = await GallerySrv.getpostbyId(req.params.id);
      let data = req.body;
      if (req.file) {
        data.image = `http://localhost:3005/public/upload/${req.file.filename}`;
      } else {
        data.image = postDetails.image;
      }
      let validation = await GallerySrv.imagevalidation(data);

      let response = await GallerySrv.UpdatePost(req.params.id, validation);
      res.json({
        data: response,
        msg: "Post updated successfully",
        code: true,
        meta: null,
      });
    } catch (error) {
      next({
        msg: error.details[0].message,
      });
    }
  };
  deletePost = async (req, res, next) => {
    try {
      let response = await GallerySrv.deletePost(req.params.id);
      res.json({
        msg: "Post deleted successfully",
        data: response,
        code: true,
        meta: null,
      });
    } catch (error) {
      console.log(error);
      next({
        msg: error,
      });
    }
  };
}

const GalleryCtrl = new GalleryController();
module.exports = GalleryCtrl;
