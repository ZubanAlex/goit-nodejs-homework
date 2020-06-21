const Joi = require("joi");
const contactModel = require("./contact.model");
const {
  Types: { ObjectId }
} = require("mongoose");
class ContactController {
  async createContacts(req, res, next) {
    try {
      const contact = await contactModel.createContact(req.body);
      return res.status(201).json(contact);
    } catch (err) {
      next(err);
    }
  }
  async getContacts(req, res, next) {
    try {
      return res.status(200).json(await contactModel.getAllContacts());
    } catch (err) {
      next(err);
    }
  }
  async getContactsById(req, res, next) {
    try {
      const userId = req.params.id;

      const contact = await contactModel.getContactById(req.params.id);
      if (!contact) {
        return res.status(404).send();
      }
      return res.status(200).json(contact);
    } catch (err) {
      next(err);
    }
  }
  async deleteContactsById(req, res, next) {
    try {
      const deletedContact = await contactModel.deleteContact(req.params.id);
      if (!deletedContact) {
        return res.status(404).send();
      }
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
  async updateContactsById(req, res, next) {
    try {
      const contactToUpdate = await contactModel.updateContact(
        req.params.id,
        req.body
      );
      console.log(contactToUpdate);
      if (!contactToUpdate) {
        return res.status(404).send();
      }
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
  validateId(req, res, next) {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send();
    }
    next();
  }
  validateCreateUser(req, res, next) {
    const body = req.body;

    const userRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
      subscription: Joi.string(),
      password: Joi.string(),
      token: Joi.string()
    });

    const validationResult = userRules.validate(body);
    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    }

    next();
  }
  validateUpdateUser(req, res, next) {
    const validateRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
      subscription: Joi.string(),
      password: Joi.string(),
      token: Joi.string()
    });
    const validationResult = Joi.validate(req.body, validateRules);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }
    next();
  }
}
module.exports = new ContactController();
