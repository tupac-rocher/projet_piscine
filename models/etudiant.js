const mongoose = require('mongoose')

const etudiantSchema = new mongoose.Schema({
    nomEtudiant : { type : String, required : true},
    prenomEtudiant : { type: String, required : true},
    mailEtudiant : { type : String, required : true},
    mdpEtudiant : { type: String, required : true},
    nombreMembreJury : { type: Number, required : true},
    anneePromo : { type: Number, required : true},
})

module.exports = mongoose.model('Etudiant', etudiantSchema)