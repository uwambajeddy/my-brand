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

import { isLoggedIn, protect } from '../controllers/authController.js';
import { adminPage } from '../controllers/adminController.js';

const router = express.Router();

router.use(isLoggedIn);
router.get('/', homePage);
router.get('/admin', adminPage);
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

export default router;
