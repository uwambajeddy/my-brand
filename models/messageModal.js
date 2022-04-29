import mongoose from 'mongoose';
import validator from 'validator';

const { isEmail } = validator;

const { Schema, model } = mongoose;

const messageSchema = new Schema({
  name: {
    type: String,
    required: [true, ' Please Provide your name!!']
  },
  email: {
    type: String,
    required: [true, 'Please Provide your email!!'],
    validate: [isEmail, 'Please! provide valid email']
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

const Message = model('Message', messageSchema);

export default Message;
