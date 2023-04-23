const express = require("express");
const router = express.Router()

const EmployeeRoute = require("./employee.route")
const LeaveRoute = require("./leave.route")
const AdminRoute = require("./admin.route")

router.use("/employee", EmployeeRoute)
router.use("/leave", LeaveRoute)
router.use("/admin", AdminRoute)

module.exports = router

