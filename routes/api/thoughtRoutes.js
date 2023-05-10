const express = require('express');
const router = express.Router();

const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/controlThought.js');

// Routes for getting and creating thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// Routes for getting, updating, and deleting a single thought
router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Routes for creating and deleting reactions
router.route('/:thoughtId/reactions')
  .post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
