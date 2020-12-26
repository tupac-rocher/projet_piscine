const express = require('express')
const etudiant = require('../models/etudiant')
const prof = require('./../models/prof')
const router = express.Router()

router.get('/', async function(req, res){
    const allStudents = await etudiant.find()
    const allProfs = await prof.find()
    console.log(allStudents)
    console.log(allProfs)
    res.render('etu_creat_reservation')
})


module.exports = router