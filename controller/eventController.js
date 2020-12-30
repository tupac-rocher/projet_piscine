const event = require('../models/eventModel')
const schoolYear = require('../models/schoolYearModel')

const addEvent_admin_get = (req, res) => {
    res.render('create_event')
}

const addEvent_admin_post = async (req, res) => {
    const schoolYearObject = await schoolYear.findOne({schoolYear :req.body.schoolYear})
    console.log("object", schoolYearObject)
    const newEvent = new event({
    eventName : req.body.eventName,
    startingDate : req.body.startingDate,
    duration : req.body.duration,
    maximumLimitDate : req.body.maximumLimitDate,
    timeSlotDuration : req.body.timeSlotDuration,
    numberOfTeachers : req.body.numberOfTeachers,
    schoolYearId : schoolYearObject._id
    })
    try{
        newEvent.save()
            .then(result => {
                res.redirect('admin_all_events')
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
            res.redirect('admin_all_events')
        })
        .catch(err => {
            console.log(err);
        })
    
}

const eventById = (req, res) => {
    console.log(req.params)
    event.findById(req.params.eventId)
        .then(result => {
            res.json(result)
            //res.render('admin_view_event', {event : result})
        })
        .catch(err => {
            console.log(err);
        })
}

const allEvents = (req, res) => {
    event.find()
        .then(result => {
            res.render('admin_all_events', {allEvents : result})
        })
}

module.exports = {
    addEvent_admin_get,
    addEvent_admin_post,
    deleteEvent_admin_delete,
    eventById,
    allEvents
}