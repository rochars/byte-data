/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview UTF-8 tests.
 * @see https://github.com/rochars/byte-data
 */

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');

// packStringTo
describe('packStringTo UTF-8 strings', function() {
    it('1 char, 4 bytes', function() {
        let chars = '輸'; // 輸   CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f // 240,175,167,159
        let buffer = new Uint8Array(12);
        assert.deepEqual(4, byteData.packStringTo(chars, buffer));
    });
    it('1 char, 3 bytes', function() {
        let chars = '笠'; // CJK COMPATIBILITY IDEOGRAPH-F9F8 (U+F9F8) ef a7 b8
        let buffer = new Uint8Array(12);
        assert.deepEqual(3, byteData.packStringTo(chars, buffer));
    });
    it('1 char, 2 bytes', function() {
        let chars = '߹'; // NKO EXCLAMATION MARK
        let buffer = new Uint8Array(12);
        assert.deepEqual(2, byteData.packStringTo(chars, buffer));
    });
    it('1 char, 1 bytes', function() {
        let chars = '~';
        let buffer = new Uint8Array(12);
        assert.deepEqual(1, byteData.packStringTo(chars, buffer));
    });
    it('2 char, 8 bytes', function() {
        let chars = '輸輸';
        let buffer = new Uint8Array(12);
        assert.deepEqual(8, byteData.packStringTo(chars, buffer));
    });
    it('2 char, 8 bytes, to index=2', function() {
        let chars = '輸輸';
        let buffer = new Uint8Array(12);
        assert.deepEqual(10, byteData.packStringTo(chars, buffer, 2));
    });
});

// pack
describe('unpackString UTF-8 strings, 4 bytes', function() {
    it('should turn one UTF-8 char to a byte array', function() {
        let chars = '\ufeff輸'; // 輸   CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f // 240,175,167,159
        assert.deepEqual(
            new Uint8Array([0xEF,0xBB,0xBF,240,175,167,159]),
            byteData.packString(chars));
    });
});
describe('unpackString UTF-8 strings, 4 bytes', function() {
    it('should turn one UTF-8 char to a byte array', function() {
        let chars = '輸\ufeff輸'; // 輸   CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f // 240,175,167,159
        assert.deepEqual(
            new Uint8Array([240,175,167,159,0xEF,0xBB,0xBF,240,175,167,159]),
            byteData.packString(chars));
    });
});
describe('packString UTF-8 strings, 4 bytes', function() {
    it('should turn one UTF-8 char to a byte array', function() {
        let chars = '輸'; // 輸   CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f // 240,175,167,159
        assert.deepEqual(
            new Uint8Array([240,175,167,159]),
            byteData.packString(chars));
    });
    it('should turn  UTF-8 string to a byte array', function() {
        let chars = '輸輸';
        assert.deepEqual(
            new Uint8Array([240,175,167,159,240,175,167,159]),
            byteData.packString(chars));
    });
    it('should turn  UTF-8 string to a byte array', function() {
        let chars = '輸輸笠߹~$';
        assert.deepEqual(
            new Uint8Array([240,175,167,159,240,175,167,159 ,239, 167, 184, 223, 185, 126, 36]),
            byteData.packString(chars));
    });
    it('should turn  UTF-8 string to a byte array', function() {
        let chars = '輸輸笠߹~$輸';
        assert.deepEqual(
            new Uint8Array([240,175,167,159,240,175,167,159 ,239, 167, 184, 223, 185, 126, 36, 240,175,167,159]),
            byteData.packString(chars));
    });
});
describe('packString UTF-8 strings, 3 bytes', function() {
    it('should turn one UTF-8 char to a byte array', function() {
        let chars = '笠'; // CJK COMPATIBILITY IDEOGRAPH-F9F8 (U+F9F8) ef a7 b8 // 239 167 184
        assert.deepEqual(
            new Uint8Array([239, 167, 184]),
            byteData.packString(chars));
    });
    it('should turn  UTF-8 string to a byte array', function() {
        let chars = '笠笠';
        assert.deepEqual(
            new Uint8Array([239, 167, 184, 239, 167, 184]),
            byteData.packString(chars));
    });
    it('should turn  UTF-8 string to a byte array', function() {
        let chars = '笠笠߹~$';
        assert.deepEqual(
            new Uint8Array([239, 167, 184, 239, 167, 184, 223, 185, 126, 36]),
            byteData.packString(chars));
    });
    it('should turn  UTF-8 string to a byte array', function() {
        let chars = '笠笠߹~$笠';
        assert.deepEqual(
            new Uint8Array([239, 167, 184, 239, 167, 184, 223, 185, 126, 36, 239, 167, 184]),
            byteData.packString(chars));
    });
});
describe('packString UTF-8 strings, 2 bytes', function() {
    it('should turn one UTF-8 char to a byte array', function() {
        let chars = '߹'; // NKO EXCLAMATION MARK (U+07F9)
        assert.deepEqual(
            new Uint8Array([223, 185]),
            byteData.packString(chars));
    });
    it('should turn a UTF-8 string to a byte array', function() {
        let chars = '߹߹';
        assert.deepEqual(
            new Uint8Array([223, 185, 223, 185]),
            byteData.packString(chars));
    });
    it('should turn a UTF-8 string to a byte array', function() {
        let chars = '߹߹~$';
        assert.deepEqual(
            new Uint8Array([223, 185, 223, 185, 126, 36]),
            byteData.packString(chars));
    });
    it('should turn a UTF-8 string to a byte array', function() {
        let chars = '߹߹~$߹';
        assert.deepEqual(
            new Uint8Array([223, 185, 223, 185, 126, 36, 223, 185]),
            byteData.packString(chars));
    });
});
describe('packString UTF-8 strings, 1 byte', function() {
    it('should turn 1 char to a byte array', function() {
        let chars = '~'; // TILDE (U+007E)  7e
        assert.deepEqual(
            new Uint8Array([126]),
            byteData.packString(chars));
    });
    it('should turn 2 chars to a byte array', function() {
        let chars = '~~';
       assert.deepEqual(
            new Uint8Array([126, 126]),
            byteData.packString(chars));
    });
    it('should turn 2 UTF8 chars and 1 ASCII to a byte array', function() {
        let chars = '~~$';
        assert.deepEqual(
            new Uint8Array([126, 126, 36]),
            byteData.packString(chars));
    });
    it('should turn 2 UTF8 chars and 1 ASCII to a byte array', function() {
        let chars = '~~$~';
        assert.deepEqual(new Uint8Array([126, 126, 36, 126]),
            byteData.packString(chars));
    });
});
describe('packString ASCII strings', function() {
    it('should turn a ASCII string to a byte array', function() {
        let chars = '$';
        assert.deepEqual(new Uint8Array([36]), byteData.packString(chars));
    });
    it('should turn a ASCII string to a byte array', function() {
        let chars = '$$';
        assert.deepEqual(new Uint8Array([36, 36]), byteData.packString(chars));
    });
});

