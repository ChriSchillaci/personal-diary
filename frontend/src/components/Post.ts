import type { UserPostType } from "../types/userTypes";

export default function Post(data: UserPostType) {
  const { title, text_post } = data;

  const postEl = document.createElement("div");
  const titleEl = document.createElement("h3");
  const textEl = document.createElement("p");

  postEl.classList.add("home__posts__post");
  titleEl.classList.add("home__posts__post__title");
  textEl.classList.add("home__posts__post__text-post");

  titleEl.textContent = title;
  textEl.textContent = text_post;

  postEl.append(titleEl, textEl);

  return postEl;
}
