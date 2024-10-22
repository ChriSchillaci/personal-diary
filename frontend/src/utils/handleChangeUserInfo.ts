export default function handleChangeUserInfo(
  e: MouseEvent,
  userFirstNameValueEl: HTMLInputElement,
  userLastNameValueEl: HTMLInputElement,
  userEmailValueEl: HTMLInputElement
) {
  const target = e.target as HTMLInputElement;
  if (target.name === "first_name") {
    const getFirstNameBoolean = userFirstNameValueEl.readOnly;
    userFirstNameValueEl.readOnly = !getFirstNameBoolean;
    if (userFirstNameValueEl.classList.contains("active")) {
      userFirstNameValueEl.classList.remove("active");
      return;
    }
    userFirstNameValueEl.classList.add("active");
  }

  if (target.name === "last_name") {
    const getLastNameBoolean = userLastNameValueEl.readOnly;
    userLastNameValueEl.readOnly = !getLastNameBoolean;
    if (userLastNameValueEl.classList.contains("active")) {
      userLastNameValueEl.classList.remove("active");
      return;
    }
    userLastNameValueEl.classList.add("active");
  }
  if (target.name === "email") {
    const getEmailBoolean = userEmailValueEl.readOnly;
    userEmailValueEl.readOnly = !getEmailBoolean;
    if (userEmailValueEl.classList.contains("active")) {
      userEmailValueEl.classList.remove("active");
      return;
    }
    userEmailValueEl.classList.add("active");
  }
}
