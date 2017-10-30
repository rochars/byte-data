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
(function(b){function f(h){if(g[h])return g[h].a;var a=g[h]={O:h,B:!1,a:{}};b[h].call(a.a,a,a.a,f);a.B=!0;return a.a}var g={};f.N=b;f.K=g;f.g=function(b,a){f.h(b)||Object.defineProperty(b,"a",{configurable:!1,enumerable:!0,get:a})};f.L=function(b){var a=b&&b.J?function(){return b["default"]}:function(){return b};f.g(a,a);return a};f.h=function(b){return Object.prototype.hasOwnProperty.call(b,"a")};f.M="";return f(f.P=1)})([function(b){function f(d){h[0]=d;return a[0]}var g=new Int8Array(4),h=new Int32Array(g.buffer,
0,1),a=new Float32Array(g.buffer,0,1);b.a=f;b.a.C=f;b.a.I=function(d){a[0]=d;return h[0]}},function(b,f,g){f=g(2);g=g(3);window.floatTo8Bytes=f.m;window.floatTo4Bytes=f.l;window.intTo4Bytes=f.A;window.intTo3Bytes=f.w;window.intTo2Bytes=f.v;window.uIntTo1Byte=f.H;window.stringToBytes=f.F;window.uIntFrom1Byte=g.G;window.intFrom2Bytes=g.o;b.a.b=g.b;window.intFrom3Bytes=g.s;b.a.c=g.c;window.intFrom4Bytes=g.u;b.a.f=g.f;window.floatFrom4Bytes=g.i;window.floatFrom8Bytes=g.j;window.stringFromBytes=g.D},function(b,
f,g){var h=g(0);b.a.m=function(a){for(var d=0,c=0,m=a.length,e=[];d<m;){var b=a[d],f=0,g=0;switch(b){case 0:f=1073741824;break;default:0>=b&&(f=2147483648,b=-b);var h=Math.floor(Math.log(b)/Math.log(2));b=Math.floor(b/Math.pow(2,h)*Math.pow(2,52));g=b&4294967295;b/=Math.pow(2,32);f=f|h+1023<<20|b&1048575}a[d]=[f,g];e[c++]=a[d][1]&255;e[c++]=a[d][1]>>8&255;e[c++]=a[d][1]>>16&255;e[c++]=a[d][1]>>24&255;e[c++]=a[d][0]>>32&255;e[c++]=a[d][0]>>40&255;e[c++]=a[d][0]>>48&255;e[c++]=a[d][0]>>56&255;d++}return e};
b.a.l=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)a[d]=h.I(a[d]),e[c++]=a[d]&255,e[c++]=a[d]>>8&255,e[c++]=a[d]>>16&255,e[c++]=a[d]>>24&255,d++;return e};b.a.A=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a[d]&255,e[c++]=a[d]>>8&255,e[c++]=a[d]>>16&255,e[c++]=a[d]>>24&255,d++;return e};b.a.w=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a[d]&255,e[c++]=a[d]>>8&255,e[c++]=a[d]>>16&255,d++;return e};b.a.v=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a[d]&255,e[c++]=
a[d]>>8&255,d++;return e};b.a.H=function(a){return a.slice()};b.a.F=function(a){for(var d=0,c=0,b=a.length,e=[];d<b;)e[c++]=a.charCodeAt(d),d++;return e}},function(b,f,g){var h=g(0);b.a.G=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[c],b++,c++;return d};b.a.o=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[1+c]<<8|a[c],a[1+c]&128&&(d[b]|=4294901760),b++,c+=2;return d};b.a.b=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[1+c]<<8|a[c],b++,c+=2;return d};b.a.s=function(a){for(var d=[],
c=0,b=0;c<a.length;)d[b]=a[2+c]<<16|a[1+c]<<8|a[c],d[b]=0<(d[b]&8388608)?d[b]|4278190080:d[b]&16777215,b++,c+=3;return d};b.a.c=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[2+c]<<16|a[1+c]<<8|a[c],b++,c+=3;return d};b.a.u=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c],0>(d[b]&2147483648)&&(d[b]&=4294967295),b++,c+=4;return d};b.a.f=function(a){for(var d=[],c=0,b=0;c<a.length;)d[b]=a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c],d[b]>>>=0,b++,c+=4;return d};b.a.i=
function(a){for(var b=[],c=0,f=0;c<a.length;)b[f]=h.C(a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c]),f++,c+=4;return b};b.a.j=function(a){for(var b=[],c=0,f=0;c<a.length;){for(var e,g=[a[c],a[1+c],a[2+c],a[3+c],a[4+c],a[5+c],a[6+c],a[7+c]],h="",k=0,l=g.length;k<l;){for(e=g[k].toString(2);8>e.length;)e="0"+e;h=e+h;k++}e="1"+h.substr(12,52);g=1;for(k=l=0;k<e.length;)l+=g*parseInt(e.charAt(k),10),g/=2,k++;h=("1"==h.charAt(0)?-1:1)*l*Math.pow(2,parseInt(h.substr(1,11),2)-1023);b[f]=2===h?0:h;f++;c+=8}return b};
b.a.D=function(a){for(var b="",c=0;c<a.length;)b+=String.fromCharCode(a[c]),c++;return b}}]);
