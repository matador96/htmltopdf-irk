const puppeteer = require("puppeteer");
const hbs = require("handlebars");
const path = require("path");
const fs = require("fs").promises; // node v11 <

module.exports.writeToFile = async (path, content, type) => {
  try {
    await fs.writeFile(path, content, type);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports.readFile = async (file) => {
  try {
    const filePath = path.resolve(`downloads/${file}`);
    return await fs.readFile(filePath);
  } catch (e) {
    throw new Error("File doesn't exist");
  }
};

module.exports.cleanDirectory = (file) => {
  // so bad not work wtf
  // const dir = path.resolve(`downloads`);
  // fs.readdir(dir, (err, files) => {
  //   if (err) throw err;
  //   for (const file of files) {
  //     fs.unlink(path.join(dir, file), (err) => {
  //       if (err) throw err;
  //     });
  //   }
  // });
};
