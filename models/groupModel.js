const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    tutorLastName : { type : String, required : true},
    tutorFirstName : { type: String, required : true},
    CompanyName : { type : String, required : true},
    teacherId : { type: mongoose.ObjectId, required : true},
    timeSlotId : { type: mongoose.ObjectId, required : true},
    students : [{ type: mongoose.ObjectId, ref: "students"}]
})

module.exports = mongoose.model('Group', groupSchema)