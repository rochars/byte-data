/**
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let byteData;
let types = require("binary-data-types");

// UMD min
if (process.argv[3] == '--umd') {
	console.log('umd tests');
	global.Uint8Array = undefined;
	byteData = require('../dist/byte-data.umd.js');

// ES6
} else if (process.argv[3] == '--esm') {
	require = require("esm")(module);
	global.module = module;
	console.log("esm");
	byteData = require('../dist/byte-data.js');

// ES6 min
} else if (process.argv[3] == '--min') {
	require = require("esm")(module);
	global.module = module;
	console.log("esm");
	byteData = require('../dist/byte-data.min.js');

// Source
} else {
	require = require("esm")(module);
	global.module = module;
	console.log('Source tests');
	byteData = require('../index.js');
}

byteData.types = types;
module.exports = byteData;
