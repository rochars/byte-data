/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('unpack int8', function() {    

    it('should turn 1 hex byte to a 8-bit int (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(["ff","7f"], byteData.int8, 16),
            [-1, 127]);
    });
    it('should turn 1 hex byte to a 8-bit int (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(["80","7f"], byteData.int8, 16),
            [-128, 127]);
    });
    it('should turn 1 bin byte to a 8-bit int (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(["10000000","01111111"], byteData.int8, 2),
            [-128, 127]);
    });



    // min
    it('min', function() {
        assert.deepEqual(
            byteData.unpackArray(["80"], byteData.int8, 16),
            [-128]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.unpackArray(["81"], byteData.int8, 16),
            [-127]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.unpackArray(["82"], byteData.int8, 16),
            [-126]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.unpackArray(["83"], byteData.int8, 16),
            [-125]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.unpackArray(["ff"], byteData.int8, 16),
            [-1]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.unpackArray(["fe"], byteData.int8, 16),
            [-2]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.unpackArray(["fd"], byteData.int8, 16),
            [-3]
        );
    });
});
