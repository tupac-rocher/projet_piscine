const mongoose = require('mongoose')

const profSchema = new mongoose.Schema({
    nomprof : { type : String, required : true},
    prenomprof : { type: String, required : true},
})

module.exports = mongoose.model('Prof', profSchema)