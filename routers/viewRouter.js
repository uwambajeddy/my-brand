import express from 'express';
import {
  aboutPage,
  blogsPage,
  contactPage,
  homePage,
  projectPage,
  loginPage,
  signupPage
} from '../controllers/viewController.js';

const router = express.Router();

router.get('/', homePage);
router.get('/about', aboutPage);
router.get('/projects', projectPage);
router.get('/blogs', blogsPage);
router.get('/login', loginPage);
router.get('/signup', signupPage);
router.get('/contact', contactPage);

export default router;
