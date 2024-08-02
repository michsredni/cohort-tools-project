const express = require("express");
const router = express.Router();

const Cohort = require("../models/Cohort.model.js");


//ruta para añadir nuevos cohorts
router.post("/", async (req, res, next) => {
  try {
    const allCohorts = await Cohort.create({
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      format: req.body.format,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      inProgress: req.body.inProgress,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours,
    });
    res.status(200).json(allCohorts);
  } catch (error) {
    res.status(500).json({ message: "Error while getting data" });
  }
});
// ruta para buscar cohorts
router.get("/", async (req, res, next) => {
  try {
    const allCohorts = await Cohort.find();
    res.status(200).json(allCohorts);
  } catch (error) {
    res.status(500).json({ message: "Error while getting data" });
  }
});
// ruta para buscar cohorts por id
router.get("/:cohortId", async (req, res, next) => {
  try {
    const cohortQuery = await Cohort.findById(req.params.cohortId);
    res.status(200).json(cohortQuery);
  } catch (error) {
    res.status(500).json({ message: "Error while getting data" });
  }
});
//ruta para editar un cohort
router.put("/:cohortId", async (req, res, next) => {
  try {
    const updateCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      {
        program: req.body.program,
        format: req.body.format,
        campus: req.body.campus,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        inProgress: req.body.inProgress,
        programManager: req.body.programManager,
        leadTeacher: req.body.leadTeacher,
        totalHours: req.body.totalHours,
      },
      { new: true }
    );
    res.status(200).json(updateCohort);
  } catch (error) {
    res.status(500).json({ message: "Error while getting data" });
    console.log(error);
  }
});
//ruta para borrar un cohort
router.delete("/:cohortId", async (req, res, next) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.status(204).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error while getting data" });
  }
});

module.exports = router;
