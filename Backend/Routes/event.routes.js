const EventCtrl = require("../src/controller/event.controller");
const AuthCheck = require("../src/rbac/authcheck");
const { IsAdmin } = require("../src/rbac/rbac");
const uploader = require("../src/middleware/uploder");

const eventRoutes = require("express").Router();

// Middleware to set the upload path (if needed for event-related uploads)
const dirPath = (req, res, next) => {
  req.uploadPath = "./public/upload";
  next();
};

// Route to create a new event
eventRoutes.post("/", dirPath, uploader.single("image"), EventCtrl.CreateEvent);

// Route to get all events
eventRoutes.get("/allevents", EventCtrl.GetAllEvents);

// Route to get a single event by id
eventRoutes.get("/:id", EventCtrl.GetEventById);

// Route to update an event by id
eventRoutes.patch(
  "/update/:id",
  // AuthCheck,
  // IsAdmin,
  dirPath,
  uploader.single("image"),
  EventCtrl.UpdateEvent
);

// Route to delete an event by ID
eventRoutes.delete(
  "/delete/:id",
  // AuthCheck,
  // IsAdmin,
  EventCtrl.DeleteEvent
);

module.exports = eventRoutes;

// const eventRoutes =  require("express").Router();

// eventRoutes.post("/", EventCtrl.CreateEvent);
// eventRoutes.get("/", EventCtrl.GetAllEvents);
// eventRoutes.get("/:id", EventCtrl.GetEventById);
// eventRoutes.put("/:id", EventCtrl.UpdateEvent);
// eventRoutes.delete("/:id", EventCtrl.DeleteEvent);
// eventRoutes.get("/test", EventCtrl.Test);
