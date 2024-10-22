import type { UserDataType } from "../types/userTypes";
import handleUserEditSubmit from "../utils/handleUserEditSubmit";
import userImages from "../mocks/user-images";
import handleChangeUserInfo from "../utils/handleChangeUserInfo";
import handleDeleteUserSubmit from "../utils/handleDeleteUserSubmit";

export default function UserSettings(data: UserDataType) {
  const { _id, first_name, last_name, email, image } = data;

  const userEl = document.createElement("form");
  const userImgEl = document.createElement("img");
  const userFirstNameContainerEl = document.createElement("div");
  const userFirstNameEl = document.createElement("h4");
  const userFirstNameValueEl = document.createElement("input");
  const userLastNameContainerEl = document.createElement("div");
  const userLastNameEl = document.createElement("h4");
  const userLastNameValueEl = document.createElement("input");
  const userEmailContainerEl = document.createElement("div");
  const userEmailEl = document.createElement("h4");
  const userEmailValueEl = document.createElement("input");
  const imagesContainerEl = document.createElement("div");
  const imagesTextEl = document.createElement("h4");
  const imagesEl = document.createElement("div");

  const btnsContainerEl = document.createElement("div");
  const saveBtnEl = document.createElement("button");
  const deleteUserBtnEl = document.createElement("button");

  userEl.classList.add("user");
  userImgEl.classList.add("user__img-user");

  userFirstNameContainerEl.classList.add("user__first-name-container");
  userFirstNameEl.classList.add("user__first-name-container__text");
  userFirstNameValueEl.classList.add("user__first-name-container__value");

  userLastNameContainerEl.classList.add("user__last-name-container");
  userLastNameEl.classList.add("user__last-name-container__text");
  userLastNameValueEl.classList.add("user__last-name-container__value");

  userEmailContainerEl.classList.add("user__email-container");
  userEmailEl.classList.add("user__email-container__text");
  userEmailValueEl.classList.add("user__email-container__value");

  imagesContainerEl.classList.add("user__images-container");
  imagesTextEl.classList.add("user__images-container__img-text");
  imagesEl.classList.add("user__images-container__images");

  btnsContainerEl.classList.add("user__btns-container");
  saveBtnEl.classList.add("user__btns-container__save-btn");
  deleteUserBtnEl.classList.add("user__btns-container__delete-btn");

  userImgEl.id = _id;
  userImgEl.src = !image ? "/default-user-img.jpg" : image;
  userImgEl.alt = "user";

  userFirstNameValueEl.name = "first_name";
  userLastNameValueEl.name = "last_name";
  userEmailValueEl.name = "email";

  userFirstNameValueEl.placeholder = "Add first name";
  userLastNameValueEl.placeholder = "Add last name";
  userEmailValueEl.placeholder = "Add email";

  userFirstNameValueEl.required = true;
  userLastNameValueEl.required = true;
  userEmailValueEl.required = true;

  userEmailValueEl.type = "email";

  userFirstNameValueEl.readOnly = true;
  userLastNameValueEl.readOnly = true;
  userEmailValueEl.readOnly = true;

  saveBtnEl.type = "submit";
  deleteUserBtnEl.type = "button";

  userFirstNameEl.textContent = "First Name";
  userFirstNameValueEl.defaultValue = first_name;
  userLastNameEl.textContent = "Last Name";
  userLastNameValueEl.defaultValue = last_name;
  userEmailEl.textContent = "Email";
  userEmailValueEl.defaultValue = email;
  imagesTextEl.textContent = "Images";

  saveBtnEl.textContent = "Save";
  deleteUserBtnEl.textContent = "Delete User";

  userImages.map((image) => {
    const imageEl = document.createElement("img");

    imageEl.classList.add("user__images-container__images__img");

    imageEl.src = `https://robohash.org/${image}?set=set5&size=100x100`;
    imageEl.alt = `Img ${image}`;

    imagesEl.append(imageEl);

    imageEl.addEventListener("click", (e) => {
      const target = e.target as HTMLImageElement;
      userImgEl.src = target.src;
    });
  });

  userFirstNameContainerEl.append(userFirstNameEl, userFirstNameValueEl);
  userLastNameContainerEl.append(userLastNameEl, userLastNameValueEl);
  userEmailContainerEl.append(userEmailEl, userEmailValueEl);
  imagesContainerEl.append(imagesTextEl, imagesEl);
  btnsContainerEl.append(saveBtnEl, deleteUserBtnEl);
  userEl.append(
    userImgEl,
    userFirstNameContainerEl,
    userLastNameContainerEl,
    userEmailContainerEl,
    imagesContainerEl,
    btnsContainerEl
  );

  userEl.addEventListener("click", (e) =>
    handleChangeUserInfo(
      e,
      userFirstNameValueEl,
      userLastNameValueEl,
      userEmailValueEl
    )
  );

  userEl.addEventListener("submit", async (e) =>
    handleUserEditSubmit(e, userEl, userImgEl)
  );

  deleteUserBtnEl.addEventListener("click", (e) =>
    handleDeleteUserSubmit(e, userImgEl.id)
  );

  return userEl;
}
