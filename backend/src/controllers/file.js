const ConverterService = require("./../services/converter");

module.exports.convert = async (req, res) => {
  try {
    const { content } = req.body;

    const pdf = await ConverterService.convertHtmlToPDF(content);

    return res.status(200).json({
      status: 200,
      data: pdf,
    });
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};
