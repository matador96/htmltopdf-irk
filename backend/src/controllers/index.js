const ConverterService = require("./../services/converters/pdf");
const FileFormatsEnum = require("../enums/fileFormats");
const EXCEL_Service = require("../services/converters/excel");
const PDF_Service = require("../services/converters/pdf");
const fileManageService = require("./../services/fileManage");

const convertServices = {
  [FileFormatsEnum.EXCEL]: EXCEL_Service,
  [FileFormatsEnum.PDF]: PDF_Service,
};

module.exports.downloadFile = async (req, res) => {
  try {
    const { fileName } = req.params;

    const file = await fileManageService.readFile(fileName);

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.send(file);
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};

module.exports.generateFile = async (req, res) => {
  try {
    const { format } = req.params;
    const generatedFilePayload = await convertServices[
      format
    ].generateFileAndGetURL(req.body);

    return res.status(200).json({
      status: 200,
      data: generatedFilePayload,
    });
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};
