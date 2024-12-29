const Gallery2Model = require("../model/gallery2model");
const Gallery2Srv = require("../service/gallery2.service");

class GalleryController {
  createGallery = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = `http://localhost:3005/public/upload/${req.file.filename}`;
        console.log(req.file);
      }
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
}

const Gallery2ctrl = new GalleryController();
module.exports = Gallery2ctrl;
