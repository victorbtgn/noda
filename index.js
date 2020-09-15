const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

const express = require("express");
const contactsRouter = require("./api/contacts/router");

const app = express();
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
