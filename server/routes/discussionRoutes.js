const express = require('express');
const Discussion = require('../models/Discussion');
const router = express.Router();

// POST - Add new discussion
router.post('/', async (req, res) => {
  const { title, content, user } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const newDiscussion = new Discussion({ title, content, user });
    const savedDiscussion = await newDiscussion.save();
    res.status(201).json(savedDiscussion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Fetch all discussions
router.get('/', async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
