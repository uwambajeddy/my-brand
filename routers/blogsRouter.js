import express from 'express';
import { protect, restrictedTo } from '../controllers/authController.js';
import {
  getBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
  handleLike,
  deleteComment,
  createComment,
  approveComment,
  getAllComments,
  uploadBlogImage
} from '../controllers/blogsController.js';

const router = express.Router();

router
  .route('/:id')
  .get(getBlog)
  .patch(protect, uploadBlogImage, restrictedTo('admin'), updateBlog)
  .delete(protect, restrictedTo('admin'), deleteBlog);

router.route('/like/:id').post(protect, handleLike);

router
  .route('/comment/:id')
  .get(getAllComments)
  .post(protect, createComment);

router
  .route('/comment/approve/:id')
  .get(protect, restrictedTo('admin'), approveComment);
router
  .route('/comment/delete/:id')
  .delete(protect, restrictedTo('admin'), deleteComment);

router
  .route('/')
  .get(getBlogs)
  .post(protect, restrictedTo('admin'), uploadBlogImage, createBlog);

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
 *        - multipart/form-data
 *      tags:
 *         - blogs
 *      parameters:
 *        - name: image
 *          in: formData
 *          description: Blog image
 *          required: true
 *          type: file
 *        - name: title
 *          in: formData
 *          description: Blog title
 *          required: true
 *          type: string
 *        - name: body
 *          in: formData
 *          description: Blog description
 *          required: true
 *          type: string
 *        - name: date
 *          in: formData
 *          description: Blog date
 *          type: string
 *      responses:
 *        '201':
 *          description: Successfully created blog
 *
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
 *
 * @swagger
 * /api/v1/blogs/like/{id}:
 *    post:
 *      summary: Use to like/dislike a blog
 *      tags:
 *         - blogs
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  This is the blog id
 *          required: true
 *      responses:
 *        '200':
 *          description: The blog description with like/dislike
 *          content:
 *             application/json
 *
 * @swagger
 * /api/v1/blogs/comment/{id}:
 *    get:
 *      summary: Use to request all comments per blog
 *      tags:
 *        - comments
 *      parameters:
 *          - in: path
 *            name: id
 *            description:  This is the blog id
 *            required: true
 *      responses:
 *        '200':
 *          description: The All blog comments description
 *
 * @swagger
 * /api/v1/blogs/comment/{id}:
 *    post:
 *      summary: Use to comment on a blog
 *      tags:
 *        - comments
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  This is the blog id
 *          required: true
 *        - name: comment
 *          in: body
 *          description: Use to create a comment
 *          required:
 *              -comment
 *          schema:
 *            type: object
 *          properties:
 *               comment:
 *                 type: string
 *          example:
 *               comment: after reading this articles I found that I never got interested in software dev before.
 *      responses:
 *        '200':
 *          description: comment sent successfully
 *          content:
 *             application/json
 *
 * @swagger
 * /api/v1/blogs/comment/approve/{id}:
 *    get:
 *      summary: Use to approve a comment
 *      tags:
 *         - comments
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  This is the comment id
 *          required: true
 *      responses:
 *        '200':
 *          description: The  comment description with approve/disapprove
 *          content:
 *             application/json
 *
 * @swagger
 * /api/v1/blogs/{id}:
 *    patch:
 *      summary: Use to update a blog
 *      tags:
 *         - blogs
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  This is the blog id
 *          required: true
 *        - name: image
 *          in: formData
 *          description: Blog image
 *          required: true
 *          type: file
 *        - name: title
 *          in: formData
 *          description: Blog title
 *          required: true
 *          type: string
 *        - name: body
 *          in: formData
 *          description: Blog description
 *          required: true
 *          type: string
 *        - name: date
 *          in: formData
 *          description: Blog date
 *          type: string
 *      responses:
 *        '200':
 *               description: Successfully updated blog
 *
 * @swagger
 * /api/v1/blogs/{id}:
 *    delete:
 *      summary: Use to delete a blog
 *      tags:
 *         - blogs
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Use to delete a blog with id
 *          required:
 *               -id
 *          schema:
 *               type: string
 *      responses:
 *        '204':
 *               description: Successfully deleted blog
 */

export default router;
