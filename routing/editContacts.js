const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validations = require("../controllers/validation");

router.post(
  "/register",
  validations.validateRequest,
  userController.createUser
);

router.post("/login", validations.validateSignIn, userController.loginUser);

router.post("/logout", userController.verifyToken, userController.logout);

router.delete("/:contactId", userController.removeContact);

router.patch(
  "/:contactId",
  userController.verifyToken,
  userController.updateContact
);

module.exports = router;
