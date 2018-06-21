/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let byteData;

// Browser bundle
if (process.argv[3] == '--min') {
    require('browser-env')();
    require('../dist/byte-data.min.js');
    byteData = window.byteData;

// UMD bundle
} else if (process.argv[3] == '--umd') {
	byteData = require('../dist/byte-data.umd.js');

// CommonJS dist
} else if (process.argv[3] == '--cjs') {
	byteData = require('../dist/byte-data.cjs.js');

// ESM
} else {
	byteData = require('../main.js');
}

module.exports = byteData;
