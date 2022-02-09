const User = require("../models/User");

module.exports = {
  //Get all users
  getUser(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //Get single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Sorry, there is no User with that Id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Create a new User (Post)
  createUser(req, res) {
      User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },


};
