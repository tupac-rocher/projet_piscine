const crenau = require('../models/crenau')

async function addCrenau(crenau){
    await crenau.save(function(err){
        if (err){
            console.log(err);
        }
    })
}

async function removeCrenau(id){
   await crenau.remove({_id : Object(id)}, function(err){
       if (err){
           console.log(err);
       }
   })
}

async function allCrenaux(){
    return await crenau.find(function(err){
        if (err){
            console.log(err);
        }
    })
}

function crenauById(id){
    return crenau.findById(id, function (err) { 
        if (err){ 
            console.log(err); 
        }
    })}