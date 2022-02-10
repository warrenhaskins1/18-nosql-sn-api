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
get: createdAtDT => moment(createdAtDT).format("MMMM Do YYYY, h:mm a")

},
username: {
    type: String,
    required: true
},

reactions: [reactionSchema],
},
{
    toJSON: {
        getters: true,
    },
    id: false,
}

);

thoughtsSchema.virtual("reactionsCount").get(function() {
    return this.reactions.length;
});

//Check if upper or lower
const Thoughts = model("Thoughts", thoughtsSchema);

module.exports = Thoughts;