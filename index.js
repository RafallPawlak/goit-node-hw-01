const contactsAll = require("./contacts");

const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsAll.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsAll.getContactById(id);
      console.table(contact);
      break;

    case "add":
      const addedContact = await contactsAll.addContact(
        name,
        email,
        phone,
        id
      );
      console.table(addedContact);
      break;

    case "remove":
      const removeContact = await contactsAll.removeContact(id);
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

