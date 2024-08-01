const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const studentSchema = new Schema ({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: [String],
    program: String,
    background: String,
    image: String,
    cohort: {type: Schema.Types.ObjectId, ref: "Cohort"},
    projects: Array
})

const Student = mongoose.model("Student", studentSchema);
 
// EXPORT THE MODEL
module.exports = Student;