const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Joi = require("joi");
const contacts = require("./contacts.js");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server start on ${PORT} port! `);
});

app.get("/", function (req, resp) {
  resp.send("It is contact API server ;)");
});
app.get("/api/contacts", (req, resp) => {
  contacts.listContacts(req, resp);
});
app.get("/api/contacts/:contactId", (req, resp) => {
  contacts.getContactById({ req, resp, contactId: req.params.contactId });
});

app.post(
  "/api/contacts",
  (req, resp, next) => {
    const validationContact = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const validationResult = Joi.validate(req.body, validationContact);
    if (validationResult.error) {
      resp.status(400).send(validationResult.error.details[0].message);
    } else {
      next();
    }
  },
  (req, resp) => {
    contacts.addContact({ ...req.body, resp });
  }
);

app.delete("/api/contacts/:contactId", (req, resp) => {
  const contactId = req.params.contactId;
  contacts.removeContact({ resp, contactId });
});

app.patch(
  "/api/contacts/:contactId",
  (req, resp, next) => {
    const validationContact = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });
    const validationResult = Joi.validate(req.body, validationContact);
    if (validationResult.error) {
      resp.status(400).send(validationResult.error.details[0].message);
    } else {
      next();
    }
  },
  (req, resp) => {
    const id = req.params.contactId;
    contacts.updateContact({ req, resp, id });
  }
);
