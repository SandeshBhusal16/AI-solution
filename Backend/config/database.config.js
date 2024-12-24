const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    console.log("Database connected Successfully");
  })
  .catch((error) => {
    console.log("Database connection Failed", error);
  });
