/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let byteData;

// Browser bundle
if (process.argv[3] == '--min') {
	
	console.log('min tests');
    require('browser-env')();
    require('../dist/byte-data.min.js');
    byteData = window.byteData;

// UMD bundle
} else if (process.argv[3] == '--umd') {
	console.log('umd tests');
	byteData = require('../dist/byte-data.umd.js');

// CommonJS dist
} else if (process.argv[3] == '--cjs') {
	console.log('cjs tests');
	byteData = require('../dist/byte-data.cjs.js');

// ES6 dist
} else if (process.argv[3] == '--esm') {
	console.log("esm");
	byteData = require('../dist/byte-data.js');

// Source
} else {
	console.log('Source tests');
	byteData = require('../main.js');
}

module.exports = byteData;
