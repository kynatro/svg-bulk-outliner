const fs = require('fs');
const { INKSCAPE_CMD } = require('./constants');

const model = {
  isInkscapeInstalled
};

/**
 * Check if Inkscape is installed
 *
 * @requires fs.existsSync
 *
 * @returns {Boolean}
 */
function isInkscapeInstalled() {
  return fs.existsSync(INKSCAPE_CMD);
}

module.exports = model;
