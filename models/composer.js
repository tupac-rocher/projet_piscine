const mongoose = require('mongoose')

const composerSchema = new mongoose.Schema({
    idGroupeProjet : { type : ObjectId, required : true},
    idEtudiant : { type: ObjectId, required : true},
})

module.exports = mongoose.model('Composer', composerSchema)