import catchAsync from '../util/catchAsync.js';
import AppError from '../util/AppError.js';
import blogModel from '../models/blogModel.js';

const { find, findById, deleteOne, create, findByIdAndUpdate } = blogModel;

export const getBlogs = catchAsync(async (req, res, next) => {
  const blogs = await find();
  res.status(200).json({
    status: 'success',
    results: blogs.length,
    data: {
      blogs
    }
  });
});

export const getBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const blog = await findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      blog
    }
  });
});

export const deleteBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const blog = await deleteOne({ _id: id });

  if (!blog) {
    return next(new AppError('No Blog found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

export const createBlog = catchAsync(async (req, res, next) => {
  const blog = await create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      blog
    }
  });
});

export const updateBlog = catchAsync(async (req, res, next) => {
  const blog = await findByIdAndUpdate(req.params.id, req.body, {
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
