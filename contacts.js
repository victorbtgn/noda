const fs = require("fs");
const path = require("path");

// import { readFile, writeFile } from "fs";
// import { resolve } from "path";

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) return err;

    const contactsList = JSON.parse(data);
    console.table(contactsList);
    return contactsList;
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) return err;

    const contact = JSON.parse(data).find((contact) => contact.id === contactId);
    console.table(contact);
    return contact;
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) return;

    const newContactsList = JSON.parse(data).filter((contact) => contact.id !== contactId);

    return fs.writeFile(contactsPath, JSON.stringify(newContactsList), (err) => err);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) return err;

    const contacts = JSON.parse(data);

    const newContact = {
      id: contacts[contacts.length - 1].id + 1,
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    return fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => err);
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
