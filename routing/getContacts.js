const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.verifyToken, userController.listContacts);

router.get("/current", userController.verifyToken, userController.currentUser);

router.get(
  "/:contactId",
  userController.verifyToken,
  userController.getContactById
);

module.exports = router;
