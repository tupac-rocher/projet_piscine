const timeSlot = require('../models/timeSlotModel')
const group = require('../models/groupModel')
const event = require('../models/eventModel')
const createTimeSlot_get = (req, res) => {
    res.render('etu_creat_reservation')
}

const createTimeSlot_post = (req, res) => {
    console.log(req.body)
    const newGroup = new group({
        studentsId : req.body.arrayOfIdStudents
    })
    newGroup.save((err,savedGroup) => {
        if (err) { console.log(err); }
        // Should return saved doc here
        const newTimeSlot = new timeSlot({
          groupId : savedGroup._id,
          date : req.body.date,
          startingTime : new Date(req.body.startingTime).getDate(),
          classroom : new Number(req.body.classroom),
          eventId: req.params.eventId
        })
        newTimeSlot.save((err, savedTimeSlot) => {
            if (err) { console.log(err); }
            event.findByIdAndUpdate(req.params.eventId,{ $push: { timeSlots: { _id : savedTimeSlot._id } }})
        })
    });
}
module.exports = {
    createTimeSlot_get,
    createTimeSlot_post
}