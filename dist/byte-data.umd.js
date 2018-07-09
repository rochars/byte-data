(function (global, factory) {typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :typeof define === 'function' && define.amd ? define(['exports'], factory) :(factory((global.byteData = {})));}(this, (function (exports) {;'use strict';Object.defineProperty(exports, '__esModule', { value: true });var byteData=function(exports){/**
 @param {(!Array<(number|string)>|!Uint8Array)} bytes
 @param {number} offset
 @param {number=} index
 @param {?number=} end
 @throws {Error}
 */
function endianness(bytes,offset,index,end){index=index===undefined?0:index;end=end===undefined?null:end;var len=end||bytes.length;var limit=parseInt(offset/2,10);if(len%offset)throw new Error("Bad buffer length.");while(index<len){swap(bytes,offset,index,limit);index+=offset}}/**
 @private
 @param {(!Array<(number|string)>|!Uint8Array)} bytes
 @param {number} offset
 @param {number} index
 */
function swap(bytes,offset,index,limit){var x=0;var y=offset-1;while(x<limit){var theByte=bytes[index+x];bytes[index+x]=bytes[index+y];bytes[index+y]=theByte;x++;y--}}/**
 @struct
 @constructor
 @param {number} bits
 @param {boolean} signed
 @throws {Error}
 */
var Integer=function(bits,signed){/** @private @type {number} */ this.bits=bits;/** @private @type {boolean} */ this.signed=signed;/** @private @type {number} */ this.offset=0;/** @private @type {number} */ this.min=-Infinity;/** @private @type {number} */ this.max=Infinity;/** @private @type {number} */ this.realBits_=this.bits;/** @private @type {number} */ this.lastByteMask_=255;this.build_()};/**
 @param {!Uint8Array} bytes
 @param {number=} i
 @return {number}
 */
Integer.prototype.read=function(bytes,i){i=i===undefined?0:i;var num=0;var x=this.offset-1;while(x>0){num=bytes[x+i]<<x*8|num;x--}num=(bytes[i]|num)>>>0;return this.overflow_(this.sign_(num))};/**
 @param {!Array<number>} bytes
 @param {number} number
 @param {number=} j
 @return {number}
 */
Integer.prototype.write=function(bytes,number,j){j=j===undefined?0:j;number=this.overflow_(number);bytes[j++]=number&255;for(var i=2;i<=this.offset;i++)bytes[j++]=Math.floor(number/Math.pow(2,(i-1)*8))&255;return j};/**
 @private
 @param {!Array<number>} bytes
 @param {number} number
 @param {number=} j
 @return {number}
 */
Integer.prototype.writeEsoteric_=function(bytes,number,j){j=j===undefined?0:j;number=this.overflow_(number);j=this.writeFirstByte_(bytes,number,j);for(var i=2;i<this.offset;i++)bytes[j++]=Math.floor(number/Math.pow(2,(i-1)*8))&255;if(this.bits>8)bytes[j++]=Math.floor(number/Math.pow(2,(this.offset-1)*8))&this.lastByteMask_;return j};/**
 @private
 @param {!Uint8Array} bytes
 @param {number=} i
 @return {number}
 */
Integer.prototype.readBits_=function(bytes,i){i=i===undefined?0:i;var binary="";var j=0;while(j<this.offset){var bits=bytes[i+j].toString(2);binary=(new Array(9-bits.length)).join("0")+bits+binary;j++}return this.overflow_(this.sign_(parseInt(binary,2)))};/** @private @throws {Error} */ Integer.prototype.build_=function(){this.setRealBits_();this.setLastByteMask_();this.setMinMax_();this.offset=this.bits<8?1:Math.ceil(this.realBits_/8);if(this.realBits_!=this.bits||this.bits<8||this.bits>32){this.write=
this.writeEsoteric_;this.read=this.readBits_}};/**
 @private
 @param {number} num
 @return {number}
 */
Integer.prototype.sign_=function(num){if(num>this.max)num-=this.max*2+2;return num};/**
 @private
 @param {number} value
 @return {number}
 */
Integer.prototype.overflow_=function(value){if(value>this.max)throw new Error("Overflow.");else if(value<this.min)throw new Error("Underflow.");return value};/** @private */ Integer.prototype.setMinMax_=function(){var max=Math.pow(2,this.bits);if(this.signed){this.max=max/2-1;this.min=-max/2}else{this.max=max-1;this.min=0}};/** @private */ Integer.prototype.setRealBits_=function(){if(this.bits>8)this.realBits_=(this.bits-1|7)+1};/** @private */ Integer.prototype.setLastByteMask_=function(){var r=
8-(this.realBits_-this.bits);this.lastByteMask_=Math.pow(2,r>0?r:8)-1};/**
 @private
 @param {!Array<number>} bytes
 @param {number} number
 @param {number} j
 @return {number}
 */
Integer.prototype.writeFirstByte_=function(bytes,number,j){if(this.bits<8)bytes[j++]=number<0?number+Math.pow(2,this.bits):number;else bytes[j++]=number&255;return j};/**
 @param {number} code
 @throws {Error}
 */
function validateASCIICode(code){if(code>127)throw new Error("Bad ASCII code.");}/**
 @param {number} value
 @throws {Error}
 */
function validateNotUndefined(value){if(value===undefined)throw new Error("Undefined value.");}/**
 @param {!Object} theType
 @throws {Error}
 */
function validateType(theType){if(!theType)throw new Error("Undefined type.");if(theType.float)validateFloatType_(theType);else validateIntType_(theType)}/**
 @private
 @param {!Object} theType
 @throws {Error}
 */
function validateFloatType_(theType){if([16,32,64].indexOf(theType.bits)==-1)throw new Error("Bad float type.");}/**
 @private
 @param {!Object} theType
 @throws {Error}
 */
function validateIntType_(theType){if(theType.bits<1||theType.bits>53)throw new Error("Bad type definition.");}/** @private @const @type {boolean} */ var is_be=(new Uint8Array((new Uint32Array([305419896])).buffer))[0]===18;/** @const */ var HIGH=is_be?1:0;/** @const */ var LOW=is_be?0:1;/** @private @const @type {!Int8Array} */ var int8_=new Int8Array(8);/** @private @const @type {!Uint32Array} */ var ui32_=new Uint32Array(int8_.buffer);/** @private @const @type {!Float32Array} */ var f32_=new Float32Array(int8_.buffer);
/** @private @const @type {!Float64Array} */ var f64_=new Float64Array(int8_.buffer);/** @private @type {Function} */ var reader_;/** @private @type {Function} */ var writer_;/** @private @type {Object} */ var gInt_={};/**
 @private
 @param {!Object} theType
 @throws {Error}
 */
function setUp_(theType){validateType(theType);theType.offset=theType.bits<8?1:Math.ceil(theType.bits/8);theType.be=theType.be||false;setReader(theType);setWriter(theType);gInt_=new Integer(theType.bits==64?32:theType.bits,theType.float?false:theType.signed)}/**
 @private
 @param {number} value
 @param {!Object} theType
 @param {(!Uint8Array|!Array<number>)} buffer
 @param {number} index
 @param {number} len
 @param {!Function} validate
 @param {boolean} be
 @return {number}
 */
function writeBytes_(value,theType,buffer,index,len,validate,be){while(index<len){validate(value,theType);index=writer_(buffer,value,index)}if(be)endianness(buffer,theType.offset,index-theType.offset,index);return index}/**
 @private
 @param {!Uint8Array} bytes
 @param {number} i
 @return {number}
 */
function readInt_(bytes,i){return gInt_.read(bytes,i)}/**
 @private
 @param {!Uint8Array} bytes
 @param {number} i
 @return {number}
 */
function read16F_(bytes,i){var int=gInt_.read(bytes,i);var exponent=(int&31744)>>10;var fraction=int&1023;var floatValue;if(exponent)floatValue=Math.pow(2,exponent-15)*(1+fraction/1024);else floatValue=.00006103515625*(fraction/1024);return floatValue*(int>>15?-1:1)}/**
 @private
 @param {!Uint8Array} bytes
 @param {number} i
 @return {number}
 */
function read32F_(bytes,i){ui32_[0]=gInt_.read(bytes,i);return f32_[0]}/**
 @private
 @param {!Uint8Array} bytes
 @param {number} i
 @return {number}
 */
function read64F_(bytes,i){ui32_[HIGH]=gInt_.read(bytes,i);ui32_[LOW]=gInt_.read(bytes,i+4);return f64_[0]}/**
 @private
 @param {!Uint8Array} bytes
 @param {number} number
 @param {number} j
 @return {!number}
 */
function writeInt_(bytes,number,j){return gInt_.write(bytes,number,j)}/**
 @private
 @param {!Uint8Array} bytes
 @param {number} number
 @param {number} j
 @return {number}
 */
function write16F_(bytes,number,j){f32_[0]=number;var x=ui32_[0];var bits=x>>16&32768;var m=x>>12&2047;var e=x>>23&255;if(e>=103){bits|=e-112<<10|m>>1;bits+=m&1}bytes[j++]=bits&255;bytes[j++]=bits>>>8&255;return j}/**
 @private
 @param {!Uint8Array} bytes
 @param {number} number
 @param {number} j
 @return {number}
 */
function write32F_(bytes,number,j){f32_[0]=number;return gInt_.write(bytes,ui32_[0],j)}/**
 @private
 @param {!Uint8Array} bytes
 @param {number} number
 @param {number} j
 @return {number}
 */
function write64F_(bytes,number,j){f64_[0]=number;j=gInt_.write(bytes,ui32_[HIGH],j);j=gInt_.write(bytes,ui32_[LOW],j);return j}/**
 @private
 @param {!Object} theType
 */
function setReader(theType){if(theType.float)if(theType.bits==16)reader_=read16F_;else if(theType.bits==32)reader_=read32F_;else{if(theType.bits==64)reader_=read64F_}else reader_=readInt_}/**
 @private
 @param {!Object} theType
 */
function setWriter(theType){if(theType.float)if(theType.bits==16)writer_=write16F_;else if(theType.bits==32)writer_=write32F_;else{if(theType.bits==64)writer_=write64F_}else writer_=writeInt_}/**
 @param {!Uint8Array} bytes
 @param {number=} index
 @param {?number=} len
 @return {string}
 @throws {Error}
 */
function unpackString(bytes,index,len){index=index===undefined?0:index;len=len===undefined?null:len;var chrs="";len=len?index+len:bytes.length;while(index<len){validateASCIICode(bytes[index]);chrs+=String.fromCharCode(bytes[index]);index++}return chrs}/**
 @param {string} str
 @return {!Array<number>}
 @throws {Error}
 */
function packString(str){var bytes=[];for(var i=0;i<str.length;i++){var code=str.charCodeAt(i);validateASCIICode(code);bytes[i]=code}return bytes}/**
 @param {string} str
 @param {(!Uint8Array|!Array<number>)} buffer
 @param {number=} index
 @return {number}
 @throws {Error}
 */
function packStringTo(str,buffer,index){index=index===undefined?0:index;for(var i=0;i<str.length;i++){var code=str.charCodeAt(i);validateASCIICode(code);buffer[index]=code;index++}return index}/**
 @param {number} value
 @param {!Object} theType
 @return {!Array<number>}
 @throws {Error}
 */
function pack(value,theType){var output=[];packTo(value,theType,output);return output}/**
 @param {(!Array<number>|!TypedArray)} values
 @param {!Object} theType
 @return {!Array<number>}
 @throws {Error}
 */
function packArray(values,theType){var output=[];packArrayTo(values,theType,output);return output}/**
 @param {number} value
 @param {!Object} theType
 @param {(!Uint8Array|!Array<number>)} buffer
 @param {number=} index
 @return {number}
 @throws {Error}
 */
function packTo(value,theType,buffer,index){index=index===undefined?0:index;setUp_(theType);return writeBytes_(value,theType,buffer,index,index+theType.offset,validateNotUndefined,theType.be)}/**
 @param {(!Array<number>|!TypedArray)} values
 @param {!Object} theType
 @param {(!Uint8Array|!Array<number>)} buffer
 @param {number=} index
 @return {number}
 @throws {Error}
 */
function packArrayTo(values,theType,buffer,index){index=index===undefined?0:index;setUp_(theType);var be=theType.be;var offset=theType.offset;var len=values.length;for(var i=0;i<len;i++)index=writeBytes_(values[i],theType,buffer,index,index+offset,validateNotUndefined,be);return index}/**
 @param {!Uint8Array} buffer
 @param {!Object} theType
 @return {number}
 @throws {Error}
 */
function unpack(buffer,theType){setUp_(theType);var values=unpackArrayFrom(buffer.slice(0,theType.offset),theType);return values[0]}/**
 @param {!Uint8Array} buffer
 @param {!Object} theType
 @return {!Array<number>}
 @throws {Error}
 */
function unpackArray(buffer,theType){return unpackArrayFrom(buffer,theType)}/**
 @param {!Uint8Array} buffer
 @param {!Object} theType
 @param {number=} index
 @return {number}
 @throws {Error}
 */
function unpackFrom(buffer,theType,index){index=index===undefined?0:index;setUp_(theType);if(theType.be)endianness(buffer,theType.offset,index,index+theType.offset);var value=reader_(buffer,index);if(theType.be)endianness(buffer,theType.offset,index,index+theType.offset);return value}/**
 @param {!Uint8Array} buffer
 @param {!Object} theType
 @param {number=} index
 @param {?number=} end
 @return {!Array<number>}
 @throws {Error}
 */
function unpackArrayFrom(buffer,theType,index,end){index=index===undefined?0:index;end=end===undefined?null:end;setUp_(theType);var len=end||buffer.length;while((len-index)%theType.offset)len--;if(theType.be)endianness(buffer,theType.offset,index,len);var values=[];var step=theType.offset;for(var i=index;i<len;i+=step)values.push(reader_(buffer,i));if(theType.be)endianness(buffer,theType.offset,index,len);return values}/**
 @param {!Uint8Array} buffer
 @param {!Object} theType
 @param {!TypedArray} output
 @param {number=} index
 @param {?number=} end
 @throws {Error}
 */
function unpackArrayTo(buffer,theType,output,index,end){index=index===undefined?0:index;end=end===undefined?null:end;setUp_(theType);var len=end||buffer.length;while((len-index)%theType.offset)len--;if(theType.be)endianness(buffer,theType.offset,index,len);var outputIndex=0;var step=theType.offset;for(var i=index;i<len;i+=step){output.set([reader_(buffer,i)],outputIndex);outputIndex++}if(theType.be)endianness(buffer,theType.offset,index,len)}exports.unpackString=unpackString;exports.packString=packString;
exports.packStringTo=packStringTo;exports.pack=pack;exports.packArray=packArray;exports.packTo=packTo;exports.packArrayTo=packArrayTo;exports.unpack=unpack;exports.unpackArray=unpackArray;exports.unpackFrom=unpackFrom;exports.unpackArrayFrom=unpackArrayFrom;exports.unpackArrayTo=unpackArrayTo;return exports}({});exports.unpackString = byteData.unpackString;exports.packString = byteData.packString;exports.packStringTo = byteData.packStringTo;exports.pack = byteData.pack;exports.packArray = byteData.packArray;exports.packTo = byteData.packTo;exports.packArrayTo = byteData.packArrayTo;exports.unpack = byteData.unpack;exports.unpackArray = byteData.unpackArray;exports.unpackFrom = byteData.unpackFrom;exports.unpackArrayFrom = byteData.unpackArrayFrom;exports.unpackArrayTo = byteData.unpackArrayTo;})));
