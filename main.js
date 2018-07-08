/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * @fileoverview The byte-data API.
 * @see https://github.com/rochars/byte-data
 */

/** @module byteData */

import endianness from './lib/endianness.js';
import {reader_, setUp_, writeBytes_} from './lib/packer.js';
import {validateNotUndefined, validateASCIICode} from './lib/validation.js';

// ASCII characters
/**
 * Read a string of ASCII characters from a byte buffer.
 * @param {!Uint8Array} bytes A byte buffer.
 * @param {number=} index The index to read.
 * @param {?number=} len The number of bytes to read.
 * @return {string}
 * @throws {Error} If a character in the string is not valid ASCII.
 */
export function unpackString(bytes, index=0, len=null) {
  let chrs = '';
  len = len ? index + len : bytes.length;
  while (index < len) {
    validateASCIICode(bytes[index]);
    chrs += String.fromCharCode(bytes[index]);
    index++;
  }
  return chrs;
}

/**
 * Write a string of ASCII characters as a byte buffer.
 * @param {string} str The string to pack.
 * @return {!Array<number>} The next index to write on the buffer.
 * @throws {Error} If a character in the string is not valid ASCII.
 */
export function packString(str) {
  let bytes = [];
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    validateASCIICode(code);
    bytes[i] = code;
  }
  return bytes;
}

/**
 * Write a string of ASCII characters to a byte buffer.
 * @param {string} str The string to pack.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number=} index The index to write in the buffer.
 * @return {number} The next index to write in the buffer.
 * @throws {Error} If a character in the string is not valid ASCII.
 */
export function packStringTo(str, buffer, index=0) {
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    validateASCIICode(code);
    buffer[index] = code;
    index++;
  }
  return index;
}

// Numbers
/**
 * Pack a number as a byte buffer.
 * @param {number} value The number.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>} The packed value.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
export function pack(value, theType) {
  let output = [];
  packTo(value, theType, output);
  return output;
}

/**
 * Pack an array of numbers as a byte buffer.
 * @param {!Array<number>|!TypedArray} values The values.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>} The packed values.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If any of the values are not valid.
 */
export function packArray(values, theType) {
  let output = [];
  packArrayTo(values, theType, output);
  return output;
}

/**
 * Pack a number to a byte buffer.
 * @param {number} value The value.
 * @param {!Object} theType The type definition.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number=} index The index to write.
 * @return {number} The next index to write.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
export function packTo(value, theType, buffer, index=0) {
  setUp_(theType);
  return writeBytes_(value,
    theType,
    buffer,
    index,
    index + theType.offset,
    validateNotUndefined,
    theType.be);
}

/**
 * Pack a array of numbers to a byte buffer.
 * @param {!Array<number>|!TypedArray} values The value.
 * @param {!Object} theType The type definition.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number=} index The buffer index to write.
 * @return {number} The next index to write.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
export function packArrayTo(values, theType, buffer, index=0) {
  setUp_(theType);
  let be = theType.be;
  let offset = theType.offset;
  let len = values.length;
  for (let i=0; i<len; i++) {
    index = writeBytes_(
      values[i],
      theType,
      buffer,
      index,
      index + offset,
      validateNotUndefined,
      be);
  }
  return index;
}

/**
 * Unpack a number from a byte buffer.
 * @param {!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @return {number}
 * @throws {Error} If the type definition is not valid
 */
export function unpack(buffer, theType) {
  setUp_(theType);
  let values = unpackArrayFrom(buffer.slice(0, theType.offset), theType);
  return values[0];
}

/**
 * Unpack an array of numbers from a byte buffer.
 * @param {!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid.
 */
export function unpackArray(buffer, theType) {
  return unpackArrayFrom(buffer, theType);
}

/**
 * Unpack a number from a byte buffer by index.
 * @param {!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {number=} index The buffer index to read.
 * @return {number}
 * @throws {Error} If the type definition is not valid
 */
export function unpackFrom(buffer, theType, index=0) {
  setUp_(theType);
  if (theType.be) {
    endianness(buffer, theType.offset, index, index + theType.offset);
  }
  let value = reader_(buffer, index);
  if (theType.be) {
    endianness(buffer, theType.offset, index, index + theType.offset);
  }
  return value;
}

/**
 * Unpack a array of numbers from a byte buffer by index.
 * @param {!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {number=} index The start index. Assumes 0.
 * @param {?number=} end The end index. Assumes the buffer length.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid
 */
export function unpackArrayFrom(buffer, theType, index=0, end=null) {
  setUp_(theType);
  if (theType.be) {
    endianness(buffer, theType.offset);
  }
  let len = end || buffer.length;
  while ((len - index) % theType.offset) {
    len--;
  }
  let values = [];
  let step = theType.offset;
  while (index < len) {
    values.push(reader_(buffer, index));
    index += step;
  }
  if (theType.be) {
    endianness(buffer, theType.offset);
  }
  return values;
}

/**
 * Unpack a array of numbers to a typed array.
 * @param {!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {!TypedArray} output The output array.
 * @param {number=} index The start index. Assumes 0.
 * @param {?number=} end The end index. Assumes the buffer length.
 * @throws {Error} If the type definition is not valid
 */
export function unpackArrayTo(buffer, theType, output, index=0, end=null) {
  setUp_(theType);
  if (theType.be) {
    endianness(buffer, theType.offset);
  }
  let len = end || buffer.length;
  while ((len - index) % theType.offset) {
    len--;
  }
  let outputIndex = 0;
  let step = theType.offset;
  while (index < len) {
    output.set([reader_(buffer, index)], outputIndex);
    outputIndex++;
    index += step;
  }
  if (theType.be) {
    endianness(buffer, theType.offset);
  }
}

// Issue warning if running on big-endian env
if (new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x12) {
  throw new Error('This library is for little-endian environments only.');
}
