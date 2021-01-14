const event = require('../models/eventModel')
const group = require('../models/groupModel')
const schoolYear = require('../models/schoolYearModel')
const timeSlot = require('../models/timeSlotModel')
const student = require('../models/studentModel')
const { Mongoose, isValidObjectId } = require('mongoose')

    // a and b are javascript Date objects
function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const addEvent_admin_get = (req, res) => {
    res.render('create_event', { user: req.user})
}



const addEvent_admin_post = async (req, res) => {
    const schoolYearObject = await schoolYear.findOne({schoolYear :req.body.schoolYear})
    console.log("object", schoolYearObject)
    const duration = dateDiffInDays(new Date(req.body.startingDate), new Date(req.body.finishDate));
    console.log('startingDate : ' + req.body.startingDate)
    console.log('endingDate : ' + req.body.finishDate)
    let timeSlotDuration = 0
    let numberOfTeachers = 0
    let eventName = req.body.eventName
    if (req.body.type === "Projet") {
        timeSlotDuration = "01:30"
        numberOfTeachers = 4
        eventName = eventName + ' - Projet('+schoolYearObject.schoolYear+')'
    }else{
        timeSlotDuration = "01:00"
        numberOfTeachers = 3
        eventName = eventName + ' - Stage('+schoolYearObject.schoolYear+')'
    }
    const newEvent = new event({
    eventName : eventName,
    startingDate : req.body.startingDate,
    duration : duration,
    maximumLimitDate : req.body.maximumLimitDate,
    timeSlotDuration : timeSlotDuration,
    numberOfTeachers : numberOfTeachers,
    schoolYearId : schoolYearObject._id
    })
    console.log(newEvent)
    try{
        newEvent.save()
            .then(result => {
                res.redirect('/evenements')
            })
            .catch(err => {
                console.log(err);
            })

    } catch(err){
        console.log(err)
    }
}

