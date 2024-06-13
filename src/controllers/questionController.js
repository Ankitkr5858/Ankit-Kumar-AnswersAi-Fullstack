const Question = require('../models/Question');
const { getAIAnswer } = require('../utils/aiService');

// method     POST
// route      api/questions
exports.askQuestion = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.id;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const answer = await getAIAnswer(content);
        const question = new Question({ userId, content, answer });
        await question.save();

        res.status(201).json(question);
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ message: 'Server error' });
    }
};

// method     GET
// route      api/questions/:questionId
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        if(!question) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
