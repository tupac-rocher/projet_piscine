const express = require('express')
const etudiant = require('../models/etudiant')
const prof = require('./../models/prof')
const reserver = require('./../models/reservation')
const crenau = require('./../models/creneau')
const { all } = require('./evenements')
const router = express.Router()
//--------------
const mongoose = require('mongoose')


router.get('/', async function(req, res){
    const allStudents = await etudiant.find()
    const allProfs = await prof.find()
    const allCrenaux = await crenau.find()
    const allReservations = await reserver.find()
    console.log(allStudents)
    console.log(allProfs)
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
    .post

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