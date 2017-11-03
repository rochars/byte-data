/*
 byte-data
 Bytes to and from numbers and strings.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/byte-data
*/
(function(h){function k(g){if(l[g])return l[g].a;var m=l[g]={X:g,K:!1,a:{}};h[g].call(m.a,m,m.a,k);m.K=!0;return m.a}var l={};k.W=h;k.T=l;k.l=function(g,h){k.m(g)||Object.defineProperty(g,"a",{configurable:!1,enumerable:!0,get:h})};k.U=function(g){var h=g&&g.S?function(){return g["default"]}:function(){return g};k.l(h,h);return h};k.m=function(g){return Object.prototype.hasOwnProperty.call(g,"a")};k.V="";return k(k.Y=1)})([function(h){function k(h){g[0]=h;return m[0]}var l=new Int8Array(4),g=new Int32Array(l.buffer,
0,1),m=new Float32Array(l.buffer,0,1);h.a=k;h.a.g=k;h.a.j=function(h){m[0]=h;return g[0]}},function(h,k,l){k=l(2);var g=l(3);window.findString=function(h,k){for(var d,b=0;b<h.length;b++)if(d=g.h(h.slice(b,b+k.length)),d==k)return b;return-1};window.stringToBytes=k.L;window.stringFromBytes=g.h;window.doubleTo8Bytes=k.c;window.floatTo8Bytes=k.c;window.floatTo4Bytes=k.s;window.intTo6Bytes=k.I;window.intTo5Bytes=k.H;window.intTo4Bytes=k.G;window.intTo3Bytes=k.F;window.intTo2Bytes=k.D;window.intTo1Byte=
k.C;window.intToNibble=k.J;h.a.i=k.i;window.floatFrom8Bytes=g.b;window.doubleFrom8Bytes=g.b;window.intFrom4Bytes=g.A;window.uIntFrom4Bytes=g.P;window.floatFrom4Bytes=g.o;window.intFrom3Bytes=g.w;window.uIntFrom3Bytes=g.O;window.intFrom2Bytes=g.v;window.uIntFrom2Bytes=g.N;window.intFrom1Byte=g.u;window.uIntFrom1Byte=g.M;window.intFromNibble=g.B;window.uIntFromNibble=g.R;h.a.f=g.f},function(h,k,l){function g(d,b,c){2==b&&8>d[c].length&&(d[c]=Array(9-d[c].length).join("0")+d[c])}function m(d){var b=
0;0>=d&&(b=2147483648,d=-d);var c=Math.floor(Math.log(d)/Math.log(2)),a=Math.floor(d/Math.pow(2,c)*Math.pow(2,52));d=a&4294967295;a/=Math.pow(2,32);return[b|c+1023<<20|a&1048575,d]}var n=l(0);h.a.c=function(d,b){b=void 0===b?10:b;var c=0,a=0,f=d.length,e=[];if(10==b)for(;c<f;)0==d[c]?(e=e.concat([0,0,0,0,0,0,0,0]),a+=8):(d[c]=m(d[c]),e[a++]=d[c][1]&255,e[a++]=d[c][1]>>>8&255,e[a++]=d[c][1]>>>16&255,e[a++]=d[c][1]>>>24&255,e[a++]=d[c][0]&255,e[a++]=d[c][0]>>>8&255,e[a++]=d[c][0]>>>16&255,e[a++]=d[c][0]>>>
24&255),c++;else for(;c<f;)0==d[c]?(e=e.concat([0,0,0,0,0,0,0,0]),a+=8):(d[c]=m(d[c]),e[a++]=(d[c][1]&255).toString(b),g(e,b,a-1),e[a++]=(d[c][1]>>>8&255).toString(b),g(e,b,a-1),e[a++]=(d[c][1]>>>16&255).toString(b),g(e,b,a-1),e[a++]=(d[c][1]>>>24&255).toString(b),g(e,b,a-1),e[a++]=(d[c][0]&255).toString(b),g(e,b,a-1),e[a++]=(d[c][0]>>>8&255).toString(b),g(e,b,a-1),e[a++]=(d[c][0]>>>16&255).toString(b),g(e,b,a-1),e[a++]=(d[c][0]>>>24&255).toString(b),g(e,b,a-1)),c++;return e};h.a.s=function(d,b){b=
void 0===b?10:b;var c=0,a=0,f=d.length,e=[];if(10==b)for(;c<f;)d[c]=n.j(d[c]),e[a++]=d[c]&255,e[a++]=d[c]>>>8&255,e[a++]=d[c]>>>16&255,e[a++]=d[c]>>>24&255,c++;else for(;c<f;)d[c]=n.j(d[c]),e[a++]=(d[c]&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>>8&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>>16&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>>24&255).toString(b),g(e,b,a-1),c++;return e};h.a.I=function(d,b){b=void 0===b?10:b;var c=0,a=0,f=d.length,e=[];if(10==b)for(;c<f;)e[a++]=d[c]&255,e[a++]=d[c]>>8&255,
e[a++]=d[c]>>16&255,e[a++]=d[c]>>24&255,e[a++]=d[c]/4294967296&255,e[a++]=d[c]/1099511627776&255,c++;else for(;c<f;)e[a++]=(d[c]&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>8&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>16&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>24&255).toString(b),g(e,b,a-1),e[a++]=(d[c]/4294967296&255).toString(b),g(e,b,a-1),e[a++]=(d[c]/1099511627776&255).toString(b),g(e,b,a-1),c++;return e};h.a.H=function(d,b){b=void 0===b?10:b;var c=0,a=0,f=d.length,e=[];if(10==b)for(;c<f;)e[a++]=
d[c]&255,e[a++]=d[c]>>8&255,e[a++]=d[c]>>16&255,e[a++]=d[c]>>24&255,e[a++]=d[c]/4294967296&255,c++;else for(;c<f;)e[a++]=(d[c]&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>8&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>16&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>24&255).toString(b),g(e,b,a-1),e[a++]=(d[c]/4294967296&255).toString(b),g(e,b,a-1),c++;return e};h.a.G=function(d,b){b=void 0===b?10:b;var c=0,a=0,f=d.length,e=[];if(10==b)for(;c<f;)e[a++]=d[c]&255,e[a++]=d[c]>>>8&255,e[a++]=d[c]>>>16&255,e[a++]=
d[c]>>>24&255,c++;else for(;c<f;)e[a++]=(d[c]&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>>8&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>>16&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>>24&255).toString(b),g(e,b,a-1),c++;return e};h.a.F=function(d,b){b=void 0===b?10:b;var c=0,a=0,f=d.length,e=[];if(10==b)for(;c<f;)e[a++]=d[c]&255,e[a++]=d[c]>>>8&255,e[a++]=d[c]>>>16&255,c++;else for(;c<f;)e[a++]=(d[c]&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>>8&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>>16&255).toString(b),
g(e,b,a-1),c++;return e};h.a.D=function(d,b){b=void 0===b?10:b;var c=0,a=0,f=d.length,e=[];if(10==b)for(;c<f;)e[a++]=d[c]&255,e[a++]=d[c]>>>8&255,c++;else for(;c<f;)e[a++]=(d[c]&255).toString(b),g(e,b,a-1),e[a++]=(d[c]>>>8&255).toString(b),g(e,b,a-1),c++;return e};h.a.C=function(d,b){b=void 0===b?10:b;var c=0,a=0,f=d.length,e=[];if(10==b)for(;c<f;)e[a++]=d[c]&255,c++;else for(;c<f;)e[a++]=(d[c]&255).toString(b),g(e,b,a-1),c++;return e};h.a.J=function(d,b){b=void 0===b?10:b;var c=0,a=0,f=d.length,
e=[];if(10==b)for(;c<f;)e[a++]=d[c]&15,c++;else for(;c<f;)e[a++]=(d[c]&15).toString(b),g(e,b,a-1),2==b&&(e[a-1]=e[a-1].slice(4,8)),c++;return e};h.a.i=function(d,b){var c=0,a=0,f=d.length,e=[];if(10==(void 0===b?10:b))for(;c<f;)e[a++]=d[c]?1:0,c++;else for(;c<f;)e[a++]=d[c]?"1":"0",c++;return e};h.a.L=function(d,b){b=void 0===b?10:b;var c=0,a=0,f=d.length,e=[];if(10==b)for(;c<f;)e[a++]=d.charCodeAt(c),g(e,b,a-1),c++;else for(;c<f;)e[a++]=d.charCodeAt(c).toString(b),c++;return e}},function(h,k,l){function g(d){if("0,0,0,0,0,0,0,0"==
d.toString())return 0;for(var b="",c,a=0,f=d.length;a<f;){for(c=d[a].toString(2);8>c.length;)c="0"+c;b=c+b;a++}d="1"+b.substr(12,52);c=1;for(a=f=0;a<d.length;)f+=c*parseInt(d.charAt(a),10),c/=2,a++;b=("1"==b.charAt(0)?-1:1)*f*Math.pow(2,parseInt(b.substr(1,11),2)-1023);return 2===b?0:b}function m(d,b){b=void 0===b?10:b;if(10==b)return[].slice.call(d);for(var c=[],a=0,f=d.length;a<f;)c[a]=parseInt(d[a],b),a++;return c}var n=l(0);h.a.f=function(d,b){b=void 0===b?10:b;for(var c=[],a=0,f=d.length;a<f;)c[a]=
parseInt(parseInt(d[a],b),2),a++;return c};h.a.B=function(d,b){b=void 0===b?10:b;var c=[],a=0,f=d.length;if(10==b)for(;a<f;)c[a]=d[a],7<c[a]&&(c[a]-=16),a++;else for(;a<f;)c[a]=parseInt(d[a],b),7<c[a]&&(c[a]-=16),a++;return c};h.a.R=m;h.a.u=function(d,b){b=void 0===b?10:b;var c=[],a=0,f=d.length;if(10==b)for(;a<f;)c[a]=d[a],127<c[a]&&(c[a]-=256),a++;else for(;a<f;)c[a]=parseInt(d[a],b),127<c[a]&&(c[a]-=256),a++;return c};h.a.M=m;h.a.v=function(d,b){b=void 0===b?10:b;var c=[],a=0,f=0,e=d.length;if(10==
b)for(;a<e;)c[f]=d[1+a]<<8|d[a],d[1+a]&128&&(c[f]|=4294901760),f++,a+=2;else for(;a<e;)c[f]=parseInt(d[1+a],b)<<8|parseInt(d[a],b),parseInt(d[1+a],b)&128&&(c[f]|=4294901760),f++,a+=2;return c};h.a.N=function(d,b){b=void 0===b?10:b;var c=[],a=0,f=0,e=d.length;if(10==b)for(;a<e;)c[f]=d[1+a]<<8|d[a],f++,a+=2;else for(;a<e;)c[f]=parseInt(d[1+a],b)<<8|parseInt(d[a],b),f++,a+=2;return c};h.a.w=function(d,b){b=void 0===b?10:b;var c=[],a=0,f=0,e=d.length;if(10==b)for(;a<e;)c[f]=d[2+a]<<16|d[1+a]<<8|d[a],
c[f]=0<(c[f]&8388608)?c[f]|4278190080:c[f]&16777215,f++,a+=3;else for(;a<e;)c[f]=parseInt(d[2+a],b)<<16|parseInt(d[1+a],b)<<8|parseInt(d[a],b),c[f]=0<(c[f]&8388608)?c[f]|4278190080:c[f]&16777215,f++,a+=3;return c};h.a.O=function(d,b){b=void 0===b?10:b;var c=[],a=0,f=0,e=d.length;if(10==b)for(;a<e;)c[f]=d[2+a]<<16|d[1+a]<<8|d[a],f++,a+=3;else for(;a<e;)c[f]=parseInt(d[2+a],b)<<16|parseInt(d[1+a],b)<<8|parseInt(d[a],b),f++,a+=3;return c};h.a.A=function(d,b){b=void 0===b?10:b;var c=[],a=0,f=0,e=d.length;
if(10==b)for(;a<e;)c[f]=d[3+a]<<24|d[2+a]<<16|d[1+a]<<8|d[a],0>(c[f]&2147483648)&&(c[f]&=4294967295),f++,a+=4;else for(;a<e;)c[f]=parseInt(d[3+a],b)<<24|parseInt(d[2+a],b)<<16|parseInt(d[1+a],b)<<8|parseInt(d[a],b),0>(c[f]&2147483648)&&(c[f]&=4294967295),f++,a+=4;return c};h.a.P=function(d,b){b=void 0===b?10:b;var c=[],a=0,f=0,e=d.length;if(10==b)for(;a<e;)c[f]=d[3+a]<<24|d[2+a]<<16|d[1+a]<<8|d[a],c[f]>>>=0,f++,a+=4;else for(;a<e;)c[f]=parseInt(d[3+a],b)<<24|parseInt(d[2+a],b)<<16|parseInt(d[1+a],
b)<<8|parseInt(d[a],b),c[f]>>>=0,f++,a+=4;return c};h.a.o=function(d,b){b=void 0===b?10:b;var c=[],a=0,f=0,e=d.length;if(10==b)for(;a<e;)c[f]=n.g(d[3+a]<<24|d[2+a]<<16|d[1+a]<<8|d[a]),f++,a+=4;else for(;a<e;)c[f]=n.g(parseInt(d[3+a],b)<<24|parseInt(d[2+a],b)<<16|parseInt(d[1+a],b)<<8|parseInt(d[a],b)),f++,a+=4;return c};h.a.b=function(d,b){b=void 0===b?10:b;var c=[],a=0,f=0,e=d.length;if(10==b)for(;a<e;)c[f]=g([d[a],d[1+a],d[2+a],d[3+a],d[4+a],d[5+a],d[6+a],d[7+a]]),f++,a+=8;else for(;a<e;)c[f]=g([parseInt(d[a],
b),parseInt(d[a+1],b),parseInt(d[a+2],b),parseInt(d[a+3],b),parseInt(d[a+4],b),parseInt(d[a+5],b),parseInt(d[a+6],b),parseInt(d[a+7],b)]),f++,a+=8;return c};h.a.h=function(d,b){b=void 0===b?10:b;var c="",a=0,f=d.length;if(10==b)for(;a<f;)c+=String.fromCharCode(d[a]),a++;else for(;a<f;)c+=String.fromCharCode(parseInt(d[a],b)),a++;return c}}]);
