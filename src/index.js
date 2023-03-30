const express = require("express");
const { PORT, REMINDER_BINDING_KEY } = require("./config/serverConfig");

const TicketController = require("./controllers/ticket-controller");
const setupAndStartCronJobs = require("./utils/cron-jobs");
const bodyParser = require("body-parser");
const { createChannel, subscribeMessage } = require("./utils/message-queue");

const setupAndStartServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const channel = await createChannel();
  subscribeMessage(channel, REMINDER_BINDING_KEY);

  app.listen(PORT, () => {
    app.post("/api/v1/tickets", TicketController.create);
    setupAndStartCronJobs();
    console.log(`Started server on PORT ${PORT}`);
  });
};

setupAndStartServer();
