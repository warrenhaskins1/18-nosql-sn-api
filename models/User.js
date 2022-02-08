const mongoose = require("mongoose");
import { isEmail } from "validator";
const thoughtsSchema = require("./Thoughts");


//For Email validation {$regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }

//Schema to create our User model
const userSchema = new mongoose.Schema({
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
  thoughts: [
    {
      //Swap Types for Model name?
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thoughts",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
//NEED TO ADD VIRTUAL friendCount to retrieve length of user's friends array
);

const User = model("user", userSchema);

module.exports = User;
