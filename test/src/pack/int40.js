/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../index.js');

describe('pack int40', function() { 

    // 0
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.int40, 16),
            ["00","00","00","00","00"]);
    });
    // min
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-549755813888], byteData.int40, 16),
            ["00","00","00","00","80"]);
    });
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-125], byteData.int40, 16),
            ["83","ff","ff","ff","ff"]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-549755813887], byteData.int40, 16),
            ["01","00","00","00","80"]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-549755813886], byteData.int40, 16),
            ["02","00","00","00","80"]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-549755813885], byteData.int40, 16),
            ["03","00","00","00","80"]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.int40, 16),
            ["ff", "ff", "ff", "ff", "ff"]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.int40, 16),
            ["fe", "ff", "ff", "ff", "ff"]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.int40, 16),
            ["fd", "ff", "ff", "ff", "ff"]
        );
    });






    // max
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([549755813887], byteData.int40, 16),
            ["ff","ff","ff","ff","7f"]);
    });

    /*
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-125], byteData.int40, 16),
            ["83","ff","ff","ff","ff"]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-549755813887], byteData.int40, 16),
            ["01","00","00","00","80"]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-549755813886], byteData.int40, 16),
            ["02","00","00","00","80"]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-549755813885], byteData.int40, 16),
            ["03","00","00","00","80"]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.int40, 16),
            ["ff", "ff", "ff", "ff", "ff"]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.int40, 16),
            ["fe", "ff", "ff", "ff", "ff"]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.int40, 16),
            ["fd", "ff", "ff", "ff", "ff"]
        );
    });
    */
});
