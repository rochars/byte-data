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
 * @fileoverview A function to swap endianness in byte buffers.
 * @see https://github.com/rochars/endianness
 */

/** @module endianness */

/**
 * Swap the byte ordering in a buffer. The buffer is modified in place.
 * @param {!Array|!Uint8Array} bytes The bytes.
 * @param {number} offset The byte offset.
 * @param {number=} start The start index. Assumes 0.
 * @param {number=} end The end index. Assumes the buffer length.
 * @throws {Error} If the buffer length is not valid.
 */
function endianness(bytes, offset, start=0, end=bytes.length) {
  if (end % offset) {
    throw new Error("Bad buffer length.");
  }
  for (let index = start; index < end; index += offset) {
    swap(bytes, offset, index);
  }
}

/**
 * Swap the byte order of a value in a buffer. The buffer is modified in place.
 * @param {!Array|!Uint8Array} bytes The bytes.
 * @param {number} offset The byte offset.
 * @param {number} index The start index.
 * @private
 */
function swap(bytes, offset, index) {
  offset--;
  for(let x = 0; x < offset; x++) {
    /** @type {*} */
    let theByte = bytes[index + x];
    bytes[index + x] = bytes[index + offset];
    bytes[index + offset] = theByte;
    offset--;
  }
}

/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
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
 * @fileoverview The utf8-buffer-size API.
 * @see https://github.com/rochars/utf8-buffer-size
 */

/** @module utf8BufferSize */

/**
 * Returns how many bytes are needed to serialize a UTF-8 string.
 * @see https://encoding.spec.whatwg.org/#utf-8-encoder
 * @param {string} str The string to pack.
 * @return {number} The number of bytes needed to serialize the string.
 */
function utf8BufferSize(str) {
  /** @type {number} */
  let bytes = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    /** @type {number} */
    let codePoint = str.codePointAt(i);
    if (codePoint < 128) {
      bytes++;
    } else {
      if (codePoint <= 2047) {
        bytes++;
      } else if(codePoint <= 65535) {
        bytes+=2;
      } else if(codePoint <= 1114111) {
        i++;
        bytes+=3;
      }
      bytes++;
    }
  }
  return bytes;
}

/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
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
 * @fileoverview Functions to serialize and deserialize UTF-8 strings.
 * @see https://github.com/rochars/utf8-buffer
 * @see https://encoding.spec.whatwg.org/#the-encoding
 * @see https://encoding.spec.whatwg.org/#utf-8-encoder
 */

/** @module utf8-buffer */

/**
 * Read a string of UTF-8 characters from a byte buffer.
 * Invalid characters are replaced with 'REPLACEMENT CHARACTER' (U+FFFD).
 * @see https://encoding.spec.whatwg.org/#the-encoding
 * @see https://stackoverflow.com/a/34926911
 * @param {!Uint8Array|!Array<number>} buffer A byte buffer.
 * @param {number=} start The buffer index to start reading.
 * @param {?number=} end The buffer index to stop reading.
 *    If end is null will read until the end of the buffer.
 * @return {string}
 */
function unpack(buffer, start=0, end=null) {
  end = end !== null ? end + 1 : buffer.length;
  /** @type {string} */
  let str = "";
  for(let index = start; index < end;) {
    /** @type {number} */
    let lowerBoundary = 0x80;
    /** @type {number} */
    let upperBoundary = 0xBF;
    /** @type {boolean} */
    let replace = false;
    /** @type {number} */
    let charCode = buffer[index++];
    if (charCode >= 0x00 && charCode <= 0x7F) {
      str += String.fromCharCode(charCode);
    } else {
      /** @type {number} */
      let count = 0;
      if (charCode >= 0xC2 && charCode <= 0xDF) {
        count = 1;
      } else if (charCode >= 0xE0 && charCode <= 0xEF ) {
        count = 2;
        if (buffer[index] === 0xE0) {
          lowerBoundary = 0xA0;
        }
        if (buffer[index] === 0xED) {
          upperBoundary = 0x9F;
        }
      } else if (charCode >= 0xF0 && charCode <= 0xF4 ) {
        count = 3;
        if (buffer[index] === 0xF0) {
          lowerBoundary = 0x90;
        }
        if (buffer[index] === 0xF4) {
          upperBoundary = 0x8F;
        }
      } else {
        replace = true;
      }
      charCode = charCode & (1 << (8 - count - 1)) - 1;
      for (let i = 0; i < count; i++) {
        if (buffer[index] < lowerBoundary || buffer[index] > upperBoundary) {
          replace = true;
        }
        charCode = (charCode << 6) | (buffer[index] & 0x3f);
        index++;
      }
      if (replace) {
        str += String.fromCharCode(0xFFFD);
      } 
      else if (charCode <= 0xffff) {
        str += String.fromCharCode(charCode);
      } else {
        charCode -= 0x10000;
        str += String.fromCharCode(
          ((charCode >> 10) & 0x3ff) + 0xd800,
          (charCode & 0x3ff) + 0xdc00);
      }
    }
  }
  return str;
}

