const { User, Thoughts } = require("../models");

module.exports = {
  ////////////////////////////////////////////////////////////////
  //GET all users
  getUsers(req, res) {
    User.find()
    .select("-__v")
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  //GET a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(201).json({ message: "Success" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
//////////////////////////////////////////////////////////////////////
  //Create a new User (Post)
  createUser(req, res) {
    User.create(req.body)
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
///////////////////////////////////////////////////////
  //PUT update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(201).json({ message: 'This User has been updated' });
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
/////////////////////////////////////////////////////////////
  //DELETE user
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
              .status(201)
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
          ? res.status(201).json({ message: "Thought Updated!!!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  ///////////////////////////////////////////////////////////////////
  //POST add a friend
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(201).json({ message: "Friend Added!!!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  ///////////////////////////////////////////////////////////////////////
  //DELETE a friend
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(201).json({ message: "Friend Deleted!!!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
