const Gallery2Model = require("../model/gallery2model");
const Gallery2Srv = require("../service/gallery2.service");

class GalleryController {
  createGallery = async (req, res, next) => {
    try {
      let data = req.body;
      if (!req.file) {
        next({
          msg: "Image not uploded",
        });
      }
      data.image = `http://localhost:3005/public/upload/${req.file.filename}`;
      console.log(req.file);
      // await Gallery2Srv.GalleryValidation(data);
      let response = await Gallery2Srv.CreateGallery(data);
      res.json({
        data: response,
        msg: "gallery post successfully",
        code: 200,
        meta: null,
      });
    } catch (error) {
      next({
        msg: error,
      });
    }
  };

  getall = async (req, res, next) => {
    try {
      let response = await Gallery2Model.find();
      res.json({
        data: response,
        msg: "all image fetched",
        code: 200,
        meta: null,
      });
      // console.log(response);
    } catch (error) {
      console.log("hello error", error);

      console.log(error);
    }
  };

  UpdateGallery = async (req, res, next) => {
    try {
      let postDetails = await Gallery2Srv.getimagebyId(req.params.id);
      let data = req.body;
      if (req.file) {
        data.image = `http://localhost:3005/public/upload/${req.file.filename}`;
      } else {
        data.image = postDetails.image;
      }
      let validation = await Gallery2Srv.GalleryValidation(data);

      let response = await Gallery2Srv.UpdatePost(req.params.id, validation);
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

  deleteGallery = async (req, res, next) => {
    try {
      let response = await Gallery2Srv.deletePost(req.params.id);
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

const Gallery2ctrl = new GalleryController();
module.exports = Gallery2ctrl;
