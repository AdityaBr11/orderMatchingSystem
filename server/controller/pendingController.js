const { CompleteModel } = require("../models/complete.model");
const { PendingModel } = require("../models/pending.model");
const {
  sendResponse,
  sendError,
  sendResponseMsg,
} = require("../utils/responseHandle");

exports.getAllPending = async (req, res) => {
  try {
    const Item = await PendingModel.find();
    sendResponse(res, 200, Item);
  } catch (err) {
    console.log(err);
    sendError(res, 401, "sorry there is some error");
  }
};

exports.postPending = async (req, res) => {
  const { Type, Qty, Price } = req.body;
  try {
    // await PendingModel.insertMany(payload);
    if (Type == "Seller") {
      const data = await PendingModel.find({ Type: "Buyer" });
      const Matched = data.find((item) => item.Price == Price);
      if (Matched) {
        await CompleteModel.create({
          ref: Matched._id,
          Type: Matched.Type,
          Qty: Matched.Qty,
          Price: Matched.Price,
        });
        await PendingModel.findByIdAndDelete(Matched._id);
        // sendResponse(res,200,Matched);
        sendResponseMsg(
          res,
          200,
          "Seller price matched with Buyer price so its completed!"
        );
      } else {
        const data = new PendingModel({ Type, Qty, Price });
        await data.save();
        sendResponseMsg(res, 200, "Added successfully!");
      }
    } else if (Type == "Buyer") {
      const data = await PendingModel.find({ Type: "Seller" });
      const Matched = data.find((item) => item.Price == Price);
      if (Matched) {
        await CompleteModel.create({
          ref: Matched._id,
          Type: Matched.Type,
          Qty: Matched.Qty,
          Price: Matched.Price,
        });
        await PendingModel.findByIdAndDelete(Matched._id);
        sendResponseMsg(
          res,
          200,
          "Buyer price matched with Seller price so its completed!"
        );
      } else {
        const data = new PendingModel({ Type, Qty, Price });
        await data.save();
        sendResponseMsg(res, 200, "Added successfully!");
      }
    }
  } catch (err) {
    console.log(err);
    sendError(res, 401, err);
  }
};

exports.deletePending = async (req, res) => {
  const id = req.params.id;
  try {
    await PendingModel.findByIdAndDelete({ _id: id });
    sendResponseMsg(res, 200, "Deleted successfully!");
  } catch (err) {
    console.log(err);
    sendError(res, 401, err);
  }
};

exports.clear = async (req, res) => {
  try {
    await PendingModel.deleteMany();
    sendResponseMsg(res, 200, "Clear All Pending successfully!");
  } catch (err) {
    console.log(err);
    sendError(res, 401, err);
  }
};
