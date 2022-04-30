import multer from 'multer';
import catchAsync from '../util/catchAsync.js';
import AppError from '../util/AppError.js';
import projectModel from '../models/projectModel.js';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/project');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `project_${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not image,Please upload only image', 400), false);
  }
};

const uploads = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadProjectImage = uploads.single('image');

export const getProjects = catchAsync(async (req, res, next) => {
  const projects = await projectModel.find();

  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      projects
    }
  });
});

export const getProject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const project = await projectModel.findById(id);
  if (!project) {
    return next(new AppError('No Project found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      project
    }
  });
});

export const deleteProject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const project = await projectModel.deleteOne({ _id: id });

  if (!project) {
    return next(new AppError('No Project found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

export const createProject = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;

  const project = await projectModel.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      project
    }
  });
});

export const updateProject = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;

  const project = await projectModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!project) {
    return next(new AppError('No Project found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: project
    }
  });
});
