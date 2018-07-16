# byte-data
Pack and unpack binary data.  
Copyright (c) 2017-2018 Rafael da Silva Rocha.  
https://github.com/rochars/byte-data

[![NPM version](https://img.shields.io/npm/v/byte-data.svg?style=for-the-badge)](https://www.npmjs.com/package/byte-data) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/byte-data/api/) [![Tests](https://img.shields.io/badge/tests-online-blue.svg?style=for-the-badge)](https://rawgit.com/rochars/byte-data/master/test/browser.html)  
[![Codecov](https://img.shields.io/codecov/c/github/rochars/byte-data.svg?style=flat-square)](https://codecov.io/gh/rochars/byte-data) [![Unix Build](https://img.shields.io/travis/rochars/byte-data.svg?style=flat-square)](https://travis-ci.org/rochars/byte-data) [![Windows Build](https://img.shields.io/appveyor/ci/rochars/byte-data.svg?style=flat-square&logo=appveyor)](https://ci.appveyor.com/project/rochars/byte-data) [![Scrutinizer](https://img.shields.io/scrutinizer/g/rochars/byte-data.svg?style=flat-square&logo=scrutinizer)](https://scrutinizer-ci.com/g/rochars/byte-data/)

**byte-data** is a JavaScript module for the serialization and deserialization of numbers and strings.

- **No dependencies**
- **MIT licensed**
- **Use it out of the box in the browser**
- **Use it out of the box in Node**
- **Use it out of the box with [TypeScript](https://www.typescriptlang.org/)**
- **Use it in little-endian and big-endian hosts**
- **Write to buffers**, option to define **start and end index to write**
- **Read from buffers**, option to define **start and end index to read**
- Use **typed arrays** or **arrays**
- **less than 6KB minified, less than 3KB minified + compressed**
- Made with **[Closure Compiler](https://github.com/google/closure-compiler)** in mind (works great with others, too)

## Pack/unpack:
- Integers, unsigned and signed (two's complement)
- 16-bit IEEE half-precision floating point numbers
- 32-bit IEEE single-precision floating point numbers
- 64-bit IEEE double-precision floating point numbers
- Little-endian and big-endian words
- UTF-8 strings

## Install
```
npm install byte-data
```

You can also download one of the files in the *./dist* folder:  
https://github.com/rochars/byte-data/tree/master/dist

## Use

### Node
If you installed via [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com), **import byteData from byte-data**:
```javascript
import * as byteData from 'byte-data';

// Pack a usigned 8-bit unsigned integer
let packed = byteData.pack(128, {bits: 8});
```

Or **import** just what you need:
```javascript
import {pack} from 'byte-data';
let packed = pack(128, {bits: 8});
```

Or **require**:
```javascript
const byteData = require('byte-data');

// Pack a 32-bit floating point number
let packed = byteData.pack(2.1474836, {bits: 32, float: true});
```

### Browser
Use the compiled file in the */dist* folder of this package:
```html
<script src="./dist/byte-data.min.js"></script>
<script>
  // Pack a 32-bit floating point number
  var packed = byteData.pack(2.1474836, {bits: 32, float: true});
</script>
```

Or get it from the [jsDelivr](https://cdn.jsdelivr.net/npm/byte-data) CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/byte-data"></script>
```

Or get it from [unpkg](https://unpkg.com/byte-data):
```html
<script src="https://unpkg.com/byte-data"></script>
```

Or load it as a module using [jspm](https://jspm.io):
```html
<script type="module">
  import {pack} from 'https://dev.jspm.io/byte-data';
  // Pack a 15-bit signed integer
  pack(-1200, {bits: 16, signed: true});
</script>
```

## About

### Unpacking numbers and input buffer length
- When unpacking a single value, a error is throw if the number of bytes is not sufficient (Ex: unpack a 32-bit number, but provide a input buffer with length smaller than 4)
- When unpacking a array of values, **extra bytes in the end of the buffer are ignored** and **insufficient bytes will return a empty array**

### *null*, *false*, *true*, *undefined*
- Packing *undefined* values throw *'Undefined value.'* error
- *null* and *false* are packed as 0
- *true* is packed as 1

### Floating-point numbers
Floating-point numbers are [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) standard.

### Signed integers
Signed integers are [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement).

### Strings
Only UTF-8 strings are supported. **BOM** is kept untouched.

### Overflow and underflow
Overflow or underflow on integers will throw *"Overflow."* and *"Underflow."* errors, respectively.

### Browser compatibility
**byte-data** need IE10+ to run. All moderns browsers should work fine. Cross-browser tests are on the [ROADMAP](https://github.com/rochars/byte-data/blob/master/docs/ROADMAP.md).

### Tests on big-endian systems
Use [QEMU](https://www.qemu.org/) with this PowerPC/Debian image:  
https://people.debian.org/~aurel32/qemu/powerpc/

## API
```javascript
// Strings
/**
 * Read a string of UTF-8 characters from a byte buffer.
 * @see https://encoding.spec.whatwg.org/#the-encoding
 * @see https://stackoverflow.com/a/34926911
 * @param {!Uint8Array|!Array<!number>} buffer A byte buffer.
 * @param {number=} index The index to read.
 * @param {?number=} len The number of bytes to read.
 * @return {string}
 * @throws {Error} If read a value that is not UTF-8.
 */
export function unpackString(buffer, index=0, len=null) {}

/**
 * Write a string of UTF-8 characters as a byte buffer.
 * @see https://encoding.spec.whatwg.org/#utf-8-encoder
 * @param {string} str The string to pack.
 * @return {!Array<number>} The next index to write on the buffer.
 * @throws {Error} If a character in the string is not UTF-8.
 */
export function packString(str) {}

/**
 * Write a string of UTF-8 characters to a byte buffer.
 * @param {string} str The string to pack.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number=} index The index to write in the buffer.
 * @return {number} The next index to write in the buffer.
 * @throws {Error} If a character in the string is not valid ASCII.
 */
export function packStringTo(str, buffer, index=0) {}

// Numbers
/**
 * Pack a number as a byte buffer.
 * @param {number} value The number.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>} The packed value.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
export function pack(value, theType) {}

/**
 * Pack an array of numbers as a byte buffer.
 * @param {!Array<number>|!TypedArray} values The values.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>} The packed values.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If any of the values are not valid.
 */
export function packArray(values, theType) {}

/**
 * Pack a number to a byte buffer.
 * @param {number} value The value.
 * @param {!Object} theType The type definition.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number=} index The index to write.
 * @return {number} The next index to write.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
export function packTo(value, theType, buffer, index=0) {}

/**
 * Pack a array of numbers to a byte buffer.
 * @param {!Array<number>|!TypedArray} values The value.
 * @param {!Object} theType The type definition.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number=} index The buffer index to write.
 * @return {number} The next index to write.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
export function packArrayTo(values, theType, buffer, index=0) {}

/**
 * Unpack a number from a byte buffer.
 * @param {!Uint8Array|!Array<!number>} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {number=} index The buffer index to read.
 * @return {number}
 * @throws {Error} If the type definition is not valid
 */
export function unpack(buffer, theType, index=0) {}

/**
 * Unpack an array of numbers from a byte buffer.
 * @param {!Uint8Array|!Array<!number>} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {number=} index The start index. Assumes 0.
 * @param {?number=} end The end index. Assumes the buffer length.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid
 */
export function unpackArray(buffer, theType, index=0, end=buffer.length) {}

/**
 * Unpack a array of numbers to a typed array.
 * @param {!Uint8Array|!Array<!number>} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {!TypedArray|!Array<!number>} output The output array.
 * @param {number=} index The start index. Assumes 0.
 * @param {?number=} end The end index. Assumes the buffer length.
 * @throws {Error} If the type definition is not valid
 */
export function unpackArrayTo(buffer, theType, output, index=0, end=buffer.length) {}
```

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
This library is a ES module also distributed as a CommonJS module, UMD module and a compiled script for browsers. It works out of the box in Node when installed with ```npm install byte-data```. It includes a [TypeScript](https://www.typescriptlang.org/) definition file: **./main.d.ts**.

If you use the [Closure Compiler](https://github.com/google/closure-compiler), this package includes a externs file: **./externs/byte-data.js**.

### If you are using this lib in a browser:

You may load both **./dist/byte-data.umd.js** and **./dist/byte-data.min.js** in the browser with ```<script>``` tags. Ideally you should use **byte-data.min.js**. You can load it via the https://unpkg.com and https://www.jsdelivr.com/ CDNs:

[unpkg](https://unpkg.com/byte-data):
```html
<script src="https://unpkg.com/byte-data"></script>
```

[jsDelivr](https://cdn.jsdelivr.net/npm/byte-data):
```html
<script src="https://cdn.jsdelivr.net/npm/byte-data"></script>
```

### If you are using this lib as a dependency:

- The **CommonJS** dist is **./dist/byte-data.cjs.js**. It is the dist file used by Node. It is served in the "main" field of package.json and is the source you are running when you **npm install byte-data**. It is not compiled or minified.

- The **UMD** module is **./dist/byte-data.umd.js**. It is transpiled to ES5 and compatible with Node, AMD and browsers. It is served in the "browser" field of package.json.

- The **browser-only** dist is **./dist/byte-data.min.js**. It is transpiled to ES5 and compiled. It is used in the "unpkg" and "jsdelivr" fields of package.json.

- The **ES6 bundle** is **./dist/byte-data.js**, served as "es2015" in package.json. It is not compiled/minified.

- **./main.js** is served as "module" in package.json. This should be the entry point for bundlers.

If your module bundler is using "browser" as the entry point **your dist should work the same** but will be a larger file.

## Contributing
**byte-data** welcomes all contributions from anyone willing to work in good faith with other contributors and the community. No contribution is too small and all contributions are valued.

See [CONTRIBUTING.md](https://github.com/rochars/byte-data/blob/master/docs/CONTRIBUTING.md) for details.

### Style guide
**byte-data** code should follow the Google JavaScript Style Guide:  
https://google.github.io/styleguide/jsguide.html

### Code of conduct
This project is bound by a code of conduct: The [Contributor Covenant, version 1.4](https://github.com/rochars/byte-data/blob/master/docs/CODE_OF_CONDUCT.md), also available at https://www.contributor-covenant.org/version/1/4/code-of-conduct.html

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
