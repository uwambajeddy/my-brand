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
  unsubscribe,
  resetpassword
} from '../controllers/viewController.js';

import {isLoggedIn, protect} from '../controllers/authController.js';

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
router.get('/unsubscribe', protect, unsubscribe);
router.get('/resetpassword/:id',resetpassword);

export default router;