const editEvent_admin_post = async (req, res) => {
    const schoolYearObject = await schoolYear.findOne({schoolYear :req.body.schoolYear})
    console.log("object", schoolYearObject)
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // a and b are javascript Date objects
    function dateDiffInDays(a, b) {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
    const duration = dateDiffInDays(new Date(req.body.startingDate), new Date(req.body.finishDate));
    let timeSlotDuration = 0
    let numberOfTeachers = 0
    let eventName = req.body.eventName
    if (req.body.type === "Projet") {
        timeSlotDuration = "01:30"
        numberOfTeachers = 4
        eventName = eventName + ' - Projet('+schoolYearObject.schoolYear+')'
    }else{
        timeSlotDuration = "01:00"
        numberOfTeachers = 3
        eventName = eventName + ' - Stage('+schoolYearObject.schoolYear+')'
    }
    const newEvent = {
    eventName : eventName,
    startingDate : req.body.startingDate,
    duration : duration,
    maximumLimitDate : req.body.maximumLimitDate,
    timeSlotDuration : timeSlotDuration,
    numberOfTeachers : numberOfTeachers,
    schoolYearId : schoolYearObject._id
    }
    _id = req.params.eventId
    console.log(newEvent)
    try{
        
        await event.findByIdAndUpdate(_id,newEvent).then(result =>{
            res.redirect('/evenements')
        })

    } catch(err){
        console.log(err)
    }
}

const deleteEvent_admin_delete = async (req, res) => {
    console.log("je fais ce que l'on me demmande ")
    console.log(req.params.eventId)

    timeSlotToDelete = await timeSlot.find({eventId:req.params.eventId})

    for (const timeslot of timeSlotToDelete){
         GroupToDelete = await group.findOne({timeSlotId : timeslot._id })
         console.log("groupetodelte",GroupToDelete)
         listofStudents = await student.find({groupsId : GroupToDelete._id})
         console.log("listofstudents",listofStudents)
        for (const Student of listofStudents){
            console.log("students",Student)
            var ListOfGroup = Student.groupsId
            console.log('avant',ListOfGroup)
            console.log(GroupToDelete)

            var ListOfGroupUpdated = []
            for (const group of ListOfGroup) {
                if ((""+group._id) != (""+GroupToDelete._id)) {
                    ListOfGroupUpdated.push(group._id)
                    console.log(ListOfGroupUpdated)
                }
            }
            //ListOfGroupUpdated = ListOfGroup.filter(group => group._id != GroupToDelete._id )

            console.log('apres',ListOfGroupUpdated)
            await student.findByIdAndUpdate(Student._id,{groupsId : ListOfGroupUpdated})
        }
        await group.findByIdAndDelete(GroupToDelete._id)


    }
    await timeSlot.deleteMany({ eventId: req.params.eventId })
    await event.findByIdAndDelete(req.params.eventId)

        .then(result => {

            res.redirect('/evenements')
        })
        .catch(err => {
            console.log(err);
        })

}

const eventById = (req, res) => {
    // Check params
    if (!isValidObjectId(req.params.eventId)){
        res.redirect('/evenements')
    }
    event.findById(req.params.eventId)
        .then(async (result) => {
            // Check number of days left to book
            let daysLeftToBook = dateDiffInDays(new Date(Date.now()),new Date(result.maximumLimitDate)) + 1
            if (daysLeftToBook <= 0) {
                datysLeftToBook = 0
            }
            // Check if id, schoolyear of event are the same from the student logged in,  (à mettre dans le middlewaare ?)
            let authorizedToBook = true
            let rightSchoolYear = true
            if (typeof req.user.adminPseudo != "undefined"){
                authorizedToBook = false
            }
            else {
                const studentLoggedIn = await student.findById(req.user._id)
                 if (result.schoolYearId != req.user.schoolYearId){
                    authorizedToBook = false
                    rightSchoolYear = false
                } else if (studentLoggedIn.groupsId.length != 0){
                    try{
                        const groupsOfStudent = await group.find({ studentsId : studentLoggedIn._id })
                        console.log('Group', groupsOfStudent)
                        for (const group of groupsOfStudent) {
                            try {
                                const timeSlotFromThisGroup = await timeSlot.findOne({ groupId : group._id })
                                if (timeSlotFromThisGroup.eventId.equals(result._id)){
                                    authorizedToBook = false                            
                                }
                            } catch (err) {
                                console.log(err)
                            }

                        }
                        if (daysLeftToBooked = 0){
                            authorizedToBook = false
                        }
                    } catch (err) {
                        console.log(err)
                    }

                }
            }

            let arrayOfTimeSlots = []
            for (const timeSlotId of result.timeSlots) {
                try {
                    const timeSlotToProcess = await timeSlot.findById(timeSlotId)
                    // Starting Time
                    const time = timeSlotToProcess.startingTime.split(':')
                    let timeSlotStart = new Date(timeSlotToProcess.date)
                    console.log(timeSlotStart)
                    timeSlotStart.setHours(time[0])
                    timeSlotStart.setMinutes(time[1])
                    console.log('ici',timeSlotStart)
                    // Ending Time
                    const timeDuration = result.timeSlotDuration.split(':')
                    let timeSlotEnd = new Date(timeSlotStart)
                    // ICI PROBLEME
                    console.log(timeDuration)
                    timeSlotEnd.setHours(timeSlotEnd.getHours() + parseInt(timeDuration[0]))
                    timeSlotEnd.setMinutes(timeSlotEnd.getMinutes() + parseInt(timeDuration[1]))
                    console.log(timeSlotEnd)
                    const timeSlotToAdd = {
                        title : timeSlotToProcess.classroom,
                        start : timeSlotStart,
                        end : timeSlotEnd
                    }
                    arrayOfTimeSlots.push(timeSlotToAdd)
                } catch (err) {
                    console.log(err)
                }
            }
         
            console.log("yo")
            let TheTimeSlot = {}
            if (typeof req.user.adminPseudo == "undefined"){
                try{
                    studentForEditReservation = await student.findById(req.user._id)
                    GroupsOfStudents = studentForEditReservation.groupsId
                    try {
                        allTimeSlot = await timeSlot.find({eventId : req.params.eventId})
                        TheTimeSlot = await timeSlot.findOne({ groupId : { $in : GroupsOfStudents }})
                    } catch (e) {
                        console.log(e)
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            //res.json(result)
            res.render('view_event', {event : result, arrayOfTimeSlots: arrayOfTimeSlots, user: req.user, eventId : req.params.eventId,rightSchoolYear: rightSchoolYear, authorizedToBook : authorizedToBook, daysLeftToBook :daysLeftToBook, TheTimeSlot : TheTimeSlot})
        })
        .catch(err => {
            console.log(err);
        })
}

const eventByIdEdit = (req, res) => {
    // Check params
    if (!isValidObjectId(req.params.eventId)){
        res.redirect('/evenements')
    }
    console.log('Before request',req.params)
    event.findById(req.params.eventId)
        .then(result => {
            console.log('After request', req.params)
            //res.json(result)
            // conversion des dates 
            maximumLimitDate=""+result.maximumLimitDate.getFullYear()+"-"+ (result.maximumLimitDate.getMonth()+1 < 10 ?"0"+(result.maximumLimitDate.getMonth()+1):(result.maximumLimitDate.getMonth()+1))+"-"+(result.maximumLimitDate.getDate()< 10 ?"0"+result.maximumLimitDate.getDate():result.maximumLimitDate.getDate())
            startingDate=""+result.startingDate.getFullYear()+"-"+ (result.startingDate.getMonth()+1 < 10 ?"0"+(result.startingDate.getMonth()+1):(result.startingDate.getMonth()+1))+"-"+(result.startingDate.getDate()< 10 ?"0"+result.startingDate.getDate():result.startingDate.getDate())
            endDate =""+result.startingDate.getFullYear()+"-"+ (result.startingDate.getMonth()+1 < 10 ?"0"+(result.startingDate.getMonth()+1):(result.startingDate.getMonth()+1))+"-"+(result.startingDate.getDate()< 10 ?"0"+result.startingDate.getDate():result.startingDate.getDate())
            mois = result.startingDate.getMonth()+1 
            jour = result.startingDate.getDate() + Math.trunc(result.duration)
            ans = result.startingDate.getFullYear()
            if (jour > 31) {
                jour - 31 * (jour%31);
                mois = mois + jour%31
                if (mois > 12) {
                    mois = mois - 12 * (mois%12);
                    ans = ans + (mois%12)
                }
              }
            endDate = "" + ans + "-" + (mois < 10 ? "0" + mois : "" + mois) + "-" + (jour < 10 ? "0" + jour : "" + jour)
            console.log(endDate)
            // Construction des Promos 
            IG3 = result.schoolYearId == "5feb77f8b2c296d338c8fdfb" ? IG3 = "checked" : IG3 = ""
            IG4 = result.schoolYearId == "5feb7806b2c296d338c8fdfc" ? IG4 = "checked" : IG4 = ""
            IG5 = result.schoolYearId == "5feb781eb2c296d338c8fdfd" ? IG5 = "checked" : IG5 = ""
            // Construction projet / Stage 
            Projet = result.timeSlotDuration == "01:30"? Projet = "checked" : Projet = ""
            Stage = result.timeSlotDuration == "01:00" ? Stage = "checked" : Stage = ""
            res.render('admin_edit_event', {event : result,endDate :endDate, maximumLimitDate : maximumLimitDate ,startingDate : startingDate ,IG3 : IG3 ,IG4 : IG4 ,IG5 : IG5 ,Stage : Stage,Projet : Projet})
        })
        .catch(err => {
            console.log(err);
        })
}



const allEvents = (req, res) => {
    event.find()
        .then(result => {
            res.render('all_events', {allEvents : result, user: req.user})
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = {
    addEvent_admin_get,
    addEvent_admin_post,
    deleteEvent_admin_delete,
    eventById,
    allEvents,
    editEvent_admin_post,
    eventByIdEdit
    
}