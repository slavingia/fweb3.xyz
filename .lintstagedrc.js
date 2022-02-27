const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => `'${path.relative(process.cwd(), f)}'`)
    .join(" --file ")}`;

const buildPrettierCommand = (filenames) =>
  filenames.map((filename) => `prettier --write '${filename}'`);

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*.{js,css,md,json,jsx,ts,tsx}": [buildPrettierCommand],
};
