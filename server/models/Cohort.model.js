const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const cohortSchema = new Schema ({
    cohortSlug: String,
    cohortName: String,
    program: String,
    format: String,
    campus: String,
    startDate: Date,
    endDate: Date,
    inProgress: Boolean,
    programManager: String,
    leadTeacher: String,
    totalHours: String
})

const Cohort = mongoose.model("Cohort", cohortSchema);
 
// EXPORT THE MODEL
module.exports = Cohort;