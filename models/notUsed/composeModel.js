const mongoose = require('mongoose')
//I don't know if this model is useful
const composeSchema = new mongoose.Schema({
    groupId : { type : mongoose.ObjectId, required : true},
    studentId : { type: mongoose.ObjectId, required : true},
})

module.exports = mongoose.model('Compose', composeSchema)