const FileController = require("./controllers/file");

module.exports = (router) => {
  router.post("/api/convert", FileController.convert);
};
