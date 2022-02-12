const { Thoughts, User } = require("../models");

module.exports = {
  //////////////////////////////////////////////////////////////////
  //Get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  //Get single thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'Thought with this ID does not exist.' });
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
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Created the Thought!!!!!! 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //////////////////////////////////////////////////////
  //Update (put)
  updateThought(req, res) {
    Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'Thought with this ID does not exist.' });
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
        return res.status(404).json({ message: 'Thought with this ID does not exist.' });
      }

      // remove thought id from user's `thoughts` field
      return User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought has been created but no user with this id!' });
      }
      res.json({ message: 'Thought has been deleted!' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

  // removeUserThought(req, res) {
  //   Thoughts.findOneAndUpdate(
  //     { _id: req.params.userId },
  //     { $pull: { thoughts: { thoughtsId: req.params.thoughtsId } } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((dbUserData) =>
  //       !dbUserData
  //         ? res.status(404).json({ message: "No Thought with this id!" })
  //         : res.json(dbUserData)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },

  addReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No User with this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Remove reaction from a thought
  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No Thought with this id!!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
