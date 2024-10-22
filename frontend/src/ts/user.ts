import type { MessageType } from "../types/messageType";
import type { UserDataType } from "../types/userTypes";
import Navbar from "../components/Navbar";
import handleApi from "../utils/handleApi";
import UserSettings from "../components/UserSettings";
import "../styles/user.css";
import "../styles/global.css";

const mainLayout = document.querySelector(".main-layout")!;

handleApi<UserDataType>("GET", "data").then((data) => {
  if ("status" in data) {
    return;
  }

  mainLayout.append(UserSettings(data));
});

handleApi<MessageType>("GET", "get-cookie").then((data) =>
  document.body.prepend(Navbar(data))
);
