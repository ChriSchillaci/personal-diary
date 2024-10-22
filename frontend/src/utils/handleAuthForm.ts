import type { MessageType } from "../types/messageType";
import type { RegisterUserType } from "../types/userTypes";
import handleApi from "./handleApi";

export default async function handleAuthForm(
  e: SubmitEvent,
  pathname: string,
  formEl: HTMLFormElement,
  errorEl: HTMLParagraphElement
) {
  e.preventDefault();
  const formData = new FormData(formEl);
  const getAuthData = Object.fromEntries(formData);

  let setAuthDataType:
    | RegisterUserType
    | Omit<RegisterUserType, "first_name" | "last_name">;
  let data: MessageType;

  if (pathname === "/register.html") {
    setAuthDataType = {
      email: getAuthData.email as string,
      first_name: getAuthData.first_name as string,
      last_name: getAuthData.last_name as string,
      password: getAuthData.password as string,
    } as RegisterUserType;

    data = await handleApi<MessageType>("POST", "register", setAuthDataType);
  } else {
    setAuthDataType = {
      email: getAuthData.email as string,
      password: getAuthData.password as string,
    } as Omit<RegisterUserType, "first_name" | "last_name">;

    data = await handleApi<MessageType>("POST", "login", setAuthDataType);
  }

  if (data.status > 400) {
    errorEl.textContent = data.message;
    errorEl.classList.add("active");
    return;
  }

  if (pathname === "/register.html") {
    location.replace("/login.html");
    return;
  }

  location.replace("/");
}
