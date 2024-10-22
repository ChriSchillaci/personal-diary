import handleApi from "./handleApi";

export default async function handleLogout() {
  await handleApi("GET", "delete-cookie");
  location.replace("/login.html");
}
