const express = require('express');
const router = express.Router();
const { createUser, getUserById, getUserQuestions } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/', createUser);
router.get('/:userId', auth, getUserById);
router.get('/:userId/questions', auth, getUserQuestions);

module.exports = router;