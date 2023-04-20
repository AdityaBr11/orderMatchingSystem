const mongoose = require("mongoose");

const OrderType = {
  Buyer: "Buyer",
  Seller: "Seller",
};

const PendingSchema = mongoose.Schema({
  Type: {
    type: String,
    enum: [OrderType.Buyer, OrderType.Seller],
    required: true,
  },
  Qty: { type: Number, required: true },
  Price: { type: Number, required: true },
});

const PendingModel = mongoose.model("pendingOrder", PendingSchema);

module.exports = {
  PendingModel,
};