/**
 * Write a string of UTF-8 characters to a byte buffer.
 * @see https://encoding.spec.whatwg.org/#utf-8-encoder
 * @param {string} str The string to pack.
 * @param {!Uint8Array|!Array<number>} buffer The buffer to pack the string to.
 * @param {number=} index The buffer index to start writing.
 * @return {number} The next index to write in the buffer.
 */
function pack(str, buffer, index=0) {
  for (let i = 0, len = str.length; i < len; i++) {
    /** @type {number} */
    let codePoint = str.codePointAt(i);
    if (codePoint < 128) {
      buffer[index] = codePoint;
      index++;
    } else {
      /** @type {number} */
      let count = 0;
      /** @type {number} */
      let offset = 0;
      if (codePoint <= 0x07FF) {
        count = 1;
        offset = 0xC0;
      } else if(codePoint <= 0xFFFF) {
        count = 2;
        offset = 0xE0;
      } else if(codePoint <= 0x10FFFF) {
        count = 3;
        offset = 0xF0;
        i++;
      }
      buffer[index] = (codePoint >> (6 * count)) + offset;
      index++;
      while (count > 0) {
        buffer[index] = 0x80 | (codePoint >> (6 * (count - 1)) & 0x3F);
        index++;
        count--;
      }
    }
  }
  return index;
}

/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
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
 * @fileoverview Pack and unpack unsigned ints.
 * @see https://github.com/rochars/uint-buffer
 */

/**
 * @module UintBuffer
 * @ignore
 */

/**
 * A class to write and read unsigned ints to and from byte buffers.
 */
class UintBuffer {
  
  /**
   * @param {number} bits The number of bits used by the integer.
   */
  constructor(bits) {
    /**
     * The number of bits used by one number.
     * @type {number}
     */
    this.bits = bits;
    /**
     * The number of bytes used by one number.
     * @type {number}
     */
    this.bytes = bits < 8 ? 1 : Math.ceil(bits / 8);
    /**
     * @type {number}
     * @protected
     */
    this.max = Math.pow(2, bits) - 1;
    /**
     * @type {number}
     * @protected
     */
    this.min = 0;
    /** @type {number} */
    let r = 8 - ((((bits - 1) | 7) + 1) - bits);
    /**
     * @type {number}
     * @private
     */
    this.lastByteMask_ = Math.pow(2, r > 0 ? r : 8) - 1;
  }

  /**
   * Write one unsigned integer to a byte buffer.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number} num The number.
   * @param {number=} index The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @throws {Error} If num is NaN.
   * @throws {Error} On overflow.
   */
  pack(buffer, num, index=0) {
    if (num !== num) {
      throw new Error('NaN');
    }
    this.overflow(num);
    buffer[index] = (num < 0 ? num + Math.pow(2, this.bits) : num) & 255;
    index++;
    /** @type {number} */
    let len = this.bytes;
    for (let i = 2; i < len; i++) {
      buffer[index] = Math.floor(num / Math.pow(2, ((i - 1) * 8))) & 255;
      index++;
    }
    if (this.bits > 8) {
      buffer[index] = Math.floor(
          num / Math.pow(2, ((this.bytes - 1) * 8))) & this.lastByteMask_;
      index++;
    }
    return index;
  }
  
