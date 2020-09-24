const contactsDB = require("./contacts.model");

const getContactsController = async (req, res, next) => {
  try {
    const { page, limit, ...query } = req.query;
    const opt = {
      page: +page || 1,
      limit: +limit || 20,
    };
    const contacts = await contactsDB.db.paginate(query, opt, async function (err, result) {
      if (err) return;
      return result.docs;
    });
    res.json(contacts);
  } catch (error) {
    console.log("err: ", error);
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const contact = await contactsDB.getContactsById(req.params.contactId);
    // if the "id" is in the body: contactsDB.getContactsById(req.body.contactId)
    res.json(contact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    next(error);
  }
};

const createContactController = async (req, res, next) => {
  try {
    const { body } = req;
    const contact = await contactsDB.createContact(body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: "missing required name field" });
    next(error);
  }
};

const updateContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const newContact = await contactsDB.updateContact(contactId, body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    next(error);
  }
};

const removeContactByIdController = async (req, res, next) => {
  try {
    await contactsDB.removeContact(req.params.contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    next(error);
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  createContactController,
  removeContactByIdController,
  updateContactByIdController,
};
