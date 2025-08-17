import { redirect } from "react-router-dom";
import { createContact, deleteContact, updateContact } from "../contacts";

const createContactAction = async () => {
  const contact = await createContact();
  return { contact };
};

async function editContactAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

async function deleteContactAction({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}

export { createContactAction, editContactAction, deleteContactAction };
