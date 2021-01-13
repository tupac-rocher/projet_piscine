const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    tutorLastName : { type : String},
    tutorFirstName : { type: String},
    companyName : { type : String},
    teacherId : { type: mongoose.ObjectId},
    timeSlotId : { type: mongoose.ObjectId},
    studentsId : [{ type: mongoose.ObjectId, ref: "students"}]
})

module.exports = mongoose.model('Group', groupSchema)