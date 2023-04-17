const FileFormatsEnum = require("../enums/fileFormats");

module.exports = {
  type: [
    check("format")
      .isString()
      .isIn([FileFormatsEnum.EXCEL, FileFormatsEnum.PDF]),
  ],
};
