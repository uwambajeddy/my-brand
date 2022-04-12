const mongoose = require('mongoose');
const validator = require('validator');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ' Please Provide your name!!']
  },
  email: {
    type: String,
    required: [true, 'Please Provide your email!!'],
    validate: [validator.isEmail, 'Please! provide valid email']
  },
  subject: {
    type: String,
    required: [true, 'Please Provide subject!!']
  },
  message: {
    type: String,
    required: [true, 'Please Provide a message!!']
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
