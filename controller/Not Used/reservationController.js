const reservation = require('../models/reservation')

async function addReservation(reservation){
    await reservation.save(function(err){
        if (err){
            console.log(err);
        }
    })
}

async function removeReservation(id){
   await reservation.remove({_id : Object(id)}, function(err){
       if (err){
           console.log(err);
       }
   })
}

async function allReservation(){
    return await reservation.find(function(err){
        if (err){
            console.log(err);
        }
    })
}

function reservationById(id){
    return reservation.findById(id, function (err) { 
        if (err){ 
            console.log(err); 
        }
    })
}

// retourne un objet reservation correspondant à un groupe ( trouve le creneau associé à un groupe)
async function reservationGroupeProjet(id){
    return await reservation.findOne({idGroupeProjet : Object(id)},function(err){
        if (err){
            console.log(err);
        }
    })

}
// retourne un objet reservation correspondant à u crenau ( trouve le groupe associé au creneau)
async function reservationCrenau(id){
    return await composer.findOne({idCreneau : Object(id)},function(err){
        if (err){
            console.log(err);
        }})}