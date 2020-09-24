const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

contactSchema.plugin(mongoosePaginate);

let db = model("Contact", contactSchema);

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

module.exports = { db, getContactsById, createContact, removeContact, updateContact };
