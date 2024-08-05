const express = require("express");
const router = express.Router();

const Student = require("../models/Student.model.js");

// ruta que permite al cliente acceder a la BD

// ruta de crear un nuevo estudiante
router.post("/", async (req, res, next) => {
  try {
    await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      cohort: req.body.cohort,
      projects: req.body.projects,
    }, {
      new: true
    });
    res.status(201).json({ message: "Student data created" });
  } catch (error) {
    res.status(500).json({ message: "Error while getting data" });
  }
});

// ruta para buscar todos los estudiantes
router.get("/", async (req, res, next) => {
  try {
    const allStudents = await Student.find().populate("cohort");
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(500).json({ message: "Error while getting data" });
  }
});
// ruta para buscar un estudiante desde un cohort
router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const studentsCohort = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");
    res.status(200).json(studentsCohort);
    console.log(studentsCohort);
  } catch (error) {
    res.status(500).json({ message: "Error while getting data" });
    console.error(error);
  }
});
// ruta para buscar la info de un estudiante
router.get("/:studentId", async (req, res, next) => {
  console.log(req.params);
  try {
    const studentQuery = await Student.findById(req.params.studentId).populate(
      "cohort"
    );
    res.status(200).json(studentQuery);
  } catch (error) {
    res.status(500).json({ message: "Error while getting data" });
  }
});
//ruta para actualizar la info de un estudiante
router.put("/:studentId", async (req,res,next) => {
    try {
      const updateStudent = await Student.findByIdAndUpdate(req.params.studentId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        linkedinUrl: req.body.linkedinUrl,
        languages: req.body.languages,
        program: req.body.program,
        background: req.body.background,
        image: req.body.image,
        cohort: req.body.cohort,
        projects: req.body.projects
      }, {new: true})
      res.status(200).json(updateStudent)
    } catch (error) {
      res.status(500).json({message: "Error while getting data"})
      console.log(error)
    }
  })
//ruta para borrar un estudiante
router.delete("/:studentId", async (req,res,next) => {
    try {
      await Student.findByIdAndDelete(req.params.studentId)
      res.status(204).json({message: "Deleted"})
    } catch (error) {
      res.status(500).json({message: "Error while getting data"})
    }
  })

module.exports = router;
