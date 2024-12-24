const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "User",
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", Schema);
module.exports = UserModel;
