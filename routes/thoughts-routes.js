const router = require('express').Router();
const { addThought, removeThought, addReact, removeReact, getAllThoughts, getThoughtById } = require('../controllers/thoughts-controller');


router.route('/')
  .get(getAllThoughts)

router.route('/:thoughtId')
  .get(getThoughtById)
  .put(addReact)
  .delete(removeThought)

router.route('/:userId')
  .post(addThought)

router.route('/:thoughtId')
  .put(addReact)
  .delete(removeThought)

router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReact);
module.exports = router;