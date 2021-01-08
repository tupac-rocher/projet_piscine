const composer = require('../models/composer')

async function addcomposer(composer){
    await composer.save(function(err){
        if (err){
            console.log(err);
        }
    })
}

async function removeComposer(id){
   await composer.remove({_id : Object(id)}, function(err){
       if (err){
           console.log(err);
       }
   })
}

async function allComposer(){
    return await composer.find(function(err){
        if (err){
            console.log(err);
        }
    })
}

function composerById(id){
    return composer.findById(id, function (err) { 
        if (err){ 
            console.log(err); 
        }
    })
}
// retourne une liste des objets composer d'un même groupe (retourne tous les étudiants d'un groupe)
async function composerStudentsByGroupe(id){
    return await composer.find({idGroupeProjet : Object(id)},function(err){
        if (err){
            console.log(err);
        }
    })

}
// retourne l'obje composer en rapport avec l'idetudiant ( trouve le groupe d'un étudiant)
async function composerStudentGroupe(id){
    return await composer.findOne({idEtudiant : Object(id)},function(err){
        if (err){
            console.log(err);
        }
}