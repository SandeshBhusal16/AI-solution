const mongoose = require("mongoose");

const Gallery2Schema = new mongoose.Schema({
  title: String,
  image: String,
});

const Gallery2Model = mongoose.model("Gallery2", Gallery2Schema);
module.exports = Gallery2Model;
