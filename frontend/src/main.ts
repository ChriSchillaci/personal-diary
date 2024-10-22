import type { MessageType } from "./types/messageType";
import type { UserDataType } from "./types/userTypes";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import handleApi from "./utils/handleApi";
import "./style.css";
import "./styles/global.css";

const postContainerEl = document.querySelector(".home__posts")!;

const adviceLoginEl = document.createElement("h4");
adviceLoginEl.classList.add("home__posts__advice");

handleApi<UserDataType>("GET", "data").then((data) => {
  if ("status" in data) {
    return;
  }

  if (!data.posts.length) {
    adviceLoginEl.textContent = "Your diary is empty";
    postContainerEl.append(adviceLoginEl);
  }

  data.posts.map((post) => postContainerEl.append(Post(post)));
});

handleApi<MessageType>("GET", "get-cookie").then((data) => {
  if ("status" in data && data.status > 400) {
    adviceLoginEl.textContent = "Please login to create posts";
    postContainerEl.append(adviceLoginEl);
  }
  document.body.prepend(Navbar(data));
});
