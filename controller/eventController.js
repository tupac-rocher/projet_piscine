const { isValidObjectId } = require('mongoose')
const event = require('../models/eventModel')
const schoolYear = require('../models/schoolYearModel')
const timeSlot = require('../models/timeSlotModel')

const addEvent_admin_get = (req, res) => {
    res.render('create_event', { user: req.user})
}



const error_get = (req, res) => {
    res.render('error')
}



const addEvent_admin_post = async (req, res) => {
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
    if (req.body.type === "Projet") {
        timeSlotDuration = 1.5
    }else{
        timeSlotDuration = 1
    }
    let numberOfTeachers = 0
    if (req.body.type === "Projet") {
        numberOfTeachers = 4
    }else{
        numberOfTeachers = 3
    }
    const newEvent = new event({
    eventName : req.body.eventName,
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
    if (req.body.type === "Projet") {
        timeSlotDuration = 1.5
    }else{
        timeSlotDuration = 1
    }
    let numberOfTeachers = 0
    if (req.body.type === "Projet") {
        numberOfTeachers = 4
    }else{
        numberOfTeachers = 3
    }
    const newEvent = {
    eventName : req.body.eventName,
    startingDate : req.body.startingDate,
    duration : duration,
    maximumLimitDate : req.body.maximumLimitDate,
    timeSlotDuration : timeSlotDuration,
    numberOfTeachers : numberOfTeachers,
    schoolYearId : schoolYearObject._id
    }
    _id = req.params.eventId
    console.log('ici', req.params.eventId)
    console.log(newEvent)
    try{
        console.log(newEvent)
        event.findByIdAndUpdate({_id:_id},newEvent).then(result => { console.log(result)})

    } catch(err){
        console.log(err)
    }
}

const deleteEvent_admin_delete = (req, res) => {
    console.log(req.params.eventId)
    event.findByIdAndDelete(req.params.eventId)
        .then(result => {
            res.redirect('all_events')
        })
        .catch(err => {
            console.log(err);
        })
    
}

const eventById = (req, res) => {
    console.log('Before request',req.params)
    event.findById(req.params.eventId)
        .then(async (result) => {
            console.log(result)
            let arrayOfTimeSlots = []
            for (const timeSlotId of result.timeSlots) {
                const timeSlotToAdd = await timeSlot.findById(timeSlotId)
                arrayOfTimeSlots.push(timeSlotToAdd)
            }
            console.log('mes time slots', arrayOfTimeSlots)
            console.log('After request', req.params)
            //res.json(result)
            res.render('view_event', {event : result, arrayOfTimeSlots: arrayOfTimeSlots, user: req.user, eventId : req.params.eventId})
        })
        .catch(err => {
            console.log(err);
        })
}

const eventByIdEdit = (req, res) => {
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
            Projet = result.timeSlotDuration == 1.5 ? Projet = "checked" : Projet = ""
            Stage = result.timeSlotDuration == 1 ? Stage = "checked" : Stage = ""
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
    eventByIdEdit,
    error_get

    
}