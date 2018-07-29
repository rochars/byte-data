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
import {unpack, pack} from 'ieee754-buffer';

/**
 * A class to pack and unpack integers and floating-point numbers.
 * @extends {Integer}
 */
export default class Packer extends Integer {
  
  constructor() {
    super();
    /**
     * If TypedArrays are available or not
     * @type {boolean}
     */
    this.TYPED = (typeof Uint8Array === 'function');
    /**
     * Use a Typed Array to check if the host is BE or LE. This will impact
     * on how 64-bit floating point numbers are handled.
     * @type {boolean}
     */
    let BE_ENV = false;
    if (this.TYPED) {
      BE_ENV = new Uint8Array(new Uint32Array([1]).buffer)[0] === 0;
    }
    /**
     * @type {number}
     * @private
     */
    this.HIGH_ = BE_ENV ? 1 : 0;
    /**
     * @type {number}
     * @private
     */
    this.LOW_ = BE_ENV ? 0 : 1;
    /**
     * @type {!Uint8Array|null}
     */
    let uInt8 = this.TYPED ? new Uint8Array(8) : null;
    /**
     * @type {!Uint32Array|null}
     * @private
     */
    this.ui32_ = this.TYPED ? new Uint32Array(uInt8.buffer) : null;
    /**
     * @type {!Float32Array|null}
     * @private
     */
    this.f32_ = this.TYPED ? new Float32Array(uInt8.buffer) : null;
    /**
     * @type {!Float64Array|null}
     * @private
     */
    this.f64_ = this.TYPED ? new Float64Array(uInt8.buffer) : null;
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
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read16F_(bytes, i=0) {
    return unpack(bytes, i, 5, 11);
  }

  /**
   * Read 1 32-bit float from bytes.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read32F_(bytes, i=0) {
    return unpack(bytes, i, 8, 23);
  }

  /**
 * Read 1 32-bit float from bytes using a TypedArray.
 * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
 * @param {number=} i The index to read.
 * @return {number}
 * @private
 */
  read32FTyped_(bytes, i=0) {
    this.ui32_[0] = super.read(bytes, i);
    return this.f32_[0];
  }

  /**
   * Read 1 64-bit float from bytes.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read64F_(bytes, i=0) {
    return unpack(bytes, i, 11, 52);
  }

  /**
   * Read 1 64-bit float from bytes using a TypedArray.
   * Thanks https://gist.github.com/kg/2192799
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read64FTyped_(bytes, i=0) {
    this.ui32_[this.HIGH_] = super.read(bytes, i);
    this.ui32_[this.LOW_] = super.read(bytes, i + 4);
    return this.f64_[0];
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
   * Write one 32-bit float as a binary value using a TypedArray.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number} num The number to write as bytes.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write32FTyped_(bytes, num, j=0) {
    if (num !== num) {
      return this.write32F_(bytes, num, j);
    }
    this.f32_[0] = num;
    return super.write(bytes, this.ui32_[0], j);
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
   * Write one 64-bit float as a binary value using a TypedArray.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number} num The number to write as bytes.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write64FTyped_(bytes, num, j=0) {
    if (num !== num) {
      return this.write64F_(bytes, num, j);
    }
    this.f64_[0] = num;
    j = super.write(bytes, this.ui32_[this.HIGH_], j);
    return super.write(bytes, this.ui32_[this.LOW_], j);
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
        this.read = this.TYPED ? this.read32FTyped_ : this.read32F_;
        this.write = this.TYPED ? this.write32FTyped_ : this.write32F_;
      } else {
        this.read = this.TYPED ? this.read64FTyped_ : this.read64F_;
        this.write = this.TYPED ? this.write64FTyped_ : this.write64F_;
      }
    } else {
      this.read = super.read;
      this.write = super.write;
    }
  }
}
