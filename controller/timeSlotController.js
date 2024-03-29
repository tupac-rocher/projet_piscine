const timeSlot = require('../models/timeSlotModel')
const group = require('../models/groupModel')
const event = require('../models/eventModel')
const student = require('../models/studentModel')
const { copy } = require('../routes/eventsRoute')
const { Mongoose, isValidObjectId } = require('mongoose')

const createTimeSlot_get = async (req, res) => {
    // Check params
    if (!isValidObjectId(req.params.eventId)){
        res.redirect('/evenements')
    }
    const currentEvent = await event.findById(req.params.eventId)
    let allStudentsWithoutBookingOnEvent = []
    if (currentEvent.timeSlotDuration == "01:30"){
        try{
            const allStudents = await student.find({ schoolYearId : currentEvent.schoolYearId}).select('studentFirstName studentLastName groupsId')
            allStudentsWithoutBookingOnEvent = JSON.parse(JSON.stringify(allStudents))
            for (const student of allStudents){
                console.log("lol",student)
                if (student.groupsId.length != 0){
                    try {
                        const groupsOfStudent = await group.find({ studentsId : student._id })
                        for (const group of groupsOfStudent) {
                            try {
                                let timeSlotFromThisGroup = await timeSlot.findOne({ groupId : group._id })
                                if (timeSlotFromThisGroup.eventId.equals(req.params.eventId)){
                                    // il a déjà une réservation dans la soutenance 
                                    console.log("entré", allStudentsWithoutBookingOnEvent)
                                    console.log("id perso", student._id.toString())
                                    console.log("grande liste", allStudents[0]._id.toString())
                                    allStudentsWithoutBookingOnEvent = allStudentsWithoutBookingOnEvent.filter(studentOfArray => studentOfArray._id != student._id)
                                    console.log("après filter", allStudentsWithoutBookingOnEvent)
                                }
                            } catch (err) {
                                console.log(err)
                            }
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        } catch(err) {
            console.log(err)
        }
    }
    console.log(allStudentsWithoutBookingOnEvent)
    // Set min et max date for booking
    let eventInfo = await event.findById(req.params.eventId).select('timeSlotDuration startingDate duration')
    const minDate = eventInfo.startingDate.toISOString().split('T')[0]
    eventInfo.endingDate = new Date(eventInfo.startingDate)
    eventInfo.endingDate.setDate(eventInfo.endingDate.getDate() + eventInfo.duration - 1)
    const maxDate = eventInfo.endingDate.toISOString().split('T')[0]
    res.render('create_reservation', { allStudents : allStudentsWithoutBookingOnEvent, minDate: minDate, maxDate: maxDate, eventInfo: eventInfo, user: req.user})
}

const createTimeSlot_post = async (req, res) => {
    const eventdType = await event.findById(req.params.eventId).select('timeSlotDuration')
    let newGroup = {} 
    if (eventdType.timeSlotDuration == '01:00'){
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
    console.log("create group", newGroup)
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
                    console.log('ici ici ', result)
                    for (const studentId of result.studentsId) {
                        try {
                            await student.findByIdAndUpdate(studentId, { $push : { groupsId : {_id : savedTimeSlot.groupId } }})
                        } catch (err) {
                            console.log(err)
                        }
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


const editTimeSlot_get = async (req, res) => {
    // Check params
    if (!isValidObjectId(req.params.eventId)){
        res.redirect('/evenements')
    }
    const currentEvent = await event.findById(req.params.eventId)
    let allStudentsWithoutBookingOnEvent = []
    if (currentEvent.timeSlotDuration == "01:30"){
        try{
            const allStudents = await student.find({ schoolYearId : currentEvent.schoolYearId}).select('studentFirstName studentLastName groupsId')
            allStudentsWithoutBookingOnEvent = JSON.parse(JSON.stringify(allStudents))
            for (const student of allStudents){
                console.log("lol",student)
                if (student.groupsId.length != 0){
                    try {
                        const groupsOfStudent = await group.find({ studentsId : student._id })
                        for (const group of groupsOfStudent) {
                            try {
                                let timeSlotFromThisGroup = await timeSlot.findOne({ groupId : group._id })
                                if (timeSlotFromThisGroup.eventId.equals(req.params.eventId)){
                                    // il a déjà une réservation dans la soutenance 
                                    console.log("entré", allStudentsWithoutBookingOnEvent)
                                    console.log("id perso", student._id.toString())
                                    console.log("grande liste", allStudents[0]._id.toString())
                                    allStudentsWithoutBookingOnEvent = allStudentsWithoutBookingOnEvent.filter(studentOfArray => studentOfArray._id != student._id)
                                    console.log("après filter", allStudentsWithoutBookingOnEvent)
                                }
                            } catch (err) {
                                console.log(err)
                            }
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        } catch(err) {
            console.log(err)
        }
    }
    console.log(allStudentsWithoutBookingOnEvent)
    // Set min et max date for booking
    let eventInfo = await event.findById(req.params.eventId).select('timeSlotDuration startingDate duration')
    const minDate = eventInfo.startingDate.toISOString().split('T')[0]
    eventInfo.endingDate = new Date(eventInfo.startingDate)
    eventInfo.endingDate.setDate(eventInfo.endingDate.getDate() + eventInfo.duration - 1)
    const maxDate = eventInfo.endingDate.toISOString().split('T')[0]

    currentGroup = await group.findOne({timeSlotId : req.params.timeslotId})
    currentTimeslot = await timeSlot.findById(req.params.timeslotId)
    currentEventToDisplay = await event.findById(req.params.eventId)
    
    date=""+currentTimeslot.date.getFullYear()+"-"+ (currentTimeslot.date.getMonth()+1 < 10 ?"0"+(currentTimeslot.date.getMonth()+1):(currentTimeslot.date.getMonth()+1))+"-"+(currentTimeslot.date.getDate()< 10 ?"0"+currentTimeslot.date.getDate():currentTimeslot.date.getDate())
    allstudentsToDisplay = await student.find({groupsId : currentGroup._id})
    student.find({schoolYearId : currentEventToDisplay.schoolYearId })
    console.log(currentGroup)
    console.log(currentTimeslot)
    console.log('helloe',allstudentsToDisplay)
    console.log('hello',currentTimeslot._id)
    res.render('editer_reservation', { allStudents : allStudentsWithoutBookingOnEvent, minDate: minDate, maxDate: maxDate, eventInfo: eventInfo, user: req.user,currentGroup : currentGroup,currentTimeslot : currentTimeslot, date : date ,allstudentsToDisplay:allstudentsToDisplay,currentTimeslot : currentTimeslot})
}

const editTimeSlot_post = async (req, res) => {
    console.log('je fais bien le post')
    const eventdType = await event.findById(req.params.eventId).select('timeSlotDuration')
    let newGroup = {} 
    if (eventdType.timeSlotDuration == '01:00'){
        newGroup = {
            studentsId : [req.user._id],
            tutorLastName : req.body.tutorLastName,
            tutorFirstName : req.body.tutorFirstName,
            companyName: req.body.companyName
        }
    } else {
        newGroup = {
            studentsId : req.body.arrayOfIdStudents
    }
    }
    //Supprimer le groupe des élèves ( on leur redonne plus tard)
    currentGroup = await group.findOne({timeSlotId : req.params.timeslotId})
    currentTimeslot = await timeSlot.findById(req.params.timeslotId)
    currentEventToDisplay = await event.findById(req.params.eventId)

        listofStudents = await student.find({groupsId : currentGroup._id})
        console.log("listofstudents",listofStudents)
       for (const Student of listofStudents){
           var ListOfGroup = Student.groupsId
            var ListOfGroupUpdated = []
           for (const group of ListOfGroup) {
               if ((""+group._id) != (""+currentGroup._id)) {
                   ListOfGroupUpdated.push(group._id)
                   console.log(ListOfGroupUpdated)
               }
           }
           await student.findByIdAndUpdate(Student._id,{groupsId : ListOfGroupUpdated})
       }
    //Update du nouveau groupe
    await group.findOneAndUpdate({timeSlotId : req.params.timeslotId},newGroup)

    // Should return saved doc here
    const newTimeSlot = {
        groupId : currentGroup._id,
        date : req.body.date,
        startingTime : req.body.startingTime,
        classroom : new Number(req.body.classroom),
        eventId: req.params.eventId
    }
    await timeSlot.findByIdAndUpdate(currentTimeslot._id,newTimeSlot)
            
            
    for (const studentId of newGroup.studentsId) {
        try {
            await student.findByIdAndUpdate(studentId, { $push : { groupsId : {_id : currentGroup._id } }})
        } catch (err) {
            console.log(err)
        }
    }
    res.redirect('/evenements/'+ req.params.eventId)

        
         
}

module.exports = {
    createTimeSlot_get,
    createTimeSlot_post,
    editTimeSlot_get,
    editTimeSlot_post
}