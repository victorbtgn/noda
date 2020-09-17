const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "Name",
    unique: true,
  },
  email: {
    type: String,
    required: true,
    validate: (value) => value.includes("@"),
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    default: "phone number",
    unique: true,
  },
});

let db = model("Contact", contactSchema);

async function getContacts() {
  return await db.find();
}

async function getContactsById(contactId) {
  return await db.findById(contactId);
}

module.exports = { getContacts, getContactsById };
