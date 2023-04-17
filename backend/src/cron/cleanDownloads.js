const cron = require("node-cron");
const fileManageService = require("../services/fileManage");

const cleanDownloadDirectoryCron = () => {
  // every 1 mins
  cron.schedule("*/30 * * * *", async function () {
    fileManageService.cleanDirectory();
  });
};

module.exports = cleanDownloadDirectoryCron;
