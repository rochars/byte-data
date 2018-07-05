/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('unpackArrayTo: LE', function() {
    
    // Create a typed array
    let file = new Uint8Array([255, 255, 0, 0]);

    // First position in the array to write
    let index = 0;

    let output = new Uint16Array(2);

    // Unpack to the typed array passing an index to read
    byteData.unpackArrayTo(file, byteData.types.uInt16, output);

    // pack
    it('Unpack the first value', function() {
        assert.deepEqual(output, new Uint16Array([65535, 0]));
    });

});

describe('unpackArrayTo: BE', function() {
    
    // Create a typed array
    let file = new Uint8Array([2, 253, 0, 0]);

    // First position in the array to write
    let index = 0;

    let output = new Uint16Array(2);

    // Unpack to the typed array passing an index to read
    byteData.unpackArrayTo(file, byteData.types.uInt16BE, output);

    // pack
    it('Unpack the first value', function() {
        assert.deepEqual(output, new Uint16Array([765, 0]));
    });

});