const { CompleteModel } = require("../models/complete.model");
const { sendResponse, sendError, sendResponseMsg } = require("../utils/responseHandle");


exports.getAllCompleted = async (req, res) => {
  try {
    const Item = await CompleteModel.find();
    sendResponse(res, 200, Item);
  } catch (err) {
    console.log(err);
    sendError(res, 401, "Sorry there is some error");
  }
};

exports.deleteCompleted = async (req, res) => {
  const id = req.params.id;
  try {
    await CompleteModel.findByIdAndDelete({ _id: id });
    sendResponseMsg(res, 200, "Deleted successfully!");
  } catch (err) {
    console.log(err);
    sendError(res, 401,err);
  }
};

exports.clear = async (req, res) => {
    try {
        await CompleteModel.deleteMany();
      sendResponseMsg(res, 200, "Clear All Completed successfully!");
    } catch (err) {
      console.log(err);
      sendError(res, 401, err);
    }
  };
