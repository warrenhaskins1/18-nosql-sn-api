const { User, Thoughts} = require("../models/User");

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

  //findOneandUpdate
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this id!" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //findOneAndDelete
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : User.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User created but no user with this id!" })
          : res.json({ message: "User successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove User thoughts response
  removeUserThoughts(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { thoughs: { thoughtsId: req.params.thoughtsId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
