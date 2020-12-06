const express = require('express')
const evenement = require('../models/evenement')
const router = express.Router()

//Juste pour tester que les évenements se crée dans le base de donnée quand je get localhost:5000/evenement/ -> résultat ok
router.get('/', async (req, res) => {
    res.send('Events')
    const evenementtest = new evenement({
        nomEvenement : 'TestNom',
        dateDebut : new Date,
        duree: 7,
        dateLimiteMax : new Date,
        dureeCreneau : 60,
        nombreMembreJury : 3,
        anneePromo : 3
    })
    console.log(evenementtest)
    try{
        // cette fonction appelé sur mon instance du model evenement sauvegarde mon instance dans la base de donnée
        await evenementtest.save()
    } catch(e) {
        console.log(e)
    }
})

module.exports = router