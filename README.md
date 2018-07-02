# byte-data
Pack and unpack binary data.  
Copyright (c) 2017-2018 Rafael da Silva Rocha.  
https://github.com/rochars/byte-data

[![NPM version](https://img.shields.io/npm/v/byte-data.svg?style=for-the-badge)](https://www.npmjs.com/package/byte-data) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/byte-data/index.html)  
[![Codecov](https://img.shields.io/codecov/c/github/rochars/byte-data.svg?style=flat-square)](https://codecov.io/gh/rochars/byte-data) [![Unix Build](https://img.shields.io/travis/rochars/byte-data.svg?style=flat-square)](https://travis-ci.org/rochars/byte-data) [![Windows Build](https://img.shields.io/appveyor/ci/rochars/byte-data.svg?style=flat-square&logo=appveyor)](https://ci.appveyor.com/project/rochars/byte-data) [![Scrutinizer](https://img.shields.io/scrutinizer/g/rochars/byte-data.svg?style=flat-square&logo=scrutinizer)](https://scrutinizer-ci.com/g/rochars/byte-data/)

- Runs in the server and in the browser
- Less than 2KB minified + compressed, less than 5KB minified
- Pack and unpack **single values** and entire **buffers**

## Pack/unpack:
- Integers, signed and unsigned
- 16-bit half-precision floating point numbers
- 32-bit single-precision floating point numbers
- 64-bit double-precision floating point numbers
- Little-endian and big-endian words
- Strings

## Install
```
npm install byte-data
```

## Use

### ES6
```javascript
import {pack} from 'byte-data.js';

// Pack a usigned 8-bit number
let packed = pack(128, {bits: 8});
```

### Node
```javascript
const byteData = require('byte-data');

// Pack a float32 number
byteData.pack(2.1474836, {bits: 32, float: true});
//[95, 112, 9, 64]
```

### Browser
Use the compiled file in the */dist* folder:
```html
<script src="byte-data.min.js"></script>
<script>
  // Pack a float32 number
  byteData.pack(2.1474836, {bits: 32, float: true});
  //[95, 112, 9, 64]
</script>
```

Or get it from the [jsDelivr](https://www.jsdelivr.com) CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/byte-data@13"></script>
```

Or get it from [unpkg](https://www.unpkg.com):
```html
<script src="https://unpkg.com/byte-data@13"></script>
```

Or as a ES6 module in modern browsers from [jspm](https://jspm.io):
```html
<script type="module">
  import {pack} from 'https://dev.jspm.io/byte-data';
  pack(-1200, {bits: 16, signed: true});
</script>
```

## Example
```javascript
const byteData = require('byte-data');

// Pack a float32 number
byteData.pack(2.1474836, {bits: 32, float: true});
//[95, 112, 9, 64]

// Pack an array of uInt16 numbers
byteData.packArray([65535, 0], {bits: 16});
// [255, 255, 0, 0]);

// Pack an array of int32 numbers
byteData.packArray([-2147483648, 2147483647], {bits: 32, signed: true});
//[0, 0, 0, 128, 255, 255, 255, 127]

// Unpack an array of uInt16 numbers
byteData.unpackArray([255, 255, 0, 0], {bits: 16});
// [65535, 0]
```

## API

### Strings
```javascript
/**
 * Read a string from a byte buffer.
 * @param {!Uint8Array} bytes A byte buffer.
 * @param {number=} index The index to read.
 * @param {?number=} len The number of bytes to read.
 * @return {string}
 */
function unpackString(bytes, index=0, len=null) {}

/**
 * Write a string as a byte buffer.
 * @param {string} str The string to pack.
 * @return {!Array<number>} The next index to write on the buffer.
 */
function packString(str) {}

/**
 * Write a string to a byte buffer.
 * @param {string} str The string to pack.
 * @param {!Uint8Array} bytes A byte buffer.
 * @param {number=} index The index to write in the buffer.
 * @return {number} The next index to write in the buffer.
 */
function packStringTo(str, bytes, index=0) {}
```

### Numbers
```javascript
/**
 * Pack a number as a byte buffer.
 * @param {number} value The number.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>} The packed value.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
function pack(value, theType) {}

/**
 * Pack an array of numbers as a byte buffer.
 * @param {!Array<number>} values The values.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>} The packed values.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If any of the values are not valid.
 */
function packArray(values, theType) {}

/**
 * Pack a number to a byte buffer.
 * @param {number} value The value.
 * @param {!Object} theType The type definition.
 * @param {!Uint8Array} buffer The output buffer.
 * @param {number=} index The index to write.
 * @return {number} The next index to write.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
function packTo(value, theType, buffer, index=0) {}

/**
 * Pack a array of numbers to a byte buffer.
 * @param {!Array<number>} values The value.
 * @param {!Object} theType The type definition.
 * @param {!Uint8Array} buffer The output buffer.
 * @param {number=} index The buffer index to write.
 * @return {number} The next index to write.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
function packArrayTo(values, theType, buffer, index=0) {}

/**
 * Unpack a number from a byte buffer.
 * @param {!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @return {number}
 * @throws {Error} If the type definition is not valid
 */
function unpack(buffer, theType) {}

/**
 * Unpack an array of numbers from a byte buffer.
 * @param {!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid.
 */
function unpackArray(buffer, theType) {}

/**
 * Unpack a number from a byte buffer by index.
 * @param {!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {number=} index The buffer index to read.
 * @return {number}
 * @throws {Error} If the type definition is not valid
 */
function unpackFrom(buffer, theType, index=0) {}

/**
 * Unpack a array of numbers from a byte buffer by index.
 * @param {!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {number=} start The start index. Assumes 0.
 * @param {?number=} end The end index. Assumes the buffer length.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid
 */
function unpackArrayFrom(buffer, theType, start=0, end=null) {}

/**
 * Unpack a array of numbers to a typed array.
 * @param {!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {!TypedArray} output The output array.
 * @throws {Error} If the type definition is not valid
 */
function unpackArrayTo(buffer, theType, output) {}
```

## Floating-point numbers
Floating-point numbers are [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) standard.

## Signed integers
Signed integers are two's complement.

## Types
Types are user-defined objects like this:
```javascript
const float32 = {
  bits: 32, // required
  signed: true, // optional, defaults to false
  float: true, // optional, defaults to false
  be: false // optional, defaults to false, true for big-endian
}
```

There is a standard set of types that can be installed:
```
npm install binary-data-types
```
All types in **binary-data-types** are supported by byte-data. They are:

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

## Distribution
This library is a ES6 module also distributed as a CommonJS module, UMD module and a compiled script for browsers. It works out of the box in Node when installed with ```npm install byte-data```.

### If you are using this lib in a browser:

You may load both **byte-data.umd.js** and **byte-data.min.js** in the browser with ```<script>``` tags. Ideally you should use **byte-data.min.js**. You can load it via the https://unpkg.com and https://www.jsdelivr.com/ CDNs:

[unpkg](https://www.unpkg.com):
```html
<script src="https://unpkg.com/byte-data"></script>
```

[jsDelivr](https://www.jsdelivr.com):
```html
<script src="https://cdn.jsdelivr.net/npm/byte-data"></script>
```

### If you are using this lib as a dependency:

- The **CommonJS** is the dist file used by Node. It is served in the "main" field of package.json. It includes all the sources but no dependencies. Dependencies will be imported from the **node_modules** folder. This is the source you are running when you **npm install byte-data**.

- The **UMD** module is compatible with Node, AMD and browsers. It is served in the "browser" field of package.json. It includes all dependencies. This file is not compiled/minified as it may be used by module bundlers. Compilation/minification should be up to the bundler consuming this file.

- The **compiled dist** is browser-only and should be the one served by CDNs. It includes all the dependencies. It is used in the "unpkg" and "jsdelivr" fields of package.json.

- The **ES6 dist** is **byte-data.js**, served as "es2015" in package.json. It includes all the dependencies. It is not compiled/minified.

- **./main.js** is served as "module" in package.json. It should be used by systems that support ES modules and are aware of Node's module path resolution (a module bundler, for instance). This should be the entry point for bundlers in most cases - this will avoid code duplication in the case of shared dependencies (as opposed to using "browser" as the entry point).

If your module bundler is using "browser" as the entry point **your dist should work the same** but will be a larger file.


## Contributing
**byte-data** welcomes all contributions from anyone willing to work in good faith with other contributors and the community. No contribution is too small and all contributions are valued.

See [CONTRIBUTING.md](https://github.com/rochars/byte-data/blob/master/CONTRIBUTING.md) for details.

### Style guide
**byte-data** code should follow the Google JavaScript Style Guide:  
https://google.github.io/styleguide/jsguide.html

### Code of conduct
This project adopt the [Contributor Covenant, version 1.4](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html), available at https://www.contributor-covenant.org/version/1/4/code-of-conduct.html as its code of conduct.

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting rocha.rafaelsilva@gmail.com.

## Legal
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frochars%2Fbyte-data.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Frochars%2Fbyte-data?ref=badge_large)

### LICENSE
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
