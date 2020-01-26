/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview Test 16-bit integers, signed and unsigned.
 * @see https://github.com/rochars/byte-data
 */

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');
var int8 = {"bits": 8, "signed": true};

pack = byteData.pack;
unpack = byteData.unpack;

describe('Clamp ints', function() { 
    it('Clamp -129 to -128', function() {
        assert.deepEqual(
            unpack(pack(-129, int8, true), int8),
            -128);
    });
    it('Clamp 128 to 127', function() {
        assert.deepEqual(
            unpack(pack(128, int8, true), int8),
            127);
    });    
});
