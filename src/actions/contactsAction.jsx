import { redirect } from "react-router-dom";
import { createContact, deleteContact, updateContact } from "../contacts";

const createContactAction = async () => {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
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

async function updateContactFavorite({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export {
  createContactAction,
  editContactAction,
  deleteContactAction,
  updateContactFavorite,
};
