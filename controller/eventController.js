const event = require('../models/eventModel')
const schoolYear = require('../models/schoolYearModel')

const addEvent_admin_get = (req, res) => {
    res.render('create_event', { user: req.user})
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
        .then(result => {
            console.log('After request', req.params)
            //res.json(result)
            res.render('view_event', {event : result, user: req.user, eventId : req.params.eventId})
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
    allEvents
}