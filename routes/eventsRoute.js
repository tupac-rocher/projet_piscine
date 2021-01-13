const express = require('express')
const eventController = require('./../controller/eventController')
const authMiddleware = require('./../middleware/authMiddleware')
const router = express.Router()

router.route('/')
    .all(authMiddleware.authenticateToken)
    .get(eventController.allEvents)

router.route('/ajouter-evenement')
    .all(authMiddleware.authenticateTokenAdmin)
    .get(eventController.addEvent_admin_get)
    .post(eventController.addEvent_admin_post)

router.route('/editer-evenement/:eventId')
    .all(authMiddleware.authenticateTokenAdmin)
    .get(eventController.eventByIdEdit)
    .post(eventController.editEvent_admin_post)

router.route('/:eventId')
    .all(authMiddleware.authenticateToken)
    .get(eventController.eventById)
    .delete(eventController.deleteEvent_admin_delete)




module.exports = router