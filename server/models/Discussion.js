const mongoose = require('mongoose');

// Define a schema for replies
const replySchema = new mongoose.Schema({
  user: {
    type: String,
    default: 'Anonymous',
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the discussion schema
const discussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    default: 'Anonymous',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [replySchema], // ✅ Add replies as an array of replySchema
});

// Create and export the model
module.exports = mongoose.model('Discussion', discussionSchema);
