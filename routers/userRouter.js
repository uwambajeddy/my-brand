import express from 'express';
import {
  signup,
  login,
  protect,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout,
  restrictedTo
} from '../controllers/authController.js';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteMe,
  getMe,
  uploadUserImage
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.post('/forgotpassword', forgotPassword);
router.patch('/resetpassword/:token', resetPassword);

router.use(protect);
router.get('/me', getMe);
router.patch('/updatepassword', updatePassword);
router.route('/updateMe').patch(uploadUserImage, updateUser);
router.route('/deleteMe').delete(deleteMe);

router.use(restrictedTo('admin'));
router.route('/').get(getAllUsers);
router.route('/:id').get(getUser);

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
 * /api/v1/user/updateMe:
 *  patch:
 *    summary: Use to update user info
 *    tags:
 *         - users
 *    consumes:
 *        - multipart/form-data
 *    parameters:
 *        - name: image
 *          in: formData
 *          description: User image
 *          required: true
 *          type: file
 *        - name: name
 *          in: formData
 *          description: User name
 *          required: true
 *          type: string
 *        - name: email
 *          in: formData
 *          description: User email
 *          required: true
 *          type: string
 *    responses:
 *      '200':
 *        description: user updated successfully
 */
/**
 * @swagger
 * /api/v1/user/{id}:
 *  get:
 *    summary: Use to request  user by ID
 *    tags:
 *         - users
 *    parameters:
 *        - name: id
 *          in: path
 *          description: Use to request a user by ID
 *          required:
 *               -id
 *    responses:
 *      '200':
 *        description: The user description
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
 *                 example: Eddy Uwambaje
 *               email:
 *                 type: strin
 *               password:
 *                 type: string
 *               password_confirm:
 *                 type: string
 *          example:
 *               name: Eddy Uwambaje
 *               email: uwambajeddy@gmail.com
 *               password: uwambajeddy
 *               password_confirm: uwambajeddy
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *          example:
 *               email: uwambajeddy@gmail.com
 *               password: uwambajeddy
 *      responses:
 *        '201':
 *          description: Successfully logged in user
 */

/**
 * @swagger
 * /api/v1/user/updatepassword:
 *    patch:
 *      summary: Use to update user password
 *      tags:
 *        - authentication
 *      parameters:
 *        - name: user
 *          in: body
 *          description: Use to update user password
 *          required:
 *              -password,
 *              -password_confirm
 *              -password_current
 *          schema:
 *            type: object
 *          properties:
 *               password:
 *                 type: string
 *               password_confirm:
 *                 type: string
 *               password_current:
 *                 type: string
 *          example:
 *               password: uwambajeddy1
 *               password_confirm: uwambajeddy1
 *               password_current: uwambajeddy
 *      responses:
 *        '200':
 *          description: Password successfully updated
 *          content:
 *             application/json
 *
 * @swagger
 * /api/v1/user/forgotpassword:
 *    post:
 *      summary: Use to send reset password token
 *      tags:
 *        - authentication
 *      parameters:
 *        - name: user
 *          in: body
 *          description: Use to send reset password token
 *          required:
 *              -emain
 *          schema:
 *            type: object
 *          properties:
 *               email:
 *                 type: string
 *          example:
 *               email: uwambajeddy@gmail.com
 *      responses:
 *        '200':
 *          description: sent a reset token successfully
 *          content:
 *             application/json
 *
 * @swagger
 * /api/v1/user/resetpassword/{token}:
 *    patch:
 *      summary: Use to reset user password
 *      tags:
 *        - authentication
 *      parameters:
 *        - in: path
 *          name: token
 *          description:  This is the user token
 *          required: true
 *        - name: user
 *          in: body
 *          description: Use to reset user password
 *          required:
 *              -password,
 *              -password_confirm
 *          schema:
 *            type: object
 *          properties:
 *               password:
 *                 type: string
 *               password_confirm:
 *                 type: string
 *          example:
 *               password: uwambajeddy
 *               password_confirm: uwambajeddy
 *      responses:
 *        '200':
 *          description: Password successfully updated
 *          content:
 *             application/json
 */

export default router;
