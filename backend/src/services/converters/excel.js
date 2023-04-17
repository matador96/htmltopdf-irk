const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs").promises; // node v11 <
const { generateFileName } = require("./../../helpers");
const FileFormatsEnum = require("../../enums/fileFormats");

module.exports.generateFileAndGetURL = async (params) => {
  try {
    const currentTime = new Date().getTime();

    const { fileName, downloadFilePath } = generateFileName(
      params?.fileName,
      FileFormatsEnum.EXCEL
    );

    if (!params) {
      throw new Error("Zero parametrs bro");
    }

    let data = params?.excelData;

    if (!data) {
      throw new Error(`Not exist "excelData" parametres bro`);
    }

    try {
      data = JSON.parse(data);
    } catch (e) {
      throw new Error(`JSON PARSE ERROR! excelData is not valid array`);
    }

    const excelWorkBook = await convert(data);

    await XLSX.writeFile(excelWorkBook, downloadFilePath);
    const filePayload = {
      fileName,
      fileUrl: downloadFilePath,
    };

    return filePayload;
  } catch (e) {
    throw new Error(e.message);
  }
};

const convert = async (data) => {
  try {
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
    return workBook;
  } catch (e) {
    throw new Error(e.message);
  }
};
