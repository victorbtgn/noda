const { Router } = require("express");

const {
  getContactsController,
  getContactByIdController,
  createContactController,
  removeContactByIdController,
  updateContactByIdController,
} = require("./contacts.controller");

const contactsRouter = Router();

contactsRouter.get("/", getContactsController);

contactsRouter.get("/:contactId", getContactByIdController);

contactsRouter.post("/", createContactController);

contactsRouter.delete("/:contactId", removeContactByIdController);

contactsRouter.patch("/:contactId", updateContactByIdController);

module.exports = contactsRouter;
