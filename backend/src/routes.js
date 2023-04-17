const GeneratorController = require("./controllers/index");

module.exports = (router) => {
  router.post("/api/v1/generate/:format", GeneratorController.generateFile),
    router.get("/api/v1/downloads/:fileName", GeneratorController.downloadFile);
};
