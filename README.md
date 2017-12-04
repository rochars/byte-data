# byte-data
Readable data to and from byte buffers.  
Copyright (c) 2017 Rafael da Silva Rocha.  
https://github.com/rochars/byte-data

[![NPM version](https://img.shields.io/npm/v/byte-data.svg?style=for-the-badge)](https://www.npmjs.com/package/byte-data) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/byte-data/index.html)  
[![Build Status](https://travis-ci.org/rochars/byte-data.svg?branch=master)](https://travis-ci.org/rochars/byte-data) [![Build status](https://ci.appveyor.com/api/projects/status/g2ellp44s7a0kvid?svg=true)](https://ci.appveyor.com/project/rochars/byte-data) [![codecov](https://codecov.io/gh/rochars/byte-data/branch/master/graph/badge.svg)](https://codecov.io/gh/rochars/byte-data) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/rochars/byte-data/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/rochars/byte-data/?branch=master) [![Code Climate](https://img.shields.io/codeclimate/maintainability/rochars/byte-data.svg)](https://codeclimate.com/github/rochars/byte-data/) [![Code Climate](https://img.shields.io/codeclimate/issues/github/rochars/byte-data.svg)](https://codeclimate.com/github/rochars/byte-data/)

Works in Node.js and in the browser.

## Support:
- char
- booleans
- 2-bit integers (signed/unsigned)
- 4-bit integers (signed/unsigned)
- 8-bit integers (signed/unsigned)
- 16-bit integers (signed/unsigned)
- 16-bit half-precision floating point numbers
- 24-bit integers (signed/unsigned)
- 32-bit integers (signed/unsigned)
- 32-bit single-precision floating point numbers
- 40-bit integers (signed/unsigned)
- 48-bit integers (signed/unsigned)
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

// unpack an array of uInt16 numbers from bytes represented as hex values
byteData.unpackArray(["ff", "ff", "00", "00"], byteData.uInt16, 16),
// [65535, 0]
```

## Use
```javascript
/**
 * Turn a number or string into a byte buffer.
 * @param {number|string} value The value.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the output. Optional. Default is 10.
 * @return {!Array<number>|!Array<string>}
 */
function pack(value, type, base=10) {}

/**
 * Turn a byte buffer into a readable value.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer An array of bytes.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 * @return {number|string}
 */
function unpack(buffer, type, base=10) {}

/**
 * Turn a array of numbers into a byte buffer.
 * @param {!Array<number>|string} values The values.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the output. Optional. Default is 10.
 * @return {!Array<number>|!Array<string>}
 */
function packArray(values, type, base=10) {}

/**
 * Turn a byte array into a sequence of readable values.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer The byte array.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 * @return {!Array<number>|string}
 */
function unpackArray(buffer, type, base=10) {}

/**
 * Find and return the start index of some string.
 * Return -1 if the string is not found.
 * @param {!Array<number>|Uint8Array} bytes Array of bytes.
 * @param {string} text Some string to look for.
 * @return {number} The start index of the first occurrence, -1 if not found
 */
function findString(bytes, text) {}
```

## Available types
```javascript
/**
 * The available types:
 *  - chr
 *  - fourCC
 *  - bool
 *  - int2
 *  - uInt2
 *  - int4
 *  - uInt4
 *  - int8
 *  - uInt8
 *  - int16
 *  - uInt16
 *  - float16
 *  - int24
 *  - uInt24
 *  - int32
 *  - uInt32
 *  - float32
 *  - int40
 *  - uInt40
 *  - int48
 *  - uInt48
 *  - float64
 *
 * big-endian:
 *  - int16BE
 *  - uInt16BE
 *  - float16BE
 *  - int24BE
 *  - uInt24BE
 *  - int32BE
 *  - uInt32BE
 *  - float32BE
 *  - int40BE
 *  - uInt40BE
 *  - int48BE
 *  - uInt48BE
 *  - float64BE
 */

// Example:
byteData.pack(value, byteData.float16);
```

**byte-data types** are objects like this:
```javascript
{
    "bits": 16, // 1, 2, 4, 8, 16, 24, 32, 40, 48, 64
    "signed": true, // signed or unsigned
    "float": false, // float or int (64-bit is always float)
    "be": false // big-endian or little-endian
    "char": false // if the type represent a string
}
```

## Overflow
Integer values will be truncated according to the bit depth of the type.
There is no overflow or underflow check for floating-point values.
```javascript
// Values in the correct range
byteData.pack(254, uInt8); // [254]
byteData.pack(255, uInt8); // [255]

// Overflow
byteData.pack(300, uInt8); // [255]

// Underflow
byteData.pack(-1, uInt8); // [0]
```

## LICENSE
Copyright (c) 2017 Rafael da Silva Rocha.

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
