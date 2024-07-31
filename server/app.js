const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const mongoose = require("mongoose")

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const Cohort = require("./models/Cohort.model.js")
const Student = require("./models/Student.model.js")

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors()) // {origin: [" poner URL aca "]}
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


mongoose
.connect("mongodb://127.0.0.1:27017/cohort-tools-db")
.then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
.catch(err => console.error("Error connecting to MongoDB", err));


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// students routes

app.post("/api/students", async (req,res,next) => {
  try {
    await Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: [req.body.languages],
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: {type: Schema.Types.ObjectId},
    projects: req.body.projects
    })
    res.status(201).json({message: "Student data created"})
  } catch (error) {
    res.status(500).json({message:"Error while getting data"})
  }
})

app.get("/api/students", async (req,res,next) => {

  try {
    const allStudents = await Student.find()
    res.status(200).json(allStudents)
  } catch (error) {
    res.status(500).json({message: "Error while getting data"})
  }
})

app.get("/api/students/cohort/:cohortId", async (req,res,next) => {
  
  try {
    const studentsCohort = await Student.findById(req.params.cohortId)
    res.status(200).json(studentsCohort)
    console.log(studentsCohort)
  } catch (error) {
    res.status(500).json({message: "Error while getting data"})
    console.error(error)
  }
})

app.get("/api/students/:studentId", async (req,res,next) => {
  console.log(req.params)
  try {
    const studentQuery = await Student.findById(req.params.studentId)
    res.status(200).json(studentQuery)
  } catch (error) {
    res.status(500).json({message: "Error while getting data"})
  }
})

app.put("/api/students/:studentId", async (req,res,next) => {
  try {
    const updateStudent = await Student.findByIdAndUpdate(req.params.studentId, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: [req.body.languages],
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      cohort: {type: Schema.Types.ObjectId},
      projects: req.body.projects
    }, {new: true})
    res.status(200).json(updateStudent)
  } catch (error) {
    res.status(500).json({message: "Error while getting data"})
  }
})

app.delete("/api/students/:studentId", async (req,res,next) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId)
    res.status(204).json({message: "Deleted"})
  } catch (error) {
    res.status(500).json({message: "Error while getting data"})
  }
})

// cohorts routes
app.get("/api/cohorts", async (req,res,next) => {

  try {
    const allCohorts = await Cohort.find()
    res.status(200).json(allCohorts)
  } catch (error) {
    res.status(500).json({message: "Error while getting data"})
  }
})

app.get("/api/cohorts/:cohortId", async (req,res,next) => {
  try {
    const cohortQuery = await Cohort.findById(req.params.cohortId)
    res.status(200).json(cohortQuery)
  } catch (error) {
    res.status(500).json({message: "Error while getting data"})
  }
})

// START SERVER
const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});