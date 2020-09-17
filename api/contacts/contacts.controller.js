const contactsDB = require("./contacts.model");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await contactsDB.getContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const contact = await contactsDB.getContactsById(req.params.contactId);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = { getContactsController, getContactByIdController };
