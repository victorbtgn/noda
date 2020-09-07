const contacts = require("./contacts");
const argv = require("yargs").argv;

// contacts.addContact("Dart Vader", "darkside@mail.com", "(715) 845-7856");

// contacts.addContact("John Kirk", "navy@mail.com", "(715) 852-8513");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      contacts.getContactById(id);
      break;

    case "add":
      contacts.addContact(name, email, phone);
      break;

    case "remove":
      contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
