const fs = require("fs").promises;
const path = require("path");

// import { readFile, writeFile } from "fs";
// import { resolve } from "path";

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(contactsList);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  return contactsList.find((contact) => contact.id === contactId);
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = {
    id: contactsList[contactsList.length - 1].id + 1,
    name,
    email,
    phone,
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return newContact;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const newContactsList = contactsList.filter((contact) => contact.id !== contactId);
  return fs.writeFile(contactsPath, JSON.stringify(newContactsList));
}

async function updateContact(id, body) {
  const oldContact = await getContactById(id);
  const updatedContact = { ...oldContact, ...body };

  const contactsList = await listContacts();
  const newContactsList = contactsList.map((contact) => {
    if (contact.id === id) return updatedContact;
    return contact;
  });

  await fs.writeFile(contactsPath, JSON.stringify(newContactsList));

  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
