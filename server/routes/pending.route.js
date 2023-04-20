const express = require("express");
const { PendingModel } = require("../models/pending.model");
const { getAllPending, postPending, deletePending, clear } = require("../controller/pendingController");

const pendingRoute = express.Router();

pendingRoute.get("/", getAllPending);
pendingRoute.post("/add", postPending);
pendingRoute.delete("/delete/:id", deletePending);
pendingRoute.delete("/deletemany", clear);

module.exports = { pendingRoute };