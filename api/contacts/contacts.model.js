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
  subscription: {
    type: String,
    default: "free",
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  token: {
    type: String,
    default: "",
  },
});

let db = model("Contact", contactSchema);

async function getContacts(query) {
  return await db.find(query);
}

async function getContactsById(contactId) {
  return await db.findById(contactId);
}

async function createContact(contact) {
  return await db.create(contact);
}

async function removeContact(contactId) {
  return await db.findByIdAndRemove(contactId);
}

async function updateContact(contactId, contactData) {
  return await db.findByIdAndUpdate(contactId, contactData, { new: true });
}

module.exports = { getContacts, getContactsById, createContact, removeContact, updateContact };
