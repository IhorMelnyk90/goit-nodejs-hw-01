const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, "/db/contacts.json");


const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};


const getContactById = async (contactId) => {
  const id = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find((i) => i.id === id);
  return result || null;
};


const removeContact = async (contactId) => {
  const id = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((i) => i.id === id);
  
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};


const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};