// unpack
// BOM 0xEF,0xBB,0xBF
describe('unpackString UTF-8 strings, 4 bytes with BOM', function() {
    it('packStringTo \ufeff輸', function() {
        let chars = [0xEF,0xBB,0xBF,240,175,167,159]; // 輸   CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f // 240,175,167,159
        assert.deepEqual('\ufeff輸', byteData.unpackString(chars));
    });
});
describe('unpackString UTF-8 strings, 4 bytes with BOM', function() {
    it('packString \ufeff輸', function() {
        let chars = [0xEF,0xBB,0xBF,240,175,167,159]; // 輸   CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f // 240,175,167,159
        assert.deepEqual('\ufeff輸', byteData.unpackString(chars));
    });
});
describe('unpackString UTF-8 strings', function() {
    it('packString 𒈓', function() {
        let chars = [0xF0, 0x92, 0x88, 0x93]; // CUNEIFORM SIGN LU2 OPPOSING LU2 (U+12213)
        assert.deepEqual('𒈓', byteData.unpackString(chars));
    });
    it('packString 𒈓𒈓', function() {
        let chars = [0xF0, 0x92, 0x88, 0x93, 0xF0, 0x92, 0x88, 0x93]; // CUNEIFORM SIGN LU2 OPPOSING LU2 (U+12213)
        assert.deepEqual('𒈓𒈓', byteData.unpackString(chars));
    });
    it('packString 𒈓𒈓$', function() {
        let chars = [0xF0, 0x92, 0x88, 0x93, 0xF0, 0x92, 0x88, 0x93, 36]; // CUNEIFORM SIGN LU2 OPPOSING LU2 (U+12213)
        assert.deepEqual('𒈓𒈓$', byteData.unpackString(chars));
    });
    it('packString 𒈓𒈓$笠', function() {
        let chars = [0xF0, 0x92, 0x88, 0x93, 0xF0, 0x92, 0x88, 0x93, 36, 239, 167, 184]; // CUNEIFORM SIGN LU2 OPPOSING LU2 (U+12213)
        assert.deepEqual('𒈓𒈓$笠', byteData.unpackString(chars));
    });
    it('packString \ufeff𒈓𒈓$笠', function() {
        let chars = [0xEF,0xBB,0xBF,0xF0, 0x92, 0x88, 0x93, 0xF0, 0x92, 0x88, 0x93, 36, 239, 167, 184]; // CUNEIFORM SIGN LU2 OPPOSING LU2 (U+12213)
        assert.deepEqual('\ufeff𒈓𒈓$笠', byteData.unpackString(chars));
    });
});
describe('unpackString UTF-8 strings, 4 bytes', function() {
    it('packString 輸', function() {
        let chars = [240,175,167,159]; // 輸   CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f // 240,175,167,159
        assert.deepEqual('輸', byteData.unpackString(chars));
    });
    it('packString 輸輸', function() {
        let chars = [240,175,167,159,240,175,167,159];
        assert.deepEqual('輸輸', byteData.unpackString(chars));
    });
    it('packString 輸輸笠߹~$', function() {
        let chars = [240,175,167,159,240,175,167,159 ,239, 167, 184, 223, 185, 126, 36];
        assert.deepEqual('輸輸笠߹~$', byteData.unpackString(chars));
    });
    it('packString 輸輸笠߹~$輸', function() {
        let chars = [240,175,167,159,240,175,167,159 ,239, 167, 184, 223, 185, 126, 36, 240,175,167,159];
        assert.deepEqual('輸輸笠߹~$輸', byteData.unpackString(chars));
    });
});
describe('unpackString UTF-8 strings, 3 bytes', function() {
    it('packString 笠', function() {
        let chars = [239, 167, 184]; // CJK COMPATIBILITY IDEOGRAPH-F9F8 (U+F9F8) ef a7 b8 // 239 167 184
        assert.deepEqual('笠', byteData.unpackString(chars));
    });
    it('packString 笠笠', function() {
        let chars = [239, 167, 184, 239, 167, 184];
        assert.deepEqual('笠笠', byteData.unpackString(chars));
    });
    it('packString 笠笠߹~$', function() {
        let chars = [239, 167, 184, 239, 167, 184, 223, 185, 126, 36];
        assert.deepEqual('笠笠߹~$', byteData.unpackString(chars));
    });
    it('packString 笠笠߹~$笠', function() {
        let chars = [239, 167, 184, 239, 167, 184, 223, 185, 126, 36, 239, 167, 184];
        assert.deepEqual('笠笠߹~$笠',byteData.unpackString(chars));
    });
});
describe('unpackString UTF-8 strings, 2 bytes', function() {
    it('packString å', function() {
        let chars = [195,165]; // NKO EXCLAMATION MARK (U+07F9)
        assert.deepEqual('å', byteData.unpackString(chars));
    });
    it('packString ߹', function() {
        let chars = [223, 185]; // NKO EXCLAMATION MARK (U+07F9)
        assert.deepEqual('߹', byteData.unpackString(chars));
    });
    it('packString ߹߹', function() {
        let chars = [223, 185, 223, 185];
        assert.deepEqual('߹߹', byteData.unpackString(chars));
    });
    it('packString ߹߹~$', function() {
        let chars = [223, 185, 223, 185, 126, 36];
        assert.deepEqual('߹߹~$', byteData.unpackString(chars));
    });
    it('packString ߹߹~$߹', function() {
        let chars = [223, 185, 223, 185, 126, 36, 223, 185];
        assert.deepEqual('߹߹~$߹', byteData.unpackString(chars));
    });
});
describe('unpackString UTF-8 strings, 1 byte', function() {
    it('packString ~', function() {
        let chars = [126]; // TILDE (U+007E)  7e
        assert.deepEqual('~', byteData.unpackString(chars));
    });
    it('packString ~~', function() {
        let chars = [126, 126];
        assert.deepEqual('~~', byteData.unpackString(chars));
    });
    it('packString ~~$', function() {
        let chars = [126, 126, 36];
        assert.deepEqual('~~$', byteData.unpackString(chars));
    });
    it('packString ~~$~', function() {
        let chars = [126, 126, 36, 126];
        assert.deepEqual('~~$~', byteData.unpackString(chars));
    });
});
describe('unpackString ASCII strings', function() {
    it('packString $', function() {
        let chars = [36];
        assert.deepEqual('$', byteData.unpackString(chars));
    });
    it('packString $$', function() {
        let chars = [36, 36];
        assert.deepEqual('$$', byteData.unpackString(chars));
    });
});

