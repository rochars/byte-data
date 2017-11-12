/*
 * endianess: swap byte endianess.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

/**
 * Make the resulting byte array big endian or little endian.
 * Default is little endian.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} offset The swap offset according to the bit depth.
 *      2 for 16-bit, 3 for 24-bit, 4 for 32-bit,
 *      5 for 40-bit, 6 for 48-bit, 8 for 64-bit
 * @param {boolean} bigEndian If the bytes are big endian or not.
 */
function endianess(bytes, offset, bigEndian) {
    if (bigEndian) {
        let len = bytes.length;
        let i = 0;
        while (i < len) {
            byteSwap(bytes, i, offset);
            i+=offset;
        }
    }
    return bytes;
}

/**
 * Swap the endianees of a unit of information in a array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @param {number} numBytes The number of bytes according to
 *      the bit depth of the data.
 */
function byteSwap(bytes, i, numBytes) {
    let x = 0;
    let y = numBytes - 1;
    let limit = parseInt(numBytes / 2, 10);
    let swap;
    while(x < limit) {
        swap = bytes[i+x];
        bytes[i+x] = bytes[i+y];
        bytes[i+y] = swap;
        x++;
        y--;
    }
}

module.exports.endianess = endianess;
