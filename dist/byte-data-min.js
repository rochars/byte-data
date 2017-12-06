/*
 byte-data
 Readable data to and from byte buffers.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/byte-data

 endianness
 Swap endianness in byte arrays.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/endianness

*/
for(var q="function"==typeof Object.defineProperties?Object.defineProperty:function(f,m,l){f!=Array.prototype&&f!=Object.prototype&&(f[m]=l.value)},r="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,t=["Object","assign"],u=0;u<t.length-1;u++){var v=t[u];v in r||(r[v]={});r=r[v]}
var w=t[t.length-1],x=r[w],y=x?x:function(f,m){for(var l=1;l<arguments.length;l++){var k=arguments[l];if(k)for(var h in k)Object.prototype.hasOwnProperty.call(k,h)&&(f[h]=k[h])}return f};y!=x&&null!=y&&q(r,w,{configurable:!0,writable:!0,value:y});
(function(f){function m(k){if(l[k])return l[k].a;var h=l[k]={P:k,I:!1,a:{}};f[k].call(h.a,h,h.a,m);h.I=!0;return h.a}var l={};m.u=f;m.l=l;m.c=function(k,h){m.g(k)||Object.defineProperty(k,"a",{configurable:!1,enumerable:!0,get:h})};m.m=function(k){var h=k&&k.O?function(){return k["default"]}:function(){return k};m.c(h,h);return h};m.g=function(k){return Object.prototype.hasOwnProperty.call(k,"a")};m.s="";return m(m.R=2)})([function(f,m,l){function k(b,e,a){b[a]=h(b[a],e)}function h(b,e){var d=b.length+
1;2==e?d=8:16==e&&(d=2);return a(b,d)}function c(b,e,a){2==e&&4>b[a].length&&(b[a]=Array(5-b[a].length).join("0")+b[a])}function p(b,e,a){(2==e||16==e)&&2>b[a].length&&(b[a]="0"+b[a])}function a(b,e){for(;b.length<e;)b="0"+b;return b}function n(b,e,a){a=void 0===a?k:a;if(10!=e)for(var d=0,n=b.length;d<n;)b[d]=b[d].toString(e),a(b,e,d),d++}var g=l(4),e=l(1);f.a.v=function(b,e){e.D&&g(b,e.offset)};f.a.K=function(b,e,a){4==e?n(b,a,c):2==e?n(b,a,p):1==e?n(b,a,function(){}):n(b,a)};f.a.padding=k;f.a.T=
c;f.a.S=p;f.a.F=h;f.a.J=a;f.a.f=function(b,a,n){b=Object.assign(new e({}),b);b.h=a;b.A=n;return b};f.a.N=function(b){Array.isArray(b)||"string"==typeof b||(b=[b]);return b}},function(f,m,l){function k(c){this.b=c.bits;this.char=c["char"];this.c=c["float"];this.D=c.be;this.u=this.c?!0:c.signed;this.A=!0;this.C=this.w=null;this.offset=0;this.h=10;this.min=-Infinity;this.max=Infinity;this.g()}var h=l(5);k.prototype.sign=function(c){c>this.max&&(c-=2*this.max+2);return c};k.prototype.overflow=function(c){c>
this.max?c=this.max:c<this.min&&(c=this.min);return c};k.prototype.g=function(){this.offset=8>this.b?1:this.b/8;this.m();this.s();this.c||this.l()};k.prototype.m=function(){this.w=this.char?h.i.readChar:h.i["read"+(8>this.b?8:this.b)+"Bit"+(this.c?"Float":"")]};k.prototype.s=function(){this.C=this.char?h.j.writeString:h.j["write"+this.b+"Bit"+(this.c?"Float":"")]};k.prototype.l=function(){var c=Math.pow(2,this.b);this.u?(this.max=c/2-1,this.min=c/2*-1):(this.max=c-1,this.min=0)};f.a=k},function(f,
m,l){function k(a,g,e){e=p.f(g,void 0===e?10:e,!0);a=e.char?a.slice(0,g.b/8):a;return c.B(p.N(a),e)}function h(a,g,e){return c.o(a,p.f(g,void 0===e?10:e,!0))}var c=l(3),p=l(0),a=l(1);window.byteData=window.byteData?window.byteData:{};window.byteData.pack=k;window.byteData.unpack=h;window.byteData.packArray=function(a,g,e){return c.B(a,p.f(g,void 0===e?10:e,!1))};window.byteData.unpackArray=function(a,g,e){return c.o(a,p.f(g,void 0===e?10:e,!1))};window.byteData.unpackStruct=function(a,c,e){e=void 0===
e?10:e;for(var b=0,d=0;d<c.length;d++)b+=c[d].b/8;if(a.length<b)return[];b=[];for(var g=d=0;d<c.length;){var n=8>c[d].b?1:c[d].b/8;b=b.concat(h(a.slice(g,g+n),c[d],e));g+=n;d++}return b};window.byteData.packStruct=function(a,c,e){e=void 0===e?10:e;if(a.length<c.length)return[];for(var b=[],d=0;d<c.length;d++)b=b.concat(k(a[d],c[d],e));return b};window.byteData.findString=function(c,g){for(var e,b=0;b<c.length;b++)if(e=h(c.slice(b,b+g.length+1),new a({bits:8*g.length,"char":!0})),e==g)return b;return-1};
window.byteData.Type=a;window.byteData.chr=new a({bits:8,"char":!0});window.byteData.fourCC=new a({bits:32,"char":!0});window.byteData.bool=new a({bits:1});window.byteData.int2=new a({bits:2,signed:!0});window.byteData.uInt2=new a({bits:2});window.byteData.int4=new a({bits:4,signed:!0});window.byteData.uInt4=new a({bits:4});window.byteData.int8=new a({bits:8,signed:!0});window.byteData.uInt8=new a({bits:8});window.byteData.int16=new a({bits:16,signed:!0});window.byteData.uInt16=new a({bits:16});window.byteData.float16=
new a({bits:16,"float":!0});window.byteData.int24=new a({bits:24,signed:!0});window.byteData.uInt24=new a({bits:24});window.byteData.int32=new a({bits:32,signed:!0});window.byteData.uInt32=new a({bits:32});window.byteData.float32=new a({bits:32,"float":!0});window.byteData.int40=new a({bits:40,signed:!0});window.byteData.uInt40=new a({bits:40});window.byteData.int48=new a({bits:48,signed:!0});window.byteData.uInt48=new a({bits:48});window.byteData.float64=new a({bits:64,"float":!0});window.byteData.int16BE=
new a({bits:16,signed:!0,be:!0});window.byteData.uInt16BE=new a({bits:16,be:!0});window.byteData.float16BE=new a({bits:16,"float":!0,be:!0});window.byteData.int24BE=new a({bits:24,signed:!0,be:!0});window.byteData.uInt24BE=new a({bits:24,be:!0});window.byteData.int32BE=new a({bits:32,signed:!0,be:!0});window.byteData.uInt32BE=new a({bits:32,be:!0});window.byteData.float32BE=new a({bits:32,"float":!0,be:!0});window.byteData.int40BE=new a({bits:40,signed:!0,be:!0});window.byteData.uInt40BE=new a({bits:40,
be:!0});window.byteData.int48BE=new a({bits:48,signed:!0,be:!0});window.byteData.uInt48BE=new a({bits:48,be:!0});window.byteData.float64BE=new a({bits:64,"float":!0,be:!0})},function(f,m,l){var k=l(0);f.a.B=function(h,c){for(var f=0,a=0,n=h.length,g=[];f<n;)a=c.C(g,c.overflow(h[f]),a),f++;k.v(g,c);k.K(g,c.b,c.h);return g};f.a.o=function(h,c){k.v(h,c);var f=c.h;if(10!=f)for(var a=0,n=h.length;a<n;)h[a]=parseInt(h[a],f),a++;f=[];a=0;for(n=h.length-(c.offset-1);a<n;)f.push(c.sign(c.w(h,a,c))),a+=c.offset;
c.char&&(f=f.join(""));h=f;c.A&&(h=c.char?h.slice(0,c.b/8):h[0]);return h}},function(f){f.a=function(f,l){for(var k=f.length,h=0;h<k;){for(var c=f,m=h,a=0,n=l-1,g=parseInt(l/2,10);a<g;){var e=c[m+a];c[m+a]=c[m+n];c[m+n]=e;a++;n--}h+=l}}},function(f,m,l){function k(a,b,d){--d;for(var e="";0<=d;)e+=h.F(a[d+b].toString(2),2),d--;return parseInt(e,2)}var h=l(0),c=l(6);m=new Int8Array(4);var p=new Int32Array(m.buffer,0,1),a=new Float32Array(m.buffer,0,1),n={read8Bit:function(a,b){return a[b]},read16Bit:function(a,
b){return a[1+b]<<8|a[b]},read16BitFloat:function(a,b){return c.G([a[b+1],a[b]])},read24Bit:function(a,b){return a[2+b]<<16|n.read16Bit(a,b)},read32Bit:function(a,b){return(a[3+b]<<24|n.read24Bit(a,b))>>>0},read32BitFloat:function(e,b){p[0]=n.read32Bit(e,b);return a[0]},read40Bit:function(a,b){return k(a,b,5)},read48Bit:function(a,b){return k(a,b,6)},read64BitFloat:function(a,b){return c.H(a.slice(b,b+8))},readChar:function(a,b,d){var e="",c=0;for(d=d.b/8;c<d;)e+=String.fromCharCode(a[b+c]),c++;return e}},
g={write64BitFloat:function(a,b,d){b=c.L(b);d=g.write32Bit(a,b[1],d);return g.write32Bit(a,b[0],d)},write48Bit:function(a,b,d){d=g.write40Bit(a,b,d);a[d++]=b/1099511627776&255;return d},write40Bit:function(a,b,d){d=g.write32Bit(a,b,d);a[d++]=b/4294967296&255;return d},write32BitFloat:function(e,b,d){a[0]=b;return d=g.write32Bit(e,p[0],d)},write32Bit:function(a,b,d){d=g.write24Bit(a,b,d);a[d++]=b>>>24&255;return d},write24Bit:function(a,b,d){d=g.write16Bit(a,b,d);a[d++]=b>>>16&255;return d},write16Bit:function(a,
b,d){a[d++]=b&255;a[d++]=b>>>8&255;return d},write16BitFloat:function(a,b,d){b=c.M(b);a[d]=b&255;a[d+1]=b>>>8&255;return d+2},write8Bit:function(a,b,d){a[d++]=b&255;return d},write4Bit:function(a,b,d){a[d++]=b&15;return d},write2Bit:function(a,b,d){a[d++]=0>b?b+4:b;return d},write1Bit:function(a,b,d){a[d++]=b?1:0;return d},writeString:function(a,b,d){a[d++]=b.charCodeAt(0);return d}};f.a.j=g;f.a.i=n},function(f,m,l){function k(a,c){c=void 0===c?!1:c;for(var g="",e=0,b=a.length;e<b;){var d=h.J(a[e].toString(2),
8);g=c?g+d:d+g;e++}return g}var h=l(0),c=new Float32Array(1),p=new Int32Array(c.buffer);f.a.G=function(a){a=parseInt(k(a,!0),2);var c=(a&31744)>>10,g=a&1023;return(c?Math.pow(2,c-15)*(1+g/1024):g/1024*.00006103515625)*(a>>15?-1:1)};f.a.H=function(a){if("0,0,0,0,0,0,0,0"==a.toString())return 0;a=k(a);for(var c="1"+a.substr(12,52),g=1,e=0,b=0;b<c.length;)e+=g*parseInt(c.charAt(b),10),g/=2,b++;return("1"==a.charAt(0)?-1:1)*e*Math.pow(2,parseInt(a.substr(1,11),2)-1023)};f.a.L=function(a){if(0==a)return[0,
0];var c=0;0>=a&&(c=2147483648,a=-a);var g=Math.floor(Math.log(a)/Math.log(2)),e=Math.floor(a/Math.pow(2,g)*Math.pow(2,52));a=e&4294967295;e/=Math.pow(2,32);return[c|g+1023<<20|e&1048575,a]};f.a.M=function(a){c[0]=a;var f=p[0];a=f>>16&32768;var g=f>>12&2047;f=f>>23&255;return 103>f?a:(a|f-112<<10|g>>1)+(g&1)}}]);
