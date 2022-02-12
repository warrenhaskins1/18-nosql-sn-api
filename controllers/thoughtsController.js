const { Thoughts, User } = require("../models");

module.exports = {
  //////////////////////////////////////////////////////////////////
  //GET all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  //GET a single thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "Uh oh, there is no Thought with this id!!!!!!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  ///////////////////////////////////////////////////////////////////
  //Create a new thought (Post)
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thoughts._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(201).json({ message: "Thought CREATED!!!!!!!" });
        }

        res.json({ message: "Thought CREATED!!!!!!!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //////////////////////////////////////////////////////
  //Update (put)
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "Uh oh, there is no Thought with this id!!!!!!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  ///////////////////////////////////////////////////////
  //Delete Thought
  deleteThought(req, res) {
    Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "Uh oh, there is no Thought with this id!!!!!!" });
        }

        // Delete thought from the user
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(201)
            .json({
              message: "Thought has been DELETED!",
            });
        }
        res.json({ message: "Thought has been DELETED!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //////////////////////////////////////////////////////////////////////
  //POST reaction
  addReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(201).json({ message: "Reaction Added!!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

///////////////////////////////////////////////////////////////////////////////////////
//DELETE reaction
  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(201).json({ message: "Reaction Deleted!!!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
