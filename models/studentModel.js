const mongoose = require('mongoose')

const etudiantSchema = new mongoose.Schema({
    studentLastName : { type : String, required : true},
    studentFirstName : { type: String, required : true},
    //Ici le mailEtudiant est unique dans la base de données
    studentMail : { type : String, required : true, unique: true},
    studentPassword : { type: String, required : true},
    schoolYearId : { type: mongoose.ObjectId, required : true},
    groupId: { type: mongoose.ObjectId, ref: "groups" }
})

module.exports = mongoose.model('Student', etudiantSchema)