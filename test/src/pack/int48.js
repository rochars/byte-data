/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('48-bit to bytes', function() { 

    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355328], byteData.int48, 16),
            ["00","00","00","00","00","80"]);
    });
    
    // 0
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.int48, 16),
            ["00","00","00","00","00","00"]);
    });
    // min
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355328], byteData.int48, 16),
            ["00","00","00","00","00","80"]);
    });
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-125], byteData.int48, 16),
            ["83","ff","ff","ff","ff","ff"]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355327], byteData.int48, 16),
            ["01","00","00","00","00","80"]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355326], byteData.int48, 16),
            ["02","00","00","00","00","80"]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355325], byteData.int48, 16),
            ["03","00","00","00","00","80"]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.int48, 16),
            ["ff", "ff", "ff", "ff", "ff", "ff"]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.int48, 16),
            ["fe", "ff", "ff", "ff", "ff", "ff"]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.int48, 16),
            ["fd", "ff", "ff", "ff", "ff", "ff"]
        );
    });
});
