const User = require("./auth.model");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const { createVerifyToken } = require("../../services/token.service");
const { createDefaultAvatar, minifyAvatar } = require("../../services/createDefaultAvatar.service");
const { v4: uuidv4 } = require('uuid');
const { imagesStore } = require("../../config");
const { sendEmail } = require("../../services/mail.service");

const getCurrentUserController = async (req, res, next) => {
  try {
    const user = await User.findUserById(req.user._id);

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const user = await User.findUserById(req.user._id);
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    await User.findUserAndUpdate({ _id: user._id }, req.body);
    res.status(204).end();
  } catch (error) {
    if (error._message) res.status(400).json({ message: "invalid fields" });

    next(error);
  }
};

const registerUserController = async (req, res, next) => {
  try {
    const { body } = req;
    const verificationToken = uuidv4();
    const hashedPassword = await bcrypt.hash(body.password, +process.env.SALT);

    const user = await User.registerUser({
      ...body,
      password: hashedPassword,
      verificationToken,
    });

    if (!user) return res.status(404).json({ message: "user not found" });

    const avatarURL = await createDefaultAvatar(user._id);

    const updateUser = await User.findUserAndUpdate({ email: body.email }, { avatarURL });

    await sendEmail(body.email, verificationToken);

    res.status(201).json({
      user: {
        id: updateUser._id,
        email: updateUser.email,
        subscription: updateUser.subscription,
        avatarURL: updateUser.avatarURL,
      },
    });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Email in use" });
    console.log("error: ", error);
    const path = error.errors.subscription.properties.path;
    if (path) return res.status(400).json({ message: `missing required "${path}" field` });
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
    if(user.verificationToken) {
      return res.status(401).json({ message: "verify your email" })
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
        avatarURL: user.avatarURL,
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

const uploadAvatarController = async (req, res, next) => {
  try {
    const user = await User.findUserById(req.user._id);
    const oldUserAvatarName = await user.avatarURL.split("/")[4];
    if (oldUserAvatarName) {
      await fs.unlink(imagesStore(oldUserAvatarName));
    }
    const updateAvatar = await minifyAvatar();
    const updateUser = await User.findUserAndUpdate({ _id: req.user._id }, { avatarURL: updateAvatar });
    res.json({ avatarURL: updateUser.avatarURL });
  } catch (error) {
    next(error);
  }
};

const verifyUserController = async (req, res, next) => {
  try {
    const user = await User.findUser({ verificationToken: req.params.verificationToken });
    if(!user) return res.status(404).json({message: "user not found"});
    await User.findUserAndUpdate({ verificationToken: user.verificationToken }, { $unset: { verificationToken: '' } })
    res.status(200).end()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCurrentUserController,
  updateUserController,
  registerUserController,
  loginUserController,
  logoutUserController,
  uploadAvatarController,
  verifyUserController,
};
