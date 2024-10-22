import type { MessageType } from "../types/messageType";
import handleLogout from "../utils/handleLogout";

export default function Navbar(data: MessageType) {
  const navbar = document.createElement("nav");
  const iconTitleContainer = document.createElement("div");
  const icon = document.createElement("img");
  const title = document.createElement("h2");
  const linksAndAuthBtnsContainer = document.createElement("div");
  const linksContainer = document.createElement("div");
  const homeLink = document.createElement("a");
  const userLink = document.createElement("a");
  const addPostLink = document.createElement("a");
  const authBtnsContainer = document.createElement("div");
  const registerBtn = document.createElement("a");
  const loginBtn = document.createElement("a");
  const logoutBtn = document.createElement("button");

  navbar.classList.add("navbar");

  iconTitleContainer.classList.add("navbar__icon-title-container");
  icon.classList.add("navbar__icon-title-container__icon");
  title.classList.add("navbar__icon-title-container__title");

  linksAndAuthBtnsContainer.classList.add("navbar__links--auth-container");

  linksContainer.classList.add(
    "navbar__links--auth-container__links-container"
  );

  authBtnsContainer.classList.add(
    "navbar__links--auth-container__auth-container"
  );
  registerBtn.classList.add(
    "navbar__links--auth-container__auth-container__register-btn"
  );
  loginBtn.classList.add(
    "navbar__links--auth-container__auth-container__login-btn"
  );
  logoutBtn.classList.add(
    "navbar__links--auth-container__auth-container__logout-btn"
  );

  icon.src = "/kanba-black.png";
  icon.alt = "icon";
  title.textContent = "Lorem Ipsum";
  logoutBtn.type = "button";

  homeLink.textContent = "Home";
  userLink.textContent = "User";
  addPostLink.textContent = "Add post";

  homeLink.href = "/";
  userLink.href = "/user.html";
  addPostLink.href = "/add-post.html";

  registerBtn.textContent = "Sign up";
  loginBtn.textContent = "Sign in";
  logoutBtn.textContent = "Logout";

  loginBtn.href = "/login.html";
  registerBtn.href = "/register.html";

  if (data.status > 400) {
    iconTitleContainer.append(icon, title);
    linksContainer.append(homeLink);
    authBtnsContainer.append(registerBtn, loginBtn);
    linksAndAuthBtnsContainer.append(linksContainer, authBtnsContainer);
    navbar.append(iconTitleContainer, linksAndAuthBtnsContainer);
  } else {
    iconTitleContainer.append(icon, title);
    linksContainer.append(homeLink, userLink, addPostLink);
    authBtnsContainer.append(logoutBtn);
    linksAndAuthBtnsContainer.append(linksContainer, authBtnsContainer);
    navbar.append(iconTitleContainer, linksAndAuthBtnsContainer);
  }

  logoutBtn.addEventListener("click", handleLogout);

  return navbar;
}
