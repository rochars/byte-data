/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('pack int40', function() { 
      
    it('should turn 1 signed 40-bit int to 5 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([-549755813888], byteData.int40, 16),
            ["00","00","00","00","80"]);
    });
});
