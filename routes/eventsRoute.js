const express = require('express')
const event = require('../models/eventModel')
const router = express.Router()

//Juste pour tester que les évenements se crée dans le base de donnée quand je get localhost:5000/evenement/ -> résultat ok
router.get('/', async (req, res) => {
    res.send('Events')
    const eventtest = new event({
        eventName : 'TestNom',
        startingDate : new Date,
        duration: 7,
        maximumLimitDate : new Date,
        timeSlotDuration : 60,
        numberOfTeachers : 3,
        schoolYearId : 3
    })
    console.log(evenementtest)
    try{
        // cette fonction appelé sur mon instance du model evenement sauvegarde mon instance dans la base de donnée
        await eventtest.save()
    } catch(e) {
        console.log(e)
    }
})

module.exports = router