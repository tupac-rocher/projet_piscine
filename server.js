const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const mongoose = require('mongoose')

//Affichage de l'icône avec express
var favicon = require('serve-favicon')
var path = require('path')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

//Each file inside this folder will be accessible from the root URL
app.use( express.static( "public" ) );

//Permet de pouvoir appeler nos variables d'environnement
require('dotenv').config()

//Pour pouvoir test les requêtes avec REST Client sous format JSON
app.use(express.json());

//Access values from form inside of our request
//variable inside of our POST method
app.use(express.urlencoded({ extended : false }))

//les routeurs
const authRouter = require('./routes/auth')
app.use('/', authRouter)
const eventRouter = require('./routes/eventsRoute')
app.use('/evenements', eventRouter)
const reservationRouter = require('./routes/timeSlotsRoute')
app.use('/reserver',reservationRouter)


// connecte la base de donnée
mongoose.connect('mongodb+srv://'+ process.env.MONGODB_ATLAS_USER + ':'+ process.env.MONGODB_ATLAS_PW + '@'+ process.env.MONGODB_ATLAS_NAME + '.ybw8y.mongodb.net/projetpiscine?retryWrites=true&w=majority',{ 
    useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true })
// mongoose.connect('mongodb://127.0.0.1/projetpiscineg4',{ 
//     useNewUrlParser: true , useUnifiedTopology: true })

// view engine is going to convert our ejs code to html
app.set('view engine', 'ejs')

//Root
app.get('/', (req, res) =>{
    // Authentication User
    res.render('login')
})
//admin_all_events.ejs
app.route('/admin_all_events')
    .get(function(req,res){
        res.render('admin_all_events')
    })

//admin_view_events
app.route('/admin_view_event')
    .get(function(req,res){
        res.render('admin_view_event')
    })

app.route('/planningTest')
    .get(function(req, res){
        res.render('planningTest')
    })
    
app.listen(5000)