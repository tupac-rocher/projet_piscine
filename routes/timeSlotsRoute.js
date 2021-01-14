const express = require('express')
const timeSlotController = require('../controller/timeSlotController.js')
const authMiddleware = require('./../middleware/authMiddleware')
const router = express.Router()


router.route('/:eventId')
    .all(authMiddleware.authenticateTokenStudent)
    .get(timeSlotController.createTimeSlot_get)
    .post(timeSlotController.createTimeSlot_post)
    
 router.route('/editer/:eventId/:timeslotId')
    .all(authMiddleware.authenticateTokenStudent)
    .get(timeSlotController.editTimeSlot_get)
    .post(timeSlotController.editTimeSlot_post)

module.exports = router