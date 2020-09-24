const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

const fs = require("fs");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const authRouter = require("./api/auth/auth.router");
const contactsRouter = require("./api/contacts/contacts.router");

const runServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("Database connection successful");

    const app = express();
    app.use(morgan("dev"));
    app.use(cors());
    app.use(express.json());

    app.use("/auth", authRouter);
    app.use("/api/contacts", contactsRouter);

    app.use(async (err, req, res, next) => {
      if (err) {
        let logs = await fs.readFile("errors.logs.json", { encoding: "utf-8" });
        logs = JSON.parse(logs);
        logs.push({
          date: new Date().toISOString(),
          method: req.method,
          url: req.originalUrl,
          message: err.message,
        });
        logs = JSON.stringify(logs);
        await fs.writeFile("errors.logs.json", logs);
      }
    });

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    //  Send this error on some new logs file? or error.logs.js
    console.log("Database connection error(");
    process.exit(1);
  }
};

runServer();