  /**
   * Read one unsigned integer from a byte buffer.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number=} index The index to read.
   * @return {number} The number.
   * @throws {Error} On overflow.
   */
  unpack(buffer, index=0) {
    /** @type {number} */
    let num = this.unpackUnsafe(buffer, index);
    this.overflow(num);
    return num; 
  }

  /**
   * Read one unsigned integer from a byte buffer.
   * Does not check for overflows.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number} index The index to read.
   * @return {number}
   * @protected
   */
  unpackUnsafe(buffer, index) {
    /** @type {number} */
    let num = 0;
    for(let x = 0; x < this.bytes; x++) {
      num += buffer[index + x] * Math.pow(256, x);
    }
    return num;
  }

  /**
   * Throws error in case of overflow.
   * @param {number} num The number.
   * @throws {Error} on overflow.
   * @protected
   */
  overflow(num) {
    if (num > this.max || num < this.min) {
      throw new Error('Overflow');
    }
  }
}

/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
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
 * A class to write and read two's complement signed integers
 * to and from byte buffers.
 * @extends UintBuffer
 */
class TwosComplementBuffer extends UintBuffer {
  
  /**
   * @param {number} bits The number of bits used by the integer.
   */
  constructor(bits) {
    super(bits);
    /**
     * @type {number}
     * @protected
     */
    this.max = Math.pow(2, this.bits) / 2 - 1;
    /**
     * @type {number}
     * @protected
     */
    this.min = -this.max - 1;
  }

  /**
   * Write one two's complement signed integer to a byte buffer.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number} num The number.
   * @param {number=} index The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @throws {Error} If num is NaN.
   * @throws {Error} On overflow.
   */
  pack(buffer, num, index=0) {
    return super.pack(buffer, num, index);
  }

  /**
   * Read one two's complement signed integer from a byte buffer.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number=} index The index to read.
   * @return {number}
   * @throws {Error} On overflow.
   */
  unpack(buffer, index=0) {
    /** @type {number} */
    let num = super.unpackUnsafe(buffer, index);
    num = this.sign_(num);
    this.overflow(num);
    return num; 
  }

  /**
   * Sign a number.
   * @param {number} num The number.
   * @return {number}
   * @private
   */
  sign_(num) {
    if (num > this.max) {
      num -= (this.max * 2) + 2;
    }
    return num;
  }
}

/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
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
 * A class to write and read two's complement ints and unsigned ints
 * to and from byte buffers.
 */
class IntBuffer {
  
  /**
   * @param {number} bits The number of bits used by the integer.
   */
  constructor(theType) {
    /** @type {TwosComplementBuffer|UintBuffer} */
    this.parser = null;
    if (theType.signed) {
      this.parser = new TwosComplementBuffer(theType.bits);
    } else {
      this.parser = new UintBuffer(theType.bits);
    }
  }

  /**
   * Write one unsigned integer to a byte buffer.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number} num The number.
   * @param {number=} index The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @throws {Error} If num is NaN.
   * @throws {Error} On overflow.
   */
  pack(buffer, num, index=0) {
    return this.parser.pack(buffer, num, index);
  }

  /**
   * Read one unsigned integer from a byte buffer.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number=} index The index to read.
   * @return {number} The number.
   * @throws {Error} On overflow.
   */
  unpack(buffer, index=0) {
    return this.parser.unpack(buffer, index);
  }
}

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
 * @fileoverview Functions to validate input.
 * @see https://github.com/rochars/byte-data
 */

function validateValueType(value) {
  if (value !== null) {
    //if ([Number, Boolean].indexOf(value.constructor) == -1) {
      if (value.constructor != Number && value.constructor != Boolean) {
      throw new Error(
        'Expected Number, Boolean or Null; found ' + value.constructor);
    }
  }
}

/**
 * Validate that the value is not null or undefined.
 * @param {number} value The value.
 * @throws {Error} If the value is of type undefined.
 */
