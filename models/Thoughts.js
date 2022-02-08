const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reactions")

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
reactions: [reactionSchema],
},
{
    toJSON: {
        getters: true,
    },
    id: false,
}
//NEED VIRTUAL for reactionCount that retrieves the length of the toughts reactions array
);

//Check if upper or lower
const Thoughts = model("Thoughts", thoughtsSchema);

module.exports = Thoughts;