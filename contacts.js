const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) return err;

    console.table(JSON.parse(data));
    return JSON.parse(data);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) return err;

    console.table(JSON.parse(data).find((contact) => contact.id === contactId));
    return JSON.parse(data).find((contact) => contact.id === contactId);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) return;

    const newContactsList = JSON.parse(data).filter(
      (contact) => contact.id !== contactId
    );

    return fs.writeFile(
      contactsPath,
      JSON.stringify(newContactsList),
      (err) => err
    );
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

    return fs.writeFileSync(contactsPath, JSON.stringify(contacts));
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
