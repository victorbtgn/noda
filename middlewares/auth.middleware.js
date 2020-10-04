const { findUser } = require("../api/auth/auth.model");
const { verifyToken } = require("../services/token.service");

const checkAuthTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      throw res.status(401).json({ message: "Not authorized" });
      return;
    }
    const { id } = await verifyToken(token);
    const user = await findUser({ _id: id });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
    next(error);
  }
};

module.exports = { checkAuthTokenMiddleware };
