const mongoose = require('mongoose')

const schoolYearSchema = new mongoose.Schema({
    schoolYear : { type : String, required : true, unique : true},
})

module.exports = mongoose.model('SchoolYear', schoolYearSchema)