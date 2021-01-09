const mongoose = require('mongoose')

const administratorSchema = new mongoose.Schema({
    adminPseudo : { type : String, required : true},
    adminPassword : { type: String, required : true}
})

module.exports = mongoose.model('Administrator', administratorSchema)