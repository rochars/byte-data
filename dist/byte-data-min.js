/*
 byte-data
 Bytes to and from numbers and strings.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/byte-data
*/
(function(l){function m(h){if(k[h])return k[h].a;var g=k[h]={ka:h,T:!1,a:{}};l[h].call(g.a,g,g.a,m);g.T=!0;return g.a}var k={};m.ja=l;m.ga=k;m.A=function(h,g){m.B(h)||Object.defineProperty(h,"a",{configurable:!1,enumerable:!0,get:g})};m.ha=function(h){var g=h&&h.fa?function(){return h["default"]}:function(){return h};m.A(g,g);return g};m.B=function(h){return Object.prototype.hasOwnProperty.call(h,"a")};m.ia="";return m(m.la=2)})([function(l){function m(d){h[0]=d;return g[0]}var k=new Int8Array(4),
h=new Int32Array(k.buffer,0,1),g=new Float32Array(k.buffer,0,1);l.a=m;l.a.U=m;l.a.ea=function(d){g[0]=d;return h[0]}},function(l){function m(k,h,g){var d=k[g].length+1;2==h&&8>k[g].length?d=9:16==h&&(d=3);k[g].length<d-1&&(k[g]=Array(d-k[g].length).join("0")+k[g])}l.a.f=function(k,h){if(10!=h)for(var g=0,d=k.length;g<d;)k[g]=k[g].toString(h),m(k,h,g),g++};l.a.c=function(k,h){if(10!=h)for(var g=0,d=k.length;g<d;)k[g]=parseInt(k[g],h),g++};l.a.C=function(k){if("0,0,0,0,0,0,0,0"==k.toString())return 0;
for(var h="",g,d=0,a=k.length;d<a;){for(g=k[d].toString(2);8>g.length;)g="0"+g;h=g+h;d++}k="1"+h.substr(12,52);g=1;for(d=a=0;d<k.length;)a+=g*parseInt(k.charAt(d),10),g/=2,d++;h=("1"==h.charAt(0)?-1:1)*a*Math.pow(2,parseInt(h.substr(1,11),2)-1023);return 2===h?0:h};l.a.Y=function(k){var h=0;0>=k&&(h=2147483648,k=-k);var g=Math.floor(Math.log(k)/Math.log(2)),d=Math.floor(k/Math.pow(2,g)*Math.pow(2,52));k=d&4294967295;d/=Math.pow(2,32);return[h|g+1023<<20|d&1048575,k]};l.a.padding=m;l.a.W=function(k,
h,g){2==h&&4>k[g].length?k[g]=Array(5-k[g].length).join("0")+k[g]:16==h&&2==k[g].length&&"0"==k[g][0]&&(k[g]=k[g][1])};l.a.V=function(k,h,g){2==h&&2>k[g].length&&(k[g]="0"+k[g])};l.a.b=function(k){8>k.length&&(k=Array(9-k.length).join("0")+k);return k}},function(l,m,k){m=k(3);var h=k(4);window.packNibbles=function(g){var d=[],a=0,b=0,e=g.length;for(e%2&&g.push(0);a<e;)d[b++]=parseInt(g[a].toString(16)+g[a+1].toString(16),16),a+=2;return d};window.unpackNibbles=function(g){for(var d=[],a=0,b=0,e=g.length;a<
e;)d[b++]=parseInt(g[a].toString(16)[0],16),d[b++]=parseInt(g[a].toString(16)[1],16),a++;return d};window.findString=function(g,d){for(var a,b=0;b<g.length;b++)if(a=h.o(g.slice(b,b+d.length)),a==d)return b;return-1};window.stringToBytes=m.X;window.stringFromBytes=h.o;window.doubleTo8Bytes=m.h;window.floatTo8Bytes=m.h;window.floatTo4Bytes=m.F;window.intTo6Bytes=m.R;window.intTo5Bytes=m.P;window.intTo4Bytes=m.O;window.intTo3Bytes=m.N;window.intTo2Bytes=m.M;window.intTo1Byte=m.L;window.intToNibble=m.S;
l.a.u=m.u;l.a.s=m.s;window.floatFrom8Bytes=h.g;window.doubleFrom8Bytes=h.g;l.a.l=h.l;l.a.v=h.v;l.a.j=h.j;window.uIntFrom5Bytes=h.ca;window.intFrom4Bytes=h.J;window.uIntFrom4Bytes=h.ba;window.floatFrom4Bytes=h.D;window.intFrom3Bytes=h.I;window.uIntFrom3Bytes=h.aa;window.intFrom2Bytes=h.H;window.uIntFrom2Bytes=h.$;window.intFrom1Byte=h.G;window.uIntFrom1Byte=h.Z;window.intFromNibble=h.K;window.uIntFromNibble=h.da;l.a.m=h.m;l.a.w=h.w;l.a.i=h.i},function(l,m,k){var h=k(0),g=k(1);l.a.h=function(d,a){for(var b=
0,e=0,c=d.length,f=[];b<c;)0==d[b]?(f=f.concat([0,0,0,0,0,0,0,0]),e+=8):(d[b]=g.Y(d[b]),f[e++]=d[b][1]&255,f[e++]=d[b][1]>>>8&255,f[e++]=d[b][1]>>>16&255,f[e++]=d[b][1]>>>24&255,f[e++]=d[b][0]&255,f[e++]=d[b][0]>>>8&255,f[e++]=d[b][0]>>>16&255,f[e++]=d[b][0]>>>24&255),b++;g.f(f,void 0===a?10:a);return f};l.a.F=function(d,a){a=void 0===a?10:a;for(var b=0,e=0,c=d.length,f=[];b<c;)d[b]=h.ea(d[b]),f[e++]=d[b]&255,f[e++]=d[b]>>>8&255,f[e++]=d[b]>>>16&255,f[e++]=d[b]>>>24&255,b++;g.f(f,a);return f};l.a.R=
function(d,a){for(var b=0,e=0,c=d.length,f=[];b<c;)f[e++]=d[b]&255,f[e++]=d[b]>>8&255,f[e++]=d[b]>>16&255,f[e++]=d[b]>>24&255,f[e++]=d[b]/4294967296&255,f[e++]=d[b]/1099511627776&255,b++;g.f(f,void 0===a?10:a);return f};l.a.P=function(d,a){for(var b=0,e=0,c=d.length,f=[];b<c;)f[e++]=d[b]&255,f[e++]=d[b]>>8&255,f[e++]=d[b]>>16&255,f[e++]=d[b]>>24&255,f[e++]=d[b]/4294967296&255,b++;g.f(f,void 0===a?10:a);return f};l.a.O=function(d,a){a=void 0===a?10:a;for(var b=0,e=0,c=d.length,f=[];b<c;)f[e++]=(d[b]&
255).toString(a),g.padding(f,a,e-1),f[e++]=(d[b]>>>8&255).toString(a),g.padding(f,a,e-1),f[e++]=(d[b]>>>16&255).toString(a),g.padding(f,a,e-1),f[e++]=(d[b]>>>24&255).toString(a),g.padding(f,a,e-1),b++;g.f(f,a);return f};l.a.N=function(d,a){for(var b=0,e=0,c=d.length,f=[];b<c;)f[e++]=d[b]&255,f[e++]=d[b]>>>8&255,f[e++]=d[b]>>>16&255,b++;g.f(f,void 0===a?10:a);return f};l.a.M=function(d,a){for(var b=0,e=0,c=d.length,f=[];b<c;)f[e++]=d[b]&255,f[e++]=d[b]>>>8&255,b++;g.f(f,void 0===a?10:a);return f};
l.a.L=function(d,a){for(var b=0,e=0,c=d.length,f=[];b<c;)f[e++]=d[b]&255,b++;g.f(f,void 0===a?10:a);return f};l.a.S=function(d,a){a=void 0===a?10:a;var b=0,e=0,c=d.length,f=[];if(10==a)for(;b<c;)f[e++]=d[b]&15,b++;else for(;b<c;)f[e++]=(d[b]&15).toString(a),g.padding(f,a,e-1),2==a&&(f[e-1]=f[e-1].slice(4,8)),g.W(f,a,e-1),b++;return f};l.a.u=function(d,a){a=void 0===a?10:a;var b=0,e=0,c=d.length,f=[];if(10==a)for(;b<c;)f[e++]=0>d[b]?d[b]+4:d[b],b++;else for(;b<c;){var h=0>d[b]?d[b]+4:d[b];f[e++]=h.toString(a);
g.padding(f,a,e-1);2==a&&(f[e-1]=f[e-1].slice(6,8));g.V(f,a,e-1);b++}return f};l.a.s=function(d,a){var b=0,e=0,c=d.length,f=[];if(10==(void 0===a?10:a))for(;b<c;)f[e++]=d[b]?1:0,b++;else for(;b<c;)f[e++]=d[b]?"1":"0",b++;return f};l.a.X=function(d,a){a=void 0===a?10:a;var b=0,e=0,c=d.length,f=[];if(10==a)for(;b<c;)f[e++]=d.charCodeAt(b),g.padding(f,a,e-1),b++;else for(;b<c;)f[e++]=d.charCodeAt(b).toString(a),b++;return f}},function(l,m,k){function h(a,b){b=void 0===b?10:b;if(10==b)return[].slice.call(a);
for(var e=[],c=0,d=a.length;c<d;)e[c]=parseInt(a[c],b),c++;return e}var g=k(0),d=k(1);l.a.i=function(a,b){b=void 0===b?10:b;for(var e=[],c=0,d=a.length;c<d;)e[c]=parseInt(parseInt(a[c],b),2),c++;return e};l.a.m=function(a,b){var e=[],c=0,f=a.length;for(d.c(a,void 0===b?10:b);c<f;)e[c]=a[c],1<e[c]&&(e[c]-=4),c++;return e};l.a.w=h;l.a.K=function(a,b){var e=[],c=0,f=a.length;for(d.c(a,void 0===b?10:b);c<f;)e[c]=a[c],7<e[c]&&(e[c]-=16),c++;return e};l.a.da=h;l.a.G=function(a,b){var e=[],c=0,f=a.length;
for(d.c(a,void 0===b?10:b);c<f;)e[c]=a[c],127<e[c]&&(e[c]-=256),c++;return e};l.a.Z=h;l.a.H=function(a,b){var e=[],c=0,f=0,g=a.length;for(d.c(a,void 0===b?10:b);c<g;)e[f]=a[1+c]<<8|a[c],a[1+c]&128&&(e[f]|=4294901760),f++,c+=2;return e};l.a.$=function(a,b){var e=[],c=0,f=0,g=a.length;for(d.c(a,void 0===b?10:b);c<g;)e[f]=a[1+c]<<8|a[c],f++,c+=2;return e};l.a.I=function(a,b){var e=[],c=0,f=0,g=a.length;for(d.c(a,void 0===b?10:b);c<g;)e[f]=a[2+c]<<16|a[1+c]<<8|a[c],e[f]=0<(e[f]&8388608)?e[f]|4278190080:
e[f]&16777215,f++,c+=3;return e};l.a.aa=function(a,b){var e=[],c=0,f=0,g=a.length;for(d.c(a,void 0===b?10:b);c<g;)e[f]=a[2+c]<<16|a[1+c]<<8|a[c],f++,c+=3;return e};l.a.J=function(a,b){var e=[],c=0,f=0,g=a.length;for(d.c(a,void 0===b?10:b);c<g;)e[f]=a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c],0>(e[f]&2147483648)&&(e[f]&=4294967295),f++,c+=4;return e};l.a.ba=function(a,b){var e=[],c=0,f=0,g=a.length;for(d.c(a,void 0===b?10:b);c<g;)e[f]=a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c],e[f]>>>=0,f++,c+=4;return e};l.a.D=
function(a,b){var e=[],c=0,f=0,h=a.length;for(d.c(a,void 0===b?10:b);c<h;)e[f]=g.U(a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c]),f++,c+=4;return e};l.a.j=function(a,b){var e=[],c=0,f=0,g=a.length;for(d.c(a,void 0===b?10:b);c<g;)e[f]=parseInt(d.b(a[4+c].toString(2))+d.b(a[3+c].toString(2))+d.b(a[2+c].toString(2))+d.b(a[1+c].toString(2))+d.b(a[c].toString(2)),2),549755813887<e[c]&&(e[c]-=1099511627776),f++,c+=5;return e};l.a.ca=function(a,b){var e=[],c=0,f=0,g=a.length;for(d.c(a,void 0===b?10:b);c<g;)e[f]=
parseInt(d.b(a[4+c].toString(2))+d.b(a[3+c].toString(2))+d.b(a[2+c].toString(2))+d.b(a[1+c].toString(2))+d.b(a[c].toString(2)),2),f++,c+=5;return e};l.a.l=function(a,b){var e=[],c=0,f=0,g=a.length;for(d.c(a,void 0===b?10:b);c<g;)e[f]=parseInt(d.b(a[5+c].toString(2))+d.b(a[4+c].toString(2))+d.b(a[3+c].toString(2))+d.b(a[2+c].toString(2))+d.b(a[1+c].toString(2))+d.b(a[c].toString(2)),2),0x7fffffffffff<e[c]&&(e[c]-=281474976710656),f++,c+=6;return e};l.a.v=function(a,b){var e=[],c=0,f=0,g=a.length;for(d.c(a,
void 0===b?10:b);c<g;)e[f]=parseInt(d.b(a[5+c].toString(2))+d.b(a[4+c].toString(2))+d.b(a[3+c].toString(2))+d.b(a[2+c].toString(2))+d.b(a[1+c].toString(2))+d.b(a[c].toString(2)),2),f++,c+=6;return e};l.a.g=function(a,b){var e=[],c=0,f=0,g=a.length;for(d.c(a,void 0===b?10:b);c<g;)e[f]=d.C([a[c],a[1+c],a[2+c],a[3+c],a[4+c],a[5+c],a[6+c],a[7+c]]),f++,c+=8;return e};l.a.o=function(a,b){b=void 0===b?10:b;var e="",c=0,d=a.length;if(10==b)for(;c<d;)e+=String.fromCharCode(a[c]),c++;else for(;c<d;)e+=String.fromCharCode(parseInt(a[c],
b)),c++;return e}}]);
