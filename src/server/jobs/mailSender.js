const CronJob = require("node-cron");
const EmailUtil = require("../utils/emailUtil");

exports.initScheduledJobs = (app) => {
  const scheduledJobFunction = CronJob.schedule("0 */15 * * * *", () => {
    console.log("=== Executing Job: Send E-mail ===");
    let messages = app.get("messagesInQueue");
    let now = new Date();
    console.log(`Messages in Queue: ${messages.length}`);

    //send e-mails if messsages exist
    if (messages.length > 0) {
      //in case of concurrency, filter by time
      messages
        .filter((m) => m.date.getTime() <= now.getTime())
        .forEach((msg) => {
          EmailUtil(msg.username, msg.address, msg.message)
            .then(() => {
              console.log(`Email sent to ${msg.username}`);
            })
            .catch((e) => {
              console.error(`Failed to send email to user ${msg.username}`, e);
            });
        });

      //update the queue removing the processed messages
      app.set(
        "messagesInQueue",
        messages.filter((m) => m.date.getTime() > now.getTime())
      );
    }
  });

  scheduledJobFunction.start();
};
