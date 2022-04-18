/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import blogModel from '../models/blogModel.js';
import userModel from '../models/userModel.js';

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
