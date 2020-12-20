const mongoose = require('mongoose')

const participerSchema = new mongoose.Schema({
    idProf : { type : ObjectId, required : true},
    idCreneau : { type: ObjectId, required : true},
})

module.exports = mongoose.model('Participer', participerSchema)