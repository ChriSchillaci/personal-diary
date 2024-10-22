import type { MessageType } from "../types/messageType";
import handleApi from "./handleApi";

export default async function handleUserPostSubmit(
  e: SubmitEvent,
  formEl: HTMLFormElement
) {
  e.preventDefault();
  const formData = new FormData(formEl);
  const getPostData = Object.fromEntries(formData);

  const data = await handleApi<MessageType>("POST", "add-post", getPostData);

  if (data.status > 400) {
    console.log(data.message);
  }

  location.replace("/");
}
