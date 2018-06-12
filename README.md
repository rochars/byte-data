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
- All integers from 2-Bit to 48-Bit, signed and unsigned
- 16-bit half-precision floating point numbers
- 32-bit single-precision floating point numbers
- 64-bit double-precision floating point numbers
- little-endian and big-endian words
- strings of fixed and variable length

## Install
```
npm install byte-data
```

## Browser
Use the compiled file in the */dist* folder:
```html
<script src="byte-data-min.js"></script>
```

Or get it from the [jsDelivr](https://www.jsdelivr.com) CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/byte-data@9"></script>
```

## Example
```javascript
let byteData = require('byte-data');

// Pack a float32 number
byteData.pack(2.1474836, byteData.types.float32),
//[95, 112, 9, 64]

// Pack an array of uInt16 numbers
byteData.packArray([65535, 0], byteData.types.uInt16)
// [255, 255, 0, 0]);

// Pack an array of int32 numbers
byteData.packArray([-2147483648, 2147483647], byteData.types.int32),
//[0, 0, 0, 128, 255, 255, 255, 127]

// Unpack an array of uInt16 numbers
byteData.unpackArray([255, 255, 0, 0], byteData.types.uInt16),
// [65535, 0]
```

## API
```javascript
/**
 * Write a number or fixed-length string to a byte buffer.
 * @param {number|string} value The value.
 * @param {!Object} theType The type definition.
 * @return {!Array<number|string>}
 * @throws {Error} If the type definition is not valid.
 */
function pack(value, type) {}

/**
 * Read a number or a fixed-length string from a byte buffer.
 * @param {!Array<number|string>|!Uint8Array} buffer An array of bytes.
 * @param {!Object} theType The type definition.
 * @return {number|string|null}
 * @throws {Error} If the type definition is not valid.
 */
function unpack(buffer, type) {}

/**
 * Write an array of numbers or a string to a byte buffer.
 * @param {!Array<number|string>} values The values.
 * @param {!Object} theType The type definition.
 * @return {!Array<number|string>}
 * @throws {Error} If the type definition is not valid.
 */
function packArray(values, type) {}

/**
 * Read an array of numbers or a string from a byte buffer.
 * @param {!Array<number|string>|!Uint8Array} buffer The byte array.
 * @param {!Object} theType The type definition.
 * @return {!Array<number|string>|number}
 * @throws {Error} If the type definition is not valid.
 */
function unpackArray(buffer, type) {}
```

## Types
**byte-data** default types are defined in **byte-data.types**.

Example:
```javascript
byteData.pack(value, byteData.types.float16);
```

### The default types:
  - chr
  - fourCC
  - bool
  - int2
  - uInt2
  - int4
  - uInt4
  - int8
  - uInt8

#### little-endian
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

#### big-endian:
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

## Floating-point numbers
Floating-point numbers are based on the [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) standard.

## Signed integers
Signed integers are two's-complement.

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
