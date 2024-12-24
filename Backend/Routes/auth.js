const authctrl = require("../src/controller/auth.controller");
const contactCtrl = require("../src/controller/contact.controller");
const AuthCheck = require("../src/rbac/authcheck");

const AuthRoutes = require("express").Router();

AuthRoutes.post("/login", authctrl.login);
AuthRoutes.post("/register", authctrl.register);
AuthRoutes.get("/me", AuthCheck);
// AuthRoutes.post ("/contact", contactCtrl.contact);

module.exports = AuthRoutes;
