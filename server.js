const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

// connecte la base de donnée
mongoose.connect('mongodb+srv://'+ process.env.MONGODB_ATLAS_USER + ':'+ process.env.MONGODB_ATLAS_PW + '@'+ process.env.MONGODB_ATLAS_NAME + '.ybw8y.mongodb.net/projetpiscine?retryWrites=true&w=majority',{ 
    useNewUrlParser: true , useUnifiedTopology: true })
// mongoose.connect('mongodb://127.0.0.1/projetpiscineg4',{ 
//     useNewUrlParser: true , useUnifiedTopology: true })
// view engine is going to convert our ejs code to html
app.set('view engine', 'ejs')

app.get('/', (req, res) =>{
    res.render('index')
})

app.listen(5000)