//Schema Only
const { Schema, Types } = require("mongoose");
const moment = require("moment");

//Create a new instance of our Reactions Schema
const reactionsSchema = new Schema({
  
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
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
    get: (createdAtDT) => moment(createdAtDT).format("MMMM Do YYYY, h:mm a"),
  },
},
{
  toJSON: {
    getters: true,
  },
  id: false,
}
  
);

module.exports = reactionsSchema;
