const express = require("express");
const config = require("./config.js");
const bodyParser = require("body-parser");
const runAllCrons = require("./src/cron/all");
const XLSX = require("xlsx");

// const { generateAndGetPDFBuffer } = require("./src/services/pdf");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./src/routes")(app);

// (async function () {
//   await generateAndGetPDFBuffer({ mark: "a", model: "b" }, "testReport");
// })();

runAllCrons();

const server = app.listen(config.port, () =>
  console.log(`Server on port ${config.port}`)
);
