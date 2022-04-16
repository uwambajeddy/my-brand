import express from 'express';
import {
  getBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog
} from '../controllers/blogsController.js';

const router = express.Router();


router
  .route('/')
  .get(getBlogs)
  .post(createBlog);

router
  .route('/:id')
  .get(getBlog)
  .patch(updateBlog)
  .delete(deleteBlog);

export default router;
