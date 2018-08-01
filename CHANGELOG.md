# CHANGELOG

## v15.0.0 (2018-07-31)
- Fix: throws error when packing NaN as integer
- Fix: unpack binary16 Infinity, -Infinity and NaN
- Fix: pack binary16 Infinity, -Infinity and NaN
- Compatible with IE6+ and all modern browsers that support ES3/ES5/ES6+

### unpackString(buffer, index=0, end=null)
- unpackString() now returns a Uint8Array.
- the parameters **index** and **end** determine a slice of the buffer to read. So to read the first 4 bytes of a buffer, you would use:
```javascript
let str = unpackString(buffer, 0, 3);
// read from buffer[0], buffer[1], buffer[2], buffer[3]
```

## v14.1.0 (2018-07-19)
- Add countString(string) the API; returns the number of bytes needed to serialize a UTF-8 string.

## v14.0.5 (2018-07-19)
- **Fix: replace invalid UTF-8 characters with U+FFFD instead of throwing errors**
- Fix: packStringTo docstring (remove @throws {Error}).

## v14.0.4 (2018-07-19) [DEPRECATED]
- Validation when reading UTF-8.

## v14.0.3 (2018-07-18) [DEPRECATED]
- Fix: JSDoc unpack() return signature (remove 'undefined').

## v14.0.2 (2018-07-17) [DEPRECATED]
- Fix: unpackArrayTo and unpackArray

## v14.0.1 (2018-07-16) [DEPRECATED]
- Fix errors with strings in ES5 dists (transpile String.codePointAt())
- Throw Error if packing anything other than Number, Boolean or null with pack, packTo, packArray and packArrayTo
- Throw Error for bad buffer length on unpack (not unpackArray or unpackArrayTo; see README for details)

## v14.0.0 (2018-07-15) [DEPRECATED]
- UTF-8 string support on packString, unpackString and packStringTo
- Remove unpackFrom and unpackArrayFrom from the API; unpack and unpackArray now accept the same optional params as unpackFrom and unpackArrayFrom received.

## v13.2.6 (2018-07-13)
- Fix es2015 field in package.json
- Fix documentation issues.

## v13.2.5 (2018-07-09)
- Faster 64-bit fp number read/write.

## v13.2.4 (2018-07-09)
- Handle big-endian data more efficiently.

## v13.2.3 (2018-07-08)
- UMD dist transpiled to ES5.

## v13.2.2 (2018-07-08) [DEPRECATED]
- Fix: Support big-endian hosts.

## v13.2.1 (2018-07-06) [DEPRECATED]
- Fix: lib name in UMD dist.

## v13.2.0 (2018-07-05) [DEPRECATED]
- Allow Array and Uint8Array as output buffer.
- Fix: cases of unpacking extra elements on unpackArrayTo and unpackArrayFrom.

## v13.1.3 (2018-07-05) [DEPRECATED]
- Fix types in TypeScript declaration file.
- Fix JSDoc: Typed Arrays as input for packArray and packArrayTo

## v13.1.2 (2018-07-05) [DEPRECATED]
- Add validation of strings as ASCII.
- Fix documentation issues.

## v13.1.1 (2018-07-04) [DEPRECATED]
- Zero dependencies.

## v13.1.0 (2018-07-02) [DEPRECATED]
- Add unpackArrayTo(buffer, type, output) to output to typed arrays.

## v13.0.1 (2018-06-27) [DEPRECATED]
- Using dot notation to allow better compilation on hosts.

## v13.0.0 (2018-06-26) [DEPRECATED]
- No more standard types; types must be defined by the user.

## v12.0.1 (2018-06-26) [DEPRECATED]
- Add TypeScript declaration file.

## v12.0.0 (2018-06-26) [DEPRECATED]
- Functions from the old API can handle only numbers
- new string functions: packString, packStringTo, unpackString
- null values are packed as zero

## v11.1.0 (2018-06-25) [DEPRECATED]
- Allow better use of this lib as a dependency:
	- package.json refactored with bundlers and ES6 envs in mind
	- Fix inconsistent JSDoc declarations

## v11.0.2 (2018-06-24) [DEPRECATED]
- Fix ES6 dist to not rely on Node module path resolution.

## v11.0.1 (2018-06-23) [DEPRECATED]
- Fix: type declarations
- Fix: remove unused exports

## v11.0.0 (2018-06-22) [DEPRECATED]
- ES6 module
- New API with packTo, packToArray, unpackFrom, unpackArrayFrom

## v10.0.0 (2018-06-15) [DEPRECATED]
- New dist file: ./dist/byte-data.min.js.
- Remove 'browser' from package.json

## v9.0.2 (2018-06-12) [DEPRECATED]
- fix: validation of null, undefined and string length.

## v9.0.1 (2018-06-12) [DEPRECATED]
- fix: dist included in npm package.

## v9.0.0 (2018-06-12) [DEPRECATED]
- dist included in npm package.
- bytes only in base 10 for input and output
- types in byteData.types
- throw errors on overflow and underflow
- throw errors when packing null and undefined values
- throw errors for strings with bad length

## v8.0.3 (2018-06-11) [DEPRECATED]
- fix: webpack.config so no dependency dist is used in the bundle.

## v8.0.1 (2018-05-13) [DEPRECATED]
	- better packaging.

## v8.0.0 (2018-05-05) [DEPRECATED]
	- packStruct() and unpackStruct() are deprecated.
	- Validate type when packing/unpacking, throws Error if type not valid.
	- Fix: unpackArray of types "char" with more than 8 bits return an array of strings, not a single string with all values.
	- Fix: packArray with types "char" and items of length different than the type offset.

## v7.0.1 (2018-05-04) [DEPRECATED]
	- Fix: check for undefined values on pack().
	- Fix: check for null values on unpack().

## v7.0.0 (2018-05-03) [DEPRECATED]
	- Type class is deprecated. Types should be defined as Object<string, *>.

## v6.0.0 (2018-05-03) [DEPRECATED]
	- findString() is deprecated.