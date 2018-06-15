/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let byteData;

if (process.argv[4] == '--dist') {
    require('browser-env')();
    require('../dist/byte-data.min.js');
    byteData = window.byteData;
} else {
	byteData = require('../index.js');
}

module.exports = byteData;
