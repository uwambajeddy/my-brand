import axios from 'axios';
import catchAsync from '../util/catchAsync.js';

export const homePage = catchAsync(async (req, res, next) => {
  res.status(200).render('index');
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
  const blogs = await axios.get(
    'https://uwambajeeddy.herokuapp.com/api/v1/blogs'
  );
  res.status(200).render('blog', {
    blogs: blogs.data.data.blogs
  });
});

export const blogPage = catchAsync(async (req, res, next) => {
  res.status(200).render('blog-details');
});

export const projectPage = catchAsync(async (req, res, next) => {
  res.status(200).render('project');
});
export const forgotPage = catchAsync(async (req, res, next) => {
  res.status(200).render('forgot-password');
});

export const aboutPage = catchAsync(async (req, res, next) => {
  res.status(200).render('about');
});
