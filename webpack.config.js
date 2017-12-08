/**
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
              search: "exports.pack = pack",
              replace: "window['byteData'] = window['byteData'] ? window['byteData'] : {};" + 
                       "window['byteData']['pack'] = pack",
            },
            {
              search: 'exports.unpack = unpack',
              replace: "window['byteData']['unpack'] = unpack",
            },
            {
              search: 'exports.packArray',
              replace: "window['byteData']['packArray']",
            },
            {
              search: 'exports.unpackArray',
              replace: "window['byteData']['unpackArray']",
            },
            {
              search: 'exports.packStruct',
              replace: "window['byteData']['packStruct']",
            },
            {
              search: 'exports.unpackStruct',
              replace: "window['byteData']['unpackStruct']",
            },
            {
              search: "exports.findString",
              replace: "window['byteData']['findString']",
            },
            // Classes
            {
              search: 'exports.Type',
              replace: "window['byteData']['Type']",
            },
            // types: LE
            {
              search: 'exports.chr',
              replace: "window['byteData']['chr']",
            },
            {
              search: 'exports.fourCC',
              replace: "window['byteData']['fourCC']",
            },
            {
              search: 'exports.bool',
              replace: "window['byteData']['bool']",
            },
            {
              search: 'exports.int2',
              replace: "window['byteData']['int2']",
            },
            {
              search: 'exports.uInt2',
              replace: "window['byteData']['uInt2']",
            },
            {
              search: 'exports.int4',
              replace: "window['byteData']['int4']",
            },
            {
              search: 'exports.uInt4',
              replace: "window['byteData']['uInt4']",
            },
            {
              search: 'exports.int8',
              replace: "window['byteData']['int8']",
            },
            {
              search: 'exports.uInt8',
              replace: "window['byteData']['uInt8']",
            },
            {
              search: 'exports.int16',
              replace: "window['byteData']['int16']",
            },
            {
              search: 'exports.uInt16',
              replace: "window['byteData']['uInt16']",
            },
            {
              search: 'exports.float16',
              replace: "window['byteData']['float16']",
            },
            {
              search: 'exports.int24',
              replace: "window['byteData']['int24']",
            },
            {
              search: 'exports.uInt24',
              replace: "window['byteData']['uInt24']",
            },
            {
              search: 'exports.int32',
              replace: "window['byteData']['int32']",
            },
            {
              search: 'exports.uInt32',
              replace: "window['byteData']['uInt32']",
            },
            {
              search: 'exports.float32',
              replace: "window['byteData']['float32']",
            },
            {
              search: 'exports.int40',
              replace: "window['byteData']['int40']",
            },
            {
              search: 'exports.uInt40',
              replace: "window['byteData']['uInt40']",
            },
            {
              search: 'exports.int48',
              replace: "window['byteData']['int48']",
            },
            {
              search: 'exports.uInt48',
              replace: "window['byteData']['uInt48']",
            },
            {
              search: 'exports.float64',
              replace: "window['byteData']['float64']",
            },

            // types: BE
            {
              search: 'exports.int16BE',
              replace: "window['byteData']['int16BE']",
            },
            {
              search: 'exports.uInt16BE',
              replace: "window['byteData']['uInt16BE']",
            },
            {
              search: 'exports.float16BE',
              replace: "window['byteData']['float16BE']",
            },
            {
              search: 'exports.int24BE',
              replace: "window['byteData']['int24BE']",
            },
            {
              search: 'exports.uInt24BE',
              replace: "window['byteData']['uInt24BE']",
            },
            {
              search: 'exports.int32BE',
              replace: "window['byteData']['int32BE']",
            },
            {
              search: 'exports.uInt32BE',
              replace: "window['byteData']['uInt32BE']",
            },
            {
              search: 'exports.float32BE',
              replace: "window['byteData']['float32BE']",
            },
            {
              search: 'exports.int40BE',
              replace: "window['byteData']['int40BE']",
            },
            {
              search: 'exports.uInt40BE',
              replace: "window['byteData']['uInt40BE']",
            },
            {
              search: 'exports.int48BE',
              replace: "window['byteData']['int48BE']",
            },
            {
              search: 'exports.uInt48BE',
              replace: "window['byteData']['uInt48BE']",
            },
            {
              search: 'exports.float64BE',
              replace: "window['byteData']['float64BE']",
            }
          ]
        }
      }
    ]
  }
};