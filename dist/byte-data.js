/*! https://github.com/rochars/byte-data
Copyright (c) 2019 Rafael da Silva Rocha */
/*! https://mths.be/codepointat v0.2.0 by @mathias */
String.prototype.codePointAt||function(){var e=function(){try{var e={},t=Object.defineProperty,r=t(e,e,e)&&t}catch(e){}return r}(),t=function(e){if(null==this)throw TypeError();var t=String(this),r=t.length,o=e?Number(e):0;if(o!=o&&(o=0),!(o<0||o>=r)){var n,c=t.charCodeAt(o);return c>=55296&&c<=56319&&r>o+1&&(n=t.charCodeAt(o+1))>=56320&&n<=57343?1024*(c-55296)+n-56320+65536:c}};e?e(String.prototype,"codePointAt",{value:t,configurable:!0,writable:!0}):String.prototype.codePointAt=t}(),function(){if(!Object.defineProperty||!function(){try{return Object.defineProperty({},"x",{}),!0}catch(e){return!1}}()){var e=Object.defineProperty;Object.defineProperty=function(t,r,o){if(e)try{return e(t,r,o)}catch(e){}if(t!==Object(t))throw TypeError("Object.defineProperty called on non-object");return Object.prototype.__defineGetter__&&"get"in o&&Object.prototype.__defineGetter__.call(t,r,o.get),Object.prototype.__defineSetter__&&"set"in o&&Object.prototype.__defineSetter__.call(t,r,o.set),"value"in o&&(t[r]=o.value),t}}}();var testObject={t:"o"},replaceGetOwnPropertyDescriptor=!1;try{Object.getOwnPropertyDescriptor(testObject,"t")}catch(e){replaceGetOwnPropertyDescriptor=!0}replaceGetOwnPropertyDescriptor&&(Object.getOwnPropertyDescriptor=function(e,t){return null!=("function"==typeof e.__lookupGetter__&&"function"==typeof e.__lookupSetter__?e.__lookupGetter__(t)||e.__lookupSetter__(t):null)?{configurable:!0,enumerable:!0,get:e.__lookupGetter__(t),set:e.__lookupSetter__(t)}:{configurable:!0,writable:!0,enumerable:!0,value:e[t]}});;var byteData=(function(exports){var exports=exports||{};var l="function"==typeof Object.create?Object.create:function(b){function a(){}a.prototype=b;return new a},m;if("function"==typeof Object.setPrototypeOf)m=Object.setPrototypeOf;else{var n;a:{var p={j:!0},q={};try{q.__proto__=p;n=q.j;break a}catch(b){}n=!1}m=n?function(b,a){b.__proto__=a;if(b.__proto__!==a)throw new TypeError(b+" is not extensible");return b}:null}
var t=m,u="function"==typeof Object.defineProperties?Object.defineProperty:function(b,a,c){b!=Array.prototype&&b!=Object.prototype&&(b[a]=c.value)},v="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function w(b,a){if(a){for(var c=v,d=b.split("."),f=0;f<d.length-1;f++){var e=d[f];e in c||(c[e]={});c=c[e]}d=d[d.length-1];f=c[d];e=a(f);e!=f&&null!=e&&u(c,d,{configurable:!0,writable:!0,value:e})}}
w("String.prototype.codePointAt",function(b){return b?b:function(a){if(null==this)throw new TypeError("The 'this' value for String.prototype.codePointAt must not be null or undefined");var c=this+"";var d=c.length;a=Number(a)||0;if(0<=a&&a<d){a|=0;var f=c.charCodeAt(a);if(55296>f||56319<f||a+1===d)return f;a=c.charCodeAt(a+1);return 56320>a||57343<a?f:1024*(f-55296)+a+9216}}});Object.defineProperty(exports,"__esModule",{value:!0});
function x(b,a,c,d){d=void 0===d?b.length:d;if(d%a)throw Error("Bad buffer length.");for(c=void 0===c?0:c;c<d;c+=a){var f=b,e=a,h=c;e--;for(var g=0;g<e;g++){var k=f[h+g];f[h+g]=f[h+e];f[h+e]=k;e--}}}function pack(b,a,c){c=void 0===c?0:c;for(var d=0,f=b.length;d<f;d++){var e=b.codePointAt(d);if(128>e)a[c]=e,c++;else{var h=0,g=0;2047>=e?(h=1,g=192):65535>=e?(h=2,g=224):1114111>=e&&(h=3,g=240,d++);a[c]=(e>>6*h)+g;for(c++;0<h;)a[c]=128|e>>6*(h-1)&63,c++,h--}}return c}
function y(b,a){this.b=b;this.c=a;this.a=(1<<b-1)-1;this.g=Math.ceil((b+a)/8);this.l=Math.pow(2,this.a+1);this.m=b+a;this.o=Math.pow(2,-(8*this.g-1-b))}
y.prototype.pack=function(b,a,c){Math.abs(a)>this.l-2*this.m&&(a=0>a?-Infinity:Infinity);var d=0>((a=+a)||1/a)?1:0>a?1:0;a=Math.abs(a);var f=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),e=z(a/Math.pow(2,f)*Math.pow(2,this.c));a!==a?(e=Math.pow(2,this.c-1),f=(1<<this.b)-1):0!==a&&(a>=Math.pow(2,1-this.a)?(2<=e/Math.pow(2,this.c)&&(f+=1,e=1),f>this.a?(f=(1<<this.b)-1,e=0):(f+=this.a,e=z(e)-Math.pow(2,this.c))):(e=z(a/Math.pow(2,1-this.a-this.c)),f=0));a=[];a.push(d);for(d=this.b;0<d;--d)a[d]=f%2?
1:0,f=Math.floor(f/2);d=a.length;for(f=this.c;0<f;--f)a[d+f]=e%2?1:0,e=Math.floor(e/2);d=a.join("");e=this.g+c-1;for(a=c;e>=c;)b[e]=parseInt(d.substring(0,8),2),d=d.substring(8),e--,a++;return a};
y.prototype.unpack=function(b,a){for(var c=(1<<this.b)-1,d="",f=this.g-1;0<=f;f--){var e=b[f+a].toString(2);d+="00000000".substring(e.length)+e}f="1"==d.charAt(0)?-1:1;d=d.substring(1);e=parseInt(d.substring(0,this.b),2);d=d.substring(this.b);if(e==c)return 0!==parseInt(d,2)?NaN:Infinity*f;0===e?(e+=1,c=parseInt(d,2)):c=parseInt("1"+d,2);return f*c*this.o*Math.pow(2,e-this.a)};function z(b){var a=Math.floor(b);b-=a;return.5>b?a:.5<b?a+1:a%2?a+1:a}
function A(b){this.bits=b;this.f=8>b?1:Math.ceil(b/8);this.max=Math.pow(2,b)-1;this.min=0;b=8-((b-1|7)+1-b);this.s=Math.pow(2,0<b?b:8)-1}A.prototype.pack=function(b,a,c){c=void 0===c?0:c;if(a!==a||"number"!=typeof a)throw new TypeError;this.overflow(a);c=void 0===c?0:c;b[c]=(0>a?a+Math.pow(2,this.bits):a)&255;c++;for(var d=this.f,f=2;f<d;f++)b[c]=Math.floor(a/Math.pow(2,8*(f-1)))&255,c++;8<this.bits&&(b[c]=Math.floor(a/Math.pow(2,8*(this.f-1)))&this.s,c++);return c};
A.prototype.unpack=function(b,a){var c=this.i(b,void 0===a?0:a);this.overflow(c);return c};A.prototype.i=function(b,a){a=void 0===a?0:a;for(var c=0,d=0;d<this.f;d++)c+=b[a+d]*Math.pow(256,d);return c};A.prototype.overflow=function(b){if(b>this.max||b<this.min)throw new RangeError;};function B(b){A.call(this,b);this.max=Math.pow(2,this.bits)/2-1;this.min=-this.max-1}B.prototype=l(A.prototype);B.prototype.constructor=B;
if(t)t(B,A);else for(var C in A)if("prototype"!=C)if(Object.defineProperties){var D=Object.getOwnPropertyDescriptor(A,C);D&&Object.defineProperty(B,C,D)}else B[C]=A[C];B.u=A.prototype;B.prototype.pack=function(b,a,c){return A.prototype.pack.call(this,b,a,void 0===c?0:c)};B.prototype.unpack=function(b,a){var c=A.prototype.i.call(this,b,void 0===a?0:a);c>this.max&&(c-=2*this.max+2);this.overflow(c);return c};
function E(b,a,c){if(a){if(!b||16!==b&&32!==b&&64!==b)throw Error("Unsupported type: float, bits: "+b);a=16===b?new y(5,11):32===b?new y(8,23):new y(11,52)}else{if(!b||1>b||53<b)throw Error("Unsupported type: int, bits: "+b);a=c?new B(b):new A(b)}this.h=a;this.offset=Math.ceil(b/8)}E.prototype.unpack=function(b,a){return this.h.unpack(b,void 0===a?0:a)};E.prototype.pack=function(b,a,c){return this.h.pack(b,a,void 0===c?0:c)};
function unpackString(b,a,c){c=void 0===c?b.length:c;var d=void 0===a?0:a;c=void 0===c?b.length:c;a="";for(d=void 0===d?0:d;d<c;){var f=128,e=191,h=!1,g=b[d++];if(0<=g&&127>=g)a+=String.fromCharCode(g);else{var k=0;194<=g&&223>=g?k=1:224<=g&&239>=g?(k=2,224===b[d]&&(f=160),237===b[d]&&(e=159)):240<=g&&244>=g?(k=3,240===b[d]&&(f=144),244===b[d]&&(e=143)):h=!0;g&=(1<<8-k-1)-1;for(var r=0;r<k;r++){if(b[d]<f||b[d]>e)h=!0;g=g<<6|b[d]&63;d++}h?a+=String.fromCharCode(65533):65535>=g?a+=String.fromCharCode(g):
(g-=65536,a+=String.fromCharCode((g>>10&1023)+55296,(g&1023)+56320))}}return a}function packString(b){var a=[];pack(b,a,0);return a}function packStringTo(b,a,c){return pack(b,a,void 0===c?0:c)}function packArrayTo(b,a,c,d){d=void 0===d?0:d;a=a||{};var f=new E(a.bits,a.fp,a.signed),e=0,h=d;try{for(var g=b.length;e<g;e++){if("number"!==typeof b[e])throw new TypeError;d=f.pack(c,b[e],d)}a.be&&x(c,f.offset,h,d)}catch(k){F(k,b[e],e)}return d}
function unpackArrayTo(b,a,c,d,f,e){d=void 0===d?0:d;f=void 0===f?b.length:f;e=void 0===e?!1:e;a=a||{};var h=new E(a.bits,a.fp,a.signed),g=h.offset,k=(f-d)%g;if(e&&(k||b.length<g))throw Error("Bad buffer length");f-=k;e=0;k=d;try{for(a.be&&x(b,g,d,f);k<f;k+=g,e++)c[e]=h.unpack(b,k);a.be&&x(b,g,d,f)}catch(r){F(r,b.slice(k,k+g),k)}}function packTo(b,a,c,d){return packArrayTo([b],a,c,void 0===d?0:d)}function packArray(b,a){var c=[];packArrayTo(b,a,c);return c}
function unpackArray(b,a,c,d,f){d=void 0===d?b.length:d;var e=[];unpackArrayTo(b,a,e,void 0===c?0:c,d,void 0===f?!1:f);return e}function F(b,a,c){b.message=b.constructor.name+" at index "+c+": "+a;throw b;}exports.pack=function(b,a){var c=[];packTo(b,a,c);return c};exports.packArray=packArray;exports.packArrayTo=packArrayTo;exports.packString=packString;exports.packStringTo=packStringTo;exports.packTo=packTo;
exports.unpack=function(b,a,c){c=void 0===c?0:c;return unpackArray(b,a,c,c+Math.ceil(a.bits/8),!0)[0]};exports.unpackArray=unpackArray;exports.unpackArrayTo=unpackArrayTo;exports.unpackString=unpackString;typeof module!=='undefined'?module.exports=exports :typeof define==='function'&&define.amd?define(['exports'],exports) :typeof global!=='undefined'?global.byteData=exports:null;return exports;})();
