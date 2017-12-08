/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('interface', function() {
    
    // pack
    it('pack uInt16 (65535, 16)', function() {
        assert.deepEqual(
            byteData.pack(65535, byteData.uInt16, 16),
            ["ff","ff"]);
    });
    it('pack chr ("abcd")', function() {
        assert.deepEqual(
            byteData.pack("abcd", byteData.chr),
            [97]);
    });
    it('pack float32 (2.1474836, 16)', function() {
        assert.deepEqual(
            byteData.pack(2.1474836, byteData.float32, 16),
            ["5f","70","09","40"]);
    });
    it('pack int4 (-1)', function() {
        assert.deepEqual(byteData.pack(-1, byteData.int4),
            [15]);
    });
    it('pack uInt4 (15)', function() {
        assert.deepEqual(byteData.pack(15, byteData.uInt4),
            [15]);
    });
    it('pack bool (6, 16) should return "1"', function() {
        assert.deepEqual(byteData.pack(6, byteData.bool, 16),
            ['01']);
    });
    it('pack chr ("a")', function() {
        assert.deepEqual(byteData.pack("a", byteData.chr),
            [97]);
    });
    it('pack uInt8 (254)', function() {
        assert.deepEqual(byteData.pack(254, byteData.uInt8),
            [254]);
    });
    it('pack uInt8 (255)', function() {
        assert.deepEqual(byteData.pack(255, byteData.uInt8),
            [255]);
    });
    it('pack uInt8 (300) should return [255]', function() {
        assert.deepEqual(byteData.pack(300, byteData.uInt8),
            [255]);
    });
    it('pack uInt8 (-1) should return [0]', function() {
        assert.deepEqual(byteData.pack(-1, byteData.uInt8),
            [0]);
    });
    it('pack int8 (-1)', function() {
        assert.deepEqual(byteData.pack(-1, byteData.int8),
            [255]);
    });
    it('pack int8 (-2)', function() {
        assert.deepEqual(byteData.pack(-2, byteData.int8),
            [254]);
    });

    // unpack
    it('unpack chr', function() {
        assert.deepEqual(
            byteData.unpack([97, 98, 99, 199], byteData.chr),
            "a");
    });
    it('unpack uInt16', function() {
        assert.deepEqual(
            byteData.unpack(["ff", "ff"], byteData.uInt16, 16),
            65535);
    });
    it('unpack float16', function() {
        assert.equal(
            byteData.unpack(["01010101", "00110101"], byteData.float16).toFixed(5),
            0.33325);
    });
    it('unpack int2', function() {
        assert.equal(byteData.unpack(['11'], byteData.int2, 2), -1);
    });
    it('unpack uInt2', function() {
        assert.equal(byteData.unpack([3], byteData.uInt2), 3);
    });
    it('unpack chr', function() {
        assert.deepEqual(byteData.unpack([97, 98], byteData.chr), "a");
    });
    it('unpack uInt16', function() {
        assert.equal(byteData.unpack(
            ["ff","ff"], byteData.uInt16, 16),
            65535);
    });

    // packArray
    it('packArray uInt16', function() {
        assert.deepEqual(byteData.packArray([65535, 0], byteData.uInt16, 16),
            ["ff", "ff", "00", "00"]);
    });
    it('packArray int32', function() {
        assert.deepEqual(byteData.packArray([-2147483648, 2147483647], byteData.int32),
            [0,0,0,128,255,255,255,127]);
    });
    it('packArray float32', function() {
        assert.deepEqual(byteData.packArray([-1, 1], byteData.float32),
            [0,0,128,191,0,0,128,63]);
    });
    it('packArray chr', function() {
        assert.deepEqual(byteData.packArray("ab", byteData.chr),
            [97, 98]);
    });

    // unpackArray
    it('unpackArray uInt16', function() {
        assert.deepEqual(byteData.unpackArray(
            ["ff", "ff", "00", "00"], byteData.uInt16, 16),
            [65535, 0]);
    });
    it('unpackArray uInt2', function() {
        assert.deepEqual(
                byteData.unpackArray(['11'], byteData.uInt2, 2),
                 [3]
             );
    });
    it('unpackArray float64', function() {
        assert.deepEqual(
                byteData.unpackArray(
                        ['00','00','00','00','00','00','f0','3f'],
                        byteData.float64,
                        16
                    ),
                    [1]
             );
    });

    
    it('uInt5 to hex', function() {
        assert.deepEqual(byteData.pack(1, new byteData.Type({"bits": 5}), 16),
            ["01"]);
    });
    it('uInt5 to bin', function() {
        assert.deepEqual(byteData.pack(1, new byteData.Type({"bits": 5}), 2),
            ["00000001"]);
    });

    it('uInt6 to hex', function() {
        assert.deepEqual(byteData.pack(1, new byteData.Type({"bits": 6}), 16),
            ["01"]);
    });
    it('uInt6 to bin', function() {
        assert.deepEqual(byteData.pack(1, new byteData.Type({"bits": 6}), 2),
            ["00000001"]);
    });

    it('uInt7 to hex', function() {
        assert.deepEqual(byteData.pack(1, new byteData.Type({"bits": 7}), 16),
            ["01"]);
    });
    it('uInt7 to bin', function() {
        assert.deepEqual(byteData.pack(1, new byteData.Type({"bits": 7}), 2),
            ["00000001"]);
    });


    it('uInt3 to hex', function() {
        assert.deepEqual(byteData.pack(1, new byteData.Type({"bits": 3}), 16),
            ["01"]);
    });
    it('uInt3 to bin', function() {
        assert.deepEqual(byteData.pack(1, new byteData.Type({"bits": 3}), 2),
            ["00000001"]);
    });

    it('int16 to bytes to int16', function() {
        let ntype = new byteData.Type({"bits": 16, "signed": true});
        let buffer = byteData.packArray([-1024, 1023], ntype);
        assert.deepEqual(
            [-1024, 1023],
            byteData.unpackArray(buffer, ntype));
    });

    /*
    it('int11 to bytes to int11', function() {
        let ntype = new byteData.Type({"bits": 11, "signed": true});
        let buffer = byteData.packArray([-1024, 1023], ntype);
        assert.deepEqual(
            [-1024, 1023],
            byteData.unpackArray(buffer, ntype));
    });
    it('int11 to bytes to int11', function() {
        let ntype = new byteData.Type({"bits": 11, "signed": true});
        let buffer = byteData.packArray([-1023, 1023], ntype);
        assert.deepEqual(
            [-1023, 1023],
            byteData.unpackArray(buffer, ntype));
    });
    it('int11 to bytes to int11', function() {
        let ntype = new byteData.Type({"bits": 11, "signed": true});
        let buffer = byteData.packArray([-1022, 1023], ntype);
        assert.deepEqual(
            [-1022, 1023],
            byteData.unpackArray(buffer, ntype));
    });
    it('uInt12 to bytes to uInt12', function() {
        let ntype = new byteData.Type({"bits": 12});
        let buffer = byteData.packArray([0, 4095], ntype);
        assert.deepEqual(
            [0, 4095],
            byteData.unpackArray(buffer, ntype));
    });
    it('int12 to bytes to int12', function() {
        let ntype = new byteData.Type({"bits": 12, "signed": true});
        let buffer = byteData.packArray([-2048, 2047], ntype);
        assert.deepEqual(
            [-2048, 2047],
            byteData.unpackArray(buffer, ntype));
    });

    it('uInt13 to bytes to uInt13', function() {
        let ntype = new byteData.Type({"bits": 13});
        let buffer = byteData.packArray([0, 8191], ntype);
        assert.deepEqual(
            [0, 8191],
            byteData.unpackArray(buffer, ntype));
    });
    it('int13 to bytes to int13', function() {
        let ntype = new byteData.Type({"bits": 13, "signed": true});
        let buffer = byteData.packArray([-4096, 4095], ntype);
        assert.deepEqual(
            [-4096, 4095],
            byteData.unpackArray(buffer, ntype));
    });

    it('uInt14 to bytes to uInt14', function() {
        let ntype = new byteData.Type({"bits": 14});
        let buffer = byteData.packArray([0, 16383], ntype);
        assert.deepEqual(
            [0, 16383],
            byteData.unpackArray(buffer, ntype));
    });
    it('int14 to bytes to int14', function() {
        let ntype = new byteData.Type({"bits": 14, "signed": true});
        let buffer = byteData.packArray([-8192, 8191], ntype);
        assert.deepEqual(
            [-8192, 8191],
            byteData.unpackArray(buffer, ntype));
    });


    it('uInt15 to bytes to uInt15', function() {
        let ntype = new byteData.Type({"bits": 15});
        let buffer = byteData.packArray([0, 32767], ntype);
        assert.deepEqual(
            [0, 32767],
            byteData.unpackArray(buffer, ntype));
    });
    it('int15 to bytes to int15', function() {
        let ntype = new byteData.Type({"bits": 15, "signed": true});
        let buffer = byteData.packArray([-16384, 16383], ntype);
        assert.deepEqual(
            [-16384, 16383],
            byteData.unpackArray(buffer, ntype));
    });


    it('uInt17 to bytes to uInt17', function() {
        let ntype = new byteData.Type({"bits": 17});
        let buffer = byteData.packArray([0, 131071], ntype);
        assert.deepEqual(
            [0, 131071],
            byteData.unpackArray(buffer, ntype));
    });
    it('int17 to bytes to int17', function() {
        let ntype = new byteData.Type({"bits": 17, "signed": true});
        let buffer = byteData.packArray([-65536, 65535], ntype);
        assert.deepEqual(
            [-65536, 65535],
            byteData.unpackArray(buffer, ntype));
    });


    it('uInt18 to bytes to uInt18', function() {
        let ntype = new byteData.Type({"bits": 18});
        let buffer = byteData.packArray([0, 262143], ntype);
        assert.deepEqual(
            [0, 262143],
            byteData.unpackArray(buffer, ntype));
    });
    it('int18 to bytes to int18', function() {
        let ntype = new byteData.Type({"bits": 18, "signed": true});
        let buffer = byteData.packArray([-131072, 131071], ntype);
        assert.deepEqual(
            [-131072, 131071],
            byteData.unpackArray(buffer, ntype));
    });

    it('uInt19 to bytes to uInt19', function() {
        let ntype = new byteData.Type({"bits": 19});
        let buffer = byteData.packArray([0, 524287], ntype);
        assert.deepEqual(
            [0, 524287],
            byteData.unpackArray(buffer, ntype));
    });
    it('int19 to bytes to int19', function() {
        let ntype = new byteData.Type({"bits": 19, "signed": true});
        let buffer = byteData.packArray([-262144, 262143], ntype);
        assert.deepEqual(
            [-262144, 262143],
            byteData.unpackArray(buffer, ntype));
    });


    it('uInt20 to bytes to uInt20', function() {
        let ntype = new byteData.Type({"bits": 20});
        let buffer = byteData.packArray([0, 1048575], ntype);
        assert.deepEqual(
            [0, 1048575],
            byteData.unpackArray(buffer, ntype));
    });
    it('int20 to bytes to int20', function() {
        let ntype = new byteData.Type({"bits": 20, "signed": true});
        let buffer = byteData.packArray([-524288, 524287], ntype);
        assert.deepEqual(
            [-524288, 524287],
            byteData.unpackArray(buffer, ntype));
    });


    it('uInt21 to bytes to uInt21', function() {
        let ntype = new byteData.Type({"bits": 21});
        let buffer = byteData.packArray([0, 2097151], ntype);
        assert.deepEqual(
            [0, 2097151],
            byteData.unpackArray(buffer, ntype));
    });
    it('int21 to bytes to int21', function() {
        let ntype = new byteData.Type({"bits": 21, "signed": true});
        let buffer = byteData.packArray([-1048576, 1048575], ntype);
        assert.deepEqual(
            [-1048576, 1048575],
            byteData.unpackArray(buffer, ntype));
    });


    it('uInt22 to bytes to uInt22', function() {
        let ntype = new byteData.Type({"bits": 22});
        let buffer = byteData.packArray([0, 4194303], ntype);
        assert.deepEqual(
            [0, 4194303],
            byteData.unpackArray(buffer, ntype));
    });
    it('int22 to bytes to int22', function() {
        let ntype = new byteData.Type({"bits": 22, "signed": true});
        let buffer = byteData.packArray([-2097152, 2097151], ntype);
        assert.deepEqual(
            [-2097152, 2097151],
            byteData.unpackArray(buffer, ntype));
    });
    it('int22 to bytes to int22', function() {
        let ntype = new byteData.Type({"bits": 22, "signed": true});
        let buffer = byteData.packArray([-2097151, 2097151], ntype);
        assert.deepEqual(
            [-2097151, 2097151],
            byteData.unpackArray(buffer, ntype));
    });

    it('uInt23 to bytes to uInt23', function() {
        let ntype = new byteData.Type({"bits": 23});
        let buffer = byteData.packArray([0, 8388607], ntype);
        assert.deepEqual(
            [0, 8388607],
            byteData.unpackArray(buffer, ntype));
    });
    it('int23 to bytes to int23', function() {
        let ntype = new byteData.Type({"bits": 23, "signed": true});
        let buffer = byteData.packArray([-4194304, 4194303], ntype);
        assert.deepEqual(
            [-4194304, 4194303],
            byteData.unpackArray(buffer, ntype));
    });
    it('int23 to bytes to int23', function() {
        let ntype = new byteData.Type({"bits": 23, "signed": true});
        let buffer = byteData.packArray([-4194303, 4194303], ntype);
        assert.deepEqual(
            byteData.unpackArray(buffer, ntype),
            [-4194303, 4194303]);
    });
    it('int23 to bytes to int23', function() {
        let ntype = new byteData.Type({"bits": 23, "signed": true});
        let buffer = byteData.packArray([-4194302, 4194303], ntype);
        console.log(ntype.max);
        assert.deepEqual(
            byteData.unpackArray(buffer, ntype),
            [-4194302, 4194303]);
    });
    it('int23 to bytes to int23', function() {
        let ntype = new byteData.Type({"bits": 23, "signed": true});
        let buffer = byteData.packArray([-4194301, 4194303], ntype);
        console.log(ntype.max);
        assert.deepEqual(
            byteData.unpackArray(buffer, ntype),
            [-4194301, 4194303]);
    });
    it('int23 to bytes to int23', function() {
        let ntype = new byteData.Type({"bits": 23, "signed": true});
        let buffer = byteData.packArray([-4194300, 4194303], ntype);
        console.log(ntype.max);
        assert.deepEqual(
            byteData.unpackArray(buffer, ntype),
            [-4194300, 4194303]);
    });
    */
});