function validateNotUndefined(value) {
  if (value === undefined) {
    throw new Error('Undefined value.');
  }
}

/**
 * Validate the type definition.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 */
function validateType(theType) {
  if (!theType) {
    throw new Error('Undefined type.');
  }
  if (theType.float) {
    validateFloatType_(theType);
  } else {
    validateIntType_(theType);
  }
}

/**
 * Validate the type definition of floating point numbers.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function validateFloatType_(theType) {
  //if ([16,32,64].indexOf(theType.bits) == -1) {
  if (theType.bits != 16 && theType.bits != 32 && theType.bits != 64) {
    throw new Error('Bad float type.');
  }
}

/**
 * Validate the type definition of integers.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function validateIntType_(theType) {
  if (theType.bits < 1 || theType.bits > 53) {
    throw new Error('Bad type definition.');
  }
}

/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * Copyright (c) 2013 DeNA Co., Ltd.
 * Copyright (c) 2010, Linden Research, Inc
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
 * @fileoverview Functions to pack and unpack IEEE 754 floating point numbers.
 * @see https://github.com/rochars/ieee754-buffer
 */

/** @module ieee754Buffer */

/**
 * Pack a IEEE 754 floating point number.
 * Derived from typedarray.js by Linden Research, MIT License.
 * @see https://bitbucket.org/lindenlab/llsd/raw/7d2646cd3f9b4c806e73aebc4b32bd81e4047fdc/js/typedarray.js
 * @param {!Uint8Array|!Array<number>} buffer The buffer.
 * @param {number} index The index to write on the buffer.
 * @param {number} num The number.
 * @param {number} ebits The number of bits of the exponent.
 * @param {number} fbits The number of bits of the fraction.
 * @return {number} The next index to write on the buffer.
 */
function pack$1(buffer, index, num, ebits, fbits) {
  /** @type {number} */
  let bias = (1 << (ebits - 1)) - 1;
  // Round overflows
  if (Math.abs(num) > Math.pow(2, bias + 1) - ((ebits + fbits) * 2)) {
    num = num < 0 ? -Infinity : Infinity;
  }
  /**
   * sign, need this to handle negative zero
   * @see http://cwestblog.com/2014/02/25/javascript-testing-for-negative-zero/
   * @type {number}
   */
  let sign = (((num = +num) || 1 / num) < 0) ? 1 : num < 0 ? 1 : 0;
  num = Math.abs(num);
  /** @type {number} */
  let exp = Math.min(Math.floor(Math.log(num) / Math.LN2), 1023);
  /** @type {number} */
  let fraction = roundToEven(num / Math.pow(2, exp) * Math.pow(2, fbits));
  // NaN
  if (num !== num) {
    fraction = Math.pow(2, fbits - 1);
    exp = (1 << ebits) - 1;
  // Number
  } else if (num !== 0) {
    if (num >= Math.pow(2, 1 - bias)) {
      if (fraction / Math.pow(2, fbits) >= 2) {
        exp = exp + 1;
        fraction = 1;
      }
      // Overflow
      if (exp > bias) {
        exp = (1 << ebits) - 1;
        fraction = 0;
      } else {
        exp = exp + bias;
        fraction = roundToEven(fraction) - Math.pow(2, fbits);
      }
    } else {
      fraction = roundToEven(num / Math.pow(2, 1 - bias - fbits));
      exp = 0;
    } 
  }
  return packFloatBits_(buffer, index, ebits, fbits, sign, exp, fraction);
}

/**
 * Unpack a IEEE 754 floating point number.
 * Derived from IEEE754 by DeNA Co., Ltd., MIT License. 
 * Adapted to handle NaN. Should port the solution to the original repo.
 * @see https://github.com/kazuho/ieee754.js/blob/master/ieee754.js
 * @param {!Uint8Array|!Array<number>} buffer The buffer.
 * @param {number} index The index to read from the buffer.
 * @param {number} ebits The number of bits of the exponent.
 * @param {number} fbits The number of bits of the fraction.
 * @return {number} The floating point number.
 */
