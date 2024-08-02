function config(app) {
    const express = require("express");
    const morgan = require("morgan");
    const cors = require("cors")

    // MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors()) // {origin: [" poner URL aca "]}
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

}

module.exports = config;