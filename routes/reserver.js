const express = require('express')
const etudiant = require('../models/etudiant')
const prof = require('../models/teacher')
const teacherController = require('./../controller/teacherController')
const router = express.Router()

router.get('/', async function(req, res){
    const allTeachers = teacherController.allTeachers()
    console.log(allTeachers)
    res.render('etu_creat_reservation')
})


module.exports = router