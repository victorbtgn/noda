const jwt = require("jsonwebtoken");

const createVerifyToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.ACCESS_KEY);
  return `Bearer ${token}`;
};

const verifyToken = async (token) => {
  const parsedToken = token.replace("Bearer ", "");
  return await jwt.verify(parsedToken, process.env.ACCESS_KEY);
};

module.exports = { createVerifyToken, verifyToken };
