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

export default class Packer {

  constructor() {
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
   * Read a number from a byte buffer.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number} i The index to read.
   * @return {number}
   */
  read(bytes, i) {}

  /**
   * Write a number to a byte buffer.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number} number The number to write as bytes.
   * @param {number} j The index being written in the byte buffer.
   * @return {!number} The next index to write on the byte buffer.
   */
  write(bytes, number, j) {}

  /**
   * Validate the type and set up the packing/unpacking functions.
   * @param {!Object} theType The type definition.
   * @throws {Error} If the type definition is not valid.
   */
  setUp(theType) {
    validateType(theType);
    theType.offset = theType.bits < 8 ? 1 : Math.ceil(theType.bits / 8);
    this.setReaderAndWriter_(theType);
    this.gInt_ = new Integer(
      theType.bits == 64 ? 32 : theType.bits,
      theType.float ? false : theType.signed);
  }

  /**
   * Read int values from bytes.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number} i The index to read.
   * @return {number}
   * @private
   */
  readInt_(bytes, i) {
    return this.gInt_.read(bytes, i);
  }

  /**
   * Read 1 16-bit float from bytes.
   * @see https://stackoverflow.com/a/8796597
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number} i The index to read.
   * @return {number}
   * @private
   */
  read16F_(bytes, i) {
    /** @type {number} */
    let int = this.gInt_.read(bytes, i);
    /** @type {number} */
    let exponent = (int & 0x7C00) >> 10;
    /** @type {number} */
    let fraction = int & 0x03FF;
    /** @type {number} */
    let floatValue;
    if (exponent) {
      floatValue =  Math.pow(2, exponent - 15) * (1 + fraction / 0x400);
    } else {
      floatValue = 6.103515625e-5 * (fraction / 0x400);
    }
    return floatValue * (int >> 15 ? -1 : 1);
  }

  /**
   * Read 1 32-bit float from bytes.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number} i The index to read.
   * @return {number}
   * @private
   */
  read32F_(bytes, i) {
    this.ui32_[0] = this.gInt_.read(bytes, i);
    return this.f32_[0];
  }

  /**
   * Read 1 64-bit float from bytes.
   * Thanks https://gist.github.com/kg/2192799
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number} i The index to read.
   * @return {number}
   * @private
   */
  read64F_(bytes, i) {
    this.ui32_[this.HIGH] = this.gInt_.read(bytes, i);
    this.ui32_[this.LOW] = this.gInt_.read(bytes, i + 4);
    return this.f64_[0];
  }

  /**
   * Write a integer value to a byte buffer.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number} number The number to write as bytes.
   * @param {number} j The index being written in the byte buffer.
   * @return {!number} The next index to write on the byte buffer.
   * @private
   */
  writeInt_(bytes, number, j) {
    return this.gInt_.write(bytes, number, j);
  }

  /**
   * Write one 16-bit float as a binary value.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number} number The number to write as bytes.
   * @param {number} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write16F_(bytes, number, j) {
    this.f32_[0] = number;
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
    return j;
  }

  /**
   * Write one 32-bit float as a binary value.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number} number The number to write as bytes.
   * @param {number} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write32F_(bytes, number, j) {
    this.f32_[0] = number;
    return this.gInt_.write(bytes, this.ui32_[0], j);
  }

  /**
   * Write one 64-bit float as a binary value.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number} number The number to write as bytes.
   * @param {number} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write64F_(bytes, number, j) {
    this.f64_[0] = number;
    j = this.gInt_.write(bytes, this.ui32_[this.HIGH], j);
    return this.gInt_.write(bytes, this.ui32_[this.LOW], j);
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
      this.read = this.readInt_;
      this.write = this.writeInt_;
    }
  }

}

//export {reader, writer, setUp};
