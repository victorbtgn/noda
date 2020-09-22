const User = require("./auth.model");
const bcrypt = require("bcrypt");
const { createVerifyToken } = require("../../services/token.service");

const getCurrentUserController = async (req, res, next) => {
  try {
    const user = await User.findUserById(req.user._id);
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const registerUserController = async (req, res, next) => {
  try {
    const { body } = req;
    const hashedPassword = await bcrypt.hash(body.password, +process.env.SALT);
    const user = await User.registerUser({
      ...body,
      password: hashedPassword,
    });
    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(409).json({ message: "Email in use" });
      next(error);
      return;
    }
    res.status(400).json({ message: "missing required name field" });
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.findUser({ email: body.email });
    if (!user) {
      console.log("user not found");
      res.status(401).json({ message: "Email or password is wrong" });
      return;
    }
    const isPasswordsEqual = await bcrypt.compare(body.password, user.password);
    if (!isPasswordsEqual) {
      console.log("password not valid");
      res.status(401).json({ message: "Email or password is wrong" });
      return;
    }
    const token = await createVerifyToken({ id: user._id });
    await User.findUserAndUpdate({ email: body.email }, { token });
    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "missing required field" });
    next(error);
  }
};

const logoutUserController = async (req, res, next) => {
  try {
    const user = await User.findUserById(req.user._id);
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    await User.findUserAndUpdate({ _id: user._id }, { token: "" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = { getCurrentUserController, registerUserController, loginUserController, logoutUserController };
