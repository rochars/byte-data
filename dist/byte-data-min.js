/*
 byte-data
 Bytes to and from numbers and strings.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/byte-data

 byte-data is licensed as follows:

Copyright (c) 2017 Rafael da Silva Rocha.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


int-bits is licensed as follows:

The MIT License (MIT) Copyright (c) 2015 Jam3

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
(function(a){function d(g){if(f[g])return f[g].a;var b=f[g]={O:g,B:!1,a:{}};a[g].call(b.a,b,b.a,d);b.B=!0;return b.a}var f={};d.N=a;d.K=f;d.g=function(a,b){d.h(a)||Object.defineProperty(a,"a",{configurable:!1,enumerable:!0,get:b})};d.L=function(a){var b=a&&a.J?function(){return a["default"]}:function(){return a};d.g(b,b);return b};d.h=function(a){return Object.prototype.hasOwnProperty.call(a,"a")};d.M="";return d(d.P=1)})([function(a){function d(e){g[0]=e;return b[0]}var f=new Int8Array(4),g=new Int32Array(f.buffer,
0,1),b=new Float32Array(f.buffer,0,1);a.a=d;a.a.C=d;a.a.I=function(e){b[0]=e;return g[0]}},function(a,d,f){d=f(2);f=f(3);window.floatTo8Bytes=d.m;window.floatTo4Bytes=d.l;window.intTo4Bytes=d.A;window.intTo3Bytes=d.w;window.intTo2Bytes=d.v;window.uIntTo1Byte=d.H;window.stringToBytes=d.F;window.uIntFrom1Byte=f.G;window.intFrom2Bytes=f.o;a.a.b=f.b;window.intFrom3Bytes=f.s;a.a.c=f.c;window.intFrom4Bytes=f.u;a.a.f=f.f;window.floatFrom4Bytes=f.i;window.floatFrom8Bytes=f.j;window.stringFromBytes=f.D},function(a,
d,f){var g=f(0);a.a.m=function(b){return new Uint8Array((new Float64Array(b)).buffer)};a.a.l=function(b){for(var e=0,c=0,m=b.length,a=[];e<m;)b[e]=g.I(b[e]),a[c++]=b[e]&255,a[c++]=b[e]>>8&255,a[c++]=b[e]>>16&255,a[c++]=b[e]>>24&255,e++;return a};a.a.A=function(b){for(var e=0,c=0,m=b.length,a=[];e<m;)a[c++]=b[e]&255,a[c++]=b[e]>>8&255,a[c++]=b[e]>>16&255,a[c++]=b[e]>>24&255,e++;return a};a.a.w=function(b){for(var e=0,c=0,a=b.length,d=[];e<a;)d[c++]=b[e]&255,d[c++]=b[e]>>8&255,d[c++]=b[e]>>16&255,e++;
return d};a.a.v=function(b){for(var e=0,c=0,a=b.length,d=[];e<a;)d[c++]=b[e]&255,d[c++]=b[e]>>8&255,e++;return d};a.a.H=function(b){return b.slice()};a.a.F=function(b){for(var e=0,c=0,a=b.length,d=[];e<a;)d[c++]=b.charCodeAt(e),e++;return d}},function(a,d,f){var g=f(0);a.a.G=function(b){for(var e=[],c=0,a=0;c<b.length;)e[a]=b[c],a++,c++;return e};a.a.o=function(b){for(var e=[],c=0,a=0;c<b.length;)e[a]=b[1+c]<<8|b[c],b[1+c]&128&&(e[a]|=4294901760),a++,c+=2;return e};a.a.b=function(b){for(var e=[],
c=0,a=0;c<b.length;)e[a]=b[1+c]<<8|b[c],a++,c+=2;return e};a.a.s=function(b){for(var e=[],c=0,a=0;c<b.length;)e[a]=b[2+c]<<16|b[1+c]<<8|b[c],e[a]=0<(e[a]&8388608)?e[a]|4278190080:e[a]&16777215,a++,c+=3;return e};a.a.c=function(b){for(var a=[],c=0,d=0;c<b.length;)a[d]=b[2+c]<<16|b[1+c]<<8|b[c],d++,c+=3;return a};a.a.u=function(b){for(var a=[],c=0,d=0;c<b.length;)a[d]=b[3+c]<<24|b[2+c]<<16|b[1+c]<<8|b[c],0>(a[d]&2147483648)&&(a[d]&=4294967295),d++,c+=4;return a};a.a.f=function(b){for(var a=[],c=0,d=
0;c<b.length;)a[d]=b[3+c]<<24|b[2+c]<<16|b[1+c]<<8|b[c],a[d]>>>=0,d++,c+=4;return a};a.a.i=function(b){for(var a=[],c=0,d=0;c<b.length;)a[d]=g.C(b[3+c]<<24|b[2+c]<<16|b[1+c]<<8|b[c]),d++,c+=4;return a};a.a.j=function(b){for(var a=[],c=0,d=0;c<b.length;){for(var f,g=[b[c],b[1+c],b[2+c],b[3+c],b[4+c],b[5+c],b[6+c],b[7+c]],h="",k=0,l=g.length;k<l;){for(f=g[k].toString(2);8>f.length;)f="0"+f;h=f+h;k++}f="1"+h.substr(12,52);g=1;for(k=l=0;k<f.length;)l+=g*parseInt(f.charAt(k),10),g/=2,k++;h=("1"==h.charAt(0)?
-1:1)*l*Math.pow(2,parseInt(h.substr(1,11),2)-1023);a[d]=2===h?0:h;d++;c+=8}return a};a.a.D=function(b){for(var a="",c=0;c<b.length;)a+=String.fromCharCode(b[c]),c++;return a}}]);
