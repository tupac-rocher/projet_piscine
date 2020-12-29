const student = require('../models/etudiant')
const group = require('../models/groupeProjet')

async function addStudent(student){
    await student.save(function(err){
        if (err){
            console.log(err);
        }
    })
}

async function removeStudent(id){
   await student.remove({_id : Object(id)}, function(err){
       if (err){
           console.log(err);
       }
   })
}

async function allStudents(){
    return await student.find(function(err){
        if (err){
            console.log(err);
        }
    })
}

function studentById(id){
    return student.findById(id, function (err) { 
        if (err){ 
            console.log(err); 
        }
    })
}

function allStudentsWithoutGroup(){
    const all
    return student.
}