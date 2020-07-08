const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.validateToken, userController.listContacts);

router.get(
  "/current",
  userController.validateToken,
  userController.currentUser
);

router.get(
  "/:contactId",
  userController.validateToken,
  userController.getContactById
);

module.exports = router;
