const express = require('express')
const student = require('../models/studentModel')
const schoolYear = require('../models/schoolYearModel')
const router = express.Router()

//Pour saler et hacher le mot de passe
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

//Middleware authorization with jwt
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        req.user = user
        next()
    })
}

// SignIn route
router.get('/login', (req, res) =>{
    // Authentication User
    res.render('login')
})
router.post('/login', async (req,res) =>{
    console.log(req.body)
    //Recherche de l'étudiant dans la base de données
    const tryingToLogstudent = await student.findOne({studentMail : req.body.studentMail}).select('studentMail studentPassword')
    //Check si il existe
    if(tryingToLogstudent == null){
        return res.status(400).send('Utilisateur introuvable')
    }
    try{
        // hash le mdp rentré, désale le mdp de la base de donnée, et il les compare
        if(await(bcrypt.compare(req.body.studentPassword, tryingToLogstudent.studentPassword))){
            res.send('Succes')
            const studentPayload = await student.findOne({studentMail : req.body.studentMail}).select('studentLastName studentFirstName schoolYearId')
            console.log(studentPayload)
            jwt.sign(studentPayload.toJSON, process.env.ACCESS_TOKEN_SECRET)
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
    res.render('signUp.ejs')
})
router.post('/signUp', async (req,res) =>{
    try{
        //Génere un salt pour saler le mot de passe (empèche que deux mdp identique génère le même hash,
        //c'est pourquoi on y ajoute cette donnée supplémentaire avant le hashage)
        const salt = await bcrypt.genSalt()
        console.log(salt)
        const hashedPassword = await bcrypt.hash(req.body.studentPassword, salt)
        const schoolYearObject = await schoolYear.findOne({schoolYear :req.body.schoolYear})
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