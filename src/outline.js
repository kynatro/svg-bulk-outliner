'use strict';

const glob = require('glob');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');
const { argv } = require('yargs');
const { isInkscapeInstalled } = require('./helpers');
const { DEFAULT_CWD, DEFAULT_PATTERN, FILE_EXTENSION, INKSCAPE_CMD } = require('./constants.js');

const model ={
	default: outline,
	outline
};

/**
 * Outline text in SVG files
 *
 * Globs all SVG files in cwd and iterates through them to be outlined
 * with Inkscape.
 *
 * @requires glob
 * @requires path
 *
 * @param {Object} options
 * 	 @param {String} cwd Optional working directory to process through. Defaults to DEFAULT_CWD
 *   @param {String} filePrefix Optional prefix to add to the output file
 *   @param {String} fileSuffix Optional suffix to add to the output file. Defaults to "-copy"
 * 	 @param {String} pattern Optional pattern to glob. Defaults to DEFAULT_PATTERN
 *   @param {Boolean} saveCopy Optionally specify to save a copy instead of overwriting input files
 */
function outline(options = {}) {
  const {
    cwd = DEFAULT_CWD,
    filePrefix = '',
    fileSuffix = '-copy',
    pattern = DEFAULT_PATTERN,
    saveCopy = false
  } = options;
  let resolvedCwd = path.resolve(cwd.replace(/^~/, os.homedir()))
  let errors = [];

  console.log(`\x1b[34mOutlining text in files in ${cwd}...\n\x1b[0m`);

  glob(pattern, { cwd: resolvedCwd }, (err, files) => {
    files.forEach(file => {
      const input = path.join(resolvedCwd, file);
      const dirname = path.dirname(file);
      const output = path.join(resolvedCwd, `${filePrefix}${path.basename(file, FILE_EXTENSION)}${fileSuffix}${FILE_EXTENSION}`)
      const params = ['--export-text-to-path'];

      if (saveCopy) {
        params.push(`--export-filename=${output}`);
      } else {
        params.push('--export-overwrite');
      }

      const msg = saveCopy ? `${file} → ${path.join(dirname, path.basename(output))}` : `${file}`;

      process.stdout.write(msg);

      try {
        const response = spawnSync(INKSCAPE_CMD, [...params, input]);

        if (`${response.stderr}`) {
          throw `${response.stderr}`
        } else {
          process.stdout.write(' ✅\n');
        }
      } catch(err) {
        process.stdout.cursorTo(0);
        process.stdout.write(`\x1b[31m${msg} ❌\x1b[0m\n`);

        errors.push({
          file,
          err: err.trim()
        });
      }
    });

    console.log('\n\x1b[32m\x1b[1mText outlining complete!\x1b[0m');

    if (errors.length) {
      console.log('\n\x1b[31m\x1b[1mSome errors occurred during processing:\x1b[0m');
      errors.forEach(error => {
        console.log(`\n\x1b[31mFile: ${error.file}\x1b[0m`);
        console.log(error.err);
      });
    }
  });
}

// Execute outline() when executed directly
if (require.main === module) {
  if (isInkscapeInstalled()) {
    outline({
      cwd: argv.cwd,
      filePrefix: argv.filePrefix,
      fileSuffix: argv.fileSuffix,
      pattern: argv.pattern,
      saveCopy: argv.saveCopy
    });
  } else {
    console.log('Inkscape could not be found!');
    console.log('Please download and install Inkscape at https://inkscape.org/pt-br/release/inkscape-1.0/');
  }
}

exports.module = model;
