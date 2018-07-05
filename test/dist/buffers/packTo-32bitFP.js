/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack to typed array: float32 LE', function() {
    
    // Create a typed array
    let file = new Uint8Array([0,0,0,0,0,0,0,0]);

    // First position in the array to write
    let index = 0;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(2.147483647, byteData.types.float32, file, index);
    index = byteData.packTo(214748364.7, byteData.types.float32, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, [95,112,9,64,  205,204,76,77]);
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 8);
    });
});

describe('pack to typed array: LE (write to the middle of array)', function() {
    
    // Create a typed array
    let file = new Uint8Array([0,0,0,0,0,0,0,0]);

    // First position in the array to write
    let index = 4;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(214748364.7, byteData.types.float32, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, [0,0,0,0,  205,204,76,77]);
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 8);
    });
});

describe('pack to typed array: BE', function() {
    
    // Create a typed array
    let file = new Uint8Array([0,0,0,0,0,0,0,0]);

    // First position in the array to write
    let index = 0;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(2.147483647, byteData.types.float32BE, file, index);
    index = byteData.packTo(214748364.7, byteData.types.float32BE, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, [64,9,112,95,  77,76,204,205]);
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 8);
    });
});

describe('pack to typed array: BE (write to the middle of array)', function() {
    
    // Create a typed array
    let file = new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]);

    // First position in the array to write
    let index = 4;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(214748364.7, byteData.types.float32BE, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, [0,0,0,0,  77,76,204,205,  0,0,0,0]);
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 8);
    });
});
