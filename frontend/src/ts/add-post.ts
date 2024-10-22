import type { MessageType } from "../types/messageType";
import handleApi from "../utils/handleApi";
import Navbar from "../components/Navbar";
import handleUserPostSubmit from "../utils/handleUserPostSubmit";
import "../styles/add-post.css";
import "../styles/global.css";

const formEl: HTMLFormElement = document.querySelector(".add-post__form")!;

handleApi<MessageType>("GET", "get-cookie").then((data) =>
  document.body.prepend(Navbar(data))
);

formEl.addEventListener("submit", (e) => handleUserPostSubmit(e, formEl));
