const express = require("express");
const { PORT } = require("./config/serverConfig");

const TicketController = require("./controllers/ticket-controller");
const setupAndStartCronJobs = require("./utils/cron-jobs");
const bodyParser = require("body-parser");

const setupAndStartServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    app.post("/api/v1/tickets", TicketController.create);
    setupAndStartCronJobs();
    console.log(`Started server on PORT ${PORT}`);
  });
};

setupAndStartServer();
