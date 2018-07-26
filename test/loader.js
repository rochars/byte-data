/**
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let byteData;
let types = require("binary-data-types");

// UMD bundle
if (process.argv[3] == '--umd') {
	console.log('umd tests');
	byteData = require('../dist/byte-data.umd.js');

// UMD bundle using the polyfills
} else if (process.argv[3] == '--umd-notypes') {
	console.log('umd tests, polyfills');
	global.Uint8Array = undefined;
	byteData = require('../dist/byte-data.umd.js');

// CJS bundle
} else if (process.argv[3] == '--cjs') {
	console.log('cjs tests');
	byteData = require('../dist/byte-data.cjs.js');

// ES6 dists
} else if (process.argv[3] == '--esm') {
	require = require("esm")(module);
	global.module = module;
	console.log("esm");
	byteData = require('../dist/byte-data.js');
} else if (process.argv[3] == '--esm-min') {
	require = require("esm")(module);
	global.module = module;
	console.log("esm min");
	byteData = require('../dist/byte-data.min.js');

// Source
} else {
	require = require("esm")(module);
	global.module = module;
	console.log('Source tests');
	byteData = require('../main.js');
}

byteData.types = types;
module.exports = byteData;
