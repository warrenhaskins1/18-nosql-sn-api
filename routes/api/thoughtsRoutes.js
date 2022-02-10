const router = require("express").Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    removeUserThoughts,
} = require("../../controllers/thoughtsController");

// /api/thoughts
router.route("/thoughts")