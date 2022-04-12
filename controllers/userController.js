//const multer = require('multer');
import catchAsync from '../util/catchAsync.js';
import AppError from '../util/AppError.js';
import userModel from '../models/userModel.js';

const { find, findById, findByIdAndUpdate } = userModel;

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await find({ active: true });
  if (!users) {
    return next(new AppError('No users yet', 404));
  }
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await find({ _id: req.params.id, active: true });
  if (!user || user.length === 0) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: user.length,
    data: {
      user
    }
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const email = await find({ email: req.body.email });
  if (email) {
    return next(new AppError('The email already exists!!', 409));
  }

  const user = await findById(req.user.id);
  user.name = req.body.name;
  user.email = req.body.email;
  await user.save({ validateBeforeSave: true });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  const user = await findByIdAndUpdate(req.user.id, { active: false });
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
