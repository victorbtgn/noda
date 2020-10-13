const { Router } = require("express");
const { checkAuthTokenMiddleware } = require("../../middlewares/auth.middleware");
const {
  getCurrentUserController,
  updateUserController,
  registerUserController,
  loginUserController,
  logoutUserController,
  uploadAvatarController,
  verifyUserController
} = require("./auth.controller");
const { registrationValidatorMiddleware } = require("./auth.validator");
const { avatarUploaderMiddleware } = require("../../middlewares/fileUploader.middleware");

const authRouter = Router();

authRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);

authRouter.get('/verify/:verificationToken', verifyUserController)

authRouter.post("/users", checkAuthTokenMiddleware, updateUserController);

authRouter.post("/users/avatars", checkAuthTokenMiddleware, avatarUploaderMiddleware, uploadAvatarController);

authRouter.post("/register", registrationValidatorMiddleware, registerUserController);

authRouter.post("/login", loginUserController);

authRouter.post("/logout", checkAuthTokenMiddleware, logoutUserController);

module.exports = authRouter;
