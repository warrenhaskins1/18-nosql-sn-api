//Schema Only
const { Schema, Types } = require("mongoose");

//Create a new instance of our Reactions Schema
const reactionsSchema = new Schema({
  //Check Syntax
  reactionId: {
    type: Schema.Types.ObjectId,
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
  toJSON: {
    getters: true,
  },
  id: false,
});

module.exports = reactionsSchema;
