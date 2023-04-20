const express = require("express");
const { getAllPending, postPending, deletePending, clear } = require("../controller/pendingController");

const pendingRoute = express.Router();

pendingRoute.get("/", getAllPending);
pendingRoute.post("/add", postPending);
pendingRoute.delete("/delete/:id", deletePending);
pendingRoute.delete("/deletemany", clear);

module.exports = { pendingRoute };