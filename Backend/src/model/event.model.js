const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name of the event is required
  },
  description: {
    type: String,
    // required: true,
  },
  startdate: {
    type: Date,
    required: true, // Date of the event is required
  },
  enddate: {
    type: Date,
    required: true, // Date of the event is required
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
  },
});

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;
