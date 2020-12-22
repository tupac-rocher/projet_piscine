const mongoose = require('mongoose')

const promoSchema = new mongoose.Schema({
    anneePromo : { type : String, required : true},
})

module.exports = mongoose.model('Promo', promoSchema)