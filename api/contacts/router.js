const { Router } = require("express");
const { listContacts, getContactById, removeContact, addContact, updateContact } = require("../../contacts");

const contactsRouter = Router();

contactsRouter.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
  return;
});

contactsRouter.get("/:contactId", async (req, res) => {
  const id = Number(req.params.contactId);
  const contact = await getContactById(id);
  if (!contact) return res.status(404).json({ message: "Not found" });

  res.status(200).json(contact);
  return;
});

contactsRouter.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) return res.status(400).json({ message: "missing required name field" });

  const newContact = await addContact(name, email, phone);
  res.status(201).json(newContact);
});

contactsRouter.delete("/:contactId", async (req, res) => {
  const id = Number(req.params.contactId);
  const contact = await getContactById(id);
  if (!contact) return res.status(404).json({ message: "Not found" });

  await removeContact(id);
  res.status(200).json({ message: "contact deleted" });
  return;
});

contactsRouter.patch("/:contactId", async (req, res) => {
  const { body } = req;
  if (Object.keys(body).length === 0) return res.status(400).json({ message: "missing field" });

  const id = Number(req.params.contactId);
  const contact = await getContactById(id);
  if (!contact) return res.status(404).json({ message: "Not found" });

  const updatedContact = await updateContact(id, body);

  res.status(200).json(updatedContact);
});

module.exports = contactsRouter;
