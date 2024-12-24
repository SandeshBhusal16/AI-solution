const contactCtrl = require("../src/controller/contact.controller");

const ContactUsRoutes = require("express").Router();

ContactUsRoutes.post("/create", contactCtrl.contact);
ContactUsRoutes.get("/getallcontact", contactCtrl.getAllContact);
ContactUsRoutes.get("/getoneContact/:id", contactCtrl.getContactById);
ContactUsRoutes.delete("/delete/:id", contactCtrl.deleteContact);

module.exports = ContactUsRoutes;
