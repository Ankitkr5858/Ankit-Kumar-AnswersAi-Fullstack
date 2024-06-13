const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log('Error Occured', err);
})

app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to AnswersAI Backend');
});

module.exports = app;