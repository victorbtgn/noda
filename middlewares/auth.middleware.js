const { findUser } = require("../api/auth/auth.model");
const { verifyToken } = require("../services/token.service");

const checkAuthTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const { id } = await verifyToken(token);
    const user = await findUser({ _id: id });
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
    next(error);
  }
};

module.exports = { checkAuthTokenMiddleware };
