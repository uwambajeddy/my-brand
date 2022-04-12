import express from 'express';
import { protect, restrictedTo } from '../controllers/authController.js';
import {
  getBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog
} from '../controllers/blogsController.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/blogs:
 *  get:
 *    summary: Use to request all blogs
 *    tags:
 *      - blogs
 *    responses:
 *      '200':
 *        description: The All blogs description
 *
 * @swagger
 * /api/v1/blogs:
 *    post:
 *      summary: Use to create a blog
 *      consumes:
 *        - application/json
 *      tags:
 *         - blogs
 *      parameters:
 *        - name: blog
 *          in: body
 *          description: Use to create a blog
 *          required:
 *              -title,
 *              -body
 *          schema:
 *            type: object
 *          properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               date:
 *                 type: date
 *      responses:
 *        '201':
 *          description: Successfully created blog
 */

router
  .route('/')
  .get(getBlogs)
  .post(protect, restrictedTo('admin'), createBlog);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *    get:
 *      summary: Use to return a blog by id
 *      tags:
 *         - blogs
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  This is the blog id
 *          required: true
 *      responses:
 *        '200':
 *          description: The blog description with id
 *          content:
 *             application/json
 *        '404':
 *          description: No blog with that id
 *
 * @swagger
 * /api/v1/blogs/{id}:
 *    patch:
 *      summary: Use to update a blog
 *      tags:
 *         - blogs
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Use to update a blog with id
 *          required:
 *               -id
 *          schema:
 *               type: string
 *        - name: blog
 *          in: body
 *          description: Use to update a blog with id
 *          required:
 *              -title,
 *              -body
 *          schema:
 *              type: object
 *          properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               date:
 *                 type: date
 *      responses:
 *        '200':
 *               description: Successfully updated blog
 */
router
  .route('/:id')
  .get(getBlog)
  .patch(protect, restrictedTo('admin'), updateBlog)
  .delete(protect, restrictedTo('admin'), deleteBlog);

export default router;
