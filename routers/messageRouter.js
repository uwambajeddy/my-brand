import express from 'express';
import { protect, restrictedTo } from '../controllers/authController.js';
import {
  getMessages,
  createMessage,
  getMessage,
  deleteMessage
} from '../controllers/messagesController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, restrictedTo('admin'), getMessages)
  .post(createMessage);

router
  .route('/:id')
  .get(protect, restrictedTo('admin'), getMessage)
  .delete(protect, restrictedTo('admin'), deleteMessage);

export default router;

/**
 * @swagger
 * /api/v1/messages:
 *  get:
 *    summary: Use to request all messages
 *    tags:
 *      - messages
 *    responses:
 *      '200':
 *        description: The All messages description
 *
 * @swagger
 * /api/v1/messages:
 *    post:
 *      summary: Use to send a message
 *      consumes:
 *        - application/json
 *      tags:
 *         - messages
 *      parameters:
 *        - name: message
 *          in: body
 *          description: Use to send a message
 *          required:
 *              -name,
 *              -email
 *              -subject
 *              -message
 *          schema:
 *            type: object
 *          properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *          example:
 *               name: Umuringa Lucille
 *               email: umuringalucille@gmail.com
 *               subject: Offer a web dev job
 *               message: So, I was wondering if I could offer you a job of creating a website for me.
 *      responses:
 *        '201':
 *          description: Successfully sent message
 */
/**
 * @swagger
 * /api/v1/messages/{id}:
 *    get:
 *      summary: Use to return a message by id
 *      tags:
 *         - messages
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  This is the message id
 *          required: true
 *      responses:
 *        '200':
 *          description: The message description with id
 *          content:
 *             application/json
 *
 * @swagger
 * /api/v1/messages/{id}:
 *    delete:
 *      summary: Use to delete a message
 *      tags:
 *         - messages
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Use to delete a message with id
 *          required:
 *               -id
 *          schema:
 *               type: string
 *      responses:
 *        '204':
 *               description: Successfully deleted message
 */
