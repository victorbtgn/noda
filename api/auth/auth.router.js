const { Router } = require("express");
const { checkAuthTokenMiddleware } = require("../../middlewares/auth.middleware");
const {
  getCurrentUserController,
  updateUserController,
  registerUserController,
  loginUserController,
  logoutUserController,
} = require("./auth.controller");

const authRouter = Router();

authRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);

authRouter.post("/users", checkAuthTokenMiddleware, updateUserController);

authRouter.post("/register", registerUserController);

authRouter.post("/login", loginUserController);

authRouter.post("/logout", checkAuthTokenMiddleware, logoutUserController);

module.exports = authRouter;
