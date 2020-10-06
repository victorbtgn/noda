require("dotenv").config();
const { connect } = require("mongoose");
const sinon = require("sinon");
const { mockReq, mockRes } = require("sinon-express-mock");
const supertest = require("supertest");
const authRouter = require("../api/auth/auth.router");

const { checkAuthTokenMiddleware } = require("../middlewares/auth.middleware");

it("Connection mongo test with valid URI", (done) => {
  connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) done(err);
    done();
  });
});

const validToken = {
  get: () =>
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzRlYmQ5MGMwOGIzMzU5ODlkNzVjOCIsImlhdCI6MTYwMTY1NDAyMH0.bSaMyhIWYzjnx8aVIIDh8QwGLxY-UhmR4pjUT_nmang",
};

it("Check auth middleware with valid token", (done) => {
  const fakeReq = mockReq(validToken);
  const fakeRes = mockRes();

  checkAuthTokenMiddleware(fakeReq, fakeRes, (err, req) => {
    if (err) return done(err);
    done();
  });
});

const invalidToken = {
  get: () =>
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzRlYmQ5MGMwOGIzMzU5ODlkNzVjOCIsImlhdCI6MTYwMTY1NDAyMH0.bSaMyhIWYzjnx8aVIIDh8QwGLxY-UhmR4pjUT_nmanG",
};

it("Check auth middleware with invalid token", (done) => {
  const fakeReq = mockReq(invalidToken);
  const fakeRes = mockRes();

  checkAuthTokenMiddleware(fakeReq, fakeRes, (err) => {
    if (err) return done();
    done(new Error("must be invalid token"));
  });
});

const nonToken = {
  get: () => "",
};

// it("Check auth middleware without token", (done) => {
//   const fakeReq = mockReq(nonToken);
//   const fakeRes = mockRes();

//   checkAuthTokenMiddleware(fakeReq, fakeRes, (err) => {
//     console.log("ERR: ", err);
//     if (err) return done();
//     done(new Error("must be empty token"));
//   });
// });

// ======================================
// task 2 supertest

// it('test for update avatar', (done) => {
//   supertest(authRouter)
//   .post('/users/avatars')
//   .field('avatar', 'my avatar')
//   .attach('avatar', 'test/avatar.jpg')
//   .expect(200, {avatarURL: 'update avatar URL'}, done)
// })
