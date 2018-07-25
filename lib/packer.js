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
import {unpack as unpackIEEE754, pack as packIEEE754} from './IEEE754.js';

/**
 * A class to pack and unpack integers and floating-point numbers.
 * @extends {Integer}
 */
export default class Packer extends Integer {
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
    return unpackIEEE754(bytes, i, 5, 11);
  }

  /**
   * Read 1 32-bit float from bytes.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read32F_(bytes, i=0) {
    return unpackIEEE754(bytes, i, 8, 23);
  }

  /**
   * Read 1 64-bit float from bytes.
   * Thanks https://gist.github.com/kg/2192799
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read64F_(bytes, i=0) {
    return unpackIEEE754(bytes, i, 11, 52);
  }

  /**
   * Write one 16-bit float as a binary value.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number} number The number to write as bytes.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write16F_(bytes, number, j=0) {
    return packIEEE754(bytes, j, number, 5, 11);
  }

  /**
   * Write one 32-bit float as a binary value.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number} number The number to write as bytes.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write32F_(bytes, number, j=0) {
    return packIEEE754(bytes, j, number, 8, 23);
  }

  /**
   * Write one 64-bit float as a binary value.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number} number The number to write as bytes.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write64F_(bytes, number, j=0) {
    return packIEEE754(bytes, j, number, 11, 52);
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
