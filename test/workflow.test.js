/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'superagent';
import server from '../app.js';

const { expect, use } = chai;

use(chaiHttp);

describe('User workflow tests', () => {
  it('should register + login a user, create blog and verify 1 in DB', done => {
    // 1) Register new user
    const user = {
      name: 'Peter Petersen',
      email: 'mail@petersen.com',
      password: '123456',
      password_confirm: '123456',
      role: "admin"
    };
    request(server)
      .post('/api/v1/user/signup')
      .send(user)
      .end((_err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.be.equal(null);

        // 2) Login the user
        request(server)
          .post('/api/v1/user/login')
          .send({
            email: 'mail@petersen.com',
            password: '123456'
          })
          .end((_err, res) => {
            // Asserts
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            const { token } = res.body.token;

            // 3) Create new blog
            const blog = {
              name: 'Test blog',
              body: 'Test blog Description',
              date: '2020-04-05'
            };

            request(server)
              .post('/api/v1/server')
              .set({ 'token': token })
              .send(blog)
              .end((_err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');

                const savedBlog = res.body[0];
                expect(savedBlog.name).to.be.equal(blog.name);
                expect(savedBlog.body).to.be.equal(blog.body);
                expect(savedBlog.date).to.be.equal(blog.date);

                // 4) Verify one blog in test DB
                const blogId = savedBlog._id;
                request(server)
                  .get(`/api/v1/server/${blogId}`)
                  .end((_err, res) => {
                    // Asserts
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('object');
                    done();
                  });
              });
          });
      });
  });

  it('should register + login a user, create blog and delete it from DB', done => {
    // 1) Register new user
    const user = {
      name: 'Peter Petersen',
      email: 'mail@petersen.com',
      password: '123456',
      role: "admin"
    };
    request(server)
      .post('/api/v1/user/signup')
      .send(user)
      .end((_err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.be.equal(null);

        // 2) Login the user
        request(server)
          .post('/api/v1/user/login')
          .send({
            email: 'mail@petersen.com',
            password: '123456'
          })
          .end((_err, res) => {
            // Asserts
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            const { token } = res.body.token;

            // 3) Create new blog
            const blog = {
              title: 'Test blog',
              body: 'Test blog Description',
              date: '2022-04-01'
            };

            request(server)
              .post('/api/v1/server')
              .set({ 'token': token })
              .send(blog)
              .end((_err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');

                const savedBlog = res.body[0];
                expect(savedBlog.name).to.be.equal(blog.name);
                expect(savedBlog.body).to.be.equal(blog.body);
                expect(savedBlog.date).to.be.equal(blog.date);

                // 4) Delete blog
                request(server)
                  .delete(`/api/v1/server/${savedBlog._id}`)
                  .set({ 'token': token })
                  .end((_err, res) => {
                    expect(res.status).to.be.equal(204);
                    done();
                  });
              });
          });
      });
  });

  it('should register user with invalid input', done => {
    // Register new user with invalid inputs
    const user = {
      name: 'Peter Petersen',
      email: 'mail@petersen.c', //Faulty email validation should catch this...
      password: '123'
    };
    request(server)
      .post('/api/v1/user/signup')
      .send(user)
      .end((_err, res) => {
        expect(res.status).to.be.equal(400);

        expect(res.body).to.be.a('object');
        expect(res.body.error.message).to.be.equal(
          'Invalid input data. Please! provide valid email'
        );
        done();
      });
  });
});
