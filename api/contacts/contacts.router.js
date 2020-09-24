const { Router } = require("express");

const {
  getContactsController,
  getContactByIdController,
  createContactController,
  removeContactByIdController,
  updateContactByIdController,
} = require("./contacts.controller");
const { checkAuthTokenMiddleware } = require("../../middlewares/auth.middleware");

const contactsRouter = Router();

contactsRouter.get("/", getContactsController);

contactsRouter.get("/:contactId", getContactByIdController);

contactsRouter.post("/", checkAuthTokenMiddleware, createContactController);

contactsRouter.delete("/:contactId", checkAuthTokenMiddleware, removeContactByIdController);

contactsRouter.patch("/:contactId", checkAuthTokenMiddleware, updateContactByIdController);

module.exports = contactsRouter;
