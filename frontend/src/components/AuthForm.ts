import handleAuthForm from "../utils/handleAuthForm";

export default function AuthForm(pathname: string) {
  const authContainer = document.createElement("div");
  const iconEl = document.createElement("img");
  const errorEl = document.createElement("p");
  const formEl = document.createElement("form");
  const firstNameInputEl = document.createElement("input");
  const lastNameInputEl = document.createElement("input");
  const emailInputEl = document.createElement("input");
  const passwordInputEl = document.createElement("input");
  const btnEl = document.createElement("button");
  const registerTextEl = document.createElement("p");
  const registerSpanEl = document.createElement("span");
  const registerLinkEl = document.createElement("a");

  authContainer.classList.add("auth-container");

  iconEl.classList.add("auth-container__img");

  errorEl.classList.add("auth-container__error");

  formEl.classList.add("auth-container__auth-form");
  firstNameInputEl.classList.add("auth-container__auth-form__input");
  lastNameInputEl.classList.add("auth-container__auth-form__input");
  emailInputEl.classList.add("auth-container__auth-form__input");
  passwordInputEl.classList.add("auth-container__auth-form__input");
  btnEl.classList.add("auth-container__auth-form__submit-btn");

  registerTextEl.classList.add("auth-container__register-text");
  registerSpanEl.classList.add("auth-container__register-span");

  iconEl.src = "/kanba-black.png";
  iconEl.alt = "icon";

  firstNameInputEl.name = "first_name";
  firstNameInputEl.placeholder = "First Name";
  firstNameInputEl.required = true;

  lastNameInputEl.name = "last_name";
  lastNameInputEl.placeholder = "Last Name";
  lastNameInputEl.required = true;

  emailInputEl.name = "email";
  emailInputEl.type = "email";
  emailInputEl.placeholder = "Email";
  emailInputEl.required = true;

  passwordInputEl.name = "password";
  passwordInputEl.type = "password";
  passwordInputEl.placeholder = "Password";
  passwordInputEl.minLength = 5;
  passwordInputEl.required = true;

  btnEl.type = "submit";

  registerLinkEl.href = "/register.html";

  btnEl.textContent = pathname === "/register.html" ? "Sign up" : "Sign in";

  registerTextEl.textContent = "Don't have an account? Sign up ";
  registerLinkEl.textContent = "here";

  if (pathname === "/register.html") {
    formEl.append(
      firstNameInputEl,
      lastNameInputEl,
      emailInputEl,
      passwordInputEl,
      btnEl
    );
    authContainer.append(iconEl, errorEl, formEl);
  } else {
    formEl.append(emailInputEl, passwordInputEl, btnEl);
    registerSpanEl.append(registerLinkEl);
    registerTextEl.append(registerSpanEl);
    authContainer.append(iconEl, errorEl, formEl, registerTextEl);
  }

  formEl.addEventListener("submit", (e) =>
    handleAuthForm(e, pathname, formEl, errorEl)
  );

  return authContainer;
}
