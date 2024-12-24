const Joi = require("joi");
const GalleryModel = require("../model/gallerymodel");

class galleryService {
  imagevalidation = async (data) => {
    try {
      let rules = Joi.object({
        image: Joi.string().required(),
        description: Joi.string().required(),
        title: Joi.string().required(),
        rating: Joi.string(),
      });

      let response = await rules.validateAsync(data);
      console.log(response);

      return response;
    } catch (exception) {
      console.log("hello", exception);

      throw exception;
    }
  };

  UploadImage = async (data) => {
    try {
      const Upload = new GalleryModel(data);
      return await Upload.save();
    } catch (exc) {
      throw exc;
    }
  };

  GetallPost = async () => {
    try {
      const response = await GalleryModel.find();
      return await response;
    } catch (exception) {
      throw exception;
    }
  };

  getpostbyId = async (id) => {
    try {
      const response = await GalleryModel.findById(id);
      return response;
    } catch (exception) {
      throw exception;
    }
  };
  UpdatePost = async (id, data) => {
    try {
      let response = await GalleryModel.findByIdAndUpdate(id, {
        $set: data,
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  };
  deletePost = async (id) => {
    try {
      let response = await GalleryModel.findByIdAndDelete(id);
      console.log(response);

      return response;
    } catch (exc) {
      throw exc;
    }
  };
}

const GallerySrv = new galleryService();
module.exports = GallerySrv;
