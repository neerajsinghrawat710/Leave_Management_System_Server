const express = require("express")
const { getEmployee, getSingleEmployee, createEmployee } = require("../controller/employee.controller")
const router = express.Router()

router.get("/get-employee", getEmployee)
router.get("/get-employee/:empId", getSingleEmployee)
router.post("/create-employee", createEmployee)

module.exports = router
