const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    anneePromo : { type : mongoose.ObjectId, required : true},
})

module.exports = mongoose.model('Reservation', reservationSchema)