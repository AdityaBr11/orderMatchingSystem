exports.sendError = (res, statusCode, message) => {
  res.status(statusCode).send({
    sucess: false,
    msg: message,
  });
};

exports.sendResponse = (res, statusCode, Item) => {
  res.status(statusCode).send({
    sucess: true,
    Item,
  });
};

exports.sendResponseMsg = (res, statusCode, Msg) => {
    res.status(statusCode).send({
      sucess: true,
      msg: Msg,
    });
  };