const html_to_pdf = require("html-pdf-node");

module.exports.convertHtmlToPDF = async (content) => {
  try {
    let options = {
      format: "A4",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    };

    const file = { content };
    const pdf = await html_to_pdf.generatePdf(file, options);
    return pdf;
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};
