import catchAsync from '../util/catchAsync.js';
import projectModel from '../models/projectModel.js';
import blogModel from '../models/blogModel.js';
import mongoose from 'mongoose';
import commentModel from '../models/commentModal.js';

export const homePage = catchAsync(async (req, res, next) => {

  const projects = await projectModel.find();

  res.status(200).render('index',{
    projects
  });
});

export const contactPage = catchAsync(async (req, res, next) => {
  res.status(200).render('contact');
});

export const loginPage = catchAsync(async (req, res, next) => {
  res.status(200).render('login');
});
export const signupPage = catchAsync(async (req, res, next) => {
  res.status(200).render('signup');
});

export const blogsPage = catchAsync(async (req, res, next) => {

  const blogs = await blogModel.aggregate([
    {
      $lookup: {
        from: 'comments',
        as: 'comments',
        let: { blog: '$_id' },
        pipeline: [
          {
            $match: { $expr: { $eq: ['$blog', '$$blog'] }, approve: true }
          }
        ]
      }
    }
  ]);

  res.status(200).render('blog', {
    blogs
  });
});

export const blogPage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const blog = await blogModel.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) }
    },
    {
      $lookup: {
        from: 'comments',
        as: 'comments',
        let: { blog: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$blog', '$$blog'] },
              approve: true
            }
          }
        ]
      }
    }
  ]);
  if (!blog) {
    return next(new AppError('No Blog found with that ID', 404));
  }

  res.status(200).render('blog-details', {
    blog
  });
});

export const projectPage = catchAsync(async (req, res, next) => {

  const projects = await projectModel.find();
  
  res.status(200).render('project', {
    projects
  });
});
export const forgotPage = catchAsync(async (req, res, next) => {
  res.status(200).render('forgot-password');
});

export const aboutPage = catchAsync(async (req, res, next) => {
  res.status(200).render('about');
});
