const express = require("express")
const { login, createAdmin } = require("../controller/admin.controller")
const router = express.Router()

router.post("/login", login)

// create admin ----------test 
router.post("/create-admin", createAdmin)

module.exports = router
