const moment = require("moment");
const EventSrv = require("../service/event.service");

class EventController {
  // Create a new event
  CreateEvent = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = `http://localhost:3005/public/upload/${req.file.filename}`; // Handle optional image upload
      }

      const startDate = new Date(data.startdate).setHours(0, 0, 0, 0);
      const endDate = new Date(data.enddate).setHours(0, 0, 0, 0);
      const currentDate = new Date().setHours(0, 0, 0, 0);
      if (endDate < currentDate) {
        data.status = "pastEvent";
      } else if (startDate > currentDate) {
        data.status = "UpcomingEvent";
      } else {
        data.status = "todayEvent";
      }
      // Validate the event data (assuming a validation method exists in the service)
      const validation = await EventSrv.validateEvent(data);
      const response = await EventSrv.CreateEvent(validation);

      res.json({
        data: response,
        msg: "Event created successfully",
        code: 200,
        meta: null,
      });
    } catch (error) {
      console.error("Error while creating event", error);
      next({
        data: "",
        msg: "Event creation failed",
        code: 400,
        meta: null,
      });
    }
  };

  // Get all events
  GetAllEvents = async (req, res, next) => {
    try {
      const response = await EventSrv.GetAllEvents();

      res.json({
        data: response,
        msg: "All events retrieved successfully",
        code: 200,
        meta: null,
      });
    } catch (error) {
      console.error("Error while fetching all events", error);
      next({
        data: "",
        msg: "Failed to retrieve events",
        code: 500,
        meta: null,
      });
    }
  };

  // Get an event by ID
  GetEventById = async (req, res, next) => {
    try {
      const response = await EventSrv.GetEventById(req.params.id);
      res.json({
        data: response,
        msg: "Event retrieved successfully",
        code: 200,
        meta: null,
      });
    } catch (error) {
      console.error("Error while fetching event by ID", error);
      next({
        data: "",
        msg: "Failed to retrieve the event",
        code: 404,
        meta: null,
      });
    }
  };

  // Update an event
  UpdateEvent = async (req, res, next) => {
    try {
      let existingEvent = await EventSrv.GetEventById(req.params.id);
      let data = req.body;
      if (req.file) {
        data.image = `http://localhost:3005/public/upload/${req.file.filename}`; // Update image if provided
      } else {
        data.image = existingEvent.image; // Keep the old image if none provided
      }
      const startDate = new Date(data.startdate).setHours(0, 0, 0, 0);
      const endDate = new Date(data.enddate).setHours(0, 0, 0, 0);
      const currentDate = new Date().setHours(0, 0, 0, 0);
      if (endDate < currentDate) {
        data.status = "pastEvent";
      } else if (startDate > currentDate) {
        data.status = "UpcomingEvent";
      } else if (endDate === currentDate || startDate === currentDate) {
        data.status = "todayEvent";
      }

      // Validate the updated event data
      const validation = await EventSrv.validateEvent(data);

      // Update the event
      const response = await EventSrv.UpdateEvent(req.params.id, validation);
      res.json({
        data: response,
        msg: "Event updated successfully",
        code: 200,
        meta: null,
      });
    } catch (error) {
      console.error("Error while updating event", error);
      next({
        data: "",
        msg: error?.details[0]?.message,
        code: 400,
        meta: null,
      });
    }
  };

  // Delete an event
  DeleteEvent = async (req, res, next) => {
    try {
      const response = await EventSrv.DeleteEvent(req.params.id);
      res.json({
        data: response,
        msg: "Event deleted successfully",
        code: 200,
        meta: null,
      });
    } catch (error) {
      console.error("Error while deleting event", error);
      next({
        data: "",
        msg: "Event deletion failed",
        code: 400,
        meta: null,
      });
    }
  };

  // Test endpoint
  Test = (req, res, next) => {
    res.json({
      msg: "Hello from EventController",
    });
  };
}

const EventCtrl = new EventController();
module.exports = EventCtrl;
