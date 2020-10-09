require("dotenv").config();
const { connect } = require("mongoose");
const sinon = require("sinon");
const { mockReq, mockRes } = require("sinon-express-mock");
const request = require("supertest");
const authRouter = require("../api/auth/auth.router");

const app = require('../index')

const { checkAuthTokenMiddleware } = require("../middlewares/auth.middleware");
const { avatarUploaderMiddleware } = require('../middlewares/fileUploader.middleware');
const { uploadAvatarController } = require('../api/auth/auth.controller');

describe('Connection mongo', () => {
  it("Connection mongo test with valid URI", (done) => {
    connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
      if (err) done(err);
      done();
    });
  });
})

describe('Unit test for auth middleware', () => {
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
})

// describe('Check POST upload avatar', function () {
//   const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzRiNTE1ZTQ4ODRkMmM1NDcwMzA3NyIsImlhdCI6MTYwMTQ4NDEyOX0.YK-fzBeDVHckGo7NzuQTRxD1_9A2qjBViZqzabGqTlk';

//   it('Check middleware with invalid token',  (done) => {
//     request(app)
//       .post('/auth/users/avatars')
//       .set('Accept', 'application/json')
//       .set('Authorization', token)
//       .expect(401, done)
      
//       //   return new Promise(async (resolve, reject) => {
//   //     try {
//   //       await request(app)
//   //     .post('/auth/users/avatars')
//   //     .set('Accept', 'application/json')
//   //     .set('Authorization', 'Bearer ' + token)
//   //     .expect((res) => {
//   //       console.log(res);
//   //     })
//   //     .expect(401, resolve())
//   //     } catch (err) {
//   //       reject(err)
//   //     }
//   //   });
//   // });
//   });
// });