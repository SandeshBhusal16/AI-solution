const ContactModel = require("../model/contactUs");
const EventModel = require("../model/event.model");
const GalleryModel = require("../model/gallerymodel");
const contactCtrl = require("./contact.controller");

class DashboardController {
  getAlldata = async (req, res, next) => {
    try {
      const contactusData = await ContactModel.find();
      const allPortfolio = await GalleryModel.find();
      const allEvents = await EventModel.find();

      res.json({
        data: {
          contactusData,
          allPortfolio,
          allEvents,
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
