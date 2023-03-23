const express = require("express");
const { PORT } = require("./config/serverConfig");
const { sendBasicEmail } = require("./services/email-service");

const setupAndStartServer = () => {
  const app = express();

  //   sendBasicEmail(
  //     "notification.center@admin.com",
  //     "mahatorahul025@gmail.com",
  //     "Flight Booking Details",
  //     "Your Flight has been booked successfully. Enjoy!"
  //   );

  app.listen(PORT, () => {
    console.log(`Started server on PORT ${PORT}`);
  });
};

setupAndStartServer();
