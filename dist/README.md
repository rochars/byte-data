# Distribution files

- byte-data.js
ES6 bundle with all dependencies.

- byte-data.min.js
ES6 bundle with all the dependencies, minified.

- byte-data.es5.umd.js
ES5 bundle that can be used with AMD loaders, **Node.js** and with **```<script>``` tags in the browser**. Can be used in very old browsers (like IE8) with the [shims](../shims.js) in the root folder of this package.

- byte-data.es3.umd.js
**Similar to the ES5 UMD**, but transpiled to **ES3** and bundled with all polyfills and shims needed for old browsers. **Can be used out of the box in IE8+**.
