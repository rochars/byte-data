/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('unpackArrayFrom: LE', function() {

    // Create a typed array
    let file = new Uint8Array([255, 255, 253, 2, 0, 0, 0, 0]);

    // Pack to the typed array passing an index to write
    let output = byteData.unpackArrayFrom(file, byteData.types.uInt16, 0, 2);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [65535]);
    });
});

describe('unpackArrayFrom: LE (read from the middle of array)', function() {

    // Create a typed array
    let file = new Uint8Array([255, 255, 253, 2, 0, 0, 0, 0]);

    // Pack to the typed array passing an index to write
    let output = byteData.unpackArrayFrom(file, byteData.types.uInt16, 2, 4);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [765]);
    });
});

describe('unpackArrayFrom: LE (read 2 values)', function() {

    // Create a typed array
    let file = new Uint8Array([255, 255, 253, 2, 0, 0, 0, 0]);

    // Pack to the typed array passing an index to write
    let output = byteData.unpackArrayFrom(file, byteData.types.uInt16, 0, 4);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [65535, 765]);
    });
});

describe('unpackArrayFrom: BE', function() {

    // Create a typed array
    let file = new Uint8Array([255, 255, 2, 253, 0, 0, 0, 0]);

    // Pack to the typed array passing an index to write
    let output = byteData.unpackArrayFrom(file, byteData.types.uInt16BE, 0, 2);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [65535]);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, new Uint8Array([255, 255, 2, 253, 0, 0, 0, 0]));
    });
});

describe('unpackArrayFrom: BE (read from the middle of array)', function() {
    
    // Create a typed array
    let file = new Uint8Array([255, 255, 2, 253, 0, 0, 0, 0]);

    // Pack to the typed array passing an index to write
    let output = byteData.unpackArrayFrom(file, byteData.types.uInt16BE, 2, 4);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [765]);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, new Uint8Array([255, 255, 2, 253, 0, 0, 0, 0]));
    });

});
