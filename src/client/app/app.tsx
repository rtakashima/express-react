import * as React from "react";
import ReactDOM from "react-dom/client";
import MessageForm from "../views/main";

ReactDOM.createRoot(document.getElementById("app") as Element).render(
  <React.StrictMode>
    <MessageForm />
  </React.StrictMode>
);
