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

import endianness from 'endianness';
import utf8BufferSize from 'utf8-buffer-size';
import {pack as packUTF8, unpack as unpackUTF8} from 'utf8-buffer';
import NumberBuffer from './lib/number-buffer.js';
import {validateValueType} from './lib/validation.js';

/**
 * Read a string of UTF-8 characters from a byte buffer.
 * @param {!Uint8Array|!Array<number>} buffer A byte buffer.
 * @param {number=} index The buffer index to start reading.
 * @param {?number=} end The buffer index to stop reading.
 *   If end is null will read until the end of the buffer.
 * @return {string}
 */
export function unpackString(buffer, index=0, end=null) {
  return unpackUTF8(buffer, index, end);
}

/**
 * Write a string of UTF-8 characters as a byte buffer.
 * @param {string} str The string to pack.
 * @return {!Uint8Array} The buffer with the packed string written.
 */ 
export function packString(str) {
  /** @type {!Uint8Array} */
  let buffer = new Uint8Array(utf8BufferSize(str));
  packUTF8(str, buffer, 0);
  return buffer;
}

/**
 * Write a string of UTF-8 characters to a byte buffer.
 * @param {string} str The string to pack.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number=} index The buffer index to start writing.
 *   Assumes zero if undefined.
 * @return {number} The next index to write in the buffer.
 */
export function packStringTo(str, buffer, index=0) {
  return packUTF8(str, buffer, index);
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
  /** @type {!Array<number>} */
  let output = [];
  packTo(value, theType, output);
  return output;
}

/**
 * Pack a number to a byte buffer.
 * @param {number} value The value.
 * @param {!Object} theType The type definition.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number=} index The buffer index to write. Assumes 0 if undefined.
 * @return {number} The next index to write.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
export function packTo(value, theType, buffer, index=0) {
  return packArrayTo([value], theType, buffer, index);
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
  /** @type {!Array<number>} */
  let output = [];
  packArrayTo(values, theType, output);
  return output;
}

/**
 * Pack a array of numbers to a byte buffer.
 * @param {!Array<number>|!TypedArray} values The value.
 * @param {!Object} theType The type definition.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number=} index The buffer index to start writing.
 *   Assumes zero if undefined.
 * @return {number} The next index to write.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
export function packArrayTo(values, theType, buffer, index=0) {
  /** @type {NumberBuffer} */
  let packer = new NumberBuffer(theType);
  let valuesLen = values.length;
  for (let i = 0; i < valuesLen; i++) {
    validateValueType(values[i]);
    /** @type {number} */
    let len = index + packer.offset;
    while (index < len) {
      index = packer.pack(buffer, values[i], index);
    }
    if (theType.be) {
      endianness(
        buffer, packer.offset, index - packer.offset, index);
    }
  }
  return index;
}

/**
 * Unpack a number from a byte buffer.
 * @param {!Uint8Array|!Array<number>} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {number=} index The buffer index to read. Assumes zero if undefined.
 * @return {number}
 * @throws {Error} If the type definition is not valid
 * @throws {Error} On bad buffer length.
 */
export function unpack(buffer, theType, index=0) {
  /** @type {NumberBuffer} */
  let packer = new NumberBuffer(theType);
  if ((packer.offset + index) > buffer.length) {
    throw Error('Bad buffer length');
  }
  if (theType.be) {
    endianness(buffer, packer.offset, index, index + packer.offset);
  }
  /** @type {number} */
  let value = packer.unpack(buffer, index);
  if (theType.be) {
    endianness(buffer, packer.offset, index, index + packer.offset);
  }
  return value;
}

/**
 * Unpack an array of numbers from a byte buffer.
 * @param {!Uint8Array|!Array<number>} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {number=} index The buffer index to start reading.
 *   Assumes zero if undefined.
 * @param {number=} end The buffer index to stop reading.
 *   Assumes the buffer length if undefined.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid
 */
export function unpackArray(buffer, theType, index=0, end=buffer.length) {
  /** @type {!Array<number>} */
  let output = [];
  unpackArrayTo(buffer, theType, output, index, end);
  return output;
}

/**
 * Unpack a array of numbers to a typed array.
 * @param {!Uint8Array|!Array<number>} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {!TypedArray|!Array<number>} output The output array.
 * @param {number=} index The buffer index to start reading.
 *   Assumes zero if undefined.
 * @param {number=} end The buffer index to stop reading.
 *   Assumes the buffer length if undefined.
 * @throws {Error} If the type definition is not valid
 */
export function unpackArrayTo(
    buffer, theType, output, index=0, end=buffer.length) {
  /** @type {NumberBuffer} */
  let packer = new NumberBuffer(theType);
  /** @type {number} */
  let originalIndex = index;
  while ((end - index) % packer.offset) {
      end--;
  }
  if (theType.be) {
    endianness(buffer, packer.offset, index, end);
  }
  for (let i = 0; index < end; index += packer.offset) {
    output[i] = packer.unpack(buffer, index);
    i++;
  }
  if (theType.be) {
    endianness(buffer, packer.offset, originalIndex, end);
  }
}
