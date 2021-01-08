const express = require('express')
const eventController = require('./../controller/eventController')
const router = express.Router()

router.route('/')
    .get(eventController.allEvents)

router.route('/ajouter-evenement')
    .get(eventController.addEvent_admin_get)
    .post(eventController.addEvent_admin_post)

router.route('/:eventId')
    .get(eventController.eventById)
    .delete(eventController.deleteEvent_admin_delete)
    

module.exports = router