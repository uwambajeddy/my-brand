import AppError from '../util/AppError.js';

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.keyValue.email;

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please login again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please login again.', 401);

const sendErrorDev = (err, res, req) => {
  if (!req.originalUrl.includes('api')) {
    return res.status(err.statusCode).render('error', {
      status: err.status,
      error: err,
      statusCode: err.statusCode,
      message: err.message
    });
  }
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res, req) => {
  if (err.isOperational) {
    if (!req.originalUrl.includes('api')) {
      return res.status(err.statusCode).render('error', {
        status: err.status,
        error: err,
        statusCode: err.statusCode,
        message: err.message
      });
    }
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    if (!req.originalUrl.includes('api')) {
      return res.status(500).render('error', {
        status: 'error',
        error: err,
        statusCode: 500,
        message: 'Something went very wrong!'
      });
    }
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res, req);
  } else if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'test'
  ) {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res, req);
  }
};
