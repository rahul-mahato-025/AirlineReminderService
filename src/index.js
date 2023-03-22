const express = require("express");
const { PORT } = require("./configs/serverConfig");

const setupAndStartServer = () => {
  const app = express();

  app.listen(PORT, () => {
    console.log(`Started server on PORT ${PORT}`);
  });
};

setupAndStartServer();
