import type { MessageType } from "../types/messageType";
import type { UserDataType } from "../types/userTypes";
import handleApi from "./handleApi";

export default async function handleUserEditSubmit(
  e: SubmitEvent,
  userEl: HTMLFormElement,
  userImgEl: HTMLImageElement
) {
  e.preventDefault();
  const formData = new FormData(userEl);
  const getUserData = Object.fromEntries(formData);

  const setUserData: Omit<UserDataType, "posts"> = {
    _id: userImgEl.id,
    first_name: getUserData.first_name as string,
    last_name: getUserData.last_name as string,
    email: getUserData.email as string,
    image: userImgEl.src,
  };

  await handleApi<MessageType>("PUT", "edit-user", setUserData);

  location.reload();
}
