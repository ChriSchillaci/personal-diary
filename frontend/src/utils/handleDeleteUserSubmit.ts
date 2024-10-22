import handleLogout from "./handleLogout";
import handleApi from "./handleApi";

export default async function handleDeleteUserSubmit(
  e: MouseEvent,
  _id: string
) {
  e.preventDefault();

  await handleApi("DELETE", "delete-user", { _id });
  await handleLogout();
}
