const express = require('express')
const app = express()


// view engine is going to convert our ejs code to html
app.set('view engine', 'ejs')

app.get('/', (req, res) =>{
    res.render('index')
})

app.listen(5000)