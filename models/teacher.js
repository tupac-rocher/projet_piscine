const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    nameTeacher : { type : String, required : true},
    lastnameTeacher : { type: String, required : true},
})

module.exports = mongoose.model('Teacher', teacherSchema)