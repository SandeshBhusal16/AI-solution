const AuthRoutes = require("./auth");
const galleryRoutes = require("./gallery.routes");
const eventRoutes = require("./event.routes");
const ContactUsRoutes = require("./contactus.routes");
const dashboardRoutes = require("./dashboard.routes");

const app = require("express").Router();

app.use("/auth", AuthRoutes);
app.use("/gallery", galleryRoutes);
app.use("/event", eventRoutes);
app.use("/contact", ContactUsRoutes);
app.use("/dashboard", dashboardRoutes);

module.exports = app;
