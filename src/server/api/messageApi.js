const { HttpStatusCode } = require("axios");
const express = require("express");
const router = express.Router();

router.post("/send", (request, response) => {
  console.log("Send message", request.body);

  //bind object
  let msg = {};
  msg.date = new Date();
  msg.username = request.body.username;
  msg.address = request.body.address;
  msg.message = request.body.message;

  //get data in queue
  let messagesInQueue = request.app.get("messagesInQueue") || [];
  //push the new message data in the queue
  messagesInQueue.push(msg);
  request.app.set("messagesInQueue", messagesInQueue);
  //status 200
  response.status(HttpStatusCode.Ok);
  response.send("Message accepted");
});

module.exports = router;
