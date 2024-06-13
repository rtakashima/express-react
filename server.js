// server.js
// where your node app starts
// init project
const express = require("express");
const path = require("path"); // NEW
const morgan = require("morgan");
const app = express();
const DIST_DIR = path.join(__dirname, "./dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW
const bodyParser = require("body-parser");
const messageController = require("./src/server/api/messageApi");
const scheduledFunctions = require("./src/server/jobs/mailSender");

app.use(bodyParser());
app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"));
app.use(express.static(DIST_DIR)); // NEW

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(HTML_FILE);
});

// ROUTES
app.use("/message", messageController);

//JOBS
scheduledFunctions.initScheduledJobs(app);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
