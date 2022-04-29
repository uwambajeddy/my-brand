import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: [true, 'Comment section can not be empty! ']
  },
  date: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  blog: {
    type: Schema.ObjectId,
    ref: 'Blog'
  },
  approve: {
    type: Boolean,
    default: false
  }
});

const Comment = model('Comment', CommentSchema);

export default Comment;
