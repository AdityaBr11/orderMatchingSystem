const express = require("express");
const { CompleteModel } = require("../models/complete.model");
const { getAllCompleted, deleteCompleted, clear } = require("../controller/completeController");

const completeRoute = express.Router();


completeRoute.get("/", getAllCompleted);
completeRoute.delete("/delete/:id", deleteCompleted);
completeRoute.delete("/deletemany", clear);

module.exports = { completeRoute };