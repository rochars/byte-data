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
            },

             
            {
              search: 'module.exports.floatLE',
              replace: "window['floatLE']",
            }, 
            {
              search: 'module.exports.intLE',
              replace: "window['intLE']",
            }, 
            {
              search: 'module.exports.uIntLE',
              replace: "window['uIntLE']",
            }, 
            {
              search: 'module.exports.floatBE',
              replace: "window['floatBE']",
            }, 
            {
              search: 'module.exports.intBE',
              replace: "window['intBE']",
            }, 
            {
              search: 'module.exports.uIntBE',
              replace: "window['uIntBE']",
            }, 
            {
              search: 'module.exports.char',
              replace: "window['char']",
            },


            {
              search: 'module.exports.floatArrayLE',
              replace: "window['floatArrayLE']",
            }, 
            {
              search: 'module.exports.intArrayLE',
              replace: "window['intArrayLE']",
            }, 
            {
              search: 'module.exports.uIntArrayLE',
              replace: "window['uIntArrayLE']",
            }, 
            {
              search: 'module.exports.floatArrayBE',
              replace: "window['floatArrayBE']",
            }, 
            {
              search: 'module.exports.intArrayBE',
              replace: "window['intArrayBE']",
            }, 
            {
              search: 'module.exports.uIntArrayBE',
              replace: "window['uIntArrayBE']",
            }, 
            {
              search: 'module.exports.str',
              replace: "window['str']",
            }
          ]
        }
      }
    ]
  }
};