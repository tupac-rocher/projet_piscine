const mongoose = require('mongoose')

const composerSchema = new mongoose.Schema({
    idGroupeProjet : { type : mongoose.ObjectId, required : true},
    idEtudiant : { type: mongoose.ObjectId, required : true},
})

module.exports = mongoose.model('Composer', composerSchema)