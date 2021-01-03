const mongoose = require('mongoose')

const timeSlotSchema = new mongoose.Schema({
    date : { type : Date, required : true},
    startingTime : { type: Number, required : true},
    classroom : { type : Number, required : true},
    eventId : { type: mongoose.ObjectId, required : true},
    groupId : { type: mongoose.ObjectId, required: true},
    teachersId : [{type :mongoose.ObjectId}]

})

module.exports = mongoose.model('TimeSlot', timeSlotSchema)