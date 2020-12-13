const express = require('express')
const app = express()

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

//Affichage de l'icône avec express
var favicon = require('serve-favicon')
var path = require('path')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

//Each file inside this folder will be accessible from the root URL
app.use( express.static( "public" ) );

//Permet de pouvoir appeler nos variables d'environnement
require('dotenv').config()

//Pour saler et hacher le mot de passe
const bcrypt = require('bcrypt')

//Pour pouvoir test les requêtes avec REST Client sous format JSON
app.use(express.json());

//Access values from form inside of our request
//variable inside of our POST method
app.use(express.urlencoded({ extended : false }))

//les modèles
const evenement = require('./models/etudiant')

//les routeurs
const evenementRouter = require('./routes/evenements')
const etudiant = require('./models/etudiant')
app.use('/evenements', evenementRouter)

// connecte la base de donnée
mongoose.connect('mongodb+srv://'+ process.env.MONGODB_ATLAS_USER + ':'+ process.env.MONGODB_ATLAS_PW + '@'+ process.env.MONGODB_ATLAS_NAME + '.ybw8y.mongodb.net/projetpiscine?retryWrites=true&w=majority',{ 
    useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true })
// mongoose.connect('mongodb://127.0.0.1/projetpiscineg4',{ 
//     useNewUrlParser: true , useUnifiedTopology: true })

// view engine is going to convert our ejs code to html
app.set('view engine', 'ejs')



app.get('/', (req, res) =>{
    res.render('index')
})
// SignIn route
app.get('/login', (req, res) =>{
    // Authentication User
    res.render('login.ejs')
})
app.post('/login', async (req,res) =>{
    //Recherche de l'étudiant dans la base de données
    const tryingToLogEtudiant = await etudiant.findOne({mailEtudiant : req.body.mailEtudiant}).select('mailEtudiant mdpEtudiant')
    //Check si il existe
    if(tryingToLogEtudiant == null){
        return res.status(400).send('Utilisateur introuvable')
    }
    try{
        // hash le mdp rentré, désale le mdp de la base de donnée, et il les compare
        if(await(bcrypt.compare(req.body.mdpEtudiant, tryingToLogEtudiant.mdpEtudiant))){
            res.send('Succes')
        } else {
            res.send('Not Allowed')
        }
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

// SignUp route
app.get('/signUp', (req,res) =>{
    res.render('signUp.ejs')
})
app.post('/signUp', async (req,res) =>{
    try{
        //Génere un salt pour saler le mot de passe (empèche que deux mdp identique génère le même hash,
        //c'est pourquoi on y ajoute cette donnée supplémentaire avant le hashage)
        const salt = await bcrypt.genSalt()
        console.log(salt)
        const hashedPassword = await bcrypt.hash(req.body.mdpEtudiant, salt)
        // A partir du modèle étudiant, on instancie un étudiant d'après les informations du formulaire
        console.log(hashedPassword)
        const newUser = new etudiant({
            nomEtudiant: req.body.nomEtudiant,
            prenomEtudiant: req.body.prenomEtudiant,
            mailEtudiant: req.body.mailEtudiant,
            mdpEtudiant: hashedPassword,
            anneePromo: req.body.anneePromo
        })
        try{
            // cette fonction appelé sur mon instance du model etudiant sauvegarde mon instance dans la base de donnée
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

app.listen(5000)