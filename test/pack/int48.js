/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('48-bit to bytes', function() { 

    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355328], byteData.int48, 16),
            ["00","00","00","00","00","80"]);
    });
});
