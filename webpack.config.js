module.exports = {
  entry: './index.js',
  output: {
    filename: './dist/byte-data.js'
  },
  module: {
    loaders: [
      {
        test:  /index\.js$/,
        loader: 'string-replace-loader',
        query: {
          multiple: [
            {
              search: 'module.exports.toBytes',
              replace: "window['toBytes']",
            },
            {
              search: 'module.exports.fromBytes',
              replace: "window['fromBytes']",
            },
            {
              search: 'module.exports.findString',
              replace: "window['findString']",
            },
            {
              search: 'module.exports.packNibbles',
              replace: "window['packNibbles']",
            }, 
            {
              search: 'module.exports.unpackNibbles',
              replace: "window['unpackNibbles']",
            },
            {
              search: 'module.exports.packCrumbs',
              replace: "window['packCrumbs']",
            }, 
            {
              search: 'module.exports.unpackCrumbs',
              replace: "window['unpackCrumbs']",
            },
            {
              search: 'module.exports.packBooleans',
              replace: "window['packBooleans']",
            }, 
            {
              search: 'module.exports.unpackBooleans',
              replace: "window['unpackBooleans']",
            }
          ]
        }
      }
    ]
  }
};