function unpack$1(buffer, index, ebits, fbits) {
  let exponentBias = (1 << (ebits - 1)) - 1;
  let numBytes = Math.ceil((ebits + fbits) / 8);
  /** @type {number} */
  let eMax = (1 << ebits) - 1;
  /** @type {number} */
  let bias = Math.pow(2, -(8 * numBytes - 1 - ebits));
  /** @type {number} */
  let significand;
  /** @type {string} */
  let leftBits = "";
  for (let i = numBytes - 1; i >= 0 ; i--) {
    /** @type {string} */
    let t = buffer[i + index].toString(2);
    leftBits += "00000000".substring(t.length) + t;
  }
  /** @type {number} */
  let sign = leftBits.charAt(0) == "1" ? -1 : 1;
  leftBits = leftBits.substring(1);
  /** @type {number} */
  let exponent = parseInt(leftBits.substring(0, ebits), 2);
  leftBits = leftBits.substring(ebits);
  if (exponent == eMax) {
    if (parseInt(leftBits, 2) !== 0) {
      return NaN;
    }
    return sign * Infinity;  
  } else if (exponent === 0) {
    exponent += 1;
    significand = parseInt(leftBits, 2);
  } else {
    significand = parseInt("1" + leftBits, 2);
  }
  return sign * significand * bias * Math.pow(2, exponent - exponentBias);
}

/**
 * Pack a IEEE754 from its sign, exponent and fraction bits
 * and place it in a byte buffer.
 * @param {!Uint8Array|!Array<number>} buffer The byte buffer to write to.
 * @param {number} index The buffer index to write.
 * @param {number} ebits The number of bits of the exponent.
 * @param {number} fbits The number of bits of the fraction.
 * @param {number} sign The sign.
 * @param {number} exp the exponent.
 * @param {number} fraction The fraction.
 * @return {number}
 * @private
 */
function packFloatBits_(buffer, index, ebits, fbits, sign, exp, fraction) {
  /** @type {!Array<number>} */
  let bits = [];
  // the sign
  bits.push(sign);
  // the exponent
  for (let i = ebits; i > 0; i -= 1) {
    bits[i] = (exp % 2 ? 1 : 0);
    exp = Math.floor(exp / 2);
  }
  // the fraction
  let len = bits.length;
  for (let i = fbits; i > 0; i -= 1) {
    bits[len + i] = (fraction % 2 ? 1 : 0);
    fraction = Math.floor(fraction / 2);
  }
  // pack as bytes
  /** @type {string} */
  let str = bits.join('');
  /** @type {number} */
  let numBytes = Math.floor((ebits + fbits + 1) / 8) + index - 1;
  /** @type {number} */
  let k = index;
  while (numBytes >= index) {
    buffer[numBytes] = parseInt(str.substring(0, 8), 2);
    str = str.substring(8);
    numBytes--;
    k++;
  }
  return k;
}

function roundToEven(n) {
  var w = Math.floor(n), f = n - w;
  if (f < 0.5) {
    return w;
  }
  if (f > 0.5) {
    return w + 1;
  }
  return w % 2 ? w + 1 : w;
}

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
 * A class to pack and unpack integers and floating-point numbers.
 * Signed integers are two's complement.
 * Floating point are IEEE 754 standard.
 * @extends {IntBuffer}
 */
class NumberBuffer extends IntBuffer {
  
  constructor(theType) {
    validateType(theType);
    theType.signed = theType.float ? false : theType.signed;
    super(theType);
    this.offset = this.parser.bytes;
    this.parser.bytes = this.parser.bits === 64 ? 4 : this.parser.bytes;
    /**
     * If TypedArrays are available or not
     * @type {boolean}
     */
    this.TYPED = (typeof Uint8Array === 'function');
    /**
     * Use a Typed Array to check if the host is BE or LE. This will impact
     * on how 64-bit floating point numbers are handled.
     * @type {number}
     * @private
     */
    this.HIGH_ = this.beEnv_() ? 1 : 0;
    /**
     * @type {number}
     * @private
     */
    this.LOW_ = this.HIGH_ ? 0 : 1;
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
    this.setReaderAndWriter_(theType);
  }

