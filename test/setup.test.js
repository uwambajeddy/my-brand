/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import moongose from 'mongoose';
import { config } from 'dotenv';
import blogModel from '../models/blogModel.js';
import userModel from '../models/userModel.js';

config({ path: '.env' });

moongose
  .connect('mongodb://localhost:27017/mybrand_test')
  .then(() => console.log('Test DB connected successful !'));

beforeEach(done => {
  userModel.deleteMany({}, function(err) {});
  blogModel.deleteMany({}, function(err) {});
  done();
});

afterEach(done => {
  userModel.deleteMany({}, function(err) {});
  blogModel.deleteMany({}, function(err) {});
  done();
});
