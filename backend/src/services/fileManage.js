const path = require("path");
const fs = require("fs").promises; // node v11 <

module.exports.writeToFile = async (...settings) => {
  try {
    await fs.writeFile(...settings);
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
