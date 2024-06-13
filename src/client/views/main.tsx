import React, { FormEvent } from "react";
import axios from "axios";
import { useState } from "react";
import UserMessage from "../types/UserMessage";
import UserService from "../service/UserService";
import ProfileService from "../service/ProfileService";
import User from "../types/User";
import Profile from "../types/Profile";
import MyForm from "../components/MyForm";
import isAgeOk from "../utils/AgeVerify";

const MessageForm = () => {
  const [username, setUserName] = useState("");
  const [message, setMessage] = useState("");
  let msg: String | undefined = "";

  const onSubmit = async (e: FormEvent) => {
    let requestSent: Boolean = false;
    //get users
    const user: User = await new UserService().findUser(username);

    //check if user id exists
    if (user) {
      //get user profile
      const profile: Profile = await new ProfileService().findUser(user.uid);

      //check if profile exists and age less than 10
      if (profile && isAgeOk(profile.birthdate)) {
        let userMessage: UserMessage = new UserMessage(
          username,
          profile.address,
          message
        );

        console.log("email processing request...");
        //send email process request
        await axios.post("/message/send", userMessage).then(() => {
          requestSent = true;
        });

        msg = requestSent
          ? process.env.MSG_SUCCESS
          : process.env.MSG_ERRO_SERVER;
      } else {
        msg = process.env.MSG_ERRO_AGE;
      }
    } else {
      msg = process.env.MSG_ERRO_USER_ID;
    }

    //submission result info
    alert(msg);
  };

  return (
    <>
      <MyForm
        username={username}
        setUserName={setUserName}
        message={message}
        setMessage={setMessage}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default MessageForm;
