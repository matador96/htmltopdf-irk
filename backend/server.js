const express = require("express");
const config = require("./config.js");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./src/routes")(app);

(function () {
  const fs = require("fs");
  const cron = require("node-cron");
  const path = require("path");
  const dir = "./downloads";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir); // initialize download folder
  }

  // every day clean download folder
  cron.schedule("* * */1 * *", async function () {
    fs.readdir(dir, (err, files) => {
      if (err) console.log(err);
      for (const file of files) {
        fs.unlink(path.join(dir, file), (err) => {
          if (err) console.log(err);
        });
      }
    });
  });
})();

const server = app.listen(config.port, () =>
  console.log(`Server on port ${config.port}`)
);
