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
    const tryingGetAllEvents = await evenement.find()
    console.log(tryingGetAllEvents)
    //let tabl_events = db.collection("evenements").find().toArray(function (error, results) {      //on cherche tous les evenements
        //if (error) throw error;

        /*results.forEach(function(i, obj) { // resultat afficher sous forme de tableau avec ID , nomEvenement....
            console.log(
                "ID : "  + obj._id.toString() + "\n", // 53dfe7bbfd06f94c156ee96e
                "nomEvenement : " + obj.nomEvenement + "\n",           // TestNom
                "dateDebut : " + obj.dateDebut ,                 // 2020-12-17T10:20:03.919+00:00
                "duree" + obj.duree,                         //7
                "dateLimiteMax" +obj.dateLimiteMax,              //2020-12-17T10:20:03.919+00:00
                "dureeCrenau" +obj.dureeCreneau,                 //60
                "nombreMembreJury" +obj.nombreMembreJury,        // 3
                "anneePromo" +obj.anneePromo,                    //2020
            );
        });
    });*/
    return tryingGetAllEvents
}
//----------------------------admin_view_event---------------------------------
router.route('/admin_view_event/:_id')
    .get(function(req,res){
        let event = getEventWithID(req.params._id) //suppose que id=53dfe7bbfd06f94c156ee96e dans HTML
        //res.render('admin_view_event')//{var1:event.id....}
    })

//recupere un evenement grâce à son ID ( doit être un string)    
async function getEventWithID(id){
    console.log(id)
    //var objToFind     = { _id: MongoObjectID(id) };
    //console.log(objToFind) // ID transformée en ObjectID
    const tryingGetEvent = await evenement.findById(id)
    //let event = db.collection("evenements").findOne(objToFind, function(error, result) {
        /*if (error) throw error;
    
        console.log(
            "ID : "  + obj._id.toString() + "\n", // 53dfe7bbfd06f94c156ee96e
            "nomEvenement : " + obj.nomEvenement + "\n",           // TestNom
            "dateDebut : " + obj.dateDebut,                  // 2020-12-17T10:20:03.919+00:00
            "duree" + obj.duree,                             //7
            "dateLimiteMax" +obj.dateLimiteMax,              //2020-12-17T10:20:03.919+00:00
            "dureeCrenau" +obj.dureeCreneau,                 //60
            "nombreMembreJury" +obj.nombreMembreJury,        // 3
            "anneePromo" +obj.anneePromo                    //2020
        );   
    });*/
    console.log(tryingGetEvent)
    return tryingGetEvent
}

//student_event
router.route('/student_event')
    .get(function(req,res){
        let event = getEventWithID(req.query.id) //suppose que id=53dfe7bbfd06f94c156ee96e dans HTML
        res.render('student_event')//{var1:event.id....}
    })


module.exports = router