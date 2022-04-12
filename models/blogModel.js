const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog should have a title']
    },
    body: {
      type: String,
      required: [true, 'Blog should have a body']
    },
    image: String,
    date: {
      type: Date,
      default: Date.now()
    },
    likedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

blogSchema.virtual('totalLikes').get(function() {
  return this.likedBy.length;
});
blogSchema.virtual('totalComments').get(function() {
  return this.comments.length;
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
