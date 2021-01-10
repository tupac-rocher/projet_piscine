const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    idGroupeProjet : { type : mongoose.ObjectId, required : true},
    idCreneau : { type: mongoose.ObjectId, required : true},
    //groupe:{type }
})

module.exports = mongoose.model('Reservation', reservationSchema)