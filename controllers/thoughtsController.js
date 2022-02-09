const { Thoughts, User } = require("../models");

module.exports = {
  //Get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //Get single thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtsId })
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: "Sorry, there is no Thought with that Id!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Create a new thought (Post)
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughtss: thoughts._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Created the Thought!!!!!! 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //findOneandUpdate
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No Thought with this id!" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //findOneAndDelete
  deleteThought(req, res) {
    Thoughts.findOneAndRemove({ _id: req.params.thoughtsId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No Thoughts with this id!" })
          : thoughts.findOneAndUpdate(
              { thoughts: req.params.thoughtsId },
              { $pull: { thoughtss: req.params.thoughtsId } },
              { new: true }
            )
      )
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: "Thought created but no Thought with this id!" })
          : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove User thoughts response
  removeUserThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { thoughts: { thoughtsId: req.params.thoughtsId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No Thought with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
