const express = require('express')
const app = express()
const mongoose = require('mongoose')
//Affichage de l'icône avec express
var favicon = require('serve-favicon')
var path = require('path')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
//Each file inside this folder will be accessible from the root URL
app.use( express.static( "public" ) );
//Permet de pouvoir appeler nos variables d'environnement
require('dotenv').config()
//les routeurs
const evenementRouter = require('./routes/evenements')
app.use('/evenements', evenementRouter)
// connecte la base de donnée
mongoose.connect('mongodb+srv://'+ process.env.MONGODB_ATLAS_USER + ':'+ process.env.MONGODB_ATLAS_PW + '@'+ process.env.MONGODB_ATLAS_NAME + '.ybw8y.mongodb.net/projetpiscine?retryWrites=true&w=majority',{ 
    useNewUrlParser: true , useUnifiedTopology: true })
// mongoose.connect('mongodb://127.0.0.1/projetpiscineg4',{ 
//     useNewUrlParser: true , useUnifiedTopology: true })

// view engine is going to convert our ejs code to html
app.set('view engine', 'ejs')

//affiche la page d'affichage dde notre serveur 
app.get('/', (req, res) =>{
    res.render('login.ejs')
})
// routes

//admin_all_events.ejs
app.route('/admin_all_events')
    .get(function(req,res){
        res.render('admin_allevents')
    })

//admin_view_events
app.route('/admin_all_events')
    .get(function(req,res){
        res.render('admin_view_event')
    })

    
app.listen(5000)