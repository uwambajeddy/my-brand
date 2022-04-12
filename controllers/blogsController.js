const catchAsync = require('../util/catchAsync');
const AppError = require('../util/AppError');
const Blog = require('./../models/blogModel');

exports.getBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find();
  res.status(200).json({
    status: 'success',
    results: blogs.length,
    data: {
      blogs
    }
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      blog
    }
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.deleteOne({ _id: id });

  if (!blog) {
    return next(new AppError('No Blog found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      blog
    }
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!blog) {
    return next(new AppError('No Blog found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: blog
    }
  });
});
