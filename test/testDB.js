require("dotenv").config();
const { connect } = require("mongoose");
const sinon = require("sinon");

const { checkAuthTokenMiddleware } = require("../middlewares/auth.middleware");

it("Connection mongo test with valid URI", (done) => {
  connect(process.env.DB_URI, { useNewUrlParser: true }, (err) => {
    if (err) done(err);
    done();
  });
});

// it("Connection mongo test with invalid URI", (done) => {
//   connect("db_uri", (err) => {
//     if (err) done(err);
//     done();
//   });
// });

// const fakeReq = {
//   authorization:
//     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzRlYmQ5MGMwOGIzMzU5ODlkNzVjOCIsImlhdCI6MTYwMTY1NDAyMH0.bSaMyhIWYzjnx8aVIIDh8QwGLxY-UhmR4pjUT_nmang",
//   "Content-Type": "application/json",
// };

// it("Check auth middleware", (done) => {
//   const fakeReq = sinon.useFakeXMLHttpRequest();
//   const fakeRes = sinon.stub();
//   const fakeNext = sinon.stub();

//   checkAuthTokenMiddleware(fakeReq)
//     .then((req, res, next) => {
//       res.status = fakeRes;
//       if (req) {
//         console.log(req);
//         done(req);
//       }
//       done();
//     })
//     .catch((err) => done(err));
// });
