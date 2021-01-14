const express = require('express')
const student = require('../models/studentModel')
const admin = require('../models/adminModel')
const schoolYear = require('../models/schoolYearModel')
const router = express.Router()

//Pour saler et hacher le mot de passe
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

router.get('/loginAdmin', (req, res) => {
    res.render('loginAdmin', { title : "loginAdmin"})
})
router.post('/loginAdmin', async (req,res) =>{
    //Recherche de l'étudiant dans la base de données
    const tryingToLogAdmin = await admin.findOne({adminPseudo : req.body.adminPseudo}).select('adminPseudo adminPassword')
    //Check si il existe
    if(tryingToLogAdmin == null){
        return res.status(400).send('Administrateur introuvable')
    }
    try{
        // hash le mdp rentré, désale le mdp de la base de donnée, et il les compare
        if(await(bcrypt.compare(req.body.adminPassword, tryingToLogAdmin.adminPassword))){
            console.log(tryingToLogAdmin)
            tryingToLogAdmin.adminPassword = undefined
            console.log(tryingToLogAdmin)
            //delete tryingToLogAdmin.adminPassword
            const token = jwt.sign(tryingToLogAdmin.toJSON(), process.env.ACCESS_TOKEN_SECRET)
            res.cookie('jwt', token)
            res.redirect('/evenements')
        } else {
            res.send('Not Allowed')
        }
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

router.get('/logout', async (req, res) => {
    res.cookie('jwt',"", {maxAge: 0})
    res.redirect('/login', { title : "login"})
})

// SignIn route
router.get('/login', (req, res) =>{
    // Authentication User
    res.render('login', { title : "login"})
})
router.post('/login', async (req,res) =>{
    //Recherche de l'étudiant dans la base de données
    const tryingToLogstudent = await student.findOne({studentMail : req.body.studentMail}).select('studentMail studentPassword')
    //Check si il existe
    if(tryingToLogstudent == null){
        return res.status(400).send('Utilisateur introuvable')
    }
    try{
        // hash le mdp rentré, désale le mdp de la base de donnée, et il les compare
        if(await(bcrypt.compare(req.body.studentPassword, tryingToLogstudent.studentPassword))){
            const studentPayload = await student.findOne({studentMail : req.body.studentMail}).select('studentLastName studentFirstName schoolYearId')
            console.log(studentPayload)
            const token = jwt.sign(studentPayload.toJSON(), process.env.ACCESS_TOKEN_SECRET)
            res.cookie('jwt', token)
            res.redirect('/evenements')
        } else {
            res.send('Not Allowed')
        }
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

// SignUp route
router.get('/signUp', (req,res) =>{
    res.render('signUp', { title : "signup"})
})
router.post('/signUp', async (req,res) =>{
    try{
        //Génere un salt pour saler le mot de passe (empèche que deux mdp identique génère le même hash,
        //c'est pourquoi on y ajoute cette donnée supplémentaire avant le hashage)
        const salt = await bcrypt.genSalt()
        console.log(salt)
        const hashedPassword = await bcrypt.hash(req.body.studentPassword, salt)
        const schoolYearObject = await schoolYear.findOne({schoolYear :req.body.schoolYear})
        if (!schoolYearObject){
            res.sendStatus('500')
        }
        // A partir du modèle étudiant, on instancie un étudiant d'après les informations du formulaire
        console.log(hashedPassword)
        const newUser = new student({
            studentLastName: req.body.studentLastName,
            studentFirstName: req.body.studentFirstName,
            studentMail: req.body.studentMail,
            studentPassword: hashedPassword,
            schoolYearId: schoolYearObject._id
        })
        try{
            // cette fonction appelé sur mon instance du model student sauvegarde mon instance dans la base de donnée
            await newUser.save()
            res.redirect('/login')
        } catch(e) {
            console.log(e)
            res.status(500).send()
        }
    } catch (e){
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router