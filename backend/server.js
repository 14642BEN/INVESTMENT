const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Investment = require('./models/Investment');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/investments');

// Register
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, email: user.email }, 'secretkey', {
    expiresIn: '2h',
  });
  res.json({ token, user });
});

// Protected: Make investment
app.post('/api/invest', authMiddleware, async (req, res) => {
  const { packageType, amount } = req.body;
  const investment = await Investment.create({
    userId: req.user.id,
    packageType,
    amount,
  });
  res.json(investment);
});

// Admin: Get all investments
app.get('/api/investments', async (req, res) => {
  const investments = await Investment.find().populate('userId');
  res.json(investments);
});

app.listen(5000, () => console.log('Server started on http://localhost:5000'));
