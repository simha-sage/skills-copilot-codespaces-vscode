const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Todo = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://munna-bhai:H6H4IcSYXbsk1zZ8@first-cluster.ljcmp.mongodb.net/munna';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB conn error:', err));

// API routes
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text required' });
  const t = await Todo.create({ text });
  res.status(201).json(t);
});

app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const t = await Todo.findByIdAndUpdate(id, updates, { new: true });
  if (!t) return res.status(404).json({ error: 'not found' });
  res.json(t);
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const t = await Todo.findByIdAndDelete(id);
  if (!t) return res.status(404).json({ error: 'not found' });
  res.json({ success: true });
});

// Serve client
const clientDir = path.join(__dirname, '..', 'client');
app.use(express.static(clientDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
