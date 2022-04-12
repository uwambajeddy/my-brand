/* import chai, { use, request } from 'chai';

const { expect } = chai;
import chaiHttp from 'chai-http';
import server from '../server';

use(chaiHttp);

describe('User workflow tests', () => {
  it('should register + login a user, create blog and verify 1 in DB', done => {
    // 1) Register new user
    const user = {
      name: 'Peter Petersen',
      email: 'mail@petersen.com',
      password: '123456',
      password_confirm: '123456'
    };
    request(server)
      .post('/api/user/signup')
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.be.equal(null);

        // 2) Login the user
        request(server)
          .post('/api/user/login')
          .send({
            email: 'mail@petersen.com',
            password: '123456'
          })
          .end((err, res) => {
            // Asserts
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            const { token } = res.body.data;

            // 3) Create new blog
            const blog = {
              name: 'Test blog',
              description: 'Test blog Description',
              price: 100,
              inStock: true
            };

            request(server)
              .post('/api/blogs')
              .set({ 'auth-token': token })
              .send(blog)
              .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.eql(1);

                const savedBlog = res.body[0];
                expect(savedBlog.name).to.be.equal(blog.name);
                expect(savedBlog.description).to.be.equal(blog.description);
                expect(savedBlog.price).to.be.equal(blog.price);
                expect(savedBlog.inStock).to.be.equal(blog.inStock);

                // 4) Verify one blog in test DB
                request(server)
                  .get('/api/blogs')
                  .end((err, res) => {
                    // Asserts
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.be.eql(1);

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
      password: '123456'
    };
    request(server)
      .post('/api/user/register')
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.be.equal(null);

        // 2) Login the user
        request(server)
          .post('/api/user/login')
          .send({
            email: 'mail@petersen.com',
            password: '123456'
          })
          .end((err, res) => {
            // Asserts
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            const { token } = res.body.data;

            // 3) Create new blog
            const blog = {
              name: 'Test blog',
              description: 'Test blog Description',
              price: 100,
              inStock: true
            };

            request(server)
              .post('/api/blogs')
              .set({ 'auth-token': token })
              .send(blog)
              .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.eql(1);

                const savedBlog = res.body[0];
                expect(savedBlog.name).to.be.equal(blog.name);
                expect(savedBlog.description).to.be.equal(blog.description);
                expect(savedBlog.price).to.be.equal(blog.price);
                expect(savedBlog.inStock).to.be.equal(blog.inStock);

                // 4) Delete blog
                request(server)
                  .delete(`/api/blogs/${savedBlog._id}`)
                  .set({ 'auth-token': token })
                  .end((err, res) => {
                    // Asserts
                    expect(res.status).to.be.equal(200);
                    const actualVal = res.body.message;
                    expect(actualVal).to.be.equal(
                      'blog was deleted successfully!'
                    );
                    done();
                  });
              });
          });
      });
  });

  it('should register user with invalid input', done => {
    // 1) Register new user with invalid inputs
    const user = {
      name: 'Peter Petersen',
      email: 'mail@petersen.com',
      password: '123' //Faulty password - Joi/validation should catch this...
    };
    request(server)
      .post('/api/user/register')
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(400); //normal expect with no custom output message
        //expect(res.status,"Status is not 400 (NOT FOUND)").to.be.equal(400); //custom output message at fail

        expect(res.body).to.be.a('object');
        expect(res.body.error).to.be.equal(
          '"password" length must be at least 6 characters long'
        );
        done();
      });
  });
});
 */