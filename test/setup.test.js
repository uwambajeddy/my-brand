/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import moongose from 'mongoose';
import { config } from 'dotenv';
import blogModel from '../models/blogModel.js';
import userModel from '../models/userModel.js';

config({ path: '.env' });

const DB_TEST = process.env.DATABASE_TEST.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

 moongose.connect(DB_TEST).then(() => console.log('Test DB connected successful !'));

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
