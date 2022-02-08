const { Schema, Types} = require("mongoose");

const thoughtsSchema = new Schema({
thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280
},
createdAt: {
type: Date,
default: Date.now(),
//Need to add the getter method for the timestamp
},
username: {
    type: String,
    required: true
},
// reactions: //NEED MORE INFO
},
//NEED VIRTUAL for reactionCount that retrieves the length of the toughts reactions array
);

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;