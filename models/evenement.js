const mongoose = require('mongoose')

const evenementSchema = new mongoose.Schema({
    nomEvenement : { type : String, required : true},
    dateDebut : { type: Date, required : true},
    duree : { type : Number, required : true},
    dateLimiteMax : { type: Date, required : true},
    duree : { type: Number, required : true},
    dureeCreneau : { type: Number, required : true},
    nombreMembreJury : { type: Number, required : true},
    anneePromo : { type: Number, required : true},
})

module.exports = mongoose.model('Evenement', evenementSchema)