const express = require('express')
const timeSlotController = require('../controller/timeSlotController.js')
const router = express.Router()

router.route('/:eventId')
    .get(timeSlotController.createTimeSlot_get)
    .post(timeSlotController.createTimeSlot_post)


module.exports = router