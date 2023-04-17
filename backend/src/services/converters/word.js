const htmlDocx = require("html-docx-js");
const hbs = require("handlebars");
const path = require("path");
const fs = require("fs").promises; // node v11 <
const { writeToFile } = require("./../fileManage");
const { generateFileName } = require("./../../helpers");
const FileFormatsEnum = require("../../enums/fileFormats");

module.exports.generateFileAndGetURL = async (params) => {
  try {
    const { fileName, downloadFilePath } = generateFileName(
      params?.fileName,
      FileFormatsEnum.WORD
    );

    if (!params) {
      throw new Error("Zero parametrs bro");
    }

    const templateData = params;
    const templateName = templateData?.templateName;

    if (!templateName) {
      throw new Error("Template name is not exist in parameters");
    }

    const wordBuffer = await convert(templateData, templateName);
    await writeToFile(downloadFilePath, wordBuffer, "binary");

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
  return generateAndGetWORDBufferFromHTML(template);
};

const compileFromHBSTemplate = async (templateData, templateName) => {
  try {
    const filePath = path.resolve(`templates/word/${templateName}.hbs`);

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

const generateAndGetWORDBufferFromHTML = async (template) => {
  try {
    const wordBuffer = htmlDocx.asBlob(template);

    return wordBuffer;
  } catch (e) {
    throw new Error(e.message);
  }
};
