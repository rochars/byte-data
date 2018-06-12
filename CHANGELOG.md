# CHANGELOG

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