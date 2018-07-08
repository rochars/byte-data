/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

var chai = chai || require("chai");
var byteData = byteData || require('../../test/loader.js');
var assert = chai.assert;

describe('packArrayTo: LE', function() {
    
    // Create a typed array
    var file = new Uint8Array(8);

    // First position in the array to write
    var index = 0;

    // Pack to the typed array passing an index to write
    index = byteData.packArrayTo([65535, 765], byteData.types.uInt16, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, new Uint8Array([255, 255, 253, 2, 0, 0, 0, 0]));
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 4);
    });
});

describe('packArrayTo: LE (write to the middle of array)', function() {
    
    // Create a typed array
    var file = new Uint8Array(8);

    // First position in the array to write
    var index = 4;

    // Pack to the typed array passing an index to write
    index = byteData.packArrayTo([65535, 765], byteData.types.uInt16, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, new Uint8Array([0, 0, 0, 0, 255, 255, 253, 2]));
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 8);
    });
});

describe('packArrayTo: BE', function() {
    
    // Create a typed array
    var file = new Uint8Array(8);

    // First position in the array to write
    var index = 0;

    // Pack to the typed array passing an index to write
    index = byteData.packArrayTo([65535, 765], byteData.types.uInt16BE, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, new Uint8Array([255, 255, 2, 253, 0, 0, 0, 0]));
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 4);
    });
});

describe('packArrayTo: BE (write to the middle of array)', function() {
    
    // Create a typed array
    var file = new Uint8Array(8);

    // First position in the array to write
    var index = 4;

    // Pack to the typed array passing an index to write
    index = byteData.packArrayTo([65535, 765], byteData.types.uInt16BE, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, new Uint8Array([0, 0, 0, 0, 255, 255, 2, 253]));
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 8);
    });
});



describe('pack to typed array: LE', function() {
    
    // Create a typed array
    var file = new Uint8Array(4);

    // First position in the array to write
    var index = 0;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(65535, byteData.types.uInt16, file, index);
    index = byteData.packTo(765, byteData.types.uInt16, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, new Uint8Array([255, 255, 253, 2]));
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 4);
    });
});

describe('pack to typed array: LE (write to the middle of array)', function() {
    
    // Create a typed array
    var file = new Uint8Array([1, 7, 0, 0]);

    // First position in the array to write
    var index = 2;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(765, byteData.types.uInt16, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, new Uint8Array([1, 7, 253, 2]));
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 4);
    });
});

describe('pack to typed array: BE', function() {
    
    // Create a typed array
    var file = new Uint8Array(4);

    // First position in the array to write
    var index = 0;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(65535, byteData.types.uInt16BE, file, index);
    index = byteData.packTo(765, byteData.types.uInt16BE, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, new Uint8Array([255, 255, 2, 253]));
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 4);
    });
});

describe('pack to typed array: BE (write to the middle of array)', function() {
    
    // Create a typed array
    var file = new Uint8Array([1, 7, 0, 0]);

    // First position in the array to write
    var index = 2;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(765, byteData.types.uInt16BE, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, new Uint8Array([1, 7, 2, 253]));
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 4);
    });
});


describe('pack to typed array: float32 LE', function() {
    
    // Create a typed array
    var file = new Uint8Array([0,0,0,0,0,0,0,0]);

    // First position in the array to write
    var index = 0;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(2.147483647, byteData.types.float32, file, index);
    index = byteData.packTo(214748364.7, byteData.types.float32, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, new Uint8Array([95,112,9,64,  205,204,76,77]));
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 8);
    });
});

describe('pack to typed array: LE (write to the middle of array)', function() {
    
    // Create a typed array
    var file = new Uint8Array([0,0,0,0,0,0,0,0]);

    // First position in the array to write
    var index = 4;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(214748364.7, byteData.types.float32, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, new Uint8Array([0,0,0,0,  205,204,76,77]));
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 8);
    });
});

describe('pack to typed array: BE', function() {
    
    // Create a typed array
    var file = new Uint8Array([0,0,0,0,0,0,0,0]);

    // First position in the array to write
    var index = 0;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(2.147483647, byteData.types.float32BE, file, index);
    index = byteData.packTo(214748364.7, byteData.types.float32BE, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, new Uint8Array([64,9,112,95,  77,76,204,205]));
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 8);
    });
});

describe('pack to typed array: BE (write to the middle of array)', function() {
    
    // Create a typed array
    var file = new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]);

    // First position in the array to write
    var index = 4;

    // Pack to the typed array passing an index to write
    index = byteData.packTo(214748364.7, byteData.types.float32BE, file, index);

    // pack
    it('Check the packed 16-bit values', function() {
        assert.deepEqual(file, new Uint8Array([0,0,0,0,  77,76,204,205,  0,0,0,0]));
    });

    // index
    it('Check the index', function() {
        assert.equal(index, 8);
    });
});


