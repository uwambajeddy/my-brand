const express = require('express');
const { protect, restrictedTo } = require('../controllers/authController');
const {
  getMessages,
  createMessage,
  getMessage,
  deleteMessage,
  updateMessage
} = require('../controllers/messagesController');

const router = express.Router();

router
  .route('/')
  .get(protect, restrictedTo('admin'), getMessages)
  .post(createMessage);

router
  .route('/:id')
  .get(protect, restrictedTo('admin'), getMessage)
  .delete(protect, restrictedTo('admin'), deleteMessage);

module.exports = router;
