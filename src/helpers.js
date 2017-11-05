/*
 * Helper functions.
 * TODO This needs refactoring.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

/**
 * Padding for binary strings.
 * @param {!Array<string>} bytes The bytes as binary strings.
 * @param {number} base The base.
 * @param {number} index The byte to pad.
 */
function padding(bytes, base, index) {
    let offset = bytes[index].length + 1;
    if (base == 2 && bytes[index].length < 8) {
        offset = 9;
    }else if (base == 16) {
        offset = 3;
    }
    if (bytes[index].length < offset -1) {
        bytes[index] = 
            new Array((offset - bytes[index].length)).join("0")  + bytes[index];    
    }
}

/**
 * Fix the size of nibbles.
 * @param {!Array<string>} nibbles The nibble as a binary or hex string.
 * @param {number} base The base.
 * @param {number} index The nibble offset.
 */
function paddingNibble(nibbles, base, index) {
    if (base == 2 && nibbles[index].length < 4) {
        nibbles[index] = 
            new Array((5 - nibbles[index].length)).join("0")  + nibbles[index];
    } else if(base == 16 && nibbles[index].length == 2 && nibbles[index][0] == "0") {
        nibbles[index] = nibbles[index][1];
    }
}   

/**
 * Padding with 0s for byte strings.
 * @param {string} byte The byte as a binary or hex string.
 * @param {number} base The base.
 * @returns {string} The padded byte.
 */
function bytePadding(byte, base) {
    let offset = byte.length + 1;
    if (base == 2) {
        offset = 9;
    } else if (base == 16) {
        offset = 3;   
    }
    if (byte.length < offset -1) {
        byte = new Array((offset - byte.length)).join("0")  + byte;
    }
    return byte;
}

module.exports.padding = padding;
module.exports.paddingNibble = paddingNibble;
module.exports.bytePadding = bytePadding;
