const FileFormatsEnum = require("./enums/fileFormats");

const fileFormat = {
  [FileFormatsEnum.EXCEL]: "xlsx",
  [FileFormatsEnum.PDF]: "pdf",
};

module.exports = {
  generateFileName: (parsedFileName, type) => {
    const currentTime = new Date().getTime();
    const fileName = `${parsedFileName || `file_${currentTime}`}.${
      fileFormat[type]
    }`;
    const downloadFilePath = `downloads/${fileName}`;

    return {
      fileName,
      downloadFilePath,
    };
  },
};
