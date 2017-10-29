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
(function(b){function g(h){if(f[h])return f[h].a;var a=f[h]={L:h,v:!1,a:{}};b[h].call(a.a,a,a.a,g);a.v=!0;return a.a}var f={};g.K=b;g.H=f;g.b=function(b,a){g.c(b)||Object.defineProperty(b,"a",{configurable:!1,enumerable:!0,get:a})};g.I=function(b){var a=b&&b.G?function(){return b["default"]}:function(){return b};g.b(a,a);return a};g.c=function(b){return Object.prototype.hasOwnProperty.call(b,"a")};g.J="";return g(g.M=1)})([function(b){function g(d){h[0]=d;return a[0]}var f=new Int8Array(4),h=new Int32Array(f.buffer,
0,1),a=new Float32Array(f.buffer,0,1);b.a=g;b.a.w=g;b.a.F=function(d){a[0]=d;return h[0]}},function(b,g,f){b=f(2);f=f(3);window.floatTo8Bytes=b.i;window.floatTo4Bytes=b.h;window.intTo4Bytes=b.u;window.intTo3Bytes=b.s;window.intTo2Bytes=b.o;window.uIntTo1Byte=b.D;window.stringToBytes=b.B;window.uIntFrom1Byte=f.C;window.intFrom2Bytes=f.j;window.intFrom3Bytes=f.l;window.intFrom4Bytes=f.m;window.floatFrom4Bytes=f.f;window.floatFrom8Bytes=f.g;window.stringFromBytes=f.A},function(b,g,f){var h=f(0);b.a.i=
function(a){for(var d=0,c=0,b=a.length,e=[];d<b;){var f=a[d],g=0,h=0;switch(f){case 0:g=1073741824;break;default:0>=f&&(g=2147483648,f=-f);var l=Math.floor(Math.log(f)/Math.log(2));f=Math.floor(f/Math.pow(2,l)*Math.pow(2,52));h=f&4294967295;f/=Math.pow(2,32);g=g|l+1023<<20|f&1048575}a[d]=[g,h];e[c++]=a[d][1]&255;e[c++]=a[d][1]>>8&255;e[c++]=a[d][1]>>16&255;e[c++]=a[d][1]>>24&255;e[c++]=a[d][0]>>32&255;e[c++]=a[d][0]>>40&255;e[c++]=a[d][0]>>48&255;e[c++]=a[d][0]>>56&255;d++}return e};b.a.h=function(a){for(var d=
0,c=0,b=a.length,e=[];d<b;)a[d]=h.F(a[d]),e[c++]=a[d]&255,e[c++]=a[d]>>8&255,e[c++]=a[d]>>16&255,e[c++]=a[d]>>24&255,d++;return e};b.a.u=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a[d]&255,e[c++]=a[d]>>8&255,e[c++]=a[d]>>16&255,e[c++]=a[d]>>24&255,d++;return e};b.a.s=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a[d]&255,e[c++]=a[d]>>8&255,e[c++]=a[d]>>16&255,d++;return e};b.a.o=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a[d]&255,e[c++]=a[d]>>8&255,d++;return e};
b.a.D=function(a){return a.slice()};b.a.B=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a.charCodeAt(d),d++;return e}},function(b,g,f){var h=f(0);b.a.C=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[c],b++,c++;return d};b.a.j=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[1+c]<<8|a[c],b++,c+=2;return d};b.a.l=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[2+c]<<16|a[1+c]<<8|a[c],b++,c+=3;return d};b.a.m=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[3+c]<<24|a[2+c]<<
16|a[1+c]<<8|a[c],b++,c+=4;return d};b.a.f=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=h.w(a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c]),b++,c+=4;return d};b.a.g=function(a){for(var b=[],c=0,f=0;c<a.length;){for(var e,g=[a[c],a[1+c],a[2+c],a[3+c],a[4+c],a[5+c],a[6+c],a[7+c]],h="",k=0,l=g.length;k<l;){for(e=g[k].toString(2);8>e.length;)e="0"+e;h=e+h;k++}e="1"+h.substr(12,52);g=1;for(k=l=0;k<e.length;)l+=g*parseInt(e.charAt(k),10),g/=2,k++;h=("1"==h.charAt(0)?-1:1)*l*Math.pow(2,parseInt(h.substr(1,11),
2)-1023);b[f]=2===h?0:h;f++;c+=8}return b};b.a.A=function(a){for(var b="",c=0;c<a.length;)b+=String.fromCharCode(a[c]),c++;return b}}]);
