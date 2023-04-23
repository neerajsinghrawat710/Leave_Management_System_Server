const express = require("express")
const { getLeave, applyLeave } = require("../controller/leave.controller")
const router = express.Router()

router.get("/get-leave", getLeave)
router.post("/apply-leave", applyLeave)

module.exports = router
