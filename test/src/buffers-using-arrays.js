/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview test functions that use buffers instead of arrays.
 * @see https://github.com/rochars/byte-data
 */

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');
var float64 = byteData.types.float64;
var float64BE = byteData.types.float64BE;

describe('packArrayTo: LE', function() {
    
    // Create a output array
    var file = [0,0,0,0,0,0,0,0];

    // First position in the array to write
    var index = 0;

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
    
    // Create a output array
    var file = [0,0,0,0,0,0,0,0];

    // First position in the array to write
    var index = 4;

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
    
    // Create a output array
    var file = [0,0,0,0,0,0,0,0];

    // First position in the array to write
    var index = 0;

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
    
    // Create a output array
    var file = [0,0,0,0,0,0,0,0];

    // First position in the array to write
    var index = 4;

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



describe('pack to typed array: LE', function() {
    
    // Create a output array
    var file = [0,0,0,0];

    // First position in the array to write
    var index = 0;

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
    var file = [1, 7, 0, 0];

    // First position in the array to write
    var index = 2;

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
    var file = [0,0,0,0];

    // First position in the array to write
    var index = 0;

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
    var file = [1, 7, 0, 0];

    // First position in the array to write
    var index = 2;

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


describe('pack to typed array: float32 LE', function() {
    
    // Create a typed array
    var file = [0,0,0,0,0,0,0,0];

    // First position in the array to write
    var index = 0;

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
    var file = [0,0,0,0,0,0,0,0];

    // First position in the array to write
    var index = 4;

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
    var file = [0,0,0,0,0,0,0,0];

    // First position in the array to write
    var index = 0;

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
    var file = [0,0,0,0,0,0,0,0,0,0,0,0];

    // First position in the array to write
    var index = 4;

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


describe('unpackArray: LE', function() {

    // Create a typed array
    var file = [255, 255, 253, 2, 0, 0, 0, 0];

    // Pack to the typed array passing an index to write
    var output = byteData.unpackArray(file, byteData.types.uInt16, 0, 2);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [65535]);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, [255, 255, 253, 2, 0, 0, 0, 0]);
    });
});

describe('unpackArray: LE (read from the middle of array)', function() {

    // Create a typed array
    var file = [255, 255, 253, 2, 0, 0, 0, 0];

    // Pack to the typed array passing an index to write
    var output = byteData.unpackArray(file, byteData.types.uInt16, 2, 4);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [765]);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, [255, 255, 253, 2, 0, 0, 0, 0]);
    });
});

describe('unpackArray: LE (read 2 values)', function() {

    // Create a typed array
    var file = [255, 255, 253, 2, 0, 0, 0, 0];

    // Pack to the typed array passing an index to write
    var output = byteData.unpackArray(file, byteData.types.uInt16, 0, 4);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [65535, 765]);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, [255, 255, 253, 2, 0, 0, 0, 0]);
    });

    it('should turn 8 bytes to 1 64-bit float (Uint8Array)', function() {
        assert.equal(
            byteData.unpackArray([75,40,253,58,221,154,191,63], float64)[0],
            0.123456789876543);
    });
    it('should turn 8 bytes to 1 64-bit float (Buffer)', function() {
        if (Buffer) {
            assert.equal(
                byteData.unpackArray([75,40,253,58,221,154,191,63], float64)[0],
                0.123456789876543);
        } else {
            assert.equal(
                byteData.unpackArray([75,40,253,58,221,154,191,63], float64)[0],
                0.123456789876543);
        }
    });
    it('should turn 9 bytes to 1 64-bit float (ignore the extra byte) (Buffer)', function() {
        if (Buffer) {
            assert.equal(
                byteData.unpackArray(
                    [75,40,253,58,221,154,191,63,0], float64)[0],
                0.123456789876543);
        } else {
            assert.equal(
                byteData.unpackArray(
                    [75,40,253,58,221,154,191,63,0], float64)[0],
                0.123456789876543);
        }
    });
});

describe('unpackArray: BE', function() {

    // Create a typed array
    var file = [255, 255, 2, 253, 0, 0, 0, 0];

    // Pack to the typed array passing an index to write
    var output = byteData.unpackArray(file, byteData.types.uInt16BE, 0, 2);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [65535]);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, [255, 255, 2, 253, 0, 0, 0, 0]);
    });
});

describe('unpackArray: BE (read from the middle of array)', function() {
    
    // Create a typed array
    var file = [255, 255, 2, 253, 0, 0, 0, 0];

    // Pack to the typed array passing an index to write
    var output = byteData.unpackArray(file, byteData.types.uInt16BE, 2, 4);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [765]);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, [255, 255, 2, 253, 0, 0, 0, 0]);
    });

});


describe('unpackArrayTo: LE', function() {
    
    var file = [255, 255, 0, 0];

    it('should unpack the values to the provided array', function() {
        var output = [0,0];
        byteData.unpackArrayTo(file, byteData.types.uInt16, output);
        assert.deepEqual(output, [65535, 0]);
    });
    it('should unpack the values to the provided array starting on the index', function() {
        var index = 0;
        var output = [0];
        byteData.unpackArrayTo(file, byteData.types.uInt16, output, 2);
        assert.deepEqual(output, [0]);
    });
    it('should unpack the values to the provided array starting on the index', function() {
        var index = 0;
        var output = [0];
        byteData.unpackArrayTo(file, byteData.types.uInt16, output, 1);
        assert.deepEqual(output, [255]);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, [255, 255, 0, 0]);
    });
});

describe('unpackArrayTo: BE', function() {

    var file = [2, 253, 0, 0];
    var output = [0,0]
    byteData.unpackArrayTo(file, byteData.types.uInt16BE, output);

    it('Unpack the first value', function() {
        assert.deepEqual(output, [765, 0]);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, [2, 253, 0, 0]);
    });
});


describe('unpackFrom: LE', function() {
    
    // Create a typed array
    var file = [255, 255, 253, 2];

    // First position in the array to write
    var index = 0;

    // Unpack to the typed array passing an index to read
    var value = byteData.unpack(file, byteData.types.uInt16, index);

    // pack
    it('Unpack the first value', function() {
        assert.equal(value, 65535);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, [255, 255, 253, 2]);
    });

});

describe('unpackFrom: LE (read to the middle of array)', function() {
    
    // Create a typed array
    var file = [255, 255, 253, 2];

    // First position in the array to write
    var index = 2;

    // Unpack to the typed array passing an index to read
    var value = byteData.unpack(file, byteData.types.uInt16, index);

    // pack
    it('Unpack the second value', function() {
        assert.equal(value, 765);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, [255, 255, 253, 2]);
    });
});

describe('unpackFrom: BE', function() {
    
    // Create a typed array
    var file = [255, 255, 2, 253];

    // First position in the array to write
    var index = 0;

    // Unpack to the typed array passing an index to read
    var value = byteData.unpack(file, byteData.types.uInt16BE, index);

    // unpack
    it('Unpack the first value', function() {
        assert.equal(value, 65535);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, [255, 255, 2, 253]);
    });
});

describe('unpackFrom: BE (read to the middle of array)', function() {
    
    // Create a typed array
    var file = [255, 255, 2, 253];

    // First position in the array to write
    var index = 2;

    // Unpack to the typed array passing an index to read
    var value = byteData.unpack(file, byteData.types.uInt16BE, index);

    // unpack
    it('Unpack the first value', function() {
        assert.equal(value, 765);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, [255, 255, 2, 253]);
    });
});
