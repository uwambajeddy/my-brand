const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, 'Comment section can not be empty! ']
  },
  date: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  blog: {
    type: mongoose.Schema.ObjectId,
    ref: 'Blog'
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
