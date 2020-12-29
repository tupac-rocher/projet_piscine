const event = require('../models/evenement')

async function addEvent(Event){
    await Event.save(function(err){
        if (err){
            console.log(err);
        }
    })
}

async function removeEvent(id){
   await event.remove({_id : Object(id)}, function(err){
       if (err){
           console.log(err);
       }
   })
}

async function allEvents(){
    return await event.find(function(err){
        if (err){
            console.log(err);
        }
    })
}

function eventById(id){
    return event.findById(id, function (err) { 
        if (err){ 
            console.log(err); 
        }
    })
}
