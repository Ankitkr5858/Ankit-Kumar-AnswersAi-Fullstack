const express = require('express');
const router = express.Router();
const { askQuestion, getQuestionById } = require('../controllers/questionController');
const auth = require('../middleware/auth');

router.post('/', auth, askQuestion);
router.get('/:questionId', auth, getQuestionById);

module.exports = router;