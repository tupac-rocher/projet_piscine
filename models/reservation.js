const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    idGroupeProjet : { type : ObjectId, required : true},
    idCreneau : { type: ObjectId, required : true},
})

module.exports = mongoose.model('Reservation', reservationSchema)