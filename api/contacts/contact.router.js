const { Router } = require("express");
const contactController = require("./contact.controller");

const contactsRouter = Router();

contactsRouter.post(
  "/",
  contactController.validateCreateUser,
  contactController.createContacts
);

contactsRouter.get("/", contactController.getContacts);
contactsRouter.get(
  "/:id",
  contactController.validateId,
  contactController.getContactsById
);
contactsRouter.delete(
  "/:id",
  contactController.validateId,
  contactController.deleteContactsById
);
contactsRouter.patch(
  "/:id",
  contactController.validateId,
  contactController.validateUpdateUser,
  contactController.updateContactsById
);

module.exports = contactsRouter;
