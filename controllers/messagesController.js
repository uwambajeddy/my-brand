const catchAsync = require('../util/catchAsync');
const AppError = require('../util/AppError');
const Message = require('./../models/messageModal');

exports.getMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: {
      messages
    }
  });
});

exports.getMessage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      message
    }
  });
});

exports.deleteMessage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.deleteOne({ _id: id });

  if (!message) {
    return next(new AppError('No message found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createMessage = catchAsync(async (req, res, next) => {
  const message = await Message.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      message
    }
  });
});
