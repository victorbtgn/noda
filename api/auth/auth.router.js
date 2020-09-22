const { Router } = require("express");
const { checkAuthTokenMiddleware } = require("../../middlewares/auth.middleware");
const {
  getCurrentUserController,
  registerUserController,
  loginUserController,
  logoutUserController,
} = require("./auth.controller");

const authRouter = Router();

authRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);

authRouter.post("/register", registerUserController);

authRouter.post("/login", loginUserController);

authRouter.post("/logout", checkAuthTokenMiddleware, logoutUserController);

module.exports = authRouter;
