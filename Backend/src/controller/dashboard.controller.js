const ContactModel = require("../model/contactUs");
const EventModel = require("../model/event.model");
const Gallery2Model = require("../model/gallery2model");
const GalleryModel = require("../model/gallerymodel");
const contactCtrl = require("./contact.controller");

class DashboardController {
  getAlldata = async (req, res, next) => {
    try {
      const contactusData = await ContactModel.find();
      const allPortfolio = await GalleryModel.find();
      const allEvents = await EventModel.find();
      const allImage = await Gallery2Model.find();

      res.json({
        data: {
          contactusData,
          allPortfolio,
          allEvents,
          allImage,
        },
        msg: "all data fetched",
      });
    } catch (error) {
      next({
        msg: error,
      });
    }
  };
}

const DashboardCtrl = new DashboardController();
module.exports = DashboardCtrl;
