const express = require('express')
const etudiant = require('../models/studentModel')
const prof = require('../models/teacherModel')
const teacherController = require('../controller/teacherController')
const router = express.Router()

router.get('/', async function(req, res){
    const allTeachers = teacherController.allTeachers()
    console.log(allTeachers)
    res.render('etu_creat_reservation')
})


module.exports = router