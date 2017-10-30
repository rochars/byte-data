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
(function(b){function h(g){if(f[g])return f[g].a;var a=f[g]={O:g,v:!1,a:{}};b[g].call(a.a,a,a.a,h);a.v=!0;return a.a}var f={};h.N=b;h.K=f;h.b=function(b,a){h.c(b)||Object.defineProperty(b,"a",{configurable:!1,enumerable:!0,get:a})};h.L=function(b){var a=b&&b.J?function(){return b["default"]}:function(){return b};h.b(a,a);return a};h.c=function(b){return Object.prototype.hasOwnProperty.call(b,"a")};h.M="";return h(h.P=1)})([function(b){function h(d){g[0]=d;return a[0]}var f=new Int8Array(4),g=new Int32Array(f.buffer,
0,1),a=new Float32Array(f.buffer,0,1);b.a=h;b.a.w=h;b.a.I=function(d){a[0]=d;return g[0]}},function(b,h,f){b=f(2);f=f(3);window.floatTo8Bytes=b.i;window.floatTo4Bytes=b.h;window.intTo4Bytes=b.u;window.intTo3Bytes=b.s;window.intTo2Bytes=b.o;window.uIntTo1Byte=b.H;window.stringToBytes=b.B;window.uIntFrom1Byte=f.C;window.intFrom2Bytes=f.j;window.uIntFrom2Bytes=f.D;window.intFrom3Bytes=f.l;window.uIntFrom3Bytes=f.F;window.intFrom4Bytes=f.m;window.uIntFrom4Bytes=f.G;window.floatFrom4Bytes=f.f;window.floatFrom8Bytes=
f.g;window.stringFromBytes=f.A},function(b,h,f){var g=f(0);b.a.i=function(a){for(var d=0,c=0,m=a.length,e=[];d<m;){if(0==a[d])e[c++]=0,e[c++]=0,e[c++]=0,e[c++]=0,e[c++]=0,e[c++]=0,e[c++]=0,e[c++]=0;else{var b=a[d],f=0;0>=b&&(f=2147483648,b=-b);var h=Math.floor(Math.log(b)/Math.log(2)),g=Math.floor(b/Math.pow(2,h)*Math.pow(2,52));b=g&4294967295;g/=Math.pow(2,32);f=f|h+1023<<20|g&1048575;a[d]=[f,b];e[c++]=a[d][1]&255;e[c++]=a[d][1]>>8&255;e[c++]=a[d][1]>>16&255;e[c++]=a[d][1]>>24&255;e[c++]=a[d][0]>>
32&255;e[c++]=a[d][0]>>40&255;e[c++]=a[d][0]>>48&255;e[c++]=a[d][0]>>56&255}d++}return e};b.a.h=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)a[d]=g.I(a[d]),e[c++]=a[d]&255,e[c++]=a[d]>>8&255,e[c++]=a[d]>>16&255,e[c++]=a[d]>>24&255,d++;return e};b.a.u=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a[d]&255,e[c++]=a[d]>>8&255,e[c++]=a[d]>>16&255,e[c++]=a[d]>>24&255,d++;return e};b.a.s=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a[d]&255,e[c++]=a[d]>>8&255,e[c++]=a[d]>>16&255,
d++;return e};b.a.o=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a[d]&255,e[c++]=a[d]>>8&255,d++;return e};b.a.H=function(a){return a.slice()};b.a.B=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a.charCodeAt(d),d++;return e}},function(b,h,f){var g=f(0);b.a.C=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[c],b++,c++;return d};b.a.j=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[1+c]<<8|a[c],a[1+c]&128&&(d[b]|=4294901760),b++,c+=2;return d};b.a.D=function(a){for(var d=
[],c=0,b=0;c<a.length;)d[b]=a[1+c]<<8|a[c],b++,c+=2;return d};b.a.l=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[2+c]<<16|a[1+c]<<8|a[c],d[b]=0<(d[b]&8388608)?d[b]|4278190080:d[b]&16777215,b++,c+=3;return d};b.a.F=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[2+c]<<16|a[1+c]<<8|a[c],b++,c+=3;return d};b.a.m=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c],0>(d[b]&2147483648)&&(d[b]&=4294967295),b++,c+=4;return d};b.a.G=function(a){for(var b=[],c=
0,f=0;c<a.length;)b[f]=a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c],b[f]>>>=0,f++,c+=4;return b};b.a.f=function(a){for(var b=[],c=0,f=0;c<a.length;)b[f]=g.w(a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c]),f++,c+=4;return b};b.a.g=function(a){for(var b=[],c=0,f=0;c<a.length;){var e,h=[a[c],a[1+c],a[2+c],a[3+c],a[4+c],a[5+c],a[6+c],a[7+c]];if("0,0,0,0,0,0,0,0"==h.toString())var g=0;else{g="";for(var k=0,l=h.length;k<l;){for(e=h[k].toString(2);8>e.length;)e="0"+e;g=e+g;k++}e="1"+g.substr(12,52);h=1;for(k=l=0;k<e.length;)l+=
h*parseInt(e.charAt(k),10),h/=2,k++;g=("1"==g.charAt(0)?-1:1)*l*Math.pow(2,parseInt(g.substr(1,11),2)-1023);g=2===g?0:g}b[f]=g;f++;c+=8}return b};b.a.A=function(a){for(var b="",c=0;c<a.length;)b+=String.fromCharCode(a[c]),c++;return b}}]);
