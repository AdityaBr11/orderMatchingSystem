const mongoose = require("mongoose");

const OrderType = {
  Buyer: "Buyer",
  Seller: "Seller",
};
const CompleteSchema = mongoose.Schema({
  ref:String,
  Type: String,
  Qty: Number,
  Price: Number,
});

const CompleteModel = mongoose.model("completeOrder", CompleteSchema);

module.exports = {
  CompleteModel,
};
