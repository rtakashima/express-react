import React from "react";
import { FormProps } from "../types/FormProps";

function MyForm({
  username,
  setUserName,
  message,
  setMessage,
  onSubmit,
}: FormProps) {
  return (
    <div>
      <main>
        <p>Ho ho ho, what you want for Christmas?</p>
        who are you?
        <input
          value={username}
          placeholder="charlie.brown"
          onChange={(e) => setUserName(e.target.value)}
        />
        <form>
          what do you want for christmas?
          <textarea
            value={message}
            placeholder="Gifts!"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <br />
          <input type="button" value="Send" onClick={(e) => onSubmit(e)} />
        </form>
      </main>

      <div></div>
      <script src="https://button.glitch.me/button.js"></script>
    </div>
  );
}

export default MyForm;
