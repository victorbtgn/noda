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

// const reqHeader = {
//   // headers: {
//   //   authorization:
//   //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzRlYmQ5MGMwOGIzMzU5ODlkNzVjOCIsImlhdCI6MTYwMTY1NDAyMH0.bSaMyhIWYzjnx8aVIIDh8QwGLxY-UhmR4pjUT_nmang",
//   // },
//   get: (string) =>
//     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzRlYmQ5MGMwOGIzMzU5ODlkNzVjOCIsImlhdCI6MTYwMTY1NDAyMH0.bSaMyhIWYzjnx8aVIIDh8QwGLxY-UhmR4pjUT_nmang",
// };

// it("Check auth middleware with valid token", (done) => {
//   const fakeReq = mockReq(reqHeader);
//   const fakeRes = mockRes();
//   const fakeNext = sinon.stub();

//   checkAuthTokenMiddleware(fakeReq, fakeRes, fakeNext)
//     .then((req) => {
//       done();
//     })
//     .catch((err) => done(err));
// });

// it("Check auth middleware without token", (done) => {
//   const fakeReq = mockReq();
//   const fakeRes = mockRes();
//   const fakeNext = sinon.stub();

//   checkAuthTokenMiddleware(fakeReq, fakeRes, fakeNext)
//     .then((req) => {
//       console.log("REQ: ", req);
//       if (req) return done(req);
//       done();
//     })
//     .catch((err) => done(err));
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
