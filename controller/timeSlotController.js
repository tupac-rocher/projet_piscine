const timeSlot = require('../models/timeSlotModel')
const group = require('../models/groupModel')
const event = require('../models/eventModel')
const student = require('../models/studentModel')
const createTimeSlot_get = async (req, res) => {
    const studentsWithoutGroup = await student.find({ groupId: null})
    if (studentsWithoutGroup == null) { console.log(err)}
    let eventInfo = await event.findById(req.params.eventId).select('timeSlotDuration startingDate duration')
    const minDate = eventInfo.startingDate.toISOString().split('T')[0]
    eventInfo.endingDate = new Date(eventInfo.startingDate)
    eventInfo.endingDate.setDate(eventInfo.endingDate.getDate() + eventInfo.duration)
    const maxDate = eventInfo.endingDate.toISOString().split('T')[0]
    res.render('create_reservation', { studentsWithoutGroupInThisEvent : studentsWithoutGroupInThisEvent, minDate: minDate, maxDate: maxDate, eventInfo: eventInfo, user: req.user})
}

const createTimeSlot_post = async (req, res) => {
    const eventdType = await event.findById(req.params.eventId).select('timeSlotDuration')
    let newGroup = {} 
    if (eventdType == '01:00'){
        newGroup = new group({
            studentsId : [req.user._id],
            tutorLastName : req.body.tutorLastName,
            tutorFirstName : req.body.tutorFirstName,
            companyName: req.body.companyName
        })
    } else {
        newGroup = new group({
            studentsId : req.body.arrayOfIdStudents
    })
    }
    console.log(req.body.startingTime)
    newGroup.save((err,savedGroup) => {
        if (err) { console.log(err); }
        // Should return saved doc here
        const newTimeSlot = new timeSlot({
          groupId : savedGroup._id,
          date : req.body.date,
          startingTime : req.body.startingTime,
          classroom : new Number(req.body.classroom),
          eventId: req.params.eventId
        })
        newTimeSlot.save((err, savedTimeSlot) => {
            if (err) { console.log(err); }
            console.log('yooo', savedTimeSlot)
            event.findByIdAndUpdate(req.params.eventId,{ $push: { timeSlots: { _id : savedTimeSlot._id } }})
            .then(result =>{
                console.log(result)
                group.findByIdAndUpdate(savedTimeSlot.groupId, { timeSlotId : savedTimeSlot._id })
                .then(async (result)  => {
                    for (const studentId in req.body.arrayOfIdStudents) {
                        await student.findByIdAndUpdate(req.body.arrayOfIdStudents[studentId], { $push : { groupsId : {_id : savedTimeSlot.groupId } }})
                    }
                    res.redirect('/evenements/'+ req.params.eventId)
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
            })
        })
    });
}
module.exports = {
    createTimeSlot_get,
    createTimeSlot_post
}