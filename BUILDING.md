# Building byte-data

Building is necessary to compile the dist files and to generate API documentation.

Building works the same on all platforms:
```
npm run build
```
This will lint the sources, test the sources, compile a browser version, a UMD, a ES6 module, a CJS module, test everything and generate documentation files.

There **should** be no warnings during the build.

The dist files are created in the *dist/* folder.

The API documentation is generated in the *docs/* folder.

Mind that **byte-data** uses [Google Closure Compiler](https://github.com/google/closure-compiler-js) with compilation level set to ADVANCED, so properties that have not been exported will be renamed (and likely result in errors in the compiled browser version).

## Bundle
byte-data is bundled with [webpack](https://webpack.js.org/) for the browser versions and with [rollup](https://rollupjs.org) for all other distributions. Only the browser version is compiled; the others are just bundled.


