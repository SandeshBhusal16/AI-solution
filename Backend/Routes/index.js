const AuthRoutes = require("./auth");
const galleryRoutes = require("./gallery.routes");
const eventRoutes = require("./event.routes");
const ContactUsRoutes = require("./contactus.routes");
const dashboardRoutes = require("./dashboard.routes");
const Gallery2Routes = require("./gallery2.routes");

const app = require("express").Router();

app.use("/auth", AuthRoutes);
app.use("/gallery", galleryRoutes);
app.use("/event", eventRoutes);
app.use("/contact", ContactUsRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/gallery2", Gallery2Routes);

module.exports = app;
