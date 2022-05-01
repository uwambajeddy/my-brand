import multer from 'multer';
import sharp from 'sharp';
import catchAsync from '../util/catchAsync.js';
import AppError from '../util/AppError.js';
import userModel from '../models/userModel.js';

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadUserImage = upload.single('image');

export const resizeUserPhoto = catchAsync(async (req, res, next) => {
  
  if (!req.file) return next();

  req.file.originalname = `user-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(120, 120)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.originalname}`);

  next();
});


export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userModel.find({ active: true });
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
  const user = await userModel.find({ _id: req.params.id, active: true });
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

export const unsubscribe = catchAsync(async (req, res, next) => {
  const user = await userModel.find({ _id: req.params.id, active: true });
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

export const getMe = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const existingUser = await userModel.find({ email: req.body.email });
  if (existingUser.length > 0 && req.user.email !== req.body.email) {
    return next(new AppError('The email already exists!!', 409));
  }
  const user = await userModel.findById(req.user.id);
  user.name = req.body.name;
  user.email = req.body.email;
  if (req.file) user.image = req.file.originalname;
  
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.user.id, {
    active: false
  });
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
