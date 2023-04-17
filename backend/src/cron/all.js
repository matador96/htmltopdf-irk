const cleanDownloadDirectoryCron = require("./cleanDownloads");

const runAllCrons = () => {
  console.log("RUN ALL CRONS");
  cleanDownloadDirectoryCron();
};

module.exports = runAllCrons;
