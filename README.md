# byte-data
Pack and unpack binary data.  
Copyright (c) 2017-2018 Rafael da Silva Rocha.  
https://github.com/rochars/byte-data

[![NPM version](https://img.shields.io/npm/v/byte-data.svg?style=for-the-badge)](https://www.npmjs.com/package/byte-data) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/byte-data/index.html) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frochars%2Fbyte-data.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Frochars%2Fbyte-data?ref=badge_shield)
 
[![Codecov](https://img.shields.io/codecov/c/github/rochars/byte-data.svg?style=flat-square)](https://codecov.io/gh/rochars/byte-data) [![Unix Build](https://img.shields.io/travis/rochars/byte-data.svg?style=flat-square)](https://travis-ci.org/rochars/byte-data) [![Windows Build](https://img.shields.io/appveyor/ci/rochars/byte-data.svg?style=flat-square&logo=appveyor)](https://ci.appveyor.com/project/rochars/byte-data) [![Scrutinizer](https://img.shields.io/scrutinizer/g/rochars/byte-data.svg?style=flat-square&logo=scrutinizer)](https://scrutinizer-ci.com/g/rochars/byte-data/)

- Runs in Node.js and in the browser
- Less than 3KB minified + compressed, less than 6KB minified
- Tested against Python's struct module (for all common types)
- Pack and unpack **single values** and entire **buffers**

## Pack/unpack:
- Booleans
- All integers from 2-Bit to 48-Bit, signed and unsigned
- 16-bit half-precision floating point numbers
- 32-bit single-precision floating point numbers
- 64-bit double-precision floating point numbers
- Little-endian and big-endian words
- Strings

## Install
```
npm install byte-data
```

## Browser
Use the compiled file in the */dist* folder:
```html
<script src="byte-data.min.js"></script>
```

Or get it from the [jsDelivr](https://www.jsdelivr.com) CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/byte-data@10/dist/byte-data.min.js"></script>
```

## Example
```javascript
let byteData = require('byte-data');

// Pack a float32 number
byteData.pack(2.1474836, byteData.types.float32);
//[95, 112, 9, 64]

// Pack an array of uInt16 numbers
byteData.packArray([65535, 0], byteData.types.uInt16);
// [255, 255, 0, 0]);

// Pack an array of int32 numbers
byteData.packArray([-2147483648, 2147483647], byteData.types.int32);
//[0, 0, 0, 128, 255, 255, 255, 127]

// Unpack an array of uInt16 numbers
byteData.unpackArray([255, 255, 0, 0], byteData.types.uInt16);
// [65535, 0]
```

## API
```javascript
/**
 * Pack a number or a string as a byte buffer.
 * @param {number|string} value The value.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
function pack(value, theType) {}

/**
 * Unpack a number or a string from a byte buffer.
 * @param {!Array<number>|!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @return {number|string}
 * @throws {Error} If the type definition is not valid.
 */
function unpack(buffer, theType) {}

/**
 * Pack an array of numbers or strings to a byte buffer.
 * @param {!Array<number|string>} values The values.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If any of the values are not valid.
 */
function packArray(values, theType) {}

/**
 * Unpack an array of numbers or strings from a byte buffer.
 * @param {!Array<number>|!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @return {!Array<number|string>}
 * @throws {Error} If the type definition is not valid.
 */
function unpackArray(buffer, theType) {}
```

## Types
**byte-data** default types are defined in **byteData.types**.

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
Floating-point numbers are [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) standard.

## Signed integers
Signed integers are two's complement.

## Contributing
**byte-data** welcomes all contributions from anyone willing to work in good faith with other contributors and the community. No contribution is too small and all contributions are valued.

See [CONTRIBUTING.md](https://github.com/rochars/byte-data/blob/master/CONTRIBUTING.md) for details.

### Style guide
**byte-data** code should follow the Google JavaScript Style Guide:  
https://google.github.io/styleguide/jsguide.html

### Code of conduct
This project adopt the [Contributor Covenant, version 1.4](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html), available at https://www.contributor-covenant.org/version/1/4/code-of-conduct.html as its code of conduct.

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting rocha.rafaelsilva@gmail.com.

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


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frochars%2Fbyte-data.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Frochars%2Fbyte-data?ref=badge_large)