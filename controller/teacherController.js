const teacher = require('../models/teacherModel')

async function addteacher(teacher){
    await teacher.save(function(err){
        if (err){
            console.log(err);
        }
    })
}

async function removeteacher(id){
   await teacher.remove({_id : Object(id)}, function(err){
       if (err){
           console.log(err);
       }
   })
}

module.exports = async function allTeachers(){
    try{
        const allTeacher = await teacher.find()
    } catch(err) {
        console.log(err);
    }
}

function teacherById(id){
    return teacher.findById(id, function (err) { 
        if (err){ 
            console.log(err); 
        }
    })
}
