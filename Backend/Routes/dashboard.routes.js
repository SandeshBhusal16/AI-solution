const DashboardCtrl = require("../src/controller/dashboard.controller");

const dashboardRoutes = require("express").Router();

dashboardRoutes.get("/getall", DashboardCtrl.getAlldata);
module.exports = dashboardRoutes;