describe('unpackArrayFrom: LE', function() {

    // Create a typed array
    var file = new Uint8Array([255, 255, 253, 2, 0, 0, 0, 0]);

    // Pack to the typed array passing an index to write
    var output = byteData.unpackArrayFrom(file, byteData.types.uInt16, 0, 2);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [65535]);
    });
});

describe('unpackArrayFrom: LE (read from the middle of array)', function() {

    // Create a typed array
    var file = new Uint8Array([255, 255, 253, 2, 0, 0, 0, 0]);

    // Pack to the typed array passing an index to write
    var output = byteData.unpackArrayFrom(file, byteData.types.uInt16, 2, 4);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [765]);
    });
});

describe('unpackArrayFrom: LE (read 2 values)', function() {

    // Create a typed array
    var file = new Uint8Array([255, 255, 253, 2, 0, 0, 0, 0]);

    // Pack to the typed array passing an index to write
    var output = byteData.unpackArrayFrom(file, byteData.types.uInt16, 0, 4);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [65535, 765]);
    });
});

describe('unpackArrayFrom: BE', function() {

    // Create a typed array
    var file = new Uint8Array([255, 255, 2, 253, 0, 0, 0, 0]);

    // Pack to the typed array passing an index to write
    var output = byteData.unpackArrayFrom(file, byteData.types.uInt16BE, 0, 2);

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
    var file = new Uint8Array([255, 255, 2, 253, 0, 0, 0, 0]);

    // Pack to the typed array passing an index to write
    var output = byteData.unpackArrayFrom(file, byteData.types.uInt16BE, 2, 4);

    // unpack
    it('Check the unpacked 16-bit values', function() {
        assert.deepEqual(output, [765]);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, new Uint8Array([255, 255, 2, 253, 0, 0, 0, 0]));
    });

});


describe('unpackArrayTo: LE', function() {
    
    var file = new Uint8Array([255, 255, 0, 0]);

    it('should unpack the values to the providade typed array', function() {
        var output = new Uint16Array(2);
        byteData.unpackArrayTo(file, byteData.types.uInt16, output);
        assert.deepEqual(output, new Uint16Array([65535, 0]));
    });
    it('should unpack the values to the providade typed array starting on the index', function() {
        var index = 0;
        var output = new Uint16Array(1);
        byteData.unpackArrayTo(file, byteData.types.uInt16, output, 2);
        assert.deepEqual(output, new Uint16Array([0]));
    });
    it('should unpack the values to the providade typed array starting on the index', function() {
        var index = 0;
        var output = new Uint16Array(1);
        byteData.unpackArrayTo(file, byteData.types.uInt16, output, 1);
        assert.deepEqual(output, new Uint16Array([255]));
    });
});

describe('unpackArrayTo: BE', function() {

    var file = new Uint8Array([2, 253, 0, 0]);
    var output = new Uint16Array(2);
    byteData.unpackArrayTo(file, byteData.types.uInt16BE, output);

    it('Unpack the first value', function() {
        assert.deepEqual(output, new Uint16Array([765, 0]));
    });
});


describe('unpackFrom: LE', function() {
    
    // Create a typed array
    var file = new Uint8Array([255, 255, 253, 2]);

    // First position in the array to write
    var index = 0;

    // Unpack to the typed array passing an index to read
    var value = byteData.unpackFrom(file, byteData.types.uInt16, index);

    // pack
    it('Unpack the first value', function() {
        assert.equal(value, 65535);
    });

});

describe('unpackFrom: LE (read to the middle of array)', function() {
    
    // Create a typed array
    var file = new Uint8Array([255, 255, 253, 2]);

    // First position in the array to write
    var index = 2;

    // Unpack to the typed array passing an index to read
    var value = byteData.unpackFrom(file, byteData.types.uInt16, index);

    // pack
    it('Unpack the second value', function() {
        assert.equal(value, 765);
    });
});

describe('unpackFrom: BE', function() {
    
    // Create a typed array
    var file = new Uint8Array([255, 255, 2, 253]);

    // First position in the array to write
    var index = 0;

    // Unpack to the typed array passing an index to read
    var value = byteData.unpackFrom(file, byteData.types.uInt16BE, index);

    // unpack
    it('Unpack the first value', function() {
        assert.equal(value, 65535);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, new Uint8Array([255, 255, 2, 253]));
    });
});

describe('unpackFrom: BE (read to the middle of array)', function() {
    
    // Create a typed array
    var file = new Uint8Array([255, 255, 2, 253]);

    // First position in the array to write
    var index = 2;

    // Unpack to the typed array passing an index to read
    var value = byteData.unpackFrom(file, byteData.types.uInt16BE, index);

    // unpack
    it('Unpack the first value', function() {
        assert.equal(value, 765);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, new Uint8Array([255, 255, 2, 253]));
    });
});
