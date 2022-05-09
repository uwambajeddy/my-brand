import express from 'express';
import {
  aboutPage,
  blogsPage,
  contactPage,
  homePage,
  projectPage,
  loginPage,
  signupPage,
  forgotPage,
  blogPage,
  resetpassword,
  subscription,
} from '../controllers/viewController.js';

import { isLoggedIn, protect, restrictedTo } from '../controllers/authController.js';
import {
  adminPage,
  adminBlogsPage,
  adminCommentsPage,
  adminMessagesPage,
  adminProjectsPage,
  adminSubscribersPage,
  adminUsersPage,
} from '../controllers/adminController.js';

const router = express.Router();

router.use(isLoggedIn);
router.get('/', homePage);
router.get('/about', aboutPage);
router.get('/projects', projectPage);
router.get('/blogs', blogsPage);
router.get('/blog/:id', blogPage);
router.get('/login', loginPage);
router.get('/forgot', forgotPage);
router.get('/signup', signupPage);
router.get('/contact', contactPage);
router.get('/subscription', protect, subscription);
router.get('/resetpassword/:token', resetpassword);

router.get('/admin', protect, restrictedTo('admin'), adminPage);
router.get('/admin/blogs', protect, restrictedTo('admin'), adminBlogsPage);
router.post('/admin/blogs/:id', protect, restrictedTo('admin'), adminBlogsPage);
router.get('/admin/messages', protect, restrictedTo('admin'), adminMessagesPage);
router.get('/admin/subscribers', protect, restrictedTo('admin'), adminSubscribersPage);
router.get('/admin/projects', protect, restrictedTo('admin'), adminProjectsPage);
router.get('/admin/projects/comments/:id', protect, restrictedTo('admin'), adminCommentsPage);
router.get('/admin/users', protect, restrictedTo('admin'), adminUsersPage);

export default router;
