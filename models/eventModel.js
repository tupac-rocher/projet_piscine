const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName : { type : String, required : true},
    startingDate : { type: Date, required : true},
    duration : { type : Number, required : true},
    maximumLimitDate : { type: Date, required : true},
    timeSlotDuration : { type: String, required : true},
    numberOfTeachers : { type: Number, required : true},
    schoolYearId : { type: mongoose.ObjectId, required : true},
    timeSlots : [{type: mongoose.ObjectId, ref: "timeSlots"}]
})

module.exports = mongoose.model('Event', eventSchema)