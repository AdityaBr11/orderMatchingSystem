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
        if (Matched.Qty == Qty) {
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
        } else if (Matched.Qty > Qty) {
          let stay = Matched.Qty - Qty;
          let sendToComplete = Matched.Qty - stay;

          const stayPayload = {
            Type: Matched.Type,
            Qty: stay,
            Price: Matched.Price,
          };
          const sendPayload = {
            ref: Matched._id,
            Type: "Seller",
            Qty: sendToComplete,
            Price: Matched.Price,
          };
          await PendingModel.findByIdAndUpdate(
            { _id: Matched._id },
            stayPayload
          );
          await CompleteModel.create(sendPayload);
          sendResponseMsg(
            res,
            200,
            "Buyers have more stocks than seller,seller added into complete"
          );
        } else if (Matched.Qty < Qty) {
          let stay = Qty - Matched.Qty;
          let sendToComplete = Matched.Qty - stay;

          const stayPayload = {
            Type: "Seller",
            Qty: stay,
            Price: Matched.Price,
          };
          const sendPayload = {
            ref: Matched._id,
            Type: Matched.Type,
            Qty: sendToComplete,
            Price: Matched.Price,
          };
          await PendingModel.findByIdAndUpdate(
            { _id: Matched._id },
            stayPayload
          );
          await CompleteModel.create(sendPayload);
          sendResponseMsg(
            res,
            200,
            "Seller have more stocks than buyer,buyer added into complete"
          );
        }
      } else {
        const data = new PendingModel({ Type, Qty, Price });
        await data.save();
        sendResponseMsg(res, 200, "Added successfully!");
      }
    } else if (Type == "Buyer") {
      const data = await PendingModel.find({ Type: "Seller" });
      const Matched = data.find((item) => item.Price == Price);
      if (Matched) {
        if (Matched.Qty == Qty) {
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
            "Buyer price matched with seller price so its completed!"
          );
        } else if (Matched.Qty > Qty) {
          let stay = Matched.Qty - Qty;
          let sendToComplete = Matched.Qty - stay;

          const stayPayload = {
            Type: Matched.Type,
            Qty: stay,
            Price: Matched.Price,
          };
          const sendPayload = {
            ref: Matched._id,
            Type: "Buyer",
            Qty: sendToComplete,
            Price: Matched.Price,
          };
          await PendingModel.findByIdAndUpdate(
            { _id: Matched._id },
            stayPayload
          );
          await CompleteModel.create(sendPayload);
          sendResponseMsg(
            res,
            200,
            "Seller have more stocks than buyer,buyer added into complete"
          );
        } else if (Matched.Qty < Qty) {
          let stay = Qty - Matched.Qty;
          let sendToComplete = Matched.Qty - stay;

          const stayPayload = {
            Type: "Buyer",
            Qty: stay,
            Price: Matched.Price,
          };
          const sendPayload = {
            ref: Matched._id,
            Type: Matched.Type,
            Qty: sendToComplete,
            Price: Matched.Price,
          };
          await PendingModel.findByIdAndUpdate(
            { _id: Matched._id },
            stayPayload
          );
          await CompleteModel.create(sendPayload);
          sendResponseMsg(
            res,
            200,
            "Buyer have more stocks than seller,seller added into complete"
          );
        }
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

//   const { Type, Qty, Price } = req.body;
//   try {
//     //this condition checks the price qty if someone added the data as a Seller
//     if (Type == "Seller") {
//       const data = await PendingModel.find({ Type: "Buyer" });
//       const Matched = data.find((item) => item.Price == Price);
//       if (Matched) {
//         // this condition checked if the qty of buyer greater than the seller then
//         //the remaining qty should updated in the buyer and left has been added into
//         //complete with type as a seller
//         if (Matched.Qty > Qty) {
//           let stay = Matched.Qty - Qty;
//           let sendToComplete = Matched.Qty - stay;

//           const stayPayload = {
//             Type: Matched.Type,
//             Qty: stay,
//             Price: Matched.Price,
//           };
//           const sendPayload = {
//             ref: Matched._id,
//             Type: "Seller",
//             Qty: sendToComplete,
//             Price: Matched.Price,
//           };
//           await PendingModel.findByIdAndUpdate(
//             { _id: Matched._id },
//             stayPayload
//           );
//           await CompleteModel.create(sendPayload);
//           sendResponseMsg(
//             res,
//             200,
//             "Buyers have more stocks than seller,seller added into complete"
//           );
//         } else if (Matched.Qty < Qty) {
//           let stay = Qty - Matched.Qty;
//           let sendToComplete = Matched.Qty - stay;

//           const stayPayload = {
//             Type: "Seller",
//             Qty: stay,
//             Price: Matched.Price,
//           };
//           const sendPayload = {
//             ref: Matched._id,
//             Type: Matched.Type,
//             Qty: sendToComplete,
//             Price: Matched.Price,
//           };
//           await PendingModel.findByIdAndUpdate(
//             { _id: Matched._id },
//             stayPayload
//           );
//           await CompleteModel.create(sendPayload);
//           sendResponseMsg(
//             res,
//             200,
//             "Seller have more stocks than buyer,buyer added into complete"
//           );
//         } else if (Matched.Qty === Qty) {
//           await CompleteModel.create({
//             ref: Matched._id,
//             Type: Matched.Type,
//             Qty: Matched.Qty,
//             Price: Matched.Price,
//           });
//           await PendingModel.findByIdAndDelete(Matched._id);
//           sendResponseMsg(
//             res,
//             200,
//             "Seller price matched with Buyer price so its completed!"
//           );
//         } else {
//         const data = await PendingModel.create({ Type, Qty, Price });
//         sendResponseMsg(res, 200, "Added successfully!");
//         }
//       }
//     } else if (Type == "Buyer") {
//       const data = await PendingModel.find({ Type: "Seller" });
//       const Matched = data.find((item) => item.Price == Price);
//       if (Matched) {
//         if (Matched.Qty > Qty) {
//           let stay = Matched.Qty - Qty;
//           let sendToComplete = Matched.Qty - stay;

//           const stayPayload = {
//             Type: Matched.Type,
//             Qty: stay,
//             Price: Matched.Price,
//           };
//           const sendPayload = {
//             ref: Matched._id,
//             Type: "Buyer",
//             Qty: sendToComplete,
//             Price: Matched.Price,
//           };
//           await PendingModel.findByIdAndUpdate(
//             { _id: Matched._id },
//             stayPayload
//           );
//           await CompleteModel.create(sendPayload);
//           sendResponseMsg(
//             res,
//             200,
//             "Seller have more stocks than buyer, added into complete"
//           );
//         } else if (Matched.Qty < Qty) {
//           let stay = Qty - Matched.Qty;
//           let sendToComplete = Matched.Qty - stay;

//           sendResponse(res, 200, { stay: stay, send: sendToComplete });

//           const stayPayload = {
//             Type: "Buyer",
//             Qty: stay,
//             Price: Matched.Price,
//           };
//           const sendPayload = {
//             ref: Matched._id,
//             Type: "Seller",
//             Qty: send,
//             Price: Matched.Price,
//           };
//           await PendingModel.findByIdAndUpdate(
//             { _id: Matched._id },
//             stayPayload
//           );
//           await CompleteModel.create(sendPayload);
//           sendResponseMsg(
//             res,
//             200,
//             "Buyer have add stocks that is more than matched stock, matched qty moved to completed"
//           );
//         } else if (Matched.Qty == Qty) {
//           await CompleteModel.create({
//             ref: Matched._id,
//             Type: Matched.Type,
//             Qty: Matched.Qty,
//             Price: Matched.Price,
//           });
//           await PendingModel.findByIdAndDelete(Matched._id);
//           sendResponseMsg(
//             res,
//             200,
//             "Buyer price matched with Seller price so its completed!"
//           );
//         }
//       }
//     } else {
//       const data = new PendingModel({ Type, Qty, Price });
//       await data.save();
//       sendResponseMsg(res, 200, "Added successfully!");
//     }
//   } catch (err) {
//     console.log(err);
//     sendError(res, 401, err);
//   }
// };

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
