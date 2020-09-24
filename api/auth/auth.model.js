const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: (value) => value.includes("@"),
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: {
    type: String,
    default: "",
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
  return await db.findOneAndUpdate(query, update);
}

module.exports = { registerUser, findUser, findUserById, findUserAndUpdate };
