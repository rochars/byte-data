# Building byte-data

Building works the same on all platforms:
```
npm run build
```
This will lint the sources, test the sources, compile the dist files, test everything and generate API documentation.

There **should** be no warnings during the build.

The dist files are created in the *dist/* folder:
- ./dist/byte-data.js (ES6)
- ./dist/byte-data.min.js (ES6)
- ./dist/byte-data.umd.js (ES3)

The API documentation is created in the *docs/* folder.

## UMD tests
- ./test/dist/AMD/index.html load the UMD with a AMD loader
- ./test/dist/browser.html run the same tests that are run in Node in the browser. Some polyfills are required to make Mocha work in IE6.
- ./test/dist/browser-es3.html load byte-data.umd.js, execute some functions and print "OK" to the screen. No polyfills are loaded.

## Tests on big-endian systems
Use [QEMU](https://www.qemu.org/) with this PowerPC/Debian image:  
https://people.debian.org/~aurel32/qemu/powerpc/

## Compilation
**byte-data** UMD dist uses [Google Closure Compiler](https://github.com/google/closure-compiler-js) with compilation level set to ADVANCED, so properties that have not been exported will be renamed (and likely result in errors in the compiled browser version).
