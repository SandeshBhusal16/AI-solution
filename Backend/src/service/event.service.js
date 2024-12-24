const Joi = require("joi");
const EventModel = require("../model/event.model");

class EventService {
  // Validation for event data
  validateEvent = async (data) => {
    try {
      const rules = Joi.object({
        name: Joi.string().required(),
        startdate: Joi.date().required(),
        enddate: Joi.date().required(),
        description: Joi.string().allow(null, "").optional(),
        location: Joi.string().required(),
        image: Joi.string(),
        status: Joi.string().allow(""),
      });

      const response = await rules.validateAsync(data);
      console.log("Validation successful:", response);

      return response;
    } catch (exception) {
      console.error("Validation failed:", exception);
      throw exception;
    }
  };

  // Create a new event
  CreateEvent = async (data) => {
    try {
      const event = new EventModel(data);
      return await event.save();
    } catch (exception) {
      console.error("Error while creating event:", exception);
      throw exception;
    }
  };

  // Fetch all events
  GetAllEvents = async () => {
    try {
      const response = await EventModel.find();
      return response;
    } catch (exception) {
      console.error("Error while fetching all events:", exception);
      throw exception;
    }
  };

  // Fetch event by ID
  GetEventById = async (id) => {
    try {
      const response = await EventModel.findById(id);
      if (!response) {
        throw new Error("Event not found");
      }
      return response;
    } catch (exception) {
      console.error("Error while fetching event by ID:", exception);
      throw exception;
    }
  };

  // Update an event
  UpdateEvent = async (id, data) => {
    try {
      const response = await EventModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true } // Return updated document
      );
      if (!response) {
        throw new Error("Event not found or update failed");
      }
      return response;
    } catch (exception) {
      console.error("Error while updating event:", exception);
      throw exception;
    }
  };

  // Delete an event
  DeleteEvent = async (id) => {
    try {
      const response = await EventModel.findByIdAndDelete(id);
      if (!response) {
        throw new Error("Event not found or deletion failed");
      }
      return response;
    } catch (exception) {
      console.error("Error while deleting event:", exception);
      throw exception;
    }
  };
}

const EventSrv = new EventService();
module.exports = EventSrv;
