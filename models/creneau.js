const mongoose = require('mongoose')

const creneauSchema = new mongoose.Schema({
    date : { type : Date, required : true},
    heureDebut : { type: Number, required : true},
    salle : { type : Number, required : true},
    idEvenement : { type: ObjectId, required : true},
    idGroupeProjet : { type: ObjectId, required: true}
})

module.exports = mongoose.model('Creneau', creneauSchema)