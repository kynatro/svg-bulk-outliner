# SVG Bulk Outliner

Script to quickly outline text for all SVGs in a folder.

## Pre-requisites
This script uses Inkscape to process the SVG files, so it must be installed first. Download Inkscape at:

https://inkscape.org/pt-br/release/inkscape-1.0/

## Installation and usage
Install this package as a global module:

```sh
npm install -g svg-bulk-outliner
```

Once you have completed installation, simply run the command below from the folder containing SVG files you wish to convert:

```sh
svg-bulk-outline
```

The script will recursively parse through the folder and convert text to outlines on any SVG files it finds. By default the files will be overwritten with the outlined version. See [Parameters](#parameters) for additional configuration options if you want to save a copy instead of overwriting.

## Parameters

Optional parameters to customize the conversion. All example output assumes the following input files:

```sh
input-file1.svg
input-file2.svg
input-file3.svg
```

### `--cwd`
Specify the working directory to recurse through. By default, `svg-bulk-outline` will process through the current working directory.

```sh
svg-bulk-outline --cwd="~/Desktop"
```

### `--dry-run`
Don't actually modify the files, but show an output of what the results should look like on the set. Will not actually run `inkscape` against the files, but its useful to check that all the files you want processed are renamed properly and included in your run.

```sh
svg-bulk-outline --dry-run
```

### `--file-prefix`
Specify a file name prefix for output files. Will rename input files unless `--save-copy` is also specified.

```sh
svg-bulk-outline --file-prefix="foo-"
```

#### Expected output:

```sh
foo-input-file1.svg
foo-input-file2.svg
foo-input-file3.svg
```

#### Run with `--save-copy`

```sh
svg-bulk-outline --file-prefix="foo-" --save-copy
```

#### Expected output:

```sh
input-file1.svg
input-file2.svg
input-file3.svg
foo-input-file1.svg
foo-input-file2.svg
foo-input-file3.svg
```

### `--file-suffix`
Specify a file name suffix for output files. Will rename output files unless `--save-copy` is also specified.

```sh
svg-bulk-outline --file-suffix="-outlined"
```

#### Expected output:

```sh
input-file1-outlined.svg
input-file2-outlined.svg
input-file3-outlined.svg
```

#### Run with `--save-copy`

```sh
svg-bulk-outline --file-suffix="-outlined" --save-copy
```

#### Expected output:

```sh
input-file1.svg
input-file2.svg
input-file3.svg
input-file1-outlined.svg
input-file2-outlined.svg
input-file3-outlined.svg
```

### `--pattern`
Specify a custom file pattern to search for. Accepts any pattern compatible with [Glob](https://github.com/isaacs/node-glob#readme). If not specified, the default file pattern is `**/*.svg`.

```sh
svg-bulk-outline --pattern="static/**/*.svg"
```

### `--save-copy`
Save a copy of the SVG instead of overwriting the input files. If you do not specify `--file-prefix` or `--file-suffix` the output file names will automatically be suffixed with `-copy`.

```sh
svg-bulk-outline --save-copy
```

#### Expected output:

```sh
input-file1-copy.svg
input-file2-copy.svg
input-file3-copy.svg
```