// Old string tests
describe('packString strings', function() {
    it('should turn a string to a byte array', function() {
        assert.deepEqual(
            byteData.packString("abcd"), new Uint8Array([97,98,99,100]));
    });
    it('should packString a string to a buffer', function() {
        let buffer = new Uint8Array(12);
        byteData.packStringTo("abcd", buffer, 4);
        assert.deepEqual(
            buffer, new Uint8Array([0, 0, 0, 0, 97,98,99,100, 0, 0, 0, 0]));
    });
});
describe('unpackString strings', function() {
    it('unpackString string, no index, no len', function() {
        assert.deepEqual(
            byteData.unpackString(new Uint8Array([97,98,99,100])), "abcd");
    });
    it('unpackString string, index, no len', function() {
        assert.deepEqual(
            byteData.unpackString(new Uint8Array([97,98,99,100]), 1), "bcd");
    });
    it('unpackString string, index, no len', function() {
        assert.deepEqual(
            byteData.unpackString(new Uint8Array([97,98,99,100]), 2), "cd");
    });
    it('unpackString string, index, len', function() {
        assert.deepEqual(
            byteData.unpackString(new Uint8Array([97,98,99,100]), 1, 2), "bc");
    });
    it('unpackString string, index, len', function() {
        assert.deepEqual(
            byteData.unpackString(new Uint8Array([97,98,99,100]), 2, 1), "c");
    });
});
