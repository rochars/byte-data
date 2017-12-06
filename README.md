# byte-data
Readable data to and from byte buffers.  
Copyright (c) 2017 Rafael da Silva Rocha.  
https://github.com/rochars/byte-data

[![NPM version](https://img.shields.io/npm/v/byte-data.svg?style=for-the-badge)](https://www.npmjs.com/package/byte-data) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/byte-data/index.html) [![JSPerf](https://img.shields.io/badge/jsperf-run-blue.svg?style=for-the-badge)](https://jsperf.com/byte-data-dist)

- Work in Node and in the browser
- 9KB minified, 4KB minified + compressed
- tested against Python's struct module
- support structs with mutiple types
- pack and unpack single values, arrays and structs
- [![codecov](https://codecov.io/gh/rochars/byte-data/branch/master/graph/badge.svg)](https://codecov.io/gh/rochars/byte-data)

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

## Interface
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
 * Turn a struct into a byte buffer.
 * A struct is an array of values of not necessarily the same type.
 * @param {Array} struct The struct values.
 * @param {!Array<Object>} def The struct type definition.
 * @param {number} base The base of the output. Optional. Default is 10.
 * @return {!Array<number>|!Array<string>}
 */
function packStruct(struct, def, base=10) {}

/**
 * Turn a byte buffer into a structure.
 * A struct is an array of values of not necessarily the same type.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer The byte buffer.
 * @param {!Array<Object>} def The struct type definition.
 * @param {number} base The base of the input. Optional. Default is 10.
 * @return {Array}
 */
function unpackStruct(buffer, def, base=10) {}

/**
 * Find and return the start index of some string.
 * Return -1 if the string is not found.
 * @param {!Array<number>|Uint8Array} buffer Array of bytes.
 * @param {string} text Some string to look for.
 * @return {number} The start index of the first occurrence, -1 if not found
 */
function findString(buffer, text) {}
```

## Available types
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

## Structs
You must define a **struct** to use **packStruct()** and **unpackStruct()**.
A struct is a array os values of not necessarily the same type.

### Packing a struct
```javascript
// Define a struct:
let structDef = [
    byteData.fourCC,
    byteData.uInt32,
    byteData.uInt16
];

// The struct data:
let struct = [
    "abcd",
    4294967295,
    65535
]

// Pack the struct:
console.log(byteData.packStruct(struct, structDef));
// [97,98,99,100,255,255,255,255,255,255]
```

### Unpacking a struct
```javascript
// Define a struct:
let structDef = [
    byteData.fourCC,
    byteData.uInt32,
    byteData.uInt16
];

// The byte buffer:
let buffer = [97,98,99,100,255,255,255,255,255,255];

// Unpack the struct:
console.log(byteData.unpackStruct(buffer, structDef));
// ["abcd", 4294967295, 65535]
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