  /**
   * Return true if typed arrays are available and env is BE.
   * @return {boolean}
   * @private
   */
  beEnv_() {
    return this.TYPED ? new Uint8Array(
      new Uint32Array([1]).buffer)[0] === 0 : false;
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
    return unpack$1(bytes, i, 5, 11);
  }

  /**
   * Read 1 32-bit float from bytes.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read32F_(bytes, i=0) {
    return unpack$1(bytes, i, 8, 23);
  }

  /**
   * Read 1 32-bit float from bytes using a TypedArray.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  read32FTyped_(bytes, i=0) {
    this.ui32_[0] = super.unpack(bytes, i);
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
    return unpack$1(bytes, i, 11, 52);
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
    this.ui32_[this.HIGH_] = super.unpack(bytes, i);
    this.ui32_[this.LOW_] = super.unpack(bytes, i + 4);
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
    return pack$1(bytes, j, num, 5, 11);
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
    return pack$1(bytes, j, num, 8, 23);
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
    return super.pack(bytes, this.ui32_[0], j);
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
    return pack$1(bytes, j, num, 11, 52);
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
    j = super.pack(bytes, this.ui32_[this.HIGH_], j);
    return super.pack(bytes, this.ui32_[this.LOW_], j);
  }

  /**
   * Set the functions to pack and unpack numbers.
   * @param {!Object} theType The type definition.
   * @private
   */
  setReaderAndWriter_(theType) {
    if (theType.float) {
      if (theType.bits == 16) {
        this.unpack = this.read16F_;
        this.pack = this.write16F_;
      } else if(theType.bits == 32) {
        this.unpack = this.TYPED ? this.read32FTyped_ : this.read32F_;
        this.pack = this.TYPED ? this.write32FTyped_ : this.write32F_;
      } else {
        this.unpack = this.TYPED ? this.read64FTyped_ : this.read64F_;
        this.pack = this.TYPED ? this.write64FTyped_ : this.write64F_;
      }
    } else {
      this.unpack = super.unpack;
      this.pack = super.pack;
    }
  }
}

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
 * Read a string of UTF-8 characters from a byte buffer.
 * @param {!Uint8Array|!Array<number>} buffer A byte buffer.
 * @param {number=} index The buffer index to start reading.
 * @param {?number=} end The buffer index to stop reading.
 *    If end is null will read until the end of the buffer.
 * @return {string}
 */
function unpackString(buffer, index=0, end=null) {
  return unpack(buffer, index, end);
}

/**
 * Write a string of UTF-8 characters as a byte buffer.
 * @param {string} str The string to pack.
 * @return {!Uint8Array|Array<number>} The buffer with the packed string written.
 */
function packString(str) {
  /** type {Uint8Array|Array<number>} */
  let buffer;
  if (typeof Uint8Array === 'function') {
    buffer =  new Uint8Array(utf8BufferSize(str));
  } else {
    buffer = [];
  }
  pack(str, buffer, 0);
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
function packStringTo(str, buffer, index=0) {
  return pack(str, buffer, index);
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
function pack$2(value, theType) {
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
function packTo(value, theType, buffer, index=0) {
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
function packArray(values, theType) {
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
function packArrayTo(values, theType, buffer, index=0) {
  /** @type {NumberBuffer} */
  let packer = new NumberBuffer(theType);
  let valuesLen = values.length;
  for (let i = 0; i < valuesLen; i++) {
    validateNotUndefined(values[i]);
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
function unpack$2(buffer, theType, index=0) {
  /** @type {NumberBuffer} */
  let packer = new NumberBuffer(theType);
  if ((packer.offset + index) > buffer.length) {
    throw Error('Bad buffer length.');
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
function unpackArray(buffer, theType, index=0, end=buffer.length) {
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
function unpackArrayTo(
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

export { unpackString, packString, packStringTo, pack$2 as pack, packTo, packArray, packArrayTo, unpack$2 as unpack, unpackArray, unpackArrayTo };
