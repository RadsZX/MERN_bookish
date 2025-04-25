const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// POST - Add book to library
router.post('/', async (req, res) => {
  const { title, imageUrl, isbn } = req.body;

  if (!title || !imageUrl || !isbn) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(409).json({ message: 'Book already exists in library' });
    }

    const newBook = new Book({ title, imageUrl, isbn });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Fetch all books in the library
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
