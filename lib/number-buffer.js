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

import {validateFloatType, validateIntType} from './validation.js';
import {unpack, pack} from 'ieee754-buffer';
import TwosComplementBuffer from 'twos-complement-buffer';
import UintBuffer from 'uint-buffer';

/**
 * A class to pack and unpack integers and floating-point numbers.
 * Signed integers are two's complement.
 * Floating-point numbers are IEEE 754 standard.
 */
export default class NumberBuffer {
  
  constructor(bits, fp, signed) {
    if (fp) {
      validateFloatType(bits);
    } else {
      validateIntType(bits);
    }
    /** @type {TwosComplementBuffer|UintBuffer} */
    this.IntBuffer = signed ?
      new TwosComplementBuffer(bits) : new UintBuffer(bits);
    this.IntBuffer.bytes = this.IntBuffer.bytes === 8 ?
      4 : this.IntBuffer.bytes;
    if (fp) {
      this.setFPReaderAndWriter_(bits);
    }
  }

  /**
   * Read one number from a byte buffer.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number=} index The index to read.
   * @return {number} The number.
   * @throws {Error} On overflow.
   */
  unpack(buffer, index=0) {
    return this.IntBuffer.unpack(buffer, index);
  }

  /**
   * Write one number to a byte buffer.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number} num The number.
   * @param {number=} index The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @throws {Error} If num is NaN.
   * @throws {Error} On overflow.
   */
  pack(buffer, num, index=0) {
    return this.IntBuffer.pack(buffer, num, index);
  }

  /**
   * Read one 16-bit float from a byte buffer.
   * @see https://stackoverflow.com/a/8796597
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} index The index to read.
   * @return {number}
   * @private
   */
  read16F_(bytes, index=0) {
    return unpack(bytes, index, 5, 11);
  }

  /**
   * Read one 32-bit float from a byte buffer.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} index The index to read.
   * @return {number}
   * @private
   */
  read32F_(bytes, index=0) {
    return unpack(bytes, index, 8, 23);
  }

  /**
   * Read one 64-bit float from a byte buffer
   * Thanks https://gist.github.com/kg/2192799
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} index The index to read.
   * @return {number}
   * @private
   */
  read64F_(bytes, index=0) {
    return unpack(bytes, index, 11, 52);
  }

  /**
   * Write one 16-bit float to a byte buffer.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number} num The number to write as bytes.
   * @param {number=} index The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write16F_(bytes, num, index=0) {
    return pack(bytes, index, num, 5, 11);
  }

  /**
   * Write one 32-bit float to a byte buffer.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number} num The number to write as bytes.
   * @param {number=} index The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write32F_(bytes, num, index=0) {
    return pack(bytes, index, num, 8, 23);
  }

  /**
   * Write one 64-bit float to a byte buffer.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number} num The number to write as bytes.
   * @param {number=} index The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write64F_(bytes, num, index=0) {
    return pack(bytes, index, num, 11, 52);
  }

  /**
   * Set the methods to pack and unpack floating-point numbers.
   * @param {number} bits The number of bits.
   * @private
   */
  setFPReaderAndWriter_(bits) {
    if (bits === 16) {
      this.unpack = this.read16F_;
      this.pack = this.write16F_;
    } else if(bits === 32) {
      this.unpack = this.read32F_;
      this.pack = this.write32F_;
    } else {
      this.unpack = this.read64F_;
      this.pack = this.write64F_;
    }
  }
}
