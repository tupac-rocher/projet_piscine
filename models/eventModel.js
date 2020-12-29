const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName : { type : String, required : true},
    startingDate : { type: Date, required : true},
    duration : { type : Number, required : true},
    maximumLimitDate : { type: Date, required : true},
    timeSlotDuration : { type: Number, required : true},
    numberOfTeachers : { type: Number, required : true},
    schoolYearId : { type: mongoose.ObjectId, required : true},
})

module.exports = mongoose.model('Event', eventSchema)