const mongoose = require('mongoose')

const groupeProjetSchema = new mongoose.Schema({
    nomTuteur : { type : String, required : true},
    prenomTuteur : { type: String, required : true},
    nomEntreprise : { type : String, required : true},
    idProf : { type: ObjectId, required : true},
    idCreneau : { type: ObjectId, required : true}
})

module.exports = mongoose.model('GroupeProjet', groupeprojetSchema)