/**
 * Default file path to search in
 *
 * @constant
 * @type {String}
 */
const DEFAULT_CWD = process.env.PWD;

/**
 * File pattern to search for
 *
 * @constant
 * @type {String}
 */
const DEFAULT_PATTERN = '**/*.svg';

/**
 * SVG file extension
 *
 * @constant
 * @type {String}
 */
const FILE_EXTENSION = '.svg';

/**
 * Expected location of Inkscape
 *
 * @constant
 * @type {String}
 */
const INKSCAPE_CMD = '/Applications/Inkscape.app/Contents/MacOS/inkscape';

module.exports = {
	DEFAULT_CWD,
  DEFAULT_PATTERN,
  FILE_EXTENSION,
  INKSCAPE_CMD
}
