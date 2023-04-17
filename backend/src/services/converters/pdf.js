const puppeteer = require("puppeteer");
const hbs = require("handlebars");
const path = require("path");
const fs = require("fs").promises; // node v11 <
const { writeToFile } = require("./../fileManage");
const { generateFileName } = require("./../../helpers");
const FileFormatsEnum = require("../../enums/fileFormats");

module.exports.generateFileAndGetURL = async (params) => {
  try {
    let fileUrl = "";
    const { fileName, downloadFilePath } = generateFileName(
      params?.fileName,
      FileFormatsEnum.PDF
    );

    if (!params) {
      throw new Error("Zero parametrs bro");
    }

    const templateData = params;
    const templateName = templateData?.templateName;

    if (!templateName) {
      throw new Error("Template name is not exist in parameters");
    }

    const pdfBuffer = await convert(templateData, templateName);

    await writeToFile(downloadFilePath, pdfBuffer, "binary");
    const filePayload = {
      fileName,
      fileUrl: downloadFilePath,
    };

    return filePayload;
  } catch (e) {
    throw new Error(e.message);
  }
};

const convert = async (templateData, templateName) => {
  const template = await compileFromHBSTemplate(templateData, templateName);
  return generateAndGetPDFBufferFromHTML(template);
};

const compileFromHBSTemplate = async (templateData, templateName) => {
  try {
    const filePath = path.resolve(`templates/pdf/${templateName}.hbs`);

    try {
      // wtf how
      const html = await fs.readFile(filePath, "utf-8");
      return hbs.compile(html)(templateData);
    } catch (e) {
      throw new Error(`Template ${templateName} is not exist in directory`);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const generateAndGetPDFBufferFromHTML = async (template) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      timeout: 15000,
      args: [
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });

    const page = await browser.newPage();
    await page.setContent(template);

    const pdfBuffer = await page.pdf({
      format: "A4",
      scale: 1,
      // margin: {
      //   top: '80px',
      //   right: '70px',
      //   left: '70px',
      //   bottom: '50px',
      // },
      // scale: 0.8,
    });

    browser.close();

    return pdfBuffer;
  } catch (e) {
    throw new Error(e.message);
  }
};
