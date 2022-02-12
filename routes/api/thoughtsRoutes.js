const router = require("express").Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require("../../controllers/thoughtsController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/:thoughtId

router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

// Thought Reactions by :thoughtId

router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions").delete(removeReaction);

module.exports = router;