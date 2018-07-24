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
 * @fileoverview Function to serialize binary data.
 * @see https://github.com/rochars/byte-data
 */

import Integer from './integer.js';
import {validateType} from './validation.js';
import endianness from 'endianness';
import {unpackIEEE754} from './IEEE754.js';

/**
 * A class to pack and unpack integers and floating-point numbers.
 * @extends {Integer}
 */
export default class Packer extends Integer {
  
  constructor() {
    super();
    /**
     * Use a Typed Array to check if the host is BE or LE. This will impact
     * on how 64-bit floating point numbers are handled.
     * @type {boolean}
     * @private
     */
    const BE_ENV = new Uint8Array(new Uint32Array([1]).buffer)[0] === 0;
    /**
     * @type {number}
     * @private
     */
    this.HIGH = BE_ENV ? 1 : 0;
    /**
     * @type {number}
     * @private
     */
    this.LOW = BE_ENV ? 0 : 1;
    /**
     * @type {!Int8Array}
     * @private
     */
    let int8_ = new Int8Array(8);
    /**
     * @type {!Uint32Array}
     * @private
     */
    this.ui32_ = new Uint32Array(int8_.buffer);
    /**
     * @type {!Float32Array}
     * @private
     */
    this.f32_ = new Float32Array(int8_.buffer);
    /**
     * @type {!Float64Array}
     * @private
     */
    this.f64_ = new Float64Array(int8_.buffer);
    /**
     * @type {Object}
     * @private
     */
    this.gInt_ = {};
  }

  /**
   * Set up the object to start serializing/deserializing a data type..
   * @param {!Object} theType The type definition.
   * @throws {Error} If the type definition is not valid.
   */
  setUp(theType) {
    validateType(theType);
    super.setUp({
      bits: theType.bits,
      signed: theType.float ? false : theType.signed});
    this.setReaderAndWriter_(theType);
  }

  /**
   * Read 1 16-bit float from bytes.
   * @see https://stackoverflow.com/a/8796597
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read16F_(bytes, i=0) {
    return unpackIEEE754(bytes, i, 2, 5, 15);
  }

  /**
   * Read 1 32-bit float from bytes.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read32F_(bytes, i=0) {
    return unpackIEEE754(bytes, i, 4, 8, 127);
  }

  /**
   * Read 1 64-bit float from bytes.
   * Thanks https://gist.github.com/kg/2192799
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read64F_(bytes, i=0) {
    return unpackIEEE754(bytes, i, 8, 11, 1023);
  }

  /**
   * Write one 16-bit float as a binary value.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number} number The number to write as bytes.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write16F_(bytes, number, j=0) {
    this.f32_[0] = number;
    if (isNaN(number)) {
      bytes[j++] = 0;
      bytes[j++] = 126;
    } else if (number === Infinity) {
      bytes[j++] = 0;
      bytes[j++] = 124;
    } else if (number === -Infinity) {
      bytes[j++] = 0;
      bytes[j++] = 252;
    } else {
      /** @type {number} */
      let x = this.ui32_[0];
      /** @type {number} */
      let bits = (x >> 16) & 0x8000;
      /** @type {number} */
      let m = (x >> 12) & 0x07ff;
      /** @type {number} */
      let e = (x >> 23) & 0xff;
      if (e >= 103) {
        bits |= ((e - 112) << 10) | (m >> 1);
        bits += m & 1;
      }
      bytes[j++] = bits & 0xFF;
      bytes[j++] = bits >>> 8 & 0xFF;
    }
    return j;
  }

  /**
   * Write one 32-bit float as a binary value.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number} number The number to write as bytes.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write32F_(bytes, number, j=0) {
    this.f32_[0] = number;
    return super.write(bytes, this.ui32_[0], j);
  }

  /**
   * Write one 64-bit float as a binary value.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number} number The number to write as bytes.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write64F_(bytes, number, j=0) {
    this.f64_[0] = number;
    j = super.write(bytes, this.ui32_[this.HIGH], j);
    return super.write(bytes, this.ui32_[this.LOW], j);
  }

  /**
   * Set the functions to pack and unpack numbers.
   * @param {!Object} theType The type definition.
   * @private
   */
  setReaderAndWriter_(theType) {
    if (theType.float) {
      if (theType.bits == 16) {
        this.read = this.read16F_;
        this.write = this.write16F_;
      } else if(theType.bits == 32) {
        this.read = this.read32F_;
        this.write = this.write32F_;
      } else {
        this.read = this.read64F_;
        this.write = this.write64F_;
      }
    } else {
      this.read = super.read;
      this.write = super.write;
    }
  }
}
