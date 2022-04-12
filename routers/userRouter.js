import express from 'express';
import {
  signup,
  login,
  protect,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout
} from '../controllers/authController.js';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteMe
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/forgotpassword', forgotPassword);
router.patch('/updatepassword', protect, updatePassword);
router.patch('/resetpassword/:token', resetPassword);

/**
 * @swagger
 * /api/v1/user:
 *  get:
 *    summary: Use to request all users
 *    tags:
 *         - users
 *    responses:
 *      '200':
 *        description: The All users description
 */

/**
 * @swagger
 * /api/v1/user/logout:
 *  get:
 *    summary: Use to logout a user
 *    tags:
 *        - authentication
 *    responses:
 *      '200':
 *        description: logged out successfully
 */

/**
 * @swagger
 * /api/v1/user/signup:
 *    post:
 *      summary: Use to create a user
 *      tags:
 *        - authentication
 *      consumes:
 *       - application/json
 *      parameters:
 *        - name: user
 *          in: body
 *          description: Use to create a user
 *          required:
 *              -name,
 *              -email,
 *              -password,
 *              -password_confirm
 *          schema:
 *            type: object
 *          properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               password_confirm:
 *                 type: string
 *      responses:
 *        '201':
 *          description: Successfully created user
 */
/**
 * @swagger
 * /api/v1/user/login:
 *    post:
 *      summary: Use to login a user
 *      tags:
 *        - authentication
 *      consumes:
 *       - application/json
 *      parameters:
 *        - name: user
 *          in: body
 *          description: Use to login a user
 *          required:
 *              -email,
 *              -password
 *          schema:
 *            type: object
 *          properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *      responses:
 *        '201':
 *          description: Successfully logged in user
 */

router
  .route('/')
  .get(getAllUsers)
  .delete(protect, deleteMe);

/**
 * @swagger
 * /api/v1/user/resetpassword/{token}:
 *    get:
 *      summary: Use to reset user password
 *      tags:
 *        - authentication
 *      parameters:
 *        - in: path
 *          name: token
 *          description:  This is the user token
 *          required: true
 *      responses:
 *        '200':
 *          description: Password successfully updated
 *          content:
 *             application/json
 *        '404':
 *          description: Invilid token
 *
 * @swagger
 * /api/v1/user/:
 *    patch:
 *      summary: Use to update a user
 *      tags:
 *         - users
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Use to update a user with id
 *          required:
 *               -id
 *          schema:
 *               type: string
 *        - name: user
 *          in: body
 *          description: Use to update a user with id
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
 *               description: Successfully updated user
 */

router
  .route('/:id')
  .get(getUser)
  .patch(protect, updateUser);

export default router;
