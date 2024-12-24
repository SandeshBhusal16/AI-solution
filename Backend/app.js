const express = require("express");
require("./config/database.config");
const app = express();
const routes = require("./Routes");
const cors = require("cors");
const path = require("path");
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(
  express.json(),
  express.urlencoded({
    extended: true,
  })
);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(routes);
app.use((req, res, next) => {
  next({
    data: "",
    msg: "page not found",
    code: 401,
    meta: null,
  });
});

app.use((error, req, res, next) => {
  const data = error.data || JSON.stringify(error.data);
  const msg = error.msg || "Resource not found";
  const status = error.status || 500;
  res.status(status).json({
    data: data,
    msg: msg,
    code: status,
    meta: null,
  });
});
app.listen(3005, "localhost", (error) => {
  if (error) {
    console.log("Error while listening Server");
  } else {
    console.log("Server is listening to port : ", 3005);
  }
});
