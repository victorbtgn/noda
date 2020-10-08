require("dotenv").config();
const { func } = require("joi");
const { connect } = require("mongoose");
const sinon = require("sinon");
const { mockReq, mockRes } = require("sinon-express-mock");
const supertest = require("supertest");
const { argv } = require("yargs");
const authRouter = require("../api/auth/auth.router");

const { checkAuthTokenMiddleware } = require("../middlewares/auth.middleware");

it("Connection mongo test with valid URI", (done) => {
  connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) done(err);
    done();
  });
});

const argForMiddleware = () => {
  const req = mockReq();
  const res = mockRes({ params: {} });
  const next = sinon.stub();

  res.status = function (params) {
    this.params.status = params;
    return this;
  };
  res.json = function (params) {
    this.params.json = params;
    return this;
  };

  return [req, res, next];
};

const validToken = () =>
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzRiNTE1ZTQ4ODRkMmM1NDcwMzA3NyIsImlhdCI6MTYwMTQ4NDEyOX0.YK-fzBeDVHckGo7NzuQTRxD1_9A2qjBViZqzabGqTlk";

it("Check auth middleware with valid token", async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [req, res, next] = argForMiddleware();
      req.get = validToken;
      await checkAuthTokenMiddleware(req, res, next);
      if (req.user._id) resolve();
    } catch (err) {
      reject(err);
    }
  });
});

const invalidToken = () =>
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzRlYmQ5MGMwOGIzMzU5ODlkNzVjOCIsImlhdCI6MTYwMTY1NDAyMH0.bSaMyhIWYzjnx8aVIIDh8QwGLxY-UhmR4pjUT_nmanG";

it("Check auth middleware with invalid token", async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [req, res, next] = argForMiddleware();
      req.get = invalidToken;
      await checkAuthTokenMiddleware(req, res, next);
      if (res.params.status === 401) resolve();
    } catch (err) {
      reject(err);
    }
  });
});

const nonToken = () => "";

it("Check auth middleware without token", async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [req, res, next] = argForMiddleware();
      req.get = nonToken;
      await checkAuthTokenMiddleware(req, res, next);
      if (res.params.status === 401) resolve();
    } catch (err) {
      reject(err);
    }
  });
});

// ======================================
// task 2 supertest

// it('test for update avatar', (done) => {
//   supertest(authRouter)
//   .post('/users/avatars')
//   .field('avatar', 'my avatar')
//   .attach('avatar', 'test/avatar.jpg')
//   .expect(200, {avatarURL: 'update avatar URL'}, done)
// })
