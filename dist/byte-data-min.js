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
(function(b){function f(g){if(e[g])return e[g].a;var a=e[g]={L:g,v:!1,a:{}};b[g].call(a.a,a,a.a,f);a.v=!0;return a.a}var e={};f.K=b;f.H=e;f.b=function(b,a){f.c(b)||Object.defineProperty(b,"a",{configurable:!1,enumerable:!0,get:a})};f.I=function(b){var a=b&&b.G?function(){return b["default"]}:function(){return b};f.b(a,a);return a};f.c=function(b){return Object.prototype.hasOwnProperty.call(b,"a")};f.J="";return f(f.M=1)})([function(b){function f(d){g[0]=d;return a[0]}var e=new Int8Array(4),g=new Int32Array(e.buffer,
0,1),a=new Float32Array(e.buffer,0,1);b.a=f;b.a.w=f;b.a.F=function(d){a[0]=d;return g[0]}},function(b,f,e){b=e(2);e=e(3);window.floatTo8Bytes=b.i;window.floatTo4Bytes=b.h;window.intTo4Bytes=b.u;window.intTo3Bytes=b.s;window.intTo2Bytes=b.o;window.uIntTo1Byte=b.D;window.stringToBytes=b.B;window.uIntFrom1Byte=e.C;window.intFrom2Bytes=e.j;window.intFrom3Bytes=e.l;window.intFrom4Bytes=e.m;window.floatFrom4Bytes=e.f;window.floatFrom8Bytes=e.g;window.stringFromBytes=e.A},function(b,f,e){var g=e(0);b.a.i=
function(a){for(var d=0,c=0,m=a.length,b=[];d<m;){var e=a[d],f=0,g=0;switch(e){case 0:f=1073741824;break;default:0>=e&&(f=2147483648,e=-e);var l=Math.floor(Math.log(e)/Math.log(2));e=Math.floor(e/Math.pow(2,l)*Math.pow(2,52));g=e&4294967295;e/=Math.pow(2,32);f=f|l+1023<<20|e&1048575}a[d]=[f,g];b[c++]=a[d][1]&255;b[c++]=a[d][1]>>8&255;b[c++]=a[d][1]>>16&255;b[c++]=a[d][1]>>24&255;b[c++]=a[d][0]>>32&255;b[c++]=a[d][0]>>40&255;b[c++]=a[d][0]>>48&255;b[c++]=a[d][0]>>56&255;d++}return b};b.a.h=function(a){for(var d=
0,c=0,b=a.length,e=[];d<b;)a[d]=g.F(a[d]),e[c++]=a[d]&255,e[c++]=a[d]>>8&255,e[c++]=a[d]>>16&255,e[c++]=a[d]>>24&255,d++;return e};b.a.u=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a[d]&255,e[c++]=a[d]>>8&255,e[c++]=a[d]>>16&255,e[c++]=a[d]>>24&255,d++;return e};b.a.s=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a[d]&255,e[c++]=a[d]>>8&255,e[c++]=a[d]>>16&255,d++;return e};b.a.o=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a[d]&255,e[c++]=a[d]>>8&255,d++;return e};
b.a.D=function(a){return a.slice()};b.a.B=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a.charCodeAt(d),d++;return e}},function(b,f,e){var g=e(0);b.a.C=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[c],b++,c++;return d};b.a.j=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[1+c]<<8|a[c],a[1+c]&128&&(d[b]|=4294901760),b++,c+=2;return d};b.a.N=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[1+c]<<8|a[c],b++,c+=2;return d};b.a.l=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=
a[2+c]<<16|a[1+c]<<8|a[c],d[b]=0<(d[b]&8388608)?d[b]|4278190080:d[b]&16777215,b++,c+=3;return d};b.a.O=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[2+c]<<16|a[1+c]<<8|a[c],b++,c+=3;return d};b.a.m=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c],d[b]=0<(d[b]&2147483648)?d[b]|0:d[b]&4294967295,b++,c+=4;return d};b.a.P=function(a){for(var b=[],c=0,e=0;c<a.length;)b[e]=a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c],e++,c+=4;return b};b.a.f=function(a){for(var b=[],
c=0,e=0;c<a.length;)b[e]=g.w(a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c]),e++,c+=4;return b};b.a.g=function(a){for(var b=[],c=0,e=0;c<a.length;){for(var f,g=[a[c],a[1+c],a[2+c],a[3+c],a[4+c],a[5+c],a[6+c],a[7+c]],h="",k=0,l=g.length;k<l;){for(f=g[k].toString(2);8>f.length;)f="0"+f;h=f+h;k++}f="1"+h.substr(12,52);g=1;for(k=l=0;k<f.length;)l+=g*parseInt(f.charAt(k),10),g/=2,k++;h=("1"==h.charAt(0)?-1:1)*l*Math.pow(2,parseInt(h.substr(1,11),2)-1023);b[e]=2===h?0:h;e++;c+=8}return b};b.a.A=function(a){for(var b=
"",c=0;c<a.length;)b+=String.fromCharCode(a[c]),c++;return b}}]);
