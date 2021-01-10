const express = require('express')

const etudiant = require('../models/etudiant')
const etudiantController = require('../controller/etudiantController')

const prof = require('../models/teacher')
const teacherController = require('./../controller/teacherController')

const reserver = require('./../models/reservation')
const reserverController = require('../controller/reservationController')

const creneau = require('./../models/creneau')
const creneauController = require('../controller/crenauController')

const { all } = require('./evenements')
const router = express.Router()
//--------------
const mongoose = require('mongoose')


router.get('/', async function(req, res){
    const allStudents = etudiantController.allStudents()
    const allTeachers = teacherController.allTeachers()
    const allCreneaux = creneauController.allCrenaux()
    const allReservations = reserverController.allReservation()

    console.log(allStudents)
    console.log(allTeachers)
    console.log(allCrenaux)
    console.log(allReservations)

    var allCrenauxDispo = allCrenaux
    for (let i = 0; i < allReservations.length; i++) {
        for (let j = 0; j < allCrenaux.length; j++){
            if (allReservations.idCreneau[i]==allCrenaux._id[j]){
                allCrenauxDispo.splice(j,j+1)
            }
        }
    }
    console.log(allCrenauxDispo)

   
})
//-----------------------------etu_creat_reservation------------------------
router.route('/etu_creat_reservation')
    .get(function(req,res){
        res.render('etu_creat_reservation')//{allStudents,allProfs,allCrenauxDispo}
    })
    .post(function(req, res) {
        /*
        1) créer un groupe 
        2) associe le groupe avec etudiants dans composer
        3) associe le groupe avec le crenau dans reserver
        4) associe le prof avec le crenau dans participer ????
        */
        res.send('');

      })

/*

// On crée une instance du Model
var monCommentaire = new CommentaireArticleModel({ pseudo : 'Atinux' });
monCommentaire.contenu = 'Salut, super article sur Mongoose !';
 
// On le sauvegarde dans MongoDB !
monCommentaire.save(function (err) {
  if (err) { throw err; }
  console.log('Commentaire ajouté avec succès !');
  // On se déconnecte de MongoDB maintenant
  mongoose.connection.close();
});
*/ 
module.exports = router