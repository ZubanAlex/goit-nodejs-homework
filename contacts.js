const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile("./db/contacts.json", "utf-8", function (err, content) {
    try {
      const parsedContent = JSON.parse(content);
      console.table(parsedContent);
    } catch (error) {
      console.log("listContacts error", err);
    }
  });
}

function getContactById(contactId) {
  fs.readFile("./db/contacts.json", "utf-8", function (err, content) {
    try {
      const parsedContent = JSON.parse(content);
      const findContact = parsedContent.find((item) => item.id === contactId);
      console.log("findContact", findContact);
    } catch (error) {
      console.log("getContactById error", err);
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, { encoding: "utf-8" }, (err, data) => {
    try {
      const parsedData = JSON.parse(data);

      const deleteContact = parsedData.filter((item) => item.id !== contactId);
      console.log("Contact was removed:", deleteContact);
      return deleteContact;
    } catch (error) {
      console.log("removeContact error:", err);
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, { encoding: "utf-8" }, (err, data) => {
    try {
      const parsedData = JSON.parse(data);

      const newContact = { name, email, phone };
      const allContacts = [...parsedData, newContact];

      fs.writeFile(contactsPath, JSON.stringify(allContacts), () => {
        console.log("Contact was added.");
      });
      console.log(allContacts);
    } catch (error) {
      console.log("error:", err);
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
