const express = require('express');
const router = express.Router();

const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// Routes for getting and creating thoughts
router.route('/thoughts')
  .get(getAllThoughts)
  .post(createThought);

// Routes for getting, updating, and deleting a single thought
router.route('/thoughts/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Routes for creating and deleting reactions
router.route('/thoughts/:thoughtId/reactions')
  .post(createReaction);

router.route('/thoughts/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
