const multer = require('multer');
const catchAsync = require('./../util/catchAsync');
const User = require('../models/userModel');
const AppError = require('../models/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ active: true });
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

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.find({ _id: req.params.id, active: true });
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

exports.updateUser = catchAsync(async (req, res, next) => {
  const email = await User.find({ email: req.body.email });
  if (email) {
    return next(new AppError('The email already exists!!', 409));
  }

  const user = await User.findById(req.user.id);
  user.name = req.body.name;
  user.email = req.body.email;
  await user.save({ validateBeforeSave: true });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
