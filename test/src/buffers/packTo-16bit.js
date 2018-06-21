/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack to typed array: LE', function() {
    
    // Create a typed array
    let file = new Uint8Array(4);

    // First position in the array to write
    let index = 0;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(65535, byteData.types.uInt16, file, index);
    index = byteData.packTo(765, byteData.types.uInt16, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, [255, 255, 253, 2]);
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 4);
    });
});

describe('pack to typed array: LE (write to the middle of array)', function() {
    
    // Create a typed array
    let file = new Uint8Array([1, 7, 0, 0]);

    // First position in the array to write
    let index = 2;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(765, byteData.types.uInt16, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, [1, 7, 253, 2]);
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 4);
    });
});

describe('pack to typed array: BE', function() {
    
    // Create a typed array
    let file = new Uint8Array(4);

    // First position in the array to write
    let index = 0;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(65535, byteData.types.uInt16BE, file, index);
    index = byteData.packTo(765, byteData.types.uInt16BE, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, [255, 255, 2, 253]);
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 4);
    });
});

describe('pack to typed array: BE (write to the middle of array)', function() {
    
    // Create a typed array
    let file = new Uint8Array([1, 7, 0, 0]);

    // First position in the array to write
    let index = 2;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(765, byteData.types.uInt16BE, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, [1, 7, 2, 253]);
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 4);
    });
});