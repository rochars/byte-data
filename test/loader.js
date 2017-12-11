/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let byteData = require('../index.js');

if (process.argv[4] == '--dist') {
    require('browser-env')();let assert = require('assert');
    require('../dist/byte-data-min.js');
    byteData = window.byteData;
}

module.exports = byteData;
