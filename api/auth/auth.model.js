const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: String,
  avatarURL: {
    type: String,
    // default: "http://localhost:8000/images/default-avatar.jpg",
  },
});

let db = model("user", userSchema);

async function registerUser(user) {
  return await db.create(user);
}

async function findUser(query) {
  return await db.findOne(query);
}

async function findUserById(id) {
  return await db.findById(id);
}

async function findUserAndUpdate(query, update) {
  return await db.findOneAndUpdate(query, update, { new: true, runValidators: true });
}

module.exports = { registerUser, findUser, findUserById, findUserAndUpdate };
