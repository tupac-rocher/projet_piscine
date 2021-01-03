const express = require('express')
const evenement = require('../models/evenement')
const router = express.Router()

var MongoObjectID = require("mongodb").ObjectID;          // Necessaire pour gérer les ID mongoDB


//Juste pour tester que les évenements se crée dans le base de donnée quand je get localhost:5000/evenement/ -> résultat ok
router.get('/', async (req, res) => {
    res.send('Events')
    const evenementtest = new evenement({
        nomEvenement : 'TestNom',
        dateDebut : new Date,
        duree: 7,
        dateLimiteMax : new Date,
        dureeCreneau : 60,
        nombreMembreJury : 3,
        anneePromo : 3
    })
    console.log(evenementtest)
    try{
        // cette fonction appelé sur mon instance du model evenement sauvegarde mon instance dans la base de donnée
        await evenementtest.save()
    } catch(e) {
        console.log(e)
    }
})




//----------------------------admin_all_events---------------------------------
router.route('/admin_all_events')
    .get(function(req,res){
        let tabl=getAllEvents()
        res.render('admin_all_events')//{nomEvenemnt1:tabl[0].id,nomEvenement:table[0].nomEvenement...}
    })

// recupère tous les evenemenst de la base de données sous forme de tableau 
async function getAllEvents(){
    try {
        const tryingGetAllEvents = await evenement.find()
        console.log(tryingGetAllEvents)
        return tryingGetAllEvents
    } catch(e){console.log(e) }
}
//----------------------------admin_view_event---------------------------------
router.route('/admin_view_event/:_id')
    .get(function(req,res){
        let event = getEventWithID(req.params._id) //suppose que id=53dfe7bbfd06f94c156ee96e dans HTML
        res.render('admin_view_event')//{var1:event.id....}
    })

//recupere un evenement grâce à son ID ( doit être un string)    
async function getEventWithID(id){
    try{
    console.log(id)
    const tryingGetEvent = await evenement.findById(id)
    console.log(tryingGetEvent)
    return tryingGetEvent
    }catch(e){console.log(e)}
}

//------------------------------student_event--------------------------------
router.route('/student_event')
    .get(function(req,res){
        let event = getEventWithID(req.query.id) //suppose que id=53dfe7bbfd06f94c156ee96e dans HTML
        res.render('student_event')//{var1:event.id....}
    })

//-----------------------------etu_creat_reservation------------------------
router.route('/etu_creat_reservation')


module.exports = router