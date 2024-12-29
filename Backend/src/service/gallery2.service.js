const joi = require("joi");
const Gallery2Model = require("../model/gallery2model");
class GalleryService {
  GalleryValidation = async (data) => {
    try {
      let rules = joi.object({
        title: joi.string().required(),
        image: joi.string().required(),
      });
      let response = await rules.validateAsync(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  CreateGallery = async (data) => {
    try {
      let response = new Gallery2Model(data);
      return await response.save();
    } catch (error) {
      console.log(error);
    }
  };
}

const Gallery2Srv = new GalleryService();
module.exports = Gallery2Srv;
