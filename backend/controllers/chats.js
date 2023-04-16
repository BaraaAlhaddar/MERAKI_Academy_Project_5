const chatModel = require("../models/chats");

const createRoom = (req, res) => {
  const { chat_name } = req.body;
  const newRoom = new chatModel({ chat_name, messages: [] });
  newRoom
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `chat created`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getChatByName = (req, res) => {
  const { name } = req.params;
  chatModel
    .findOne({ chat_name: name })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `chat found`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getAllChats = (req, res) => {
  chatModel
    .find()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `all chats`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
module.exports = { createRoom, getChatByName, getAllChats };
