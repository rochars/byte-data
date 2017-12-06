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
              search: "module.exports.pack = packValue",
              replace: "window['byteData'] = window['byteData'] ? window['byteData'] : {};" + 
                       "window['byteData']['pack'] = packValue",
            },
            {
              search: 'module.exports.unpack = unpackValue',
              replace: "window['byteData']['unpack'] = unpackValue",
            },
            {
              search: 'module.exports.packArray',
              replace: "window['byteData']['packArray']",
            },
            {
              search: 'module.exports.unpackArray',
              replace: "window['byteData']['unpackArray']",
            },
            {
              search: 'module.exports.packStruct',
              replace: "window['byteData']['packStruct']",
            },
            {
              search: 'module.exports.unpackStruct',
              replace: "window['byteData']['unpackStruct']",
            },
            {
              search: "module.exports.findString",
              replace: "window['byteData']['findString']",
            },
            // Classes
            {
              search: 'module.exports.Type',
              replace: "window['byteData']['Type']",
            },
            // types: LE
            {
              search: 'module.exports.chr',
              replace: "window['byteData']['chr']",
            },
            {
              search: 'module.exports.fourCC',
              replace: "window['byteData']['fourCC']",
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

            // types: BE
            {
              search: 'module.exports.int16BE',
              replace: "window['byteData']['int16BE']",
            },
            {
              search: 'module.exports.uInt16BE',
              replace: "window['byteData']['uInt16BE']",
            },
            {
              search: 'module.exports.float16BE',
              replace: "window['byteData']['float16BE']",
            },
            {
              search: 'module.exports.int24BE',
              replace: "window['byteData']['int24BE']",
            },
            {
              search: 'module.exports.uInt24BE',
              replace: "window['byteData']['uInt24BE']",
            },
            {
              search: 'module.exports.int32BE',
              replace: "window['byteData']['int32BE']",
            },
            {
              search: 'module.exports.uInt32BE',
              replace: "window['byteData']['uInt32BE']",
            },
            {
              search: 'module.exports.float32BE',
              replace: "window['byteData']['float32BE']",
            },
            {
              search: 'module.exports.int40BE',
              replace: "window['byteData']['int40BE']",
            },
            {
              search: 'module.exports.uInt40BE',
              replace: "window['byteData']['uInt40BE']",
            },
            {
              search: 'module.exports.int48BE',
              replace: "window['byteData']['int48BE']",
            },
            {
              search: 'module.exports.uInt48BE',
              replace: "window['byteData']['uInt48BE']",
            },
            {
              search: 'module.exports.float64BE',
              replace: "window['byteData']['float64BE']",
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
          ]
        }
      }
    ]
  }
};