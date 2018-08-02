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
 * @fileoverview Sserialize and deserialize integers and floats.
 * @see https://github.com/rochars/byte-data
 */

import IntBuffer from './int-buffer.js';
import {validateType} from './validation.js';
import {unpack, pack} from 'ieee754-buffer';

/**
 * A class to pack and unpack integers and floating-point numbers.
 * Signed integers are two's complement.
 * Floating point are IEEE 754 standard.
 * @extends {IntBuffer}
 */
export default class NumberBuffer extends IntBuffer {
  
  constructor(theType) {
    validateType(theType);
    theType.signed = theType.fp ? false : theType.signed;
    super(theType.bits, theType.signed);
    this.offset = this.parser.bytes;
    this.parser.bytes = this.parser.bits === 64 ? 4 : this.parser.bytes;
    this.setReaderAndWriter_(theType);
  }

  /**
   * Read 1 16-bit float from bytes.
   * @see https://stackoverflow.com/a/8796597
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read16F_(bytes, i=0) {
    return unpack(bytes, i, 5, 11);
  }

  /**
   * Read 1 32-bit float from bytes using a TypedArray.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read32F_(bytes, i=0) {
    return unpack(bytes, i, 8, 23);
  }

  /**
   * Read 1 64-bit float from bytes using a TypedArray.
   * Thanks https://gist.github.com/kg/2192799
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read64F_(bytes, i=0) {
    return unpack(bytes, i, 11, 52);
  }

  /**
   * Write one 16-bit float as a binary value.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number} num The number to write as bytes.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write16F_(bytes, num, j=0) {
    return pack(bytes, j, num, 5, 11);
  }

  /**
   * Write one 32-bit float as a binary value using a TypedArray.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number} num The number to write as bytes.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write32F_(bytes, num, j=0) {
      return pack(bytes, j, num, 8, 23);
  }

  /**
   * Write one 64-bit float as a binary value using a TypedArray.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number} num The number to write as bytes.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write64F_(bytes, num, j=0) {
      return pack(bytes, j, num, 11, 52);
  }

  /**
   * Set the functions to pack and unpack numbers.
   * @param {!Object} theType The type definition.
   * @private
   */
  setReaderAndWriter_(theType) {
    if (theType.fp) {
      if (theType.bits == 16) {
        this.unpack = this.read16F_;
        this.pack = this.write16F_;
      } else if(theType.bits == 32) {
        this.unpack = this.read32F_;
        this.pack = this.write32F_;
      } else {
        this.unpack = this.read64F_;
        this.pack = this.write64F_;
      }
    } else {
      this.unpack = super.unpack;
      this.pack = super.pack;
    }
  }
}
