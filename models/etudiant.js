const mongoose = require('mongoose')

const etudiantSchema = new mongoose.Schema({
    nomEtudiant : { type : String, required : true},
    prenomEtudiant : { type: String, required : true},
    //Ici le mailEtudiant est unique dans la base de données
    mailEtudiant : { type : String, required : true, unique: true},
    mdpEtudiant : { type: String, required : true},
    anneePromo : { type: String, required : true},
})

module.exports = mongoose.model('Etudiant', etudiantSchema)