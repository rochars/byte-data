# byte-data
Pack and unpack binary data.  
Copyright (c) 2017-2018 Rafael da Silva Rocha.  
https://github.com/rochars/byte-data

[![NPM version](https://img.shields.io/npm/v/byte-data.svg?style=for-the-badge)](https://www.npmjs.com/package/byte-data) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/byte-data/index.html)  
[![Codecov](https://img.shields.io/codecov/c/github/rochars/byte-data.svg?style=flat-square)](https://codecov.io/gh/rochars/byte-data) [![Unix Build](https://img.shields.io/travis/rochars/byte-data.svg?style=flat-square)](https://travis-ci.org/rochars/byte-data) [![Windows Build](https://img.shields.io/appveyor/ci/rochars/byte-data.svg?style=flat-square&logo=appveyor)](https://ci.appveyor.com/project/rochars/byte-data) [![Scrutinizer](https://img.shields.io/scrutinizer/g/rochars/byte-data.svg?style=flat-square&logo=scrutinizer)](https://scrutinizer-ci.com/g/rochars/byte-data/)

- Runs in Node.js and in the browser
- Less than 3KB minified + compressed, less than 7KB minified
- Tested against Python's struct module (for all common types)
- Pack and unpack **single values** and **arrays**

## Pack/unpack:
- Booleans
- **4, 8, 16, 24, 32, 40 and 48-Bit** numbers
- All integers from 2-Bit to 53-Bit, signed and unsigned
- 16-bit half-precision floating point numbers
- 32-bit single-precision floating point numbers
- 64-bit double-precision floating point numbers
- little-endian and big-endian
- strings of fixed and variable length

## Install
```
npm install byte-data
```

## Example
```javascript
let byteData = require('byte-data');

// Pack a float32 number, output bytes to hex
byteData.pack(2.1474836, byteData.float32, 16),
//["5f","70","09","40"]

// Pack an array of uInt16 numbers, output to base 10 (default)
byteData.packArray([65535, 0], byteData.uInt16)
// [255, 255, 0, 0]);

// Pack an array of int32 numbers, output to base 10 (default)
byteData.packArray([-2147483648, 2147483647], byteData.int32),
//[0, 0, 0, 128, 255, 255, 255, 127]

// Unpack an array of uInt16 numbers from bytes represented as hex values
byteData.unpackArray(["ff", "ff", "00", "00"], byteData.uInt16, 16),
// [65535, 0]
```

## Interface
```javascript
/**
 * Write a number or fixed-length string to a byte buffer.
 * @param {!number|!string} value The value.
 * @param {!Object} type One of the available types.
 * @param {!number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number|string>}
 */
function pack(value, type, base=10) {}

/**
 * Read a number or a fixed-length string from a byte buffer.
 * @param {!Array<number|string>|!Uint8Array} buffer An array of bytes.
 * @param {!Object} type One of the available types.
 * @param {!number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {number|string}
 */
function unpack(buffer, type, base=10) {}

/**
 * Write an array of numbers or a string to a byte buffer.
 * @param {!Array<number>|string} values The values.
 * @param {!Object} type One of the available types.
 * @param {!number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number|string>}
 */
function packArray(values, type, base=10) {}

/**
 * Read an array of numbers or a string from a byte buffer.
 * @param {!Array<number|string>|!Uint8Array} buffer The byte array.
 * @param {!Object} type One of the available types.
 * @param {!number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number>|string|number}
 */
function unpackArray(buffer, type, base=10) {}
```

## Standard types
  - chr
  - fourCC
  - bool
  - int2
  - uInt2
  - int4
  - uInt4
  - int8
  - uInt8

### little-endian
  - int16
  - uInt16
  - float16
  - int24
  - uInt24
  - int32
  - uInt32
  - float32
  - int40
  - uInt40
  - int48
  - uInt48
  - float64

### big-endian:
  - int16BE
  - uInt16BE
  - float16BE
  - int24BE
  - uInt24BE
  - int32BE
  - uInt32BE
  - float32BE
  - int40BE
  - uInt40BE
  - int48BE
  - uInt48BE
  - float64BE

```javascript
byteData.pack(value, byteData.float16);
```

## Overflow
Integer values will be truncated according to the bit depth of the type.
```javascript
// Values in the correct range
byteData.pack(254, uInt8); // [254]
byteData.pack(255, uInt8); // [255]

// Overflow
byteData.pack(300, uInt8); // [255]

// Underflow
byteData.pack(-1, uInt8); // [0]
```

## Floating-point numbers
Floating-point numbers are based on the [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) standard.

## Creating new integer types
```javascript
// Unsigned 11-bit integer
let uInt11 = {"bits": 11};

// Signed 45-bit integer
let int45 = {"bits": 45, "signed": true};
```

You can create new types of integers (signed/unsigned) and strings, not floats.

## LICENSE
Copyright (c) 2017-2018 Rafael da Silva Rocha.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
