const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);
    return result;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId.toString());
    if (index === -1) {
        return null;
    }
    const [contact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
}

async function addContact(name, email, phone, id) {
    const contact = { name, email, phone, id };
    const contacts = await listContacts();
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};