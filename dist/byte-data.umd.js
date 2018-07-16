(function (global, factory) {typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :typeof define === 'function' && define.amd ? define(['exports'], factory) :(factory((global.byteData = {})));}(this, (function (exports) {;'use strict';Object.defineProperty(exports, '__esModule', { value: true });var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.checkStringArgs=function(a,g,f){if(null==a)throw new TypeError("The 'this' value for String.prototype."+f+" must not be null or undefined");if(g instanceof RegExp)throw new TypeError("First argument to String.prototype."+f+" must not be a regular expression");return a+""};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,g,f){a!=Array.prototype&&a!=Object.prototype&&(a[g]=f.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,g,f,l){if(g){f=$jscomp.global;a=a.split(".");for(l=0;l<a.length-1;l++){var k=a[l];k in f||(f[k]={});f=f[k]}a=a[a.length-1];l=f[a];g=g(l);g!=l&&null!=g&&$jscomp.defineProperty(f,a,{configurable:!0,writable:!0,value:g})}};
$jscomp.polyfill("String.prototype.codePointAt",function(a){return a?a:function(a){var f=$jscomp.checkStringArgs(this,null,"codePointAt"),g=f.length;a=Number(a)||0;if(0<=a&&a<g){a|=0;var k=f.charCodeAt(a);if(55296>k||56319<k||a+1===g)return k;a=f.charCodeAt(a+1);return 56320>a||57343<a?k:1024*(k-55296)+a+9216}}},"es6","es3");
var byteData=function(a){function g(b,c,d,e){d=void 0===d?0:d;e=void 0===e?b.length:e;if(e%c)throw Error("Bad buffer length.");for(;d<e;d+=c){var a=b,f=c,g=d;f--;for(var h=0;h<f;h++){var k=a[g+h];a[g+h]=a[g+f];a[g+f]=k;f--}}}function f(b){if(!b)throw Error("Undefined type.");if(b.float){if(-1==[16,32,64].indexOf(b.bits))throw Error("Bad float type.");}else if(1>b.bits||53<b.bits)throw Error("Bad type definition.");b.offset=8>b.bits?1:Math.ceil(b.bits/8);b.be=b.be||!1;q=b.float?16==b.bits?C:32==b.bits?
D:E:k;u=b.float?16==b.bits?F:32==b.bits?G:H:I;m=new h(64==b.bits?32:b.bits,b.float?!1:b.signed)}function l(b,c,d,e,a){if(void 0===b)throw Error("Undefined value.");for(;e<a;)e=u(d,b,e);c.be&&g(d,c.offset,e-c.offset,e);return e}function k(b,c){return m.read(b,c)}function C(b,c){b=m.read(b,c);c=(b&31744)>>10;var d=b&1023;return(c?Math.pow(2,c-15)*(1+d/1024):d/1024*.00006103515625)*(b>>15?-1:1)}function D(b,c){n[0]=m.read(b,c);return r[0]}function E(b,c){n[v]=m.read(b,c);n[w]=m.read(b,c+4);return x[0]}
function I(b,c,d){return m.write(b,c,d)}function F(b,c,d){r[0]=c;var e=n[0];c=e>>16&32768;var a=e>>12&2047;e=e>>23&255;103<=e&&(c=(c|e-112<<10|a>>1)+(a&1));b[d++]=c&255;b[d++]=c>>>8&255;return d}function G(b,c,d){r[0]=c;return m.write(b,n[0],d)}function H(b,c,d){x[0]=c;d=m.write(b,n[v],d);return m.write(b,n[w],d)}function y(b){for(var c=[],d=0;d<b.length;d++){var e=b.codePointAt(d);if(128>e)c.push(e);else{var a=0,f=0;2047>=e?(a=1,f=192):65535>=e?(a=2,f=224):1114111>=e&&(a=3,f=240,d++);for(c.push((e>>
6*a)+f);0<a;)c.push(128|e>>6*(a-1)&63),a--}}return c}function z(b,c,d,e){e=void 0===e?0:e;f(c);return l(b,c,d,e,e+c.offset)}function A(b,c,d,e){e=void 0===e?0:e;f(c);for(var a=0;a<b.length;a++)e=l(b[a],c,d,e,e+c.offset);return e}function B(b,c,d,e,a){e=void 0===e?0:e;a=void 0===a?b.length:a;for(f(c);(a-e)%c.offset;)a--;c.be&&g(b,c.offset);for(var t=0;e<a;e+=c.offset,t++)d[t]=q(b,e);c.be&&g(b,c.offset)}var h=function(b,c){this.bits=b;this.signed=c;this.offset=0;this.min=-Infinity;this.max=Infinity;
this.realBits_=this.bits;this.lastByteMask_=255;this.build_()};h.prototype.read=function(b,c){c=void 0===c?0:c;for(var d=0,e=this.offset-1;0<e;e--)d|=b[e+c]<<8*e;d=(b[c]|d)>>>0;return this.overflow_(this.sign_(d))};h.prototype.write=function(b,c,d){d=void 0===d?0:d;c=this.overflow_(c);b[d++]=c&255;for(var e=2;e<=this.offset;e++)b[d++]=Math.floor(c/Math.pow(2,8*(e-1)))&255;return d};h.prototype.writeEsoteric_=function(b,c,d){d=void 0===d?0:d;c=this.overflow_(c);d=this.writeFirstByte_(b,c,d);for(var e=
2;e<this.offset;e++)b[d++]=Math.floor(c/Math.pow(2,8*(e-1)))&255;8<this.bits&&(b[d++]=Math.floor(c/Math.pow(2,8*(this.offset-1)))&this.lastByteMask_);return d};h.prototype.readBits_=function(b,c){c=void 0===c?0:c;for(var d="",e=0;e<this.offset;e++){var a=b[c+e].toString(2);d=Array(9-a.length).join("0")+a+d}return this.overflow_(this.sign_(parseInt(d,2)))};h.prototype.build_=function(){this.setRealBits_();this.setLastByteMask_();this.setMinMax_();this.offset=8>this.bits?1:Math.ceil(this.realBits_/
8);if(this.realBits_!=this.bits||8>this.bits||32<this.bits)this.write=this.writeEsoteric_,this.read=this.readBits_};h.prototype.sign_=function(b){b>this.max&&(b-=2*this.max+2);return b};h.prototype.overflow_=function(b){if(b>this.max)throw Error("Overflow.");if(b<this.min)throw Error("Underflow.");return b};h.prototype.setMinMax_=function(){var b=Math.pow(2,this.bits);this.signed?(this.max=b/2-1,this.min=-b/2):(this.max=b-1,this.min=0)};h.prototype.setRealBits_=function(){8<this.bits&&(this.realBits_=
(this.bits-1|7)+1)};h.prototype.setLastByteMask_=function(){var b=8-(this.realBits_-this.bits);this.lastByteMask_=Math.pow(2,0<b?b:8)-1};h.prototype.writeFirstByte_=function(b,c,d){8>this.bits?b[d++]=0>c?c+Math.pow(2,this.bits):c:b[d++]=c&255;return d};var p=0===(new Uint8Array((new Uint32Array([1])).buffer))[0],v=p?1:0,w=p?0:1;p=new Int8Array(8);var n=new Uint32Array(p.buffer),r=new Float32Array(p.buffer),x=new Float64Array(p.buffer),q,u,m={};a.unpackString=function(b,c,d){c=void 0===c?0:c;d=void 0===
d?null:d;d=null!==d?c+d:b.length;for(var e="";c<d;){var a=b[c++];if(0===a>>7)e+=String.fromCharCode(a);else{var f=0;6===a>>5?f=1:14===a>>4?f=2:30===a>>3&&(f=3);a&=(1<<8-f-1)-1;for(var g=0;g<f;g++)a=a<<6|b[c++]&63;65535>=a?e+=String.fromCharCode(a):(a-=65536,e+=String.fromCharCode((a>>10&1023)+55296,(a&1023)+56320))}}return e};a.packString=y;a.packStringTo=function(b,c,d){d=void 0===d?0:d;b=y(b);for(var a=0;a<b.length;a++)c[d++]=b[a];return d};a.pack=function(b,c){var a=[];z(b,c,a);return a};a.packArray=
function(b,c){var a=[];A(b,c,a);return a};a.packTo=z;a.packArrayTo=A;a.unpack=function(b,c,a){a=void 0===a?0:a;f(c);c.be&&g(b,c.offset,a,a+c.offset);var d=q(b,a);c.be&&g(b,c.offset,a,a+c.offset);return d};a.unpackArray=function(b,a,d,e){e=void 0===e?b.length:e;var c=[];B(b,a,c,void 0===d?0:d,e);return c};a.unpackArrayTo=B;return a}({});exports.unpackString = byteData.unpackString;exports.packString = byteData.packString;exports.packStringTo = byteData.packStringTo;exports.pack = byteData.pack;exports.packArray = byteData.packArray;exports.packTo = byteData.packTo;exports.packArrayTo = byteData.packArrayTo;exports.unpack = byteData.unpack;exports.unpackArray = byteData.unpackArray;exports.unpackArrayTo = byteData.unpackArrayTo;})));
