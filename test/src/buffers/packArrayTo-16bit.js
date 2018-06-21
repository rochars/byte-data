/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('packArrayTo: LE', function() {
    
    // Create a typed array
    let file = new Uint8Array(8);

    // First position in the array to write
    let index = 0;

    // Pack to the typed array passing an index to write
    index = byteData.packArrayTo([65535, 765], byteData.types.uInt16, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, [255, 255, 253, 2, 0, 0, 0, 0]);
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 4);
    });
});

describe('packArrayTo: LE (write to the middle of array)', function() {
    
    // Create a typed array
    let file = new Uint8Array(8);

    // First position in the array to write
    let index = 4;

    // Pack to the typed array passing an index to write
    index = byteData.packArrayTo([65535, 765], byteData.types.uInt16, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, [0, 0, 0, 0, 255, 255, 253, 2]);
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 8);
    });
});

describe('packArrayTo: BE', function() {
    
    // Create a typed array
    let file = new Uint8Array(8);

    // First position in the array to write
    let index = 0;

    // Pack to the typed array passing an index to write
    index = byteData.packArrayTo([65535, 765], byteData.types.uInt16BE, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, [255, 255, 2, 253, 0, 0, 0, 0]);
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 4);
    });
});

describe('packArrayTo: BE (write to the middle of array)', function() {
    
    // Create a typed array
    let file = new Uint8Array(8);

    // First position in the array to write
    let index = 4;

    // Pack to the typed array passing an index to write
    index = byteData.packArrayTo([65535, 765], byteData.types.uInt16BE, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, [0, 0, 0, 0, 255, 255, 2, 253]);
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 8);
    });
});
