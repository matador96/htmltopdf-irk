const express = require("express");
const config = require("./config.js");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./src/routes")(app);

const server = app.listen(config.port, () =>
  console.log(`Server on port ${config.port}`)
);
