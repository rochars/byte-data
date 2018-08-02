# CHANGELOG

## v13.2.7 (2018-08-02)
- Fix binary16 encoding and decoding.

## v13.2.6 (2018-07-13)
- Fix es2015 field in package.json
- Fix documentation issues.

## v13.2.5 (2018-07-09)
- Faster 64-bit fp number read/write.

## v13.2.4 (2018-07-09)
- Handle big-endian data more efficiently.

## v13.2.3 (2018-07-08)
- UMD dist transpiled to ES5.

## v13.2.2 (2018-07-08)
- Fix: Support big-endian hosts.

## v13.2.1 (2018-07-06)
- Fix: lib name in UMD dist.

## v13.2.0 (2018-07-05)
- Allow Array and Uint8Array as output buffer.
- Fix: cases of unpacking extra elements on unpackArrayTo and unpackArrayFrom.

## v13.1.3 (2018-07-05)
- Fix types in TypeScript declaration file.
- Fix JSDoc: Typed Arrays as input for packArray and packArrayTo

## v13.1.2 (2018-07-05)
- Add validation of strings as ASCII.
- Fix documentation issues.

## v13.1.1 (2018-07-04)
- Zero dependencies.

## v13.1.0 (2018-07-02)
- Add unpackArrayTo(buffer, type, output) to output to typed arrays.

## v13.0.1 (2018-06-27)
- Using dot notation to allow better compilation on hosts.

## v13.0.0 (2018-06-26)
- No more standard types; types must be defined by the user.

## v12.0.1 (2018-06-26)
- Add TypeScript declaration file.

## v12.0.0 (2018-06-26)
- Functions from the old API can handle only numbers
- new string functions: packString, packStringTo, unpackString
- null values are packed as zero

## v11.1.0 (2018-06-25)
- Allow better use of this lib as a dependency:
	- package.json refactored with bundlers and ES6 envs in mind
	- Fix inconsistent JSDoc declarations

## v11.0.2 (2018-06-24)
- Fix ES6 dist to not rely on Node module path resolution.

## v11.0.1 (2018-06-23)
- Fix: type declarations
- Fix: remove unused exports

## v11.0.0 (2018-06-22)
- ES6 module
- New API with packTo, packToArray, unpackFrom, unpackArrayFrom

## v10.0.0 (2018-06-15)
- New dist file: ./dist/byte-data.min.js.
- Remove 'browser' from package.json

## v9.0.2 (2018-06-12)
- fix: validation of null, undefined and string length.

## v9.0.1 (2018-06-12)
- fix: dist included in npm package.

## v9.0.0 (2018-06-12)
- dist included in npm package.
- bytes only in base 10 for input and output
- types in byteData.types
- throw errors on overflow and underflow
- throw errors when packing null and undefined values
- throw errors for strings with bad length

## v8.0.3 (2018-06-11)
- fix: webpack.config so no dependency dist is used in the bundle.

## v8.0.1 (2018-05-13)
	- better packaging.

## v8.0.0 (2018-05-05)
	- packStruct() and unpackStruct() are deprecated.
	- Validate type when packing/unpacking, throws Error if type not valid.
	- Fix: unpackArray of types "char" with more than 8 bits return an array of strings, not a single string with all values.
	- Fix: packArray with types "char" and items of length different than the type offset.

## v7.0.1 (2018-05-04)
	- Fix: check for undefined values on pack().
	- Fix: check for null values on unpack().

## v7.0.0 (2018-05-03)
	- Type class is deprecated. Types should be defined as Object<string, *>.

## v6.0.0 (2018-05-03)
	- findString() is deprecated.