const GeneratorController = require("./controllers/index");

module.exports = (router) => {
  router.post("/api/generate/:format", GeneratorController.generateFile),
    router.get("/api/downloads/:fileName", GeneratorController.downloadFile);
};
