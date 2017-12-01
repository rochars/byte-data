/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

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
            
            // Functions
            {
              search: 'module.exports.pack',
              replace: "window['byteData'] = window['byteData'] || {};" + 
                       "window['byteData']['pack']",
            },
            {
              search: 'module.exports.unpack',
              replace: "window['byteData']['unpack']",
            },
            {
              search: 'module.exports.packSequence',
              replace: "window['byteData']['packSequence']",
            },
            {
              search: 'module.exports.unpackSequence',
              replace: "window['byteData']['unpackSequence']",
            },

            // types
            {
              search: 'module.exports.char',
              replace: "window['byteData']['char']",
            },
            {
              search: 'module.exports.bool',
              replace: "window['byteData']['bool']",
            },
            {
              search: 'module.exports.int2',
              replace: "window['byteData']['int2']",
            },
            {
              search: 'module.exports.uInt2',
              replace: "window['byteData']['uInt2']",
            },
            {
              search: 'module.exports.int4',
              replace: "window['byteData']['int4']",
            },
            {
              search: 'module.exports.uInt4',
              replace: "window['byteData']['uInt4']",
            },
            {
              search: 'module.exports.int8',
              replace: "window['byteData']['int8']",
            },
            {
              search: 'module.exports.uInt8',
              replace: "window['byteData']['uInt8']",
            },
            {
              search: 'module.exports.int16',
              replace: "window['byteData']['int16']",
            },
            {
              search: 'module.exports.uInt16',
              replace: "window['byteData']['uInt16']",
            },
            {
              search: 'module.exports.float16',
              replace: "window['byteData']['float16']",
            },
            {
              search: 'module.exports.int24',
              replace: "window['byteData']['int24']",
            },
            {
              search: 'module.exports.uInt24',
              replace: "window['byteData']['uInt24']",
            },
            {
              search: 'module.exports.int32',
              replace: "window['byteData']['int32']",
            },
            {
              search: 'module.exports.uInt32',
              replace: "window['byteData']['uInt32']",
            },
            {
              search: 'module.exports.float32',
              replace: "window['byteData']['float32']",
            },
            {
              search: 'module.exports.int40',
              replace: "window['byteData']['int40']",
            },
            {
              search: 'module.exports.uInt40',
              replace: "window['byteData']['uInt40']",
            },
            {
              search: 'module.exports.int48',
              replace: "window['byteData']['int48']",
            },
            {
              search: 'module.exports.uInt48',
              replace: "window['byteData']['uInt48']",
            },
            {
              search: 'module.exports.float64',
              replace: "window['byteData']['float64']",
            },

            // Legacy API
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