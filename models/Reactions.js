//Schema Only
const mongoose = require("mongoose");

//Create a new instance of our Reactions Schema
const reactionsSchema = new mongoose.Schema({
  //Check Syntax
  reactionId: {
    type: ObjectId,
    default: mongoose.ObjectId,
  },
  reactionBody: {
    type: String,
    required: true,
    max: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    //NEED GETTER
  },
});

module.exports = reactionsSchema;
