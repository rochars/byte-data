/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack float32', function() {     

    it('should turn 2 signed 32-bit floats to 8 bytes (0s)', function() {
        assert.deepEqual(byteData.packArray([0, 0], byteData.float32), 
            [0,0,0,0,0,0,0,0]);
    });
    it('should turn 1 signed 32-bit float to 4 bytes (pi)', function() {
        assert.deepEqual(byteData.packArray([2.147483647], byteData.float32), 
            [95,112,9,64]);
    });
    it('should turn 1 signed 32-bit float to 4 bytes', function() {
        assert.deepEqual(byteData.packArray([2.147483647], byteData.float32, 16), 
            [95,112,"09",64]);
    });
    it('should turn 1 signed 32-bit float to 4 bytes (1)', function() {
        assert.deepEqual(byteData.packArray([214748364.7], byteData.float32), 
            [205,204,76,77]);
    });
});
