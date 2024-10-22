import Navbar from "../components/Navbar";
import AuthForm from "../components/AuthForm";
import handleApi from "../utils/handleApi";
import type { MessageType } from "../types/messageType";
import "../styles/auth.css";
import "../styles/global.css";

handleApi<MessageType>("GET", "get-cookie").then((data) =>
  document.body.prepend(Navbar(data))
);

const mainLayout = document.querySelector(".main-layout")!;
mainLayout.append(AuthForm(location.pathname));
