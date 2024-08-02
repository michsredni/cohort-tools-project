const cookieParser = require("cookie-parser");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const Cohort = require("./models/Cohort.model.js")
const Student = require("./models/Student.model.js")

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const express = require("express");
const app = express();

const config = require("./config")
config(app)

app.use(cookieParser());

// routes
const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

// gestor de errores
const errorHandling = require("./error-handling/index.js")
errorHandling(app)

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


module.exports = app