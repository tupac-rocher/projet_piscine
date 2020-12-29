const express = require('express')
const etudiant = require('../models/etudiant')
const router = express.Router()

//Juste pour tester que les évenements se crée dans le base de donnée quand je get localhost:5000/etudiant/ -> résultat ok
router.get('/', async (req, res) => {

    console.log(etudiant)
    try{
        // cette fonction appelé sur mon instance du model etudiant sauvegarde mon instance dans la base de donnée
        await etudiant.find()
    } catch(e) {
        console.log(e)
    }
})

module.exports = router

