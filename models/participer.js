const mongoose = require('mongoose')

const participerSchema = new mongoose.Schema({
    idProf : { type : mongoose.ObjectId, required : true},
    idCreneau : { type: mongoose.ObjectId, required : true},
})

module.exports = mongoose.model('Participer', participerSchema)