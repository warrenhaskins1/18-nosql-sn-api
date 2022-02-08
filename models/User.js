const { Schema, model } = require("mongoose");
import { isEmail } from "validator";

//For Email validation {$regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }

//Schema to create our User model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "invalid email"],
  },
  //Check ref
  thoughts: [
    {type: Schema.Types.ObjectId, ref: "thoughts",}],

  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],

  toJSON: {
    virtuals: true,
  },
  id: false,
});

//Create a virtual called friendCount that retrieves the length of the users friends array field on query
userSchema
.virtual("friendCount")
//getter
.get(function () {
  return `${this.friends.length}`;
});
//setter Check to see if we need this

const User = model("User", userSchema);

module.exports = User;
