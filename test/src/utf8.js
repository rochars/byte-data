/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview UTF-8 tests.
 * @see https://github.com/rochars/byte-data
 */

if (typeof Uint8Array === 'function') {

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');
var Buffer = Buffer || false;

describe('replace invalid characters', function() {
    it('replaces invalid 2 byte UTF-8 char (2nd byte)', function() {
        assert.equal(byteData.unpackString([0xa0,0xa1]), '\uFFFD\uFFFD');
    });
    // 3 bytes
    it('replaces invalid 3 byte UTF-8 char (2rd byte)', function() {
        assert.equal(byteData.unpackString([0xe2,0x28,0xa1]), '\uFFFD');
    });
    it('replaces invalid 3 byte UTF-8 char (2rd byte)', function() {
        assert.equal(byteData.unpackString(
            [97,0xe2,0x28,0xa1,98]), 'a\uFFFDb');
    });
    it('replaces invalid 3 byte UTF-8 char (3rd byte)', function() {
        assert.equal(byteData.unpackString([0xe2,0x82,0x28]), '\uFFFD');
    });
    it('replaces invalid 3 byte UTF-8 char (3rd byte)', function() {
        assert.equal(byteData.unpackString([0xe2,0xE0,0x28]), '\uFFFD');
    });
    it('replaces invalid 3 byte UTF-8 char (3rd byte)', function() {
        assert.equal(byteData.unpackString([0xe2,0xED,0x28]), '\uFFFD');
    });
    // 4 bytes
    it('replaces invalid 4 byte UTF-8 char (2th byte)', function() {
        assert.equal(byteData.unpackString([0xf0,0x28,0x8c,0xbc]), '\uFFFD');
    });
    it('replaces invalid 4 byte UTF-8 char (3th byte)', function() {
        assert.equal(byteData.unpackString([0xf0,0x90,0x28,0xbc]), '\uFFFD');
    });
    it('replaces invalid 4 byte UTF-8 char (4th byte)', function() {
        assert.equal(byteData.unpackString(
            [97,0xf0,0x28,0x8c,0x28,240,175,167,159,240,175,167,159]),
        'a\uFFFD輸輸');
    });
    it('replaces invalid 4 byte UTF-8 char (4th byte)', function() {
        assert.equal(byteData.unpackString([0xf0,0xF4,0x8c,0x28]), '\uFFFD');
    });
    it('replaces invalid 4 byte UTF-8 char (4th byte)', function() {
        assert.equal(byteData.unpackString([0xf0,0xF0,0x8c,0x28]), '\uFFFD');
    });

})

// packStringTo
describe('packStringTo UTF-8 strings', function() {
    // 4 bytes
    it('returns the next index after writing 輸 to a buffer',
            function() {
        // 輸 CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f
        var chars = '輸';
        var buffer = new Uint8Array(12);
        assert.equal(4, byteData.packStringTo(chars, buffer));
    });
    it('pack 輸 to a byte array', function() {
        // 輸 CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f
        var chars = '輸';
        var buffer = new Uint8Array(12);
        byteData.packStringTo(chars, buffer);
        assert.deepEqual(new Uint8Array([
            0xf0, 0xaf, 0xa7, 0x9f,
            0,0,0,0,0,0,0,0]), buffer);
    });
    it('pack 輸 to a byte array on index 2', function() {
        // 輸 CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f
        var chars = '輸';
        var buffer = new Uint8Array(12);
        byteData.packStringTo(chars, buffer, 2);
        assert.deepEqual(new Uint8Array([
            0,0,
            0xf0, 0xaf, 0xa7, 0x9f,
            0,0,0,0,0,0]), buffer);
    });

    // 3 bytes
    it('returns the next index after writing 笠 to a buffer',
            function() {
        var chars = '笠'; // CJK COMPATIBILITY IDEOGRAPH-F9F8 (U+F9F8) ef a7 b8
        var buffer = new Uint8Array(12);
        assert.deepEqual(3, byteData.packStringTo(chars, buffer));
    });
    it('pack 笠 to a byte array', function() {
        var chars = '笠';
        var buffer = new Uint8Array(12);
        byteData.packStringTo(chars, buffer);
        assert.deepEqual(new Uint8Array([
            0xef, 0xa7, 0xb8,
            0,0,0,0,0,0,0,0,0]), buffer);
    });
    it('pack 笠 to a byte array on index 2', function() {
        var chars = '笠';
        var buffer = new Uint8Array(12);
        byteData.packStringTo(chars, buffer, 2);
        assert.deepEqual(new Uint8Array([
            0,0,
            0xef, 0xa7, 0xb8,
            0,0,0,0,0,0,0]), buffer);
    });

    // 2 bytes
    it('returns the next index after writing ߹ to a buffer',
            function() {
        var chars = '߹'; // NKO EXCLAMATION MARK
        var buffer = new Uint8Array(12);
        assert.deepEqual(2, byteData.packStringTo(chars, buffer));
    });
    it('pack ߹ to a byte array', function() {
        var chars = '߹';
        var buffer = new Uint8Array(12);
        byteData.packStringTo(chars, buffer);
        assert.deepEqual(new Uint8Array([
            223, 185,
            0, 0,0,0,0,0,0,0,0,0]), buffer);
    });
    it('pack ߹ to a byte array on index 2', function() {
        var chars = '߹';
        var buffer = new Uint8Array(12);
        byteData.packStringTo(chars, buffer, 2);
        assert.deepEqual(new Uint8Array([
            0,0,
            223, 185,
            0, 0,0,0,0,0,0,0]), buffer);
    });

    // 1 byte
    it('returns the next index after writing ~ to a buffer',
            function() {
        var chars = '~';
        var buffer = new Uint8Array(12);
        assert.deepEqual(1, byteData.packStringTo(chars, buffer));
    });
    it('pack ~ to a byte array', function() {
        var chars = '~';
        var buffer = new Uint8Array(12);
        byteData.packStringTo(chars, buffer);
        assert.deepEqual(new Uint8Array([
            126,
            0,0,0,0,0,0,0,0,0,0,0]), buffer);
    });
    it('pack ~ to a byte array on index 2', function() {
        var chars = '~';
        var buffer = new Uint8Array(12);
        byteData.packStringTo(chars, buffer, 2);
        assert.deepEqual(new Uint8Array([
            0,0,
            126,
            0,0,0,0,0,0,0,0,0]), buffer);
    });

    // multiple chars, 4-bytes
    it('returns the next index after writing 輸輸 to a buffer',
            function() {
        var chars = '輸輸';
        var buffer = new Uint8Array(12);
        assert.deepEqual(8, byteData.packStringTo(chars, buffer));
    });
    it('returns the next index after writing 2 4-byte chars to a buffer' +
            'on index 2', function() {
        var chars = '輸輸';
        var buffer = new Uint8Array(12);
        assert.deepEqual(10, byteData.packStringTo(chars, buffer, 2));
    });
    it('pack 輸輸 to a byte array', function() {
        var chars = '輸輸';
        var buffer = new Uint8Array(12);
        byteData.packStringTo(chars, buffer);
        assert.deepEqual(new Uint8Array([
            240,175,167,159,
            240,175,167,159,
            0,0,0,0]), buffer);
    });
    it('pack 輸輸 to a byte array on index 2', function() {
        var chars = '輸輸';
        var buffer = new Uint8Array(12);
        byteData.packStringTo(chars, buffer, 2);
        assert.deepEqual(new Uint8Array([
            0,0,
            240,175,167,159,
            240,175,167,159,
            0,0]), buffer);
    });
});

// pack
describe('unpackString UTF-8 strings, 4 bytes', function() {
    it('pack BOM + 輸 as a byte array', function() {
        // 輸 CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f
        var chars = '\ufeff輸';
        assert.deepEqual(
            [0xEF,0xBB,0xBF,240,175,167,159],
            byteData.packString(chars));
    });
});
describe('unpackString UTF-8 strings, 4 bytes', function() {
    it('pack 輸 + BOM + 輸 as a byte array', function() {
        // 輸   CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f
        var chars = '輸\ufeff輸';
        assert.deepEqual(
            [240,175,167,159,
                0xEF,0xBB,0xBF,
                240,175,167,159],
            byteData.packString(chars));
    });
});
describe('packString UTF-8 strings, 4 bytes', function() {
    it('pack 輸 as a byte array', function() {
        // 輸 CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f
        var chars = '輸';
        assert.deepEqual(
            [240,175,167,159],
            byteData.packString(chars));
    });
    it('pack 輸輸 as a byte array', function() {
        var chars = '輸輸';
        assert.deepEqual(
            [
                240,175,167,159,
                240,175,167,159],
            byteData.packString(chars));
    });
    it('pack 輸輸笠߹~$ as a byte array', function() {
        var chars = '輸輸笠߹~$';
        assert.deepEqual(
            [
                240,175,167,159,
                240,175,167,159,
                239, 167, 184,
                223, 185,
                126,
                36],
            byteData.packString(chars));
    });
    it('pack 輸輸笠߹~$輸 as a byte array', function() {
        var chars = '輸輸笠߹~$輸';
        assert.deepEqual(
            [
                240,175,167,159,
                240,175,167,159,
                239, 167, 184,
                223, 185,
                126,
                36,
                240,175,167,159],
            byteData.packString(chars));
    });
});
describe('packString UTF-8 strings, 3 bytes', function() {
    it('pack 笠 as a byte array', function() {
        // CJK COMPATIBILITY IDEOGRAPH-F9F8 (U+F9F8) ef a7 b8
        var chars = '笠';
        assert.deepEqual(
            [239, 167, 184],
            byteData.packString(chars));
    });
    it('pack 笠笠 as a byte array', function() {
        var chars = '笠笠';
        assert.deepEqual(
            [
                239, 167, 184,
                239, 167, 184],
            byteData.packString(chars));
    });
    it('pack 笠笠߹~$ as a byte array', function() {
        var chars = '笠笠߹~$';
        assert.deepEqual(
            [
                239, 167, 184,
                239, 167, 184,
                223, 185,
                126,
                36],
            byteData.packString(chars));
    });
    it('pack 笠笠߹~$笠 as a byte array', function() {
        var chars = '笠笠߹~$笠';
        assert.deepEqual(
            [
                239, 167, 184,
                239, 167, 184,
                223, 185,
                126,
                36,
                239, 167, 184],
            byteData.packString(chars));
    });
});
describe('packString UTF-8 strings, 2 bytes', function() {
    it('pack ߹ as a byte array', function() {
        var chars = '߹'; // NKO EXCLAMATION MARK (U+07F9)
        assert.deepEqual(
            [223, 185],
            byteData.packString(chars));
    });
    it('pack ߹߹ as a byte array', function() {
        var chars = '߹߹';
        assert.deepEqual(
            [223, 185, 223, 185],
            byteData.packString(chars));
    });
    it('pack ߹߹~$ as a byte array', function() {
        var chars = '߹߹~$';
        assert.deepEqual(
            [223, 185, 223, 185, 126, 36],
            byteData.packString(chars));
    });
    it('pack ߹߹~$߹ as a byte array', function() {
        var chars = '߹߹~$߹';
        assert.deepEqual(
            [223, 185, 223, 185, 126, 36, 223, 185],
            byteData.packString(chars));
    });
});
describe('packString UTF-8 strings, 1 byte', function() {
    it('pack ~ as a byte array', function() {
        var chars = '~'; // TILDE (U+007E)  7e
        assert.deepEqual(
            [126],
            byteData.packString(chars));
    });
    it('pack ~~ as a byte array', function() {
        var chars = '~~';
       assert.deepEqual(
            [126, 126],
            byteData.packString(chars));
    });
    it('pack ~~$ as a byte array', function() {
        var chars = '~~$';
        assert.deepEqual(
            [126, 126, 36],
            byteData.packString(chars));
    });
    it('pack ~~$~ as a byte array', function() {
        var chars = '~~$~';
        assert.deepEqual([126, 126, 36, 126],
            byteData.packString(chars));
    });
});
describe('packString ASCII strings', function() {
    it('pack $ as a byte array', function() {
        var chars = '$';
        assert.deepEqual([36], byteData.packString(chars));
    });
    it('pack $$ as a byte array', function() {
        var chars = '$$';
        assert.deepEqual([36, 36], byteData.packString(chars));
    });
});

// unpack
describe('unpackString UTF-8 strings, 4 bytes with BOM', function() {
    it('unpack BOM + 輸 from a byte buffer', function() {
        // 輸 CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f
        var chars = [
            0xEF,0xBB,0xBF,
            240,175,167,159];
        assert.equal('\ufeff輸', byteData.unpackString(chars));
    });
});
describe('unpackString UTF-8 strings', function() {
    it('unpack 𒈓 from a byte buffer', function() {
        // CUNEIFORM SIGN LU2 OPPOSING LU2 (U+12213)
        var chars = [0xF0, 0x92, 0x88, 0x93];
        assert.equal('𒈓', byteData.unpackString(chars));
    });
    it('unpack 𒈓𒈓 from a byte buffer', function() {
        // CUNEIFORM SIGN LU2 OPPOSING LU2 (U+12213)
        var chars = [
            0xF0, 0x92, 0x88, 0x93,
            0xF0, 0x92, 0x88, 0x93];
        assert.equal('𒈓𒈓', byteData.unpackString(chars));
    });
    it('unpack 𒈓𒈓$ from a byte buffer', function() {
        // CUNEIFORM SIGN LU2 OPPOSING LU2 (U+12213)
        var chars = [
            0xF0, 0x92, 0x88, 0x93,
            0xF0, 0x92, 0x88, 0x93,
            36];
        assert.equal('𒈓𒈓$', byteData.unpackString(chars));
    });
    it('unpack 𒈓𒈓$笠 from a byte buffer', function() {
        // CUNEIFORM SIGN LU2 OPPOSING LU2 (U+12213)
        var chars = [
            0xF0, 0x92, 0x88, 0x93,
            0xF0, 0x92, 0x88, 0x93,
            36,
            239, 167, 184];
        assert.equal('𒈓𒈓$笠', byteData.unpackString(chars));
    });
    it('unpack BOM + 𒈓𒈓$笠 from a byte buffer', function() {
        // CUNEIFORM SIGN LU2 OPPOSING LU2 (U+12213)
        var chars = [
            0xEF,0xBB,0xBF,
            0xF0, 0x92, 0x88, 0x93,
            0xF0, 0x92, 0x88, 0x93,
            36,
            239, 167, 184];
        assert.equal('\ufeff𒈓𒈓$笠', byteData.unpackString(chars));
    });
});
describe('unpackString UTF-8 strings, 4 bytes', function() {
    it('unpack 輸 from a byte buffer', function() {
        // 輸   CJK COMPATIBILITY IDEOGRAPH-2F9DF (U+2F9DF) f0 af a7 9f
        var chars = [240,175,167,159];
        assert.equal('輸', byteData.unpackString(chars));
    });
    it('unpack 輸輸 from a byte buffer', function() {
        var chars = [
            240,175,167,159,
            240,175,167,159];
        assert.equal('輸輸', byteData.unpackString(chars));
    });
    it('unpack 輸輸笠߹~$ from a byte buffer', function() {
        var chars = [
            240,175,167,159,
            240,175,167,159,
            239, 167, 184,
            223, 185,
            126,
            36];
        assert.equal('輸輸笠߹~$', byteData.unpackString(chars));
    });
    it('unpack 輸輸笠߹~$輸 from a byte buffer', function() {
        var chars = [
            240,175,167,159,
            240,175,167,159,
            239, 167, 184,
            223, 185,
            126,
            36,
            240,175,167,159];
        assert.equal('輸輸笠߹~$輸', byteData.unpackString(chars));
    });
});
describe('unpackString UTF-8 strings, 3 bytes', function() {
    it('unpack 笠 from a byte buffer', function() {
        // CJK COMPATIBILITY IDEOGRAPH-F9F8 (U+F9F8) ef a7 b8 // 239 167 184
        var chars = [239, 167, 184];
        assert.equal('笠', byteData.unpackString(chars));
    });
    it('unpack 笠笠 from a byte buffer', function() {
        var chars = [239, 167, 184, 239, 167, 184];
        assert.equal('笠笠', byteData.unpackString(chars));
    });
    it('unpack 笠笠߹~$ from a byte buffer', function() {
        var chars = [
            239, 167, 184,
            239, 167, 184,
            223, 185,
            126,
            36];
        assert.equal('笠笠߹~$', byteData.unpackString(chars));
    });
    it('unpack 笠笠߹~$笠 from a byte buffer', function() {
        var chars = [
            239, 167, 184,
            239, 167, 184,
            223, 185,
            126,
            36,
            239, 167, 184];
        assert.equal('笠笠߹~$笠',byteData.unpackString(chars));
    });
});
describe('unpackString UTF-8 strings, 2 bytes', function() {
    it('unpack å from a byte buffer', function() {
        var chars = [195,165];
        assert.equal('å', byteData.unpackString(chars));
    });
    it('unpack ߹ from a byte buffer', function() {
        var chars = [223, 185]; // NKO EXCLAMATION MARK (U+07F9)
        assert.equal('߹', byteData.unpackString(chars));
    });
    it('unpack ߹߹ from a byte buffer', function() {
        var chars = [223, 185, 223, 185];
        assert.equal('߹߹', byteData.unpackString(chars));
    });
    it('unpack ߹߹~$ from a byte buffer', function() {
        var chars = [223, 185, 223, 185, 126, 36];
        assert.equal('߹߹~$', byteData.unpackString(chars));
    });
    it('unpack ߹߹~$߹ from a byte buffer', function() {
        var chars = [223, 185, 223, 185, 126, 36, 223, 185];
        assert.equal('߹߹~$߹', byteData.unpackString(chars));
    });
});
describe('unpackString UTF-8 strings, 1 byte', function() {
    it('unpack ~ from a byte buffer', function() {
        var chars = [126]; // TILDE (U+007E)  7e
        assert.equal('~', byteData.unpackString(chars));
    });
    it('unpack ~~ from a byte buffer', function() {
        var chars = [126, 126];
        assert.equal('~~', byteData.unpackString(chars));
    });
    it('unpack ~~$ from a byte buffer', function() {
        var chars = [126, 126, 36];
        assert.equal('~~$', byteData.unpackString(chars));
    });
    it('unpack ~~$~ from a byte buffer', function() {
        var chars = [126, 126, 36, 126];
        assert.equal('~~$~', byteData.unpackString(chars));
    });
});
describe('unpackString ASCII strings', function() {
    it('unpack $ from a byte buffer', function() {
        var chars = [36];
        assert.equal('$', byteData.unpackString(chars));
    });
    it('unpack $$ from a byte buffer', function() {
        var chars = [36, 36];
        assert.equal('$$', byteData.unpackString(chars));
    });
});

// Old string tests
describe('packString strings', function() {
    it('should turn a string to a byte array', function() {
        assert.deepEqual(
            byteData.packString("abcd"), [97,98,99,100]);
    });
    it('should packString a string to a buffer', function() {
        var buffer = new Uint8Array(12);
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
            byteData.unpackString(new Uint8Array([97,98,99,100]), 1, 4), "bcd");
    });
    it('unpackString string, index, len', function() {
        assert.deepEqual(
            byteData.unpackString(new Uint8Array([97,98,99,100]), 2, 4), "cd");
    });
});

}