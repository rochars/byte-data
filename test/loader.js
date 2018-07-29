/**
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let byteData;
let types = require("binary-data-types");

// UMDs
if (process.argv[3] == '--umd') {
	console.log('umd tests');
	byteData = require('../dist/byte-data.es5.umd.js');
} else if (process.argv[3] == '--es3') {
	console.log('es3 umd tests');
	global.Uint8Array = undefined;
	byteData = require('../dist/byte-data.es3.umd.js');

// ES6 dists
} else if (process.argv[3] == '--esm') {
	require = require("esm")(module);
	global.module = module;
	console.log("esm");
	byteData = require('../dist/byte-data.js');

// Source
} else {
	require = require("esm")(module);
	global.module = module;
	console.log('Source tests');
	byteData = require('../main.js');
}

byteData.types = types;
module.exports = byteData;
