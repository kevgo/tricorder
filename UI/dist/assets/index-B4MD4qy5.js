(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const h of u.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function r(l){if(l.ep)return;l.ep=!0;const u=i(l);fetch(l.href,u)}})();function R_(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var If={exports:{}},bo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l0;function py(){if(l0)return bo;l0=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(r,l,u){var h=null;if(u!==void 0&&(h=""+u),l.key!==void 0&&(h=""+l.key),"key"in l){u={};for(var d in l)d!=="key"&&(u[d]=l[d])}else u=l;return l=u.ref,{$$typeof:o,type:r,key:h,ref:l!==void 0?l:null,props:u}}return bo.Fragment=e,bo.jsx=i,bo.jsxs=i,bo}var c0;function my(){return c0||(c0=1,If.exports=py()),If.exports}var A=my(),Hf={exports:{}},ie={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u0;function gy(){if(u0)return ie;u0=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),y=Symbol.iterator;function M(F){return F===null||typeof F!="object"?null:(F=y&&F[y]||F["@@iterator"],typeof F=="function"?F:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,S={};function g(F,at,St){this.props=F,this.context=at,this.refs=S,this.updater=St||b}g.prototype.isReactComponent={},g.prototype.setState=function(F,at){if(typeof F!="object"&&typeof F!="function"&&F!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,F,at,"setState")},g.prototype.forceUpdate=function(F){this.updater.enqueueForceUpdate(this,F,"forceUpdate")};function N(){}N.prototype=g.prototype;function O(F,at,St){this.props=F,this.context=at,this.refs=S,this.updater=St||b}var U=O.prototype=new N;U.constructor=O,C(U,g.prototype),U.isPureReactComponent=!0;var X=Array.isArray;function H(){}var P={H:null,A:null,T:null,S:null},Q=Object.prototype.hasOwnProperty;function D(F,at,St){var K=St.ref;return{$$typeof:o,type:F,key:at,ref:K!==void 0?K:null,props:St}}function w(F,at){return D(F.type,at,F.props)}function V(F){return typeof F=="object"&&F!==null&&F.$$typeof===o}function st(F){var at={"=":"=0",":":"=2"};return"$"+F.replace(/[=:]/g,function(St){return at[St]})}var ot=/\/+/g;function pt(F,at){return typeof F=="object"&&F!==null&&F.key!=null?st(""+F.key):at.toString(36)}function mt(F){switch(F.status){case"fulfilled":return F.value;case"rejected":throw F.reason;default:switch(typeof F.status=="string"?F.then(H,H):(F.status="pending",F.then(function(at){F.status==="pending"&&(F.status="fulfilled",F.value=at)},function(at){F.status==="pending"&&(F.status="rejected",F.reason=at)})),F.status){case"fulfilled":return F.value;case"rejected":throw F.reason}}throw F}function z(F,at,St,K,ft){var Et=typeof F;(Et==="undefined"||Et==="boolean")&&(F=null);var yt=!1;if(F===null)yt=!0;else switch(Et){case"bigint":case"string":case"number":yt=!0;break;case"object":switch(F.$$typeof){case o:case e:yt=!0;break;case v:return yt=F._init,z(yt(F._payload),at,St,K,ft)}}if(yt)return ft=ft(F),yt=K===""?"."+pt(F,0):K,X(ft)?(St="",yt!=null&&(St=yt.replace(ot,"$&/")+"/"),z(ft,at,St,"",function(ae){return ae})):ft!=null&&(V(ft)&&(ft=w(ft,St+(ft.key==null||F&&F.key===ft.key?"":(""+ft.key).replace(ot,"$&/")+"/")+yt)),at.push(ft)),1;yt=0;var Ht=K===""?".":K+":";if(X(F))for(var zt=0;zt<F.length;zt++)K=F[zt],Et=Ht+pt(K,zt),yt+=z(K,at,St,Et,ft);else if(zt=M(F),typeof zt=="function")for(F=zt.call(F),zt=0;!(K=F.next()).done;)K=K.value,Et=Ht+pt(K,zt++),yt+=z(K,at,St,Et,ft);else if(Et==="object"){if(typeof F.then=="function")return z(mt(F),at,St,K,ft);throw at=String(F),Error("Objects are not valid as a React child (found: "+(at==="[object Object]"?"object with keys {"+Object.keys(F).join(", ")+"}":at)+"). If you meant to render a collection of children, use an array instead.")}return yt}function Z(F,at,St){if(F==null)return F;var K=[],ft=0;return z(F,K,"","",function(Et){return at.call(St,Et,ft++)}),K}function q(F){if(F._status===-1){var at=F._result;at=at(),at.then(function(St){(F._status===0||F._status===-1)&&(F._status=1,F._result=St)},function(St){(F._status===0||F._status===-1)&&(F._status=2,F._result=St)}),F._status===-1&&(F._status=0,F._result=at)}if(F._status===1)return F._result.default;throw F._result}var xt=typeof reportError=="function"?reportError:function(F){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var at=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof F=="object"&&F!==null&&typeof F.message=="string"?String(F.message):String(F),error:F});if(!window.dispatchEvent(at))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",F);return}console.error(F)},bt={map:Z,forEach:function(F,at,St){Z(F,function(){at.apply(this,arguments)},St)},count:function(F){var at=0;return Z(F,function(){at++}),at},toArray:function(F){return Z(F,function(at){return at})||[]},only:function(F){if(!V(F))throw Error("React.Children.only expected to receive a single React element child.");return F}};return ie.Activity=x,ie.Children=bt,ie.Component=g,ie.Fragment=i,ie.Profiler=l,ie.PureComponent=O,ie.StrictMode=r,ie.Suspense=p,ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,ie.__COMPILER_RUNTIME={__proto__:null,c:function(F){return P.H.useMemoCache(F)}},ie.cache=function(F){return function(){return F.apply(null,arguments)}},ie.cacheSignal=function(){return null},ie.cloneElement=function(F,at,St){if(F==null)throw Error("The argument must be a React element, but you passed "+F+".");var K=C({},F.props),ft=F.key;if(at!=null)for(Et in at.key!==void 0&&(ft=""+at.key),at)!Q.call(at,Et)||Et==="key"||Et==="__self"||Et==="__source"||Et==="ref"&&at.ref===void 0||(K[Et]=at[Et]);var Et=arguments.length-2;if(Et===1)K.children=St;else if(1<Et){for(var yt=Array(Et),Ht=0;Ht<Et;Ht++)yt[Ht]=arguments[Ht+2];K.children=yt}return D(F.type,ft,K)},ie.createContext=function(F){return F={$$typeof:h,_currentValue:F,_currentValue2:F,_threadCount:0,Provider:null,Consumer:null},F.Provider=F,F.Consumer={$$typeof:u,_context:F},F},ie.createElement=function(F,at,St){var K,ft={},Et=null;if(at!=null)for(K in at.key!==void 0&&(Et=""+at.key),at)Q.call(at,K)&&K!=="key"&&K!=="__self"&&K!=="__source"&&(ft[K]=at[K]);var yt=arguments.length-2;if(yt===1)ft.children=St;else if(1<yt){for(var Ht=Array(yt),zt=0;zt<yt;zt++)Ht[zt]=arguments[zt+2];ft.children=Ht}if(F&&F.defaultProps)for(K in yt=F.defaultProps,yt)ft[K]===void 0&&(ft[K]=yt[K]);return D(F,Et,ft)},ie.createRef=function(){return{current:null}},ie.forwardRef=function(F){return{$$typeof:d,render:F}},ie.isValidElement=V,ie.lazy=function(F){return{$$typeof:v,_payload:{_status:-1,_result:F},_init:q}},ie.memo=function(F,at){return{$$typeof:m,type:F,compare:at===void 0?null:at}},ie.startTransition=function(F){var at=P.T,St={};P.T=St;try{var K=F(),ft=P.S;ft!==null&&ft(St,K),typeof K=="object"&&K!==null&&typeof K.then=="function"&&K.then(H,xt)}catch(Et){xt(Et)}finally{at!==null&&St.types!==null&&(at.types=St.types),P.T=at}},ie.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},ie.use=function(F){return P.H.use(F)},ie.useActionState=function(F,at,St){return P.H.useActionState(F,at,St)},ie.useCallback=function(F,at){return P.H.useCallback(F,at)},ie.useContext=function(F){return P.H.useContext(F)},ie.useDebugValue=function(){},ie.useDeferredValue=function(F,at){return P.H.useDeferredValue(F,at)},ie.useEffect=function(F,at){return P.H.useEffect(F,at)},ie.useEffectEvent=function(F){return P.H.useEffectEvent(F)},ie.useId=function(){return P.H.useId()},ie.useImperativeHandle=function(F,at,St){return P.H.useImperativeHandle(F,at,St)},ie.useInsertionEffect=function(F,at){return P.H.useInsertionEffect(F,at)},ie.useLayoutEffect=function(F,at){return P.H.useLayoutEffect(F,at)},ie.useMemo=function(F,at){return P.H.useMemo(F,at)},ie.useOptimistic=function(F,at){return P.H.useOptimistic(F,at)},ie.useReducer=function(F,at,St){return P.H.useReducer(F,at,St)},ie.useRef=function(F){return P.H.useRef(F)},ie.useState=function(F){return P.H.useState(F)},ie.useSyncExternalStore=function(F,at,St){return P.H.useSyncExternalStore(F,at,St)},ie.useTransition=function(){return P.H.useTransition()},ie.version="19.2.7",ie}var f0;function mh(){return f0||(f0=1,Hf.exports=gy()),Hf.exports}var Wt=mh();const _y=R_(Wt);var Gf={exports:{}},To={},Vf={exports:{}},kf={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d0;function vy(){return d0||(d0=1,(function(o){function e(z,Z){var q=z.length;z.push(Z);t:for(;0<q;){var xt=q-1>>>1,bt=z[xt];if(0<l(bt,Z))z[xt]=Z,z[q]=bt,q=xt;else break t}}function i(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var Z=z[0],q=z.pop();if(q!==Z){z[0]=q;t:for(var xt=0,bt=z.length,F=bt>>>1;xt<F;){var at=2*(xt+1)-1,St=z[at],K=at+1,ft=z[K];if(0>l(St,q))K<bt&&0>l(ft,St)?(z[xt]=ft,z[K]=q,xt=K):(z[xt]=St,z[at]=q,xt=at);else if(K<bt&&0>l(ft,q))z[xt]=ft,z[K]=q,xt=K;else break t}}return Z}function l(z,Z){var q=z.sortIndex-Z.sortIndex;return q!==0?q:z.id-Z.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var u=performance;o.unstable_now=function(){return u.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var p=[],m=[],v=1,x=null,y=3,M=!1,b=!1,C=!1,S=!1,g=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,O=typeof setImmediate<"u"?setImmediate:null;function U(z){for(var Z=i(m);Z!==null;){if(Z.callback===null)r(m);else if(Z.startTime<=z)r(m),Z.sortIndex=Z.expirationTime,e(p,Z);else break;Z=i(m)}}function X(z){if(C=!1,U(z),!b)if(i(p)!==null)b=!0,H||(H=!0,st());else{var Z=i(m);Z!==null&&mt(X,Z.startTime-z)}}var H=!1,P=-1,Q=5,D=-1;function w(){return S?!0:!(o.unstable_now()-D<Q)}function V(){if(S=!1,H){var z=o.unstable_now();D=z;var Z=!0;try{t:{b=!1,C&&(C=!1,N(P),P=-1),M=!0;var q=y;try{e:{for(U(z),x=i(p);x!==null&&!(x.expirationTime>z&&w());){var xt=x.callback;if(typeof xt=="function"){x.callback=null,y=x.priorityLevel;var bt=xt(x.expirationTime<=z);if(z=o.unstable_now(),typeof bt=="function"){x.callback=bt,U(z),Z=!0;break e}x===i(p)&&r(p),U(z)}else r(p);x=i(p)}if(x!==null)Z=!0;else{var F=i(m);F!==null&&mt(X,F.startTime-z),Z=!1}}break t}finally{x=null,y=q,M=!1}Z=void 0}}finally{Z?st():H=!1}}}var st;if(typeof O=="function")st=function(){O(V)};else if(typeof MessageChannel<"u"){var ot=new MessageChannel,pt=ot.port2;ot.port1.onmessage=V,st=function(){pt.postMessage(null)}}else st=function(){g(V,0)};function mt(z,Z){P=g(function(){z(o.unstable_now())},Z)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(z){z.callback=null},o.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Q=0<z?Math.floor(1e3/z):5},o.unstable_getCurrentPriorityLevel=function(){return y},o.unstable_next=function(z){switch(y){case 1:case 2:case 3:var Z=3;break;default:Z=y}var q=y;y=Z;try{return z()}finally{y=q}},o.unstable_requestPaint=function(){S=!0},o.unstable_runWithPriority=function(z,Z){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var q=y;y=z;try{return Z()}finally{y=q}},o.unstable_scheduleCallback=function(z,Z,q){var xt=o.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?xt+q:xt):q=xt,z){case 1:var bt=-1;break;case 2:bt=250;break;case 5:bt=1073741823;break;case 4:bt=1e4;break;default:bt=5e3}return bt=q+bt,z={id:v++,callback:Z,priorityLevel:z,startTime:q,expirationTime:bt,sortIndex:-1},q>xt?(z.sortIndex=q,e(m,z),i(p)===null&&z===i(m)&&(C?(N(P),P=-1):C=!0,mt(X,q-xt))):(z.sortIndex=bt,e(p,z),b||M||(b=!0,H||(H=!0,st()))),z},o.unstable_shouldYield=w,o.unstable_wrapCallback=function(z){var Z=y;return function(){var q=y;y=Z;try{return z.apply(this,arguments)}finally{y=q}}}})(kf)),kf}var h0;function xy(){return h0||(h0=1,Vf.exports=vy()),Vf.exports}var jf={exports:{}},Tn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p0;function yy(){if(p0)return Tn;p0=1;var o=mh();function e(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)m+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function u(p,m,v){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:x==null?null:""+x,children:p,containerInfo:m,implementation:v}}var h=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return Tn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Tn.createPortal=function(p,m){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(e(299));return u(p,m,null,v)},Tn.flushSync=function(p){var m=h.T,v=r.p;try{if(h.T=null,r.p=2,p)return p()}finally{h.T=m,r.p=v,r.d.f()}},Tn.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,r.d.C(p,m))},Tn.prefetchDNS=function(p){typeof p=="string"&&r.d.D(p)},Tn.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var v=m.as,x=d(v,m.crossOrigin),y=typeof m.integrity=="string"?m.integrity:void 0,M=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;v==="style"?r.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:x,integrity:y,fetchPriority:M}):v==="script"&&r.d.X(p,{crossOrigin:x,integrity:y,fetchPriority:M,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},Tn.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var v=d(m.as,m.crossOrigin);r.d.M(p,{crossOrigin:v,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&r.d.M(p)},Tn.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var v=m.as,x=d(v,m.crossOrigin);r.d.L(p,v,{crossOrigin:x,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},Tn.preloadModule=function(p,m){if(typeof p=="string")if(m){var v=d(m.as,m.crossOrigin);r.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:v,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else r.d.m(p)},Tn.requestFormReset=function(p){r.d.r(p)},Tn.unstable_batchedUpdates=function(p,m){return p(m)},Tn.useFormState=function(p,m,v){return h.H.useFormState(p,m,v)},Tn.useFormStatus=function(){return h.H.useHostTransitionStatus()},Tn.version="19.2.7",Tn}var m0;function Sy(){if(m0)return jf.exports;m0=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),jf.exports=yy(),jf.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var g0;function My(){if(g0)return To;g0=1;var o=xy(),e=mh(),i=Sy();function r(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function u(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function d(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(u(t)!==t)throw Error(r(188))}function m(t){var n=t.alternate;if(!n){if(n=u(t),n===null)throw Error(r(188));return n!==t?null:t}for(var a=t,s=n;;){var c=a.return;if(c===null)break;var f=c.alternate;if(f===null){if(s=c.return,s!==null){a=s;continue}break}if(c.child===f.child){for(f=c.child;f;){if(f===a)return p(c),t;if(f===s)return p(c),n;f=f.sibling}throw Error(r(188))}if(a.return!==s.return)a=c,s=f;else{for(var _=!1,E=c.child;E;){if(E===a){_=!0,a=c,s=f;break}if(E===s){_=!0,s=c,a=f;break}E=E.sibling}if(!_){for(E=f.child;E;){if(E===a){_=!0,a=f,s=c;break}if(E===s){_=!0,s=f,a=c;break}E=E.sibling}if(!_)throw Error(r(189))}}if(a.alternate!==s)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?t:n}function v(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=v(t),n!==null)return n;t=t.sibling}return null}var x=Object.assign,y=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),g=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),O=Symbol.for("react.context"),U=Symbol.for("react.forward_ref"),X=Symbol.for("react.suspense"),H=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),Q=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),w=Symbol.for("react.memo_cache_sentinel"),V=Symbol.iterator;function st(t){return t===null||typeof t!="object"?null:(t=V&&t[V]||t["@@iterator"],typeof t=="function"?t:null)}var ot=Symbol.for("react.client.reference");function pt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===ot?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case C:return"Fragment";case g:return"Profiler";case S:return"StrictMode";case X:return"Suspense";case H:return"SuspenseList";case D:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case b:return"Portal";case O:return t.displayName||"Context";case N:return(t._context.displayName||"Context")+".Consumer";case U:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case P:return n=t.displayName||null,n!==null?n:pt(t.type)||"Memo";case Q:n=t._payload,t=t._init;try{return pt(t(n))}catch{}}return null}var mt=Array.isArray,z=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Z=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,q={pending:!1,data:null,method:null,action:null},xt=[],bt=-1;function F(t){return{current:t}}function at(t){0>bt||(t.current=xt[bt],xt[bt]=null,bt--)}function St(t,n){bt++,xt[bt]=t.current,t.current=n}var K=F(null),ft=F(null),Et=F(null),yt=F(null);function Ht(t,n){switch(St(Et,n),St(ft,t),St(K,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?Ug(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=Ug(n),t=Lg(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}at(K),St(K,t)}function zt(){at(K),at(ft),at(Et)}function ae(t){t.memoizedState!==null&&St(yt,t);var n=K.current,a=Lg(n,t.type);n!==a&&(St(ft,t),St(K,a))}function Oe(t){ft.current===t&&(at(K),at(ft)),yt.current===t&&(at(yt),yo._currentValue=q)}var fe,Xe;function I(t){if(fe===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);fe=n&&n[1]||"",Xe=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+fe+t+Xe}var En=!1;function ue(t,n){if(!t||En)return"";En=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var s={DetermineComponentFrameRoot:function(){try{if(n){var _t=function(){throw Error()};if(Object.defineProperty(_t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_t,[])}catch(lt){var et=lt}Reflect.construct(t,[],_t)}else{try{_t.call()}catch(lt){et=lt}t.call(_t.prototype)}}else{try{throw Error()}catch(lt){et=lt}(_t=t())&&typeof _t.catch=="function"&&_t.catch(function(){})}}catch(lt){if(lt&&et&&typeof lt.stack=="string")return[lt.stack,et.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=s.DetermineComponentFrameRoot(),_=f[0],E=f[1];if(_&&E){var B=_.split(`
`),tt=E.split(`
`);for(c=s=0;s<B.length&&!B[s].includes("DetermineComponentFrameRoot");)s++;for(;c<tt.length&&!tt[c].includes("DetermineComponentFrameRoot");)c++;if(s===B.length||c===tt.length)for(s=B.length-1,c=tt.length-1;1<=s&&0<=c&&B[s]!==tt[c];)c--;for(;1<=s&&0<=c;s--,c--)if(B[s]!==tt[c]){if(s!==1||c!==1)do if(s--,c--,0>c||B[s]!==tt[c]){var ut=`
`+B[s].replace(" at new "," at ");return t.displayName&&ut.includes("<anonymous>")&&(ut=ut.replace("<anonymous>",t.displayName)),ut}while(1<=s&&0<=c);break}}}finally{En=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?I(a):""}function pe(t,n){switch(t.tag){case 26:case 27:case 5:return I(t.type);case 16:return I("Lazy");case 13:return t.child!==n&&n!==null?I("Suspense Fallback"):I("Suspense");case 19:return I("SuspenseList");case 0:case 15:return ue(t.type,!1);case 11:return ue(t.type.render,!1);case 1:return ue(t.type,!0);case 31:return I("Activity");default:return""}}function Xt(t){try{var n="",a=null;do n+=pe(t,a),a=t,t=t.return;while(t);return n}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}var Ue=Object.prototype.hasOwnProperty,jt=o.unstable_scheduleCallback,L=o.unstable_cancelCallback,T=o.unstable_shouldYield,nt=o.unstable_requestPaint,dt=o.unstable_now,Mt=o.unstable_getCurrentPriorityLevel,gt=o.unstable_ImmediatePriority,Vt=o.unstable_UserBlockingPriority,wt=o.unstable_NormalPriority,Pt=o.unstable_LowPriority,me=o.unstable_IdlePriority,At=o.log,Bt=o.unstable_setDisableYieldValue,qt=null,kt=null;function Ot(t){if(typeof At=="function"&&Bt(t),kt&&typeof kt.setStrictMode=="function")try{kt.setStrictMode(qt,t)}catch{}}var Jt=Math.clz32?Math.clz32:j,re=Math.log,Fe=Math.LN2;function j(t){return t>>>=0,t===0?32:31-(re(t)/Fe|0)|0}var Rt=256,ct=262144,vt=4194304;function Ct(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Dt(t,n,a){var s=t.pendingLanes;if(s===0)return 0;var c=0,f=t.suspendedLanes,_=t.pingedLanes;t=t.warmLanes;var E=s&134217727;return E!==0?(s=E&~f,s!==0?c=Ct(s):(_&=E,_!==0?c=Ct(_):a||(a=E&~t,a!==0&&(c=Ct(a))))):(E=s&~f,E!==0?c=Ct(E):_!==0?c=Ct(_):a||(a=s&~t,a!==0&&(c=Ct(a)))),c===0?0:n!==0&&n!==c&&(n&f)===0&&(f=c&-c,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:c}function $t(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function qe(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ln(){var t=vt;return vt<<=1,(vt&62914560)===0&&(vt=4194304),t}function Ee(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function gn(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function di(t,n,a,s,c,f){var _=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var E=t.entanglements,B=t.expirationTimes,tt=t.hiddenUpdates;for(a=_&~a;0<a;){var ut=31-Jt(a),_t=1<<ut;E[ut]=0,B[ut]=-1;var et=tt[ut];if(et!==null)for(tt[ut]=null,ut=0;ut<et.length;ut++){var lt=et[ut];lt!==null&&(lt.lane&=-536870913)}a&=~_t}s!==0&&Us(t,s,0),f!==0&&c===0&&t.tag!==0&&(t.suspendedLanes|=f&~(_&~n))}function Us(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var s=31-Jt(n);t.entangledLanes|=n,t.entanglements[s]=t.entanglements[s]|1073741824|a&261930}function Ls(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var s=31-Jt(a),c=1<<s;c&n|t[s]&n&&(t[s]|=n),a&=~c}}function Ai(t,n){var a=n&-n;return a=(a&42)!==0?1:ka(a),(a&(t.suspendedLanes|n))!==0?0:a}function ka(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Er(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Ns(){var t=Z.p;return t!==0?t:(t=window.event,t===void 0?32:e0(t.type))}function ja(t,n){var a=Z.p;try{return Z.p=t,n()}finally{Z.p=a}}var hi=Math.random().toString(36).slice(2),Ke="__reactFiber$"+hi,_n="__reactProps$"+hi,Fi="__reactContainer$"+hi,Os="__reactEvents$"+hi,Lc="__reactListeners$"+hi,Nc="__reactHandles$"+hi,Ho="__reactResources$"+hi,Wa="__reactMarker$"+hi;function Fs(t){delete t[Ke],delete t[_n],delete t[Os],delete t[Lc],delete t[Nc]}function R(t){var n=t[Ke];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Fi]||a[Ke]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Ig(t);t!==null;){if(a=t[Ke])return a;t=Ig(t)}return n}t=a,a=t.parentNode}return null}function W(t){if(t=t[Ke]||t[Fi]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function it(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(r(33))}function rt(t){var n=t[Ho];return n||(n=t[Ho]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function k(t){t[Wa]=!0}var Tt=new Set,Ut={};function Nt(t,n){Ft(t,n),Ft(t+"Capture",n)}function Ft(t,n){for(Ut[t]=n,t=0;t<n.length;t++)Tt.add(n[t])}var te=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ee={},Yt={};function ve(t){return Ue.call(Yt,t)?!0:Ue.call(ee,t)?!1:te.test(t)?Yt[t]=!0:(ee[t]=!0,!1)}function xe(t,n,a){if(ve(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var s=n.toLowerCase().slice(0,5);if(s!=="data-"&&s!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function ke(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Te(t,n,a,s){if(s===null)t.removeAttribute(a);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+s)}}function ne(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Kt(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function cn(t,n,a){var s=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var c=s.get,f=s.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return c.call(this)},set:function(_){a=""+_,f.call(this,_)}}),Object.defineProperty(t,n,{enumerable:s.enumerable}),{getValue:function(){return a},setValue:function(_){a=""+_},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Me(t){if(!t._valueTracker){var n=Kt(t)?"checked":"value";t._valueTracker=cn(t,n,""+t[n])}}function Nn(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),s="";return t&&(s=Kt(t)?t.checked?"true":"false":t.value),t=s,t!==a?(n.setValue(t),!0):!1}function pi(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Cn=/[\n"\\]/g;function hn(t){return t.replace(Cn,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function ze(t,n,a,s,c,f,_,E){t.name="",_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"?t.type=_:t.removeAttribute("type"),n!=null?_==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+ne(n)):t.value!==""+ne(n)&&(t.value=""+ne(n)):_!=="submit"&&_!=="reset"||t.removeAttribute("value"),n!=null?bn(t,_,ne(n)):a!=null?bn(t,_,ne(a)):s!=null&&t.removeAttribute("value"),c==null&&f!=null&&(t.defaultChecked=!!f),c!=null&&(t.checked=c&&typeof c!="function"&&typeof c!="symbol"),E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?t.name=""+ne(E):t.removeAttribute("name")}function wn(t,n,a,s,c,f,_,E){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(t.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Me(t);return}a=a!=null?""+ne(a):"",n=n!=null?""+ne(n):a,E||n===t.value||(t.value=n),t.defaultValue=n}s=s??c,s=typeof s!="function"&&typeof s!="symbol"&&!!s,t.checked=E?t.checked:!!s,t.defaultChecked=!!s,_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"&&(t.name=_),Me(t)}function bn(t,n,a){n==="number"&&pi(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function Qe(t,n,a,s){if(t=t.options,n){n={};for(var c=0;c<a.length;c++)n["$"+a[c]]=!0;for(a=0;a<t.length;a++)c=n.hasOwnProperty("$"+t[a].value),t[a].selected!==c&&(t[a].selected=c),c&&s&&(t[a].defaultSelected=!0)}else{for(a=""+ne(a),n=null,c=0;c<t.length;c++){if(t[c].value===a){t[c].selected=!0,s&&(t[c].defaultSelected=!0);return}n!==null||t[c].disabled||(n=t[c])}n!==null&&(n.selected=!0)}}function vn(t,n,a){if(n!=null&&(n=""+ne(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+ne(a):""}function br(t,n,a,s){if(n==null){if(s!=null){if(a!=null)throw Error(r(92));if(mt(s)){if(1<s.length)throw Error(r(93));s=s[0]}a=s}a==null&&(a=""),n=a}a=ne(n),t.defaultValue=a,s=t.textContent,s===a&&s!==""&&s!==null&&(t.value=s),Me(t)}function On(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var cv=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ch(t,n,a){var s=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?s?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":s?t.setProperty(n,a):typeof a!="number"||a===0||cv.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function wh(t,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(t=t.style,a!=null){for(var s in a)!a.hasOwnProperty(s)||n!=null&&n.hasOwnProperty(s)||(s.indexOf("--")===0?t.setProperty(s,""):s==="float"?t.cssFloat="":t[s]="");for(var c in n)s=n[c],n.hasOwnProperty(c)&&a[c]!==s&&Ch(t,c,s)}else for(var f in n)n.hasOwnProperty(f)&&Ch(t,f,n[f])}function Oc(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var uv=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),fv=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Go(t){return fv.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function zi(){}var Fc=null;function zc(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Tr=null,Ar=null;function Dh(t){var n=W(t);if(n&&(t=n.stateNode)){var a=t[_n]||null;t:switch(t=n.stateNode,n.type){case"input":if(ze(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+hn(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var s=a[n];if(s!==t&&s.form===t.form){var c=s[_n]||null;if(!c)throw Error(r(90));ze(s,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(n=0;n<a.length;n++)s=a[n],s.form===t.form&&Nn(s)}break t;case"textarea":vn(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&Qe(t,!!a.multiple,n,!1)}}}var Pc=!1;function Uh(t,n,a){if(Pc)return t(n,a);Pc=!0;try{var s=t(n);return s}finally{if(Pc=!1,(Tr!==null||Ar!==null)&&(Cl(),Tr&&(n=Tr,t=Ar,Ar=Tr=null,Dh(n),t)))for(n=0;n<t.length;n++)Dh(t[n])}}function zs(t,n){var a=t.stateNode;if(a===null)return null;var s=a[_n]||null;if(s===null)return null;a=s[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(t=t.type,s=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!s;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var Pi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Bc=!1;if(Pi)try{var Ps={};Object.defineProperty(Ps,"passive",{get:function(){Bc=!0}}),window.addEventListener("test",Ps,Ps),window.removeEventListener("test",Ps,Ps)}catch{Bc=!1}var ca=null,Ic=null,Vo=null;function Lh(){if(Vo)return Vo;var t,n=Ic,a=n.length,s,c="value"in ca?ca.value:ca.textContent,f=c.length;for(t=0;t<a&&n[t]===c[t];t++);var _=a-t;for(s=1;s<=_&&n[a-s]===c[f-s];s++);return Vo=c.slice(t,1<s?1-s:void 0)}function ko(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function jo(){return!0}function Nh(){return!1}function Fn(t){function n(a,s,c,f,_){this._reactName=a,this._targetInst=c,this.type=s,this.nativeEvent=f,this.target=_,this.currentTarget=null;for(var E in t)t.hasOwnProperty(E)&&(a=t[E],this[E]=a?a(f):f[E]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?jo:Nh,this.isPropagationStopped=Nh,this}return x(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=jo)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=jo)},persist:function(){},isPersistent:jo}),n}var Xa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Wo=Fn(Xa),Bs=x({},Xa,{view:0,detail:0}),dv=Fn(Bs),Hc,Gc,Is,Xo=x({},Bs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:kc,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Is&&(Is&&t.type==="mousemove"?(Hc=t.screenX-Is.screenX,Gc=t.screenY-Is.screenY):Gc=Hc=0,Is=t),Hc)},movementY:function(t){return"movementY"in t?t.movementY:Gc}}),Oh=Fn(Xo),hv=x({},Xo,{dataTransfer:0}),pv=Fn(hv),mv=x({},Bs,{relatedTarget:0}),Vc=Fn(mv),gv=x({},Xa,{animationName:0,elapsedTime:0,pseudoElement:0}),_v=Fn(gv),vv=x({},Xa,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),xv=Fn(vv),yv=x({},Xa,{data:0}),Fh=Fn(yv),Sv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Mv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ev={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function bv(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=Ev[t])?!!n[t]:!1}function kc(){return bv}var Tv=x({},Bs,{key:function(t){if(t.key){var n=Sv[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=ko(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Mv[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:kc,charCode:function(t){return t.type==="keypress"?ko(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ko(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Av=Fn(Tv),Rv=x({},Xo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),zh=Fn(Rv),Cv=x({},Bs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:kc}),wv=Fn(Cv),Dv=x({},Xa,{propertyName:0,elapsedTime:0,pseudoElement:0}),Uv=Fn(Dv),Lv=x({},Xo,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Nv=Fn(Lv),Ov=x({},Xa,{newState:0,oldState:0}),Fv=Fn(Ov),zv=[9,13,27,32],jc=Pi&&"CompositionEvent"in window,Hs=null;Pi&&"documentMode"in document&&(Hs=document.documentMode);var Pv=Pi&&"TextEvent"in window&&!Hs,Ph=Pi&&(!jc||Hs&&8<Hs&&11>=Hs),Bh=" ",Ih=!1;function Hh(t,n){switch(t){case"keyup":return zv.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Gh(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Rr=!1;function Bv(t,n){switch(t){case"compositionend":return Gh(n);case"keypress":return n.which!==32?null:(Ih=!0,Bh);case"textInput":return t=n.data,t===Bh&&Ih?null:t;default:return null}}function Iv(t,n){if(Rr)return t==="compositionend"||!jc&&Hh(t,n)?(t=Lh(),Vo=Ic=ca=null,Rr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Ph&&n.locale!=="ko"?null:n.data;default:return null}}var Hv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Vh(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Hv[t.type]:n==="textarea"}function kh(t,n,a,s){Tr?Ar?Ar.push(s):Ar=[s]:Tr=s,n=Fl(n,"onChange"),0<n.length&&(a=new Wo("onChange","change",null,a,s),t.push({event:a,listeners:n}))}var Gs=null,Vs=null;function Gv(t){Tg(t,0)}function qo(t){var n=it(t);if(Nn(n))return t}function jh(t,n){if(t==="change")return n}var Wh=!1;if(Pi){var Wc;if(Pi){var Xc="oninput"in document;if(!Xc){var Xh=document.createElement("div");Xh.setAttribute("oninput","return;"),Xc=typeof Xh.oninput=="function"}Wc=Xc}else Wc=!1;Wh=Wc&&(!document.documentMode||9<document.documentMode)}function qh(){Gs&&(Gs.detachEvent("onpropertychange",Yh),Vs=Gs=null)}function Yh(t){if(t.propertyName==="value"&&qo(Vs)){var n=[];kh(n,Vs,t,zc(t)),Uh(Gv,n)}}function Vv(t,n,a){t==="focusin"?(qh(),Gs=n,Vs=a,Gs.attachEvent("onpropertychange",Yh)):t==="focusout"&&qh()}function kv(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return qo(Vs)}function jv(t,n){if(t==="click")return qo(n)}function Wv(t,n){if(t==="input"||t==="change")return qo(n)}function Xv(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var jn=typeof Object.is=="function"?Object.is:Xv;function ks(t,n){if(jn(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),s=Object.keys(n);if(a.length!==s.length)return!1;for(s=0;s<a.length;s++){var c=a[s];if(!Ue.call(n,c)||!jn(t[c],n[c]))return!1}return!0}function Zh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Kh(t,n){var a=Zh(t);t=0;for(var s;a;){if(a.nodeType===3){if(s=t+a.textContent.length,t<=n&&s>=n)return{node:a,offset:n-t};t=s}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Zh(a)}}function Qh(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Qh(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Jh(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=pi(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=pi(t.document)}return n}function qc(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var qv=Pi&&"documentMode"in document&&11>=document.documentMode,Cr=null,Yc=null,js=null,Zc=!1;function $h(t,n,a){var s=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Zc||Cr==null||Cr!==pi(s)||(s=Cr,"selectionStart"in s&&qc(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),js&&ks(js,s)||(js=s,s=Fl(Yc,"onSelect"),0<s.length&&(n=new Wo("onSelect","select",null,n,a),t.push({event:n,listeners:s}),n.target=Cr)))}function qa(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var wr={animationend:qa("Animation","AnimationEnd"),animationiteration:qa("Animation","AnimationIteration"),animationstart:qa("Animation","AnimationStart"),transitionrun:qa("Transition","TransitionRun"),transitionstart:qa("Transition","TransitionStart"),transitioncancel:qa("Transition","TransitionCancel"),transitionend:qa("Transition","TransitionEnd")},Kc={},tp={};Pi&&(tp=document.createElement("div").style,"AnimationEvent"in window||(delete wr.animationend.animation,delete wr.animationiteration.animation,delete wr.animationstart.animation),"TransitionEvent"in window||delete wr.transitionend.transition);function Ya(t){if(Kc[t])return Kc[t];if(!wr[t])return t;var n=wr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in tp)return Kc[t]=n[a];return t}var ep=Ya("animationend"),np=Ya("animationiteration"),ip=Ya("animationstart"),Yv=Ya("transitionrun"),Zv=Ya("transitionstart"),Kv=Ya("transitioncancel"),ap=Ya("transitionend"),rp=new Map,Qc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Qc.push("scrollEnd");function mi(t,n){rp.set(t,n),Nt(n,[t])}var Yo=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},ei=[],Dr=0,Jc=0;function Zo(){for(var t=Dr,n=Jc=Dr=0;n<t;){var a=ei[n];ei[n++]=null;var s=ei[n];ei[n++]=null;var c=ei[n];ei[n++]=null;var f=ei[n];if(ei[n++]=null,s!==null&&c!==null){var _=s.pending;_===null?c.next=c:(c.next=_.next,_.next=c),s.pending=c}f!==0&&sp(a,c,f)}}function Ko(t,n,a,s){ei[Dr++]=t,ei[Dr++]=n,ei[Dr++]=a,ei[Dr++]=s,Jc|=s,t.lanes|=s,t=t.alternate,t!==null&&(t.lanes|=s)}function $c(t,n,a,s){return Ko(t,n,a,s),Qo(t)}function Za(t,n){return Ko(t,null,null,n),Qo(t)}function sp(t,n,a){t.lanes|=a;var s=t.alternate;s!==null&&(s.lanes|=a);for(var c=!1,f=t.return;f!==null;)f.childLanes|=a,s=f.alternate,s!==null&&(s.childLanes|=a),f.tag===22&&(t=f.stateNode,t===null||t._visibility&1||(c=!0)),t=f,f=f.return;return t.tag===3?(f=t.stateNode,c&&n!==null&&(c=31-Jt(a),t=f.hiddenUpdates,s=t[c],s===null?t[c]=[n]:s.push(n),n.lane=a|536870912),f):null}function Qo(t){if(50<ho)throw ho=0,cf=null,Error(r(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var Ur={};function Qv(t,n,a,s){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Wn(t,n,a,s){return new Qv(t,n,a,s)}function tu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Bi(t,n){var a=t.alternate;return a===null?(a=Wn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function op(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Jo(t,n,a,s,c,f){var _=0;if(s=t,typeof t=="function")tu(t)&&(_=1);else if(typeof t=="string")_=ny(t,a,K.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case D:return t=Wn(31,a,n,c),t.elementType=D,t.lanes=f,t;case C:return Ka(a.children,c,f,n);case S:_=8,c|=24;break;case g:return t=Wn(12,a,n,c|2),t.elementType=g,t.lanes=f,t;case X:return t=Wn(13,a,n,c),t.elementType=X,t.lanes=f,t;case H:return t=Wn(19,a,n,c),t.elementType=H,t.lanes=f,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case O:_=10;break t;case N:_=9;break t;case U:_=11;break t;case P:_=14;break t;case Q:_=16,s=null;break t}_=29,a=Error(r(130,t===null?"null":typeof t,"")),s=null}return n=Wn(_,a,n,c),n.elementType=t,n.type=s,n.lanes=f,n}function Ka(t,n,a,s){return t=Wn(7,t,s,n),t.lanes=a,t}function eu(t,n,a){return t=Wn(6,t,null,n),t.lanes=a,t}function lp(t){var n=Wn(18,null,null,0);return n.stateNode=t,n}function nu(t,n,a){return n=Wn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var cp=new WeakMap;function ni(t,n){if(typeof t=="object"&&t!==null){var a=cp.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Xt(n)},cp.set(t,n),n)}return{value:t,source:n,stack:Xt(n)}}var Lr=[],Nr=0,$o=null,Ws=0,ii=[],ai=0,ua=null,Ri=1,Ci="";function Ii(t,n){Lr[Nr++]=Ws,Lr[Nr++]=$o,$o=t,Ws=n}function up(t,n,a){ii[ai++]=Ri,ii[ai++]=Ci,ii[ai++]=ua,ua=t;var s=Ri;t=Ci;var c=32-Jt(s)-1;s&=~(1<<c),a+=1;var f=32-Jt(n)+c;if(30<f){var _=c-c%5;f=(s&(1<<_)-1).toString(32),s>>=_,c-=_,Ri=1<<32-Jt(n)+c|a<<c|s,Ci=f+t}else Ri=1<<f|a<<c|s,Ci=t}function iu(t){t.return!==null&&(Ii(t,1),up(t,1,0))}function au(t){for(;t===$o;)$o=Lr[--Nr],Lr[Nr]=null,Ws=Lr[--Nr],Lr[Nr]=null;for(;t===ua;)ua=ii[--ai],ii[ai]=null,Ci=ii[--ai],ii[ai]=null,Ri=ii[--ai],ii[ai]=null}function fp(t,n){ii[ai++]=Ri,ii[ai++]=Ci,ii[ai++]=ua,Ri=n.id,Ci=n.overflow,ua=t}var xn=null,je=null,ye=!1,fa=null,ri=!1,ru=Error(r(519));function da(t){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Xs(ni(n,t)),ru}function dp(t){var n=t.stateNode,a=t.type,s=t.memoizedProps;switch(n[Ke]=t,n[_n]=s,a){case"dialog":he("cancel",n),he("close",n);break;case"iframe":case"object":case"embed":he("load",n);break;case"video":case"audio":for(a=0;a<mo.length;a++)he(mo[a],n);break;case"source":he("error",n);break;case"img":case"image":case"link":he("error",n),he("load",n);break;case"details":he("toggle",n);break;case"input":he("invalid",n),wn(n,s.value,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name,!0);break;case"select":he("invalid",n);break;case"textarea":he("invalid",n),br(n,s.value,s.defaultValue,s.children)}a=s.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||s.suppressHydrationWarning===!0||wg(n.textContent,a)?(s.popover!=null&&(he("beforetoggle",n),he("toggle",n)),s.onScroll!=null&&he("scroll",n),s.onScrollEnd!=null&&he("scrollend",n),s.onClick!=null&&(n.onclick=zi),n=!0):n=!1,n||da(t,!0)}function hp(t){for(xn=t.return;xn;)switch(xn.tag){case 5:case 31:case 13:ri=!1;return;case 27:case 3:ri=!0;return;default:xn=xn.return}}function Or(t){if(t!==xn)return!1;if(!ye)return hp(t),ye=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||bf(t.type,t.memoizedProps)),a=!a),a&&je&&da(t),hp(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));je=Bg(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));je=Bg(t)}else n===27?(n=je,Aa(t.type)?(t=wf,wf=null,je=t):je=n):je=xn?oi(t.stateNode.nextSibling):null;return!0}function Qa(){je=xn=null,ye=!1}function su(){var t=fa;return t!==null&&(In===null?In=t:In.push.apply(In,t),fa=null),t}function Xs(t){fa===null?fa=[t]:fa.push(t)}var ou=F(null),Ja=null,Hi=null;function ha(t,n,a){St(ou,n._currentValue),n._currentValue=a}function Gi(t){t._currentValue=ou.current,at(ou)}function lu(t,n,a){for(;t!==null;){var s=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,s!==null&&(s.childLanes|=n)):s!==null&&(s.childLanes&n)!==n&&(s.childLanes|=n),t===a)break;t=t.return}}function cu(t,n,a,s){var c=t.child;for(c!==null&&(c.return=t);c!==null;){var f=c.dependencies;if(f!==null){var _=c.child;f=f.firstContext;t:for(;f!==null;){var E=f;f=c;for(var B=0;B<n.length;B++)if(E.context===n[B]){f.lanes|=a,E=f.alternate,E!==null&&(E.lanes|=a),lu(f.return,a,t),s||(_=null);break t}f=E.next}}else if(c.tag===18){if(_=c.return,_===null)throw Error(r(341));_.lanes|=a,f=_.alternate,f!==null&&(f.lanes|=a),lu(_,a,t),_=null}else _=c.child;if(_!==null)_.return=c;else for(_=c;_!==null;){if(_===t){_=null;break}if(c=_.sibling,c!==null){c.return=_.return,_=c;break}_=_.return}c=_}}function Fr(t,n,a,s){t=null;for(var c=n,f=!1;c!==null;){if(!f){if((c.flags&524288)!==0)f=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var _=c.alternate;if(_===null)throw Error(r(387));if(_=_.memoizedProps,_!==null){var E=c.type;jn(c.pendingProps.value,_.value)||(t!==null?t.push(E):t=[E])}}else if(c===yt.current){if(_=c.alternate,_===null)throw Error(r(387));_.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(t!==null?t.push(yo):t=[yo])}c=c.return}t!==null&&cu(n,t,a,s),n.flags|=262144}function tl(t){for(t=t.firstContext;t!==null;){if(!jn(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function $a(t){Ja=t,Hi=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function yn(t){return pp(Ja,t)}function el(t,n){return Ja===null&&$a(t),pp(t,n)}function pp(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Hi===null){if(t===null)throw Error(r(308));Hi=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Hi=Hi.next=n;return a}var Jv=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,s){t.push(s)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},$v=o.unstable_scheduleCallback,tx=o.unstable_NormalPriority,nn={$$typeof:O,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function uu(){return{controller:new Jv,data:new Map,refCount:0}}function qs(t){t.refCount--,t.refCount===0&&$v(tx,function(){t.controller.abort()})}var Ys=null,fu=0,zr=0,Pr=null;function ex(t,n){if(Ys===null){var a=Ys=[];fu=0,zr=mf(),Pr={status:"pending",value:void 0,then:function(s){a.push(s)}}}return fu++,n.then(mp,mp),n}function mp(){if(--fu===0&&Ys!==null){Pr!==null&&(Pr.status="fulfilled");var t=Ys;Ys=null,zr=0,Pr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function nx(t,n){var a=[],s={status:"pending",value:null,reason:null,then:function(c){a.push(c)}};return t.then(function(){s.status="fulfilled",s.value=n;for(var c=0;c<a.length;c++)(0,a[c])(n)},function(c){for(s.status="rejected",s.reason=c,c=0;c<a.length;c++)(0,a[c])(void 0)}),s}var gp=z.S;z.S=function(t,n){$m=dt(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&ex(t,n),gp!==null&&gp(t,n)};var tr=F(null);function du(){var t=tr.current;return t!==null?t:Ve.pooledCache}function nl(t,n){n===null?St(tr,tr.current):St(tr,n.pool)}function _p(){var t=du();return t===null?null:{parent:nn._currentValue,pool:t}}var Br=Error(r(460)),hu=Error(r(474)),il=Error(r(542)),al={then:function(){}};function vp(t){return t=t.status,t==="fulfilled"||t==="rejected"}function xp(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(zi,zi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Sp(t),t;default:if(typeof n.status=="string")n.then(zi,zi);else{if(t=Ve,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=n,t.status="pending",t.then(function(s){if(n.status==="pending"){var c=n;c.status="fulfilled",c.value=s}},function(s){if(n.status==="pending"){var c=n;c.status="rejected",c.reason=s}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Sp(t),t}throw nr=n,Br}}function er(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(nr=a,Br):a}}var nr=null;function yp(){if(nr===null)throw Error(r(459));var t=nr;return nr=null,t}function Sp(t){if(t===Br||t===il)throw Error(r(483))}var Ir=null,Zs=0;function rl(t){var n=Zs;return Zs+=1,Ir===null&&(Ir=[]),xp(Ir,t,n)}function Ks(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function sl(t,n){throw n.$$typeof===y?Error(r(525)):(t=Object.prototype.toString.call(n),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function Mp(t){function n(Y,G){if(t){var $=Y.deletions;$===null?(Y.deletions=[G],Y.flags|=16):$.push(G)}}function a(Y,G){if(!t)return null;for(;G!==null;)n(Y,G),G=G.sibling;return null}function s(Y){for(var G=new Map;Y!==null;)Y.key!==null?G.set(Y.key,Y):G.set(Y.index,Y),Y=Y.sibling;return G}function c(Y,G){return Y=Bi(Y,G),Y.index=0,Y.sibling=null,Y}function f(Y,G,$){return Y.index=$,t?($=Y.alternate,$!==null?($=$.index,$<G?(Y.flags|=67108866,G):$):(Y.flags|=67108866,G)):(Y.flags|=1048576,G)}function _(Y){return t&&Y.alternate===null&&(Y.flags|=67108866),Y}function E(Y,G,$,ht){return G===null||G.tag!==6?(G=eu($,Y.mode,ht),G.return=Y,G):(G=c(G,$),G.return=Y,G)}function B(Y,G,$,ht){var Zt=$.type;return Zt===C?ut(Y,G,$.props.children,ht,$.key):G!==null&&(G.elementType===Zt||typeof Zt=="object"&&Zt!==null&&Zt.$$typeof===Q&&er(Zt)===G.type)?(G=c(G,$.props),Ks(G,$),G.return=Y,G):(G=Jo($.type,$.key,$.props,null,Y.mode,ht),Ks(G,$),G.return=Y,G)}function tt(Y,G,$,ht){return G===null||G.tag!==4||G.stateNode.containerInfo!==$.containerInfo||G.stateNode.implementation!==$.implementation?(G=nu($,Y.mode,ht),G.return=Y,G):(G=c(G,$.children||[]),G.return=Y,G)}function ut(Y,G,$,ht,Zt){return G===null||G.tag!==7?(G=Ka($,Y.mode,ht,Zt),G.return=Y,G):(G=c(G,$),G.return=Y,G)}function _t(Y,G,$){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return G=eu(""+G,Y.mode,$),G.return=Y,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case M:return $=Jo(G.type,G.key,G.props,null,Y.mode,$),Ks($,G),$.return=Y,$;case b:return G=nu(G,Y.mode,$),G.return=Y,G;case Q:return G=er(G),_t(Y,G,$)}if(mt(G)||st(G))return G=Ka(G,Y.mode,$,null),G.return=Y,G;if(typeof G.then=="function")return _t(Y,rl(G),$);if(G.$$typeof===O)return _t(Y,el(Y,G),$);sl(Y,G)}return null}function et(Y,G,$,ht){var Zt=G!==null?G.key:null;if(typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint")return Zt!==null?null:E(Y,G,""+$,ht);if(typeof $=="object"&&$!==null){switch($.$$typeof){case M:return $.key===Zt?B(Y,G,$,ht):null;case b:return $.key===Zt?tt(Y,G,$,ht):null;case Q:return $=er($),et(Y,G,$,ht)}if(mt($)||st($))return Zt!==null?null:ut(Y,G,$,ht,null);if(typeof $.then=="function")return et(Y,G,rl($),ht);if($.$$typeof===O)return et(Y,G,el(Y,$),ht);sl(Y,$)}return null}function lt(Y,G,$,ht,Zt){if(typeof ht=="string"&&ht!==""||typeof ht=="number"||typeof ht=="bigint")return Y=Y.get($)||null,E(G,Y,""+ht,Zt);if(typeof ht=="object"&&ht!==null){switch(ht.$$typeof){case M:return Y=Y.get(ht.key===null?$:ht.key)||null,B(G,Y,ht,Zt);case b:return Y=Y.get(ht.key===null?$:ht.key)||null,tt(G,Y,ht,Zt);case Q:return ht=er(ht),lt(Y,G,$,ht,Zt)}if(mt(ht)||st(ht))return Y=Y.get($)||null,ut(G,Y,ht,Zt,null);if(typeof ht.then=="function")return lt(Y,G,$,rl(ht),Zt);if(ht.$$typeof===O)return lt(Y,G,$,el(G,ht),Zt);sl(G,ht)}return null}function It(Y,G,$,ht){for(var Zt=null,Ae=null,Gt=G,oe=G=0,_e=null;Gt!==null&&oe<$.length;oe++){Gt.index>oe?(_e=Gt,Gt=null):_e=Gt.sibling;var Re=et(Y,Gt,$[oe],ht);if(Re===null){Gt===null&&(Gt=_e);break}t&&Gt&&Re.alternate===null&&n(Y,Gt),G=f(Re,G,oe),Ae===null?Zt=Re:Ae.sibling=Re,Ae=Re,Gt=_e}if(oe===$.length)return a(Y,Gt),ye&&Ii(Y,oe),Zt;if(Gt===null){for(;oe<$.length;oe++)Gt=_t(Y,$[oe],ht),Gt!==null&&(G=f(Gt,G,oe),Ae===null?Zt=Gt:Ae.sibling=Gt,Ae=Gt);return ye&&Ii(Y,oe),Zt}for(Gt=s(Gt);oe<$.length;oe++)_e=lt(Gt,Y,oe,$[oe],ht),_e!==null&&(t&&_e.alternate!==null&&Gt.delete(_e.key===null?oe:_e.key),G=f(_e,G,oe),Ae===null?Zt=_e:Ae.sibling=_e,Ae=_e);return t&&Gt.forEach(function(Ua){return n(Y,Ua)}),ye&&Ii(Y,oe),Zt}function Qt(Y,G,$,ht){if($==null)throw Error(r(151));for(var Zt=null,Ae=null,Gt=G,oe=G=0,_e=null,Re=$.next();Gt!==null&&!Re.done;oe++,Re=$.next()){Gt.index>oe?(_e=Gt,Gt=null):_e=Gt.sibling;var Ua=et(Y,Gt,Re.value,ht);if(Ua===null){Gt===null&&(Gt=_e);break}t&&Gt&&Ua.alternate===null&&n(Y,Gt),G=f(Ua,G,oe),Ae===null?Zt=Ua:Ae.sibling=Ua,Ae=Ua,Gt=_e}if(Re.done)return a(Y,Gt),ye&&Ii(Y,oe),Zt;if(Gt===null){for(;!Re.done;oe++,Re=$.next())Re=_t(Y,Re.value,ht),Re!==null&&(G=f(Re,G,oe),Ae===null?Zt=Re:Ae.sibling=Re,Ae=Re);return ye&&Ii(Y,oe),Zt}for(Gt=s(Gt);!Re.done;oe++,Re=$.next())Re=lt(Gt,Y,oe,Re.value,ht),Re!==null&&(t&&Re.alternate!==null&&Gt.delete(Re.key===null?oe:Re.key),G=f(Re,G,oe),Ae===null?Zt=Re:Ae.sibling=Re,Ae=Re);return t&&Gt.forEach(function(hy){return n(Y,hy)}),ye&&Ii(Y,oe),Zt}function Ie(Y,G,$,ht){if(typeof $=="object"&&$!==null&&$.type===C&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case M:t:{for(var Zt=$.key;G!==null;){if(G.key===Zt){if(Zt=$.type,Zt===C){if(G.tag===7){a(Y,G.sibling),ht=c(G,$.props.children),ht.return=Y,Y=ht;break t}}else if(G.elementType===Zt||typeof Zt=="object"&&Zt!==null&&Zt.$$typeof===Q&&er(Zt)===G.type){a(Y,G.sibling),ht=c(G,$.props),Ks(ht,$),ht.return=Y,Y=ht;break t}a(Y,G);break}else n(Y,G);G=G.sibling}$.type===C?(ht=Ka($.props.children,Y.mode,ht,$.key),ht.return=Y,Y=ht):(ht=Jo($.type,$.key,$.props,null,Y.mode,ht),Ks(ht,$),ht.return=Y,Y=ht)}return _(Y);case b:t:{for(Zt=$.key;G!==null;){if(G.key===Zt)if(G.tag===4&&G.stateNode.containerInfo===$.containerInfo&&G.stateNode.implementation===$.implementation){a(Y,G.sibling),ht=c(G,$.children||[]),ht.return=Y,Y=ht;break t}else{a(Y,G);break}else n(Y,G);G=G.sibling}ht=nu($,Y.mode,ht),ht.return=Y,Y=ht}return _(Y);case Q:return $=er($),Ie(Y,G,$,ht)}if(mt($))return It(Y,G,$,ht);if(st($)){if(Zt=st($),typeof Zt!="function")throw Error(r(150));return $=Zt.call($),Qt(Y,G,$,ht)}if(typeof $.then=="function")return Ie(Y,G,rl($),ht);if($.$$typeof===O)return Ie(Y,G,el(Y,$),ht);sl(Y,$)}return typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint"?($=""+$,G!==null&&G.tag===6?(a(Y,G.sibling),ht=c(G,$),ht.return=Y,Y=ht):(a(Y,G),ht=eu($,Y.mode,ht),ht.return=Y,Y=ht),_(Y)):a(Y,G)}return function(Y,G,$,ht){try{Zs=0;var Zt=Ie(Y,G,$,ht);return Ir=null,Zt}catch(Gt){if(Gt===Br||Gt===il)throw Gt;var Ae=Wn(29,Gt,null,Y.mode);return Ae.lanes=ht,Ae.return=Y,Ae}finally{}}}var ir=Mp(!0),Ep=Mp(!1),pa=!1;function pu(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function mu(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function ma(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function ga(t,n,a){var s=t.updateQueue;if(s===null)return null;if(s=s.shared,(we&2)!==0){var c=s.pending;return c===null?n.next=n:(n.next=c.next,c.next=n),s.pending=n,n=Qo(t),sp(t,null,a),n}return Ko(t,s,n,a),Qo(t)}function Qs(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var s=n.lanes;s&=t.pendingLanes,a|=s,n.lanes=a,Ls(t,a)}}function gu(t,n){var a=t.updateQueue,s=t.alternate;if(s!==null&&(s=s.updateQueue,a===s)){var c=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var _={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?c=f=_:f=f.next=_,a=a.next}while(a!==null);f===null?c=f=n:f=f.next=n}else c=f=n;a={baseState:s.baseState,firstBaseUpdate:c,lastBaseUpdate:f,shared:s.shared,callbacks:s.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var _u=!1;function Js(){if(_u){var t=Pr;if(t!==null)throw t}}function $s(t,n,a,s){_u=!1;var c=t.updateQueue;pa=!1;var f=c.firstBaseUpdate,_=c.lastBaseUpdate,E=c.shared.pending;if(E!==null){c.shared.pending=null;var B=E,tt=B.next;B.next=null,_===null?f=tt:_.next=tt,_=B;var ut=t.alternate;ut!==null&&(ut=ut.updateQueue,E=ut.lastBaseUpdate,E!==_&&(E===null?ut.firstBaseUpdate=tt:E.next=tt,ut.lastBaseUpdate=B))}if(f!==null){var _t=c.baseState;_=0,ut=tt=B=null,E=f;do{var et=E.lane&-536870913,lt=et!==E.lane;if(lt?(ge&et)===et:(s&et)===et){et!==0&&et===zr&&(_u=!0),ut!==null&&(ut=ut.next={lane:0,tag:E.tag,payload:E.payload,callback:null,next:null});t:{var It=t,Qt=E;et=n;var Ie=a;switch(Qt.tag){case 1:if(It=Qt.payload,typeof It=="function"){_t=It.call(Ie,_t,et);break t}_t=It;break t;case 3:It.flags=It.flags&-65537|128;case 0:if(It=Qt.payload,et=typeof It=="function"?It.call(Ie,_t,et):It,et==null)break t;_t=x({},_t,et);break t;case 2:pa=!0}}et=E.callback,et!==null&&(t.flags|=64,lt&&(t.flags|=8192),lt=c.callbacks,lt===null?c.callbacks=[et]:lt.push(et))}else lt={lane:et,tag:E.tag,payload:E.payload,callback:E.callback,next:null},ut===null?(tt=ut=lt,B=_t):ut=ut.next=lt,_|=et;if(E=E.next,E===null){if(E=c.shared.pending,E===null)break;lt=E,E=lt.next,lt.next=null,c.lastBaseUpdate=lt,c.shared.pending=null}}while(!0);ut===null&&(B=_t),c.baseState=B,c.firstBaseUpdate=tt,c.lastBaseUpdate=ut,f===null&&(c.shared.lanes=0),Sa|=_,t.lanes=_,t.memoizedState=_t}}function bp(t,n){if(typeof t!="function")throw Error(r(191,t));t.call(n)}function Tp(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)bp(a[t],n)}var Hr=F(null),ol=F(0);function Ap(t,n){t=Ki,St(ol,t),St(Hr,n),Ki=t|n.baseLanes}function vu(){St(ol,Ki),St(Hr,Hr.current)}function xu(){Ki=ol.current,at(Hr),at(ol)}var Xn=F(null),si=null;function _a(t){var n=t.alternate;St(tn,tn.current&1),St(Xn,t),si===null&&(n===null||Hr.current!==null||n.memoizedState!==null)&&(si=t)}function yu(t){St(tn,tn.current),St(Xn,t),si===null&&(si=t)}function Rp(t){t.tag===22?(St(tn,tn.current),St(Xn,t),si===null&&(si=t)):va()}function va(){St(tn,tn.current),St(Xn,Xn.current)}function qn(t){at(Xn),si===t&&(si=null),at(tn)}var tn=F(0);function ll(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Rf(a)||Cf(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Vi=0,se=null,Pe=null,an=null,cl=!1,Gr=!1,ar=!1,ul=0,to=0,Vr=null,ix=0;function Je(){throw Error(r(321))}function Su(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!jn(t[a],n[a]))return!1;return!0}function Mu(t,n,a,s,c,f){return Vi=f,se=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,z.H=t===null||t.memoizedState===null?um:Pu,ar=!1,f=a(s,c),ar=!1,Gr&&(f=wp(n,a,s,c)),Cp(t),f}function Cp(t){z.H=io;var n=Pe!==null&&Pe.next!==null;if(Vi=0,an=Pe=se=null,cl=!1,to=0,Vr=null,n)throw Error(r(300));t===null||rn||(t=t.dependencies,t!==null&&tl(t)&&(rn=!0))}function wp(t,n,a,s){se=t;var c=0;do{if(Gr&&(Vr=null),to=0,Gr=!1,25<=c)throw Error(r(301));if(c+=1,an=Pe=null,t.updateQueue!=null){var f=t.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}z.H=fm,f=n(a,s)}while(Gr);return f}function ax(){var t=z.H,n=t.useState()[0];return n=typeof n.then=="function"?eo(n):n,t=t.useState()[0],(Pe!==null?Pe.memoizedState:null)!==t&&(se.flags|=1024),n}function Eu(){var t=ul!==0;return ul=0,t}function bu(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Tu(t){if(cl){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}cl=!1}Vi=0,an=Pe=se=null,Gr=!1,to=ul=0,Vr=null}function Dn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return an===null?se.memoizedState=an=t:an=an.next=t,an}function en(){if(Pe===null){var t=se.alternate;t=t!==null?t.memoizedState:null}else t=Pe.next;var n=an===null?se.memoizedState:an.next;if(n!==null)an=n,Pe=t;else{if(t===null)throw se.alternate===null?Error(r(467)):Error(r(310));Pe=t,t={memoizedState:Pe.memoizedState,baseState:Pe.baseState,baseQueue:Pe.baseQueue,queue:Pe.queue,next:null},an===null?se.memoizedState=an=t:an=an.next=t}return an}function fl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function eo(t){var n=to;return to+=1,Vr===null&&(Vr=[]),t=xp(Vr,t,n),n=se,(an===null?n.memoizedState:an.next)===null&&(n=n.alternate,z.H=n===null||n.memoizedState===null?um:Pu),t}function dl(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return eo(t);if(t.$$typeof===O)return yn(t)}throw Error(r(438,String(t)))}function Au(t){var n=null,a=se.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var s=se.alternate;s!==null&&(s=s.updateQueue,s!==null&&(s=s.memoCache,s!=null&&(n={data:s.data.map(function(c){return c.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=fl(),se.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),s=0;s<t;s++)a[s]=w;return n.index++,a}function ki(t,n){return typeof n=="function"?n(t):n}function hl(t){var n=en();return Ru(n,Pe,t)}function Ru(t,n,a){var s=t.queue;if(s===null)throw Error(r(311));s.lastRenderedReducer=a;var c=t.baseQueue,f=s.pending;if(f!==null){if(c!==null){var _=c.next;c.next=f.next,f.next=_}n.baseQueue=c=f,s.pending=null}if(f=t.baseState,c===null)t.memoizedState=f;else{n=c.next;var E=_=null,B=null,tt=n,ut=!1;do{var _t=tt.lane&-536870913;if(_t!==tt.lane?(ge&_t)===_t:(Vi&_t)===_t){var et=tt.revertLane;if(et===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null}),_t===zr&&(ut=!0);else if((Vi&et)===et){tt=tt.next,et===zr&&(ut=!0);continue}else _t={lane:0,revertLane:tt.revertLane,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},B===null?(E=B=_t,_=f):B=B.next=_t,se.lanes|=et,Sa|=et;_t=tt.action,ar&&a(f,_t),f=tt.hasEagerState?tt.eagerState:a(f,_t)}else et={lane:_t,revertLane:tt.revertLane,gesture:tt.gesture,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},B===null?(E=B=et,_=f):B=B.next=et,se.lanes|=_t,Sa|=_t;tt=tt.next}while(tt!==null&&tt!==n);if(B===null?_=f:B.next=E,!jn(f,t.memoizedState)&&(rn=!0,ut&&(a=Pr,a!==null)))throw a;t.memoizedState=f,t.baseState=_,t.baseQueue=B,s.lastRenderedState=f}return c===null&&(s.lanes=0),[t.memoizedState,s.dispatch]}function Cu(t){var n=en(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=t;var s=a.dispatch,c=a.pending,f=n.memoizedState;if(c!==null){a.pending=null;var _=c=c.next;do f=t(f,_.action),_=_.next;while(_!==c);jn(f,n.memoizedState)||(rn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,s]}function Dp(t,n,a){var s=se,c=en(),f=ye;if(f){if(a===void 0)throw Error(r(407));a=a()}else a=n();var _=!jn((Pe||c).memoizedState,a);if(_&&(c.memoizedState=a,rn=!0),c=c.queue,Uu(Np.bind(null,s,c,t),[t]),c.getSnapshot!==n||_||an!==null&&an.memoizedState.tag&1){if(s.flags|=2048,kr(9,{destroy:void 0},Lp.bind(null,s,c,a,n),null),Ve===null)throw Error(r(349));f||(Vi&127)!==0||Up(s,n,a)}return a}function Up(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=se.updateQueue,n===null?(n=fl(),se.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function Lp(t,n,a,s){n.value=a,n.getSnapshot=s,Op(n)&&Fp(t)}function Np(t,n,a){return a(function(){Op(n)&&Fp(t)})}function Op(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!jn(t,a)}catch{return!0}}function Fp(t){var n=Za(t,2);n!==null&&Hn(n,t,2)}function wu(t){var n=Dn();if(typeof t=="function"){var a=t;if(t=a(),ar){Ot(!0);try{a()}finally{Ot(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ki,lastRenderedState:t},n}function zp(t,n,a,s){return t.baseState=a,Ru(t,Pe,typeof s=="function"?s:ki)}function rx(t,n,a,s,c){if(gl(t))throw Error(r(485));if(t=n.action,t!==null){var f={payload:c,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(_){f.listeners.push(_)}};z.T!==null?a(!0):f.isTransition=!1,s(f),a=n.pending,a===null?(f.next=n.pending=f,Pp(n,f)):(f.next=a.next,n.pending=a.next=f)}}function Pp(t,n){var a=n.action,s=n.payload,c=t.state;if(n.isTransition){var f=z.T,_={};z.T=_;try{var E=a(c,s),B=z.S;B!==null&&B(_,E),Bp(t,n,E)}catch(tt){Du(t,n,tt)}finally{f!==null&&_.types!==null&&(f.types=_.types),z.T=f}}else try{f=a(c,s),Bp(t,n,f)}catch(tt){Du(t,n,tt)}}function Bp(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(s){Ip(t,n,s)},function(s){return Du(t,n,s)}):Ip(t,n,a)}function Ip(t,n,a){n.status="fulfilled",n.value=a,Hp(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,Pp(t,a)))}function Du(t,n,a){var s=t.pending;if(t.pending=null,s!==null){s=s.next;do n.status="rejected",n.reason=a,Hp(n),n=n.next;while(n!==s)}t.action=null}function Hp(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Gp(t,n){return n}function Vp(t,n){if(ye){var a=Ve.formState;if(a!==null){t:{var s=se;if(ye){if(je){e:{for(var c=je,f=ri;c.nodeType!==8;){if(!f){c=null;break e}if(c=oi(c.nextSibling),c===null){c=null;break e}}f=c.data,c=f==="F!"||f==="F"?c:null}if(c){je=oi(c.nextSibling),s=c.data==="F!";break t}}da(s)}s=!1}s&&(n=a[0])}}return a=Dn(),a.memoizedState=a.baseState=n,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Gp,lastRenderedState:n},a.queue=s,a=om.bind(null,se,s),s.dispatch=a,s=wu(!1),f=zu.bind(null,se,!1,s.queue),s=Dn(),c={state:n,dispatch:null,action:t,pending:null},s.queue=c,a=rx.bind(null,se,c,f,a),c.dispatch=a,s.memoizedState=t,[n,a,!1]}function kp(t){var n=en();return jp(n,Pe,t)}function jp(t,n,a){if(n=Ru(t,n,Gp)[0],t=hl(ki)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var s=eo(n)}catch(_){throw _===Br?il:_}else s=n;n=en();var c=n.queue,f=c.dispatch;return a!==n.memoizedState&&(se.flags|=2048,kr(9,{destroy:void 0},sx.bind(null,c,a),null)),[s,f,t]}function sx(t,n){t.action=n}function Wp(t){var n=en(),a=Pe;if(a!==null)return jp(n,a,t);en(),n=n.memoizedState,a=en();var s=a.queue.dispatch;return a.memoizedState=t,[n,s,!1]}function kr(t,n,a,s){return t={tag:t,create:a,deps:s,inst:n,next:null},n=se.updateQueue,n===null&&(n=fl(),se.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(s=a.next,a.next=t,t.next=s,n.lastEffect=t),t}function Xp(){return en().memoizedState}function pl(t,n,a,s){var c=Dn();se.flags|=t,c.memoizedState=kr(1|n,{destroy:void 0},a,s===void 0?null:s)}function ml(t,n,a,s){var c=en();s=s===void 0?null:s;var f=c.memoizedState.inst;Pe!==null&&s!==null&&Su(s,Pe.memoizedState.deps)?c.memoizedState=kr(n,f,a,s):(se.flags|=t,c.memoizedState=kr(1|n,f,a,s))}function qp(t,n){pl(8390656,8,t,n)}function Uu(t,n){ml(2048,8,t,n)}function ox(t){se.flags|=4;var n=se.updateQueue;if(n===null)n=fl(),se.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Yp(t){var n=en().memoizedState;return ox({ref:n,nextImpl:t}),function(){if((we&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function Zp(t,n){return ml(4,2,t,n)}function Kp(t,n){return ml(4,4,t,n)}function Qp(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Jp(t,n,a){a=a!=null?a.concat([t]):null,ml(4,4,Qp.bind(null,n,t),a)}function Lu(){}function $p(t,n){var a=en();n=n===void 0?null:n;var s=a.memoizedState;return n!==null&&Su(n,s[1])?s[0]:(a.memoizedState=[t,n],t)}function tm(t,n){var a=en();n=n===void 0?null:n;var s=a.memoizedState;if(n!==null&&Su(n,s[1]))return s[0];if(s=t(),ar){Ot(!0);try{t()}finally{Ot(!1)}}return a.memoizedState=[s,n],s}function Nu(t,n,a){return a===void 0||(Vi&1073741824)!==0&&(ge&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=eg(),se.lanes|=t,Sa|=t,a)}function em(t,n,a,s){return jn(a,n)?a:Hr.current!==null?(t=Nu(t,a,s),jn(t,n)||(rn=!0),t):(Vi&42)===0||(Vi&1073741824)!==0&&(ge&261930)===0?(rn=!0,t.memoizedState=a):(t=eg(),se.lanes|=t,Sa|=t,n)}function nm(t,n,a,s,c){var f=Z.p;Z.p=f!==0&&8>f?f:8;var _=z.T,E={};z.T=E,zu(t,!1,n,a);try{var B=c(),tt=z.S;if(tt!==null&&tt(E,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var ut=nx(B,s);no(t,n,ut,Kn(t))}else no(t,n,s,Kn(t))}catch(_t){no(t,n,{then:function(){},status:"rejected",reason:_t},Kn())}finally{Z.p=f,_!==null&&E.types!==null&&(_.types=E.types),z.T=_}}function lx(){}function Ou(t,n,a,s){if(t.tag!==5)throw Error(r(476));var c=im(t).queue;nm(t,c,n,q,a===null?lx:function(){return am(t),a(s)})}function im(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:q,baseState:q,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ki,lastRenderedState:q},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ki,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function am(t){var n=im(t);n.next===null&&(n=t.alternate.memoizedState),no(t,n.next.queue,{},Kn())}function Fu(){return yn(yo)}function rm(){return en().memoizedState}function sm(){return en().memoizedState}function cx(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=Kn();t=ma(a);var s=ga(n,t,a);s!==null&&(Hn(s,n,a),Qs(s,n,a)),n={cache:uu()},t.payload=n;return}n=n.return}}function ux(t,n,a){var s=Kn();a={lane:s,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},gl(t)?lm(n,a):(a=$c(t,n,a,s),a!==null&&(Hn(a,t,s),cm(a,n,s)))}function om(t,n,a){var s=Kn();no(t,n,a,s)}function no(t,n,a,s){var c={lane:s,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(gl(t))lm(n,c);else{var f=t.alternate;if(t.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var _=n.lastRenderedState,E=f(_,a);if(c.hasEagerState=!0,c.eagerState=E,jn(E,_))return Ko(t,n,c,0),Ve===null&&Zo(),!1}catch{}finally{}if(a=$c(t,n,c,s),a!==null)return Hn(a,t,s),cm(a,n,s),!0}return!1}function zu(t,n,a,s){if(s={lane:2,revertLane:mf(),gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},gl(t)){if(n)throw Error(r(479))}else n=$c(t,a,s,2),n!==null&&Hn(n,t,2)}function gl(t){var n=t.alternate;return t===se||n!==null&&n===se}function lm(t,n){Gr=cl=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function cm(t,n,a){if((a&4194048)!==0){var s=n.lanes;s&=t.pendingLanes,a|=s,n.lanes=a,Ls(t,a)}}var io={readContext:yn,use:dl,useCallback:Je,useContext:Je,useEffect:Je,useImperativeHandle:Je,useLayoutEffect:Je,useInsertionEffect:Je,useMemo:Je,useReducer:Je,useRef:Je,useState:Je,useDebugValue:Je,useDeferredValue:Je,useTransition:Je,useSyncExternalStore:Je,useId:Je,useHostTransitionStatus:Je,useFormState:Je,useActionState:Je,useOptimistic:Je,useMemoCache:Je,useCacheRefresh:Je};io.useEffectEvent=Je;var um={readContext:yn,use:dl,useCallback:function(t,n){return Dn().memoizedState=[t,n===void 0?null:n],t},useContext:yn,useEffect:qp,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,pl(4194308,4,Qp.bind(null,n,t),a)},useLayoutEffect:function(t,n){return pl(4194308,4,t,n)},useInsertionEffect:function(t,n){pl(4,2,t,n)},useMemo:function(t,n){var a=Dn();n=n===void 0?null:n;var s=t();if(ar){Ot(!0);try{t()}finally{Ot(!1)}}return a.memoizedState=[s,n],s},useReducer:function(t,n,a){var s=Dn();if(a!==void 0){var c=a(n);if(ar){Ot(!0);try{a(n)}finally{Ot(!1)}}}else c=n;return s.memoizedState=s.baseState=c,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:c},s.queue=t,t=t.dispatch=ux.bind(null,se,t),[s.memoizedState,t]},useRef:function(t){var n=Dn();return t={current:t},n.memoizedState=t},useState:function(t){t=wu(t);var n=t.queue,a=om.bind(null,se,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Lu,useDeferredValue:function(t,n){var a=Dn();return Nu(a,t,n)},useTransition:function(){var t=wu(!1);return t=nm.bind(null,se,t.queue,!0,!1),Dn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var s=se,c=Dn();if(ye){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),Ve===null)throw Error(r(349));(ge&127)!==0||Up(s,n,a)}c.memoizedState=a;var f={value:a,getSnapshot:n};return c.queue=f,qp(Np.bind(null,s,f,t),[t]),s.flags|=2048,kr(9,{destroy:void 0},Lp.bind(null,s,f,a,n),null),a},useId:function(){var t=Dn(),n=Ve.identifierPrefix;if(ye){var a=Ci,s=Ri;a=(s&~(1<<32-Jt(s)-1)).toString(32)+a,n="_"+n+"R_"+a,a=ul++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=ix++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Fu,useFormState:Vp,useActionState:Vp,useOptimistic:function(t){var n=Dn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=zu.bind(null,se,!0,a),a.dispatch=n,[t,n]},useMemoCache:Au,useCacheRefresh:function(){return Dn().memoizedState=cx.bind(null,se)},useEffectEvent:function(t){var n=Dn(),a={impl:t};return n.memoizedState=a,function(){if((we&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},Pu={readContext:yn,use:dl,useCallback:$p,useContext:yn,useEffect:Uu,useImperativeHandle:Jp,useInsertionEffect:Zp,useLayoutEffect:Kp,useMemo:tm,useReducer:hl,useRef:Xp,useState:function(){return hl(ki)},useDebugValue:Lu,useDeferredValue:function(t,n){var a=en();return em(a,Pe.memoizedState,t,n)},useTransition:function(){var t=hl(ki)[0],n=en().memoizedState;return[typeof t=="boolean"?t:eo(t),n]},useSyncExternalStore:Dp,useId:rm,useHostTransitionStatus:Fu,useFormState:kp,useActionState:kp,useOptimistic:function(t,n){var a=en();return zp(a,Pe,t,n)},useMemoCache:Au,useCacheRefresh:sm};Pu.useEffectEvent=Yp;var fm={readContext:yn,use:dl,useCallback:$p,useContext:yn,useEffect:Uu,useImperativeHandle:Jp,useInsertionEffect:Zp,useLayoutEffect:Kp,useMemo:tm,useReducer:Cu,useRef:Xp,useState:function(){return Cu(ki)},useDebugValue:Lu,useDeferredValue:function(t,n){var a=en();return Pe===null?Nu(a,t,n):em(a,Pe.memoizedState,t,n)},useTransition:function(){var t=Cu(ki)[0],n=en().memoizedState;return[typeof t=="boolean"?t:eo(t),n]},useSyncExternalStore:Dp,useId:rm,useHostTransitionStatus:Fu,useFormState:Wp,useActionState:Wp,useOptimistic:function(t,n){var a=en();return Pe!==null?zp(a,Pe,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Au,useCacheRefresh:sm};fm.useEffectEvent=Yp;function Bu(t,n,a,s){n=t.memoizedState,a=a(s,n),a=a==null?n:x({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Iu={enqueueSetState:function(t,n,a){t=t._reactInternals;var s=Kn(),c=ma(s);c.payload=n,a!=null&&(c.callback=a),n=ga(t,c,s),n!==null&&(Hn(n,t,s),Qs(n,t,s))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var s=Kn(),c=ma(s);c.tag=1,c.payload=n,a!=null&&(c.callback=a),n=ga(t,c,s),n!==null&&(Hn(n,t,s),Qs(n,t,s))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=Kn(),s=ma(a);s.tag=2,n!=null&&(s.callback=n),n=ga(t,s,a),n!==null&&(Hn(n,t,a),Qs(n,t,a))}};function dm(t,n,a,s,c,f,_){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(s,f,_):n.prototype&&n.prototype.isPureReactComponent?!ks(a,s)||!ks(c,f):!0}function hm(t,n,a,s){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,s),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,s),n.state!==t&&Iu.enqueueReplaceState(n,n.state,null)}function rr(t,n){var a=n;if("ref"in n){a={};for(var s in n)s!=="ref"&&(a[s]=n[s])}if(t=t.defaultProps){a===n&&(a=x({},a));for(var c in t)a[c]===void 0&&(a[c]=t[c])}return a}function pm(t){Yo(t)}function mm(t){console.error(t)}function gm(t){Yo(t)}function _l(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(s){setTimeout(function(){throw s})}}function _m(t,n,a){try{var s=t.onCaughtError;s(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function Hu(t,n,a){return a=ma(a),a.tag=3,a.payload={element:null},a.callback=function(){_l(t,n)},a}function vm(t){return t=ma(t),t.tag=3,t}function xm(t,n,a,s){var c=a.type.getDerivedStateFromError;if(typeof c=="function"){var f=s.value;t.payload=function(){return c(f)},t.callback=function(){_m(n,a,s)}}var _=a.stateNode;_!==null&&typeof _.componentDidCatch=="function"&&(t.callback=function(){_m(n,a,s),typeof c!="function"&&(Ma===null?Ma=new Set([this]):Ma.add(this));var E=s.stack;this.componentDidCatch(s.value,{componentStack:E!==null?E:""})})}function fx(t,n,a,s,c){if(a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){if(n=a.alternate,n!==null&&Fr(n,a,c,!0),a=Xn.current,a!==null){switch(a.tag){case 31:case 13:return si===null?wl():a.alternate===null&&$e===0&&($e=3),a.flags&=-257,a.flags|=65536,a.lanes=c,s===al?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([s]):n.add(s),df(t,s,c)),!1;case 22:return a.flags|=65536,s===al?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([s])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([s]):a.add(s)),df(t,s,c)),!1}throw Error(r(435,a.tag))}return df(t,s,c),wl(),!1}if(ye)return n=Xn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=c,s!==ru&&(t=Error(r(422),{cause:s}),Xs(ni(t,a)))):(s!==ru&&(n=Error(r(423),{cause:s}),Xs(ni(n,a))),t=t.current.alternate,t.flags|=65536,c&=-c,t.lanes|=c,s=ni(s,a),c=Hu(t.stateNode,s,c),gu(t,c),$e!==4&&($e=2)),!1;var f=Error(r(520),{cause:s});if(f=ni(f,a),fo===null?fo=[f]:fo.push(f),$e!==4&&($e=2),n===null)return!0;s=ni(s,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=c&-c,a.lanes|=t,t=Hu(a.stateNode,s,t),gu(a,t),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Ma===null||!Ma.has(f))))return a.flags|=65536,c&=-c,a.lanes|=c,c=vm(c),xm(c,t,a,s),gu(a,c),!1}a=a.return}while(a!==null);return!1}var Gu=Error(r(461)),rn=!1;function Sn(t,n,a,s){n.child=t===null?Ep(n,null,a,s):ir(n,t.child,a,s)}function ym(t,n,a,s,c){a=a.render;var f=n.ref;if("ref"in s){var _={};for(var E in s)E!=="ref"&&(_[E]=s[E])}else _=s;return $a(n),s=Mu(t,n,a,_,f,c),E=Eu(),t!==null&&!rn?(bu(t,n,c),ji(t,n,c)):(ye&&E&&iu(n),n.flags|=1,Sn(t,n,s,c),n.child)}function Sm(t,n,a,s,c){if(t===null){var f=a.type;return typeof f=="function"&&!tu(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,Mm(t,n,f,s,c)):(t=Jo(a.type,null,s,n,n.mode,c),t.ref=n.ref,t.return=n,n.child=t)}if(f=t.child,!Zu(t,c)){var _=f.memoizedProps;if(a=a.compare,a=a!==null?a:ks,a(_,s)&&t.ref===n.ref)return ji(t,n,c)}return n.flags|=1,t=Bi(f,s),t.ref=n.ref,t.return=n,n.child=t}function Mm(t,n,a,s,c){if(t!==null){var f=t.memoizedProps;if(ks(f,s)&&t.ref===n.ref)if(rn=!1,n.pendingProps=s=f,Zu(t,c))(t.flags&131072)!==0&&(rn=!0);else return n.lanes=t.lanes,ji(t,n,c)}return Vu(t,n,a,s,c)}function Em(t,n,a,s){var c=s.children,f=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),s.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,t!==null){for(s=n.child=t.child,c=0;s!==null;)c=c|s.lanes|s.childLanes,s=s.sibling;s=c&~f}else s=0,n.child=null;return bm(t,n,f,a,s)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&nl(n,f!==null?f.cachePool:null),f!==null?Ap(n,f):vu(),Rp(n);else return s=n.lanes=536870912,bm(t,n,f!==null?f.baseLanes|a:a,a,s)}else f!==null?(nl(n,f.cachePool),Ap(n,f),va(),n.memoizedState=null):(t!==null&&nl(n,null),vu(),va());return Sn(t,n,c,a),n.child}function ao(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function bm(t,n,a,s,c){var f=du();return f=f===null?null:{parent:nn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},t!==null&&nl(n,null),vu(),Rp(n),t!==null&&Fr(t,n,s,!0),n.childLanes=c,null}function vl(t,n){return n=yl({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function Tm(t,n,a){return ir(n,t.child,null,a),t=vl(n,n.pendingProps),t.flags|=2,qn(n),n.memoizedState=null,t}function dx(t,n,a){var s=n.pendingProps,c=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(ye){if(s.mode==="hidden")return t=vl(n,s),n.lanes=536870912,ao(null,t);if(yu(n),(t=je)?(t=Pg(t,ri),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:ua!==null?{id:Ri,overflow:Ci}:null,retryLane:536870912,hydrationErrors:null},a=lp(t),a.return=n,n.child=a,xn=n,je=null)):t=null,t===null)throw da(n);return n.lanes=536870912,null}return vl(n,s)}var f=t.memoizedState;if(f!==null){var _=f.dehydrated;if(yu(n),c)if(n.flags&256)n.flags&=-257,n=Tm(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(r(558));else if(rn||Fr(t,n,a,!1),c=(a&t.childLanes)!==0,rn||c){if(s=Ve,s!==null&&(_=Ai(s,a),_!==0&&_!==f.retryLane))throw f.retryLane=_,Za(t,_),Hn(s,t,_),Gu;wl(),n=Tm(t,n,a)}else t=f.treeContext,je=oi(_.nextSibling),xn=n,ye=!0,fa=null,ri=!1,t!==null&&fp(n,t),n=vl(n,s),n.flags|=4096;return n}return t=Bi(t.child,{mode:s.mode,children:s.children}),t.ref=n.ref,n.child=t,t.return=n,t}function xl(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Vu(t,n,a,s,c){return $a(n),a=Mu(t,n,a,s,void 0,c),s=Eu(),t!==null&&!rn?(bu(t,n,c),ji(t,n,c)):(ye&&s&&iu(n),n.flags|=1,Sn(t,n,a,c),n.child)}function Am(t,n,a,s,c,f){return $a(n),n.updateQueue=null,a=wp(n,s,a,c),Cp(t),s=Eu(),t!==null&&!rn?(bu(t,n,f),ji(t,n,f)):(ye&&s&&iu(n),n.flags|=1,Sn(t,n,a,f),n.child)}function Rm(t,n,a,s,c){if($a(n),n.stateNode===null){var f=Ur,_=a.contextType;typeof _=="object"&&_!==null&&(f=yn(_)),f=new a(s,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=Iu,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=s,f.state=n.memoizedState,f.refs={},pu(n),_=a.contextType,f.context=typeof _=="object"&&_!==null?yn(_):Ur,f.state=n.memoizedState,_=a.getDerivedStateFromProps,typeof _=="function"&&(Bu(n,a,_,s),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(_=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),_!==f.state&&Iu.enqueueReplaceState(f,f.state,null),$s(n,s,f,c),Js(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),s=!0}else if(t===null){f=n.stateNode;var E=n.memoizedProps,B=rr(a,E);f.props=B;var tt=f.context,ut=a.contextType;_=Ur,typeof ut=="object"&&ut!==null&&(_=yn(ut));var _t=a.getDerivedStateFromProps;ut=typeof _t=="function"||typeof f.getSnapshotBeforeUpdate=="function",E=n.pendingProps!==E,ut||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(E||tt!==_)&&hm(n,f,s,_),pa=!1;var et=n.memoizedState;f.state=et,$s(n,s,f,c),Js(),tt=n.memoizedState,E||et!==tt||pa?(typeof _t=="function"&&(Bu(n,a,_t,s),tt=n.memoizedState),(B=pa||dm(n,a,B,s,et,tt,_))?(ut||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=s,n.memoizedState=tt),f.props=s,f.state=tt,f.context=_,s=B):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),s=!1)}else{f=n.stateNode,mu(t,n),_=n.memoizedProps,ut=rr(a,_),f.props=ut,_t=n.pendingProps,et=f.context,tt=a.contextType,B=Ur,typeof tt=="object"&&tt!==null&&(B=yn(tt)),E=a.getDerivedStateFromProps,(tt=typeof E=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(_!==_t||et!==B)&&hm(n,f,s,B),pa=!1,et=n.memoizedState,f.state=et,$s(n,s,f,c),Js();var lt=n.memoizedState;_!==_t||et!==lt||pa||t!==null&&t.dependencies!==null&&tl(t.dependencies)?(typeof E=="function"&&(Bu(n,a,E,s),lt=n.memoizedState),(ut=pa||dm(n,a,ut,s,et,lt,B)||t!==null&&t.dependencies!==null&&tl(t.dependencies))?(tt||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(s,lt,B),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(s,lt,B)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||_===t.memoizedProps&&et===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&et===t.memoizedState||(n.flags|=1024),n.memoizedProps=s,n.memoizedState=lt),f.props=s,f.state=lt,f.context=B,s=ut):(typeof f.componentDidUpdate!="function"||_===t.memoizedProps&&et===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&et===t.memoizedState||(n.flags|=1024),s=!1)}return f=s,xl(t,n),s=(n.flags&128)!==0,f||s?(f=n.stateNode,a=s&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,t!==null&&s?(n.child=ir(n,t.child,null,c),n.child=ir(n,null,a,c)):Sn(t,n,a,c),n.memoizedState=f.state,t=n.child):t=ji(t,n,c),t}function Cm(t,n,a,s){return Qa(),n.flags|=256,Sn(t,n,a,s),n.child}var ku={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ju(t){return{baseLanes:t,cachePool:_p()}}function Wu(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=Zn),t}function wm(t,n,a){var s=n.pendingProps,c=!1,f=(n.flags&128)!==0,_;if((_=f)||(_=t!==null&&t.memoizedState===null?!1:(tn.current&2)!==0),_&&(c=!0,n.flags&=-129),_=(n.flags&32)!==0,n.flags&=-33,t===null){if(ye){if(c?_a(n):va(),(t=je)?(t=Pg(t,ri),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:ua!==null?{id:Ri,overflow:Ci}:null,retryLane:536870912,hydrationErrors:null},a=lp(t),a.return=n,n.child=a,xn=n,je=null)):t=null,t===null)throw da(n);return Cf(t)?n.lanes=32:n.lanes=536870912,null}var E=s.children;return s=s.fallback,c?(va(),c=n.mode,E=yl({mode:"hidden",children:E},c),s=Ka(s,c,a,null),E.return=n,s.return=n,E.sibling=s,n.child=E,s=n.child,s.memoizedState=ju(a),s.childLanes=Wu(t,_,a),n.memoizedState=ku,ao(null,s)):(_a(n),Xu(n,E))}var B=t.memoizedState;if(B!==null&&(E=B.dehydrated,E!==null)){if(f)n.flags&256?(_a(n),n.flags&=-257,n=qu(t,n,a)):n.memoizedState!==null?(va(),n.child=t.child,n.flags|=128,n=null):(va(),E=s.fallback,c=n.mode,s=yl({mode:"visible",children:s.children},c),E=Ka(E,c,a,null),E.flags|=2,s.return=n,E.return=n,s.sibling=E,n.child=s,ir(n,t.child,null,a),s=n.child,s.memoizedState=ju(a),s.childLanes=Wu(t,_,a),n.memoizedState=ku,n=ao(null,s));else if(_a(n),Cf(E)){if(_=E.nextSibling&&E.nextSibling.dataset,_)var tt=_.dgst;_=tt,s=Error(r(419)),s.stack="",s.digest=_,Xs({value:s,source:null,stack:null}),n=qu(t,n,a)}else if(rn||Fr(t,n,a,!1),_=(a&t.childLanes)!==0,rn||_){if(_=Ve,_!==null&&(s=Ai(_,a),s!==0&&s!==B.retryLane))throw B.retryLane=s,Za(t,s),Hn(_,t,s),Gu;Rf(E)||wl(),n=qu(t,n,a)}else Rf(E)?(n.flags|=192,n.child=t.child,n=null):(t=B.treeContext,je=oi(E.nextSibling),xn=n,ye=!0,fa=null,ri=!1,t!==null&&fp(n,t),n=Xu(n,s.children),n.flags|=4096);return n}return c?(va(),E=s.fallback,c=n.mode,B=t.child,tt=B.sibling,s=Bi(B,{mode:"hidden",children:s.children}),s.subtreeFlags=B.subtreeFlags&65011712,tt!==null?E=Bi(tt,E):(E=Ka(E,c,a,null),E.flags|=2),E.return=n,s.return=n,s.sibling=E,n.child=s,ao(null,s),s=n.child,E=t.child.memoizedState,E===null?E=ju(a):(c=E.cachePool,c!==null?(B=nn._currentValue,c=c.parent!==B?{parent:B,pool:B}:c):c=_p(),E={baseLanes:E.baseLanes|a,cachePool:c}),s.memoizedState=E,s.childLanes=Wu(t,_,a),n.memoizedState=ku,ao(t.child,s)):(_a(n),a=t.child,t=a.sibling,a=Bi(a,{mode:"visible",children:s.children}),a.return=n,a.sibling=null,t!==null&&(_=n.deletions,_===null?(n.deletions=[t],n.flags|=16):_.push(t)),n.child=a,n.memoizedState=null,a)}function Xu(t,n){return n=yl({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function yl(t,n){return t=Wn(22,t,null,n),t.lanes=0,t}function qu(t,n,a){return ir(n,t.child,null,a),t=Xu(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function Dm(t,n,a){t.lanes|=n;var s=t.alternate;s!==null&&(s.lanes|=n),lu(t.return,n,a)}function Yu(t,n,a,s,c,f){var _=t.memoizedState;_===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:s,tail:a,tailMode:c,treeForkCount:f}:(_.isBackwards=n,_.rendering=null,_.renderingStartTime=0,_.last=s,_.tail=a,_.tailMode=c,_.treeForkCount=f)}function Um(t,n,a){var s=n.pendingProps,c=s.revealOrder,f=s.tail;s=s.children;var _=tn.current,E=(_&2)!==0;if(E?(_=_&1|2,n.flags|=128):_&=1,St(tn,_),Sn(t,n,s,a),s=ye?Ws:0,!E&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Dm(t,a,n);else if(t.tag===19)Dm(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(c){case"forwards":for(a=n.child,c=null;a!==null;)t=a.alternate,t!==null&&ll(t)===null&&(c=a),a=a.sibling;a=c,a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null),Yu(n,!1,c,a,f,s);break;case"backwards":case"unstable_legacy-backwards":for(a=null,c=n.child,n.child=null;c!==null;){if(t=c.alternate,t!==null&&ll(t)===null){n.child=c;break}t=c.sibling,c.sibling=a,a=c,c=t}Yu(n,!0,a,null,f,s);break;case"together":Yu(n,!1,null,null,void 0,s);break;default:n.memoizedState=null}return n.child}function ji(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),Sa|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Fr(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(r(153));if(n.child!==null){for(t=n.child,a=Bi(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=Bi(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function Zu(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&tl(t)))}function hx(t,n,a){switch(n.tag){case 3:Ht(n,n.stateNode.containerInfo),ha(n,nn,t.memoizedState.cache),Qa();break;case 27:case 5:ae(n);break;case 4:Ht(n,n.stateNode.containerInfo);break;case 10:ha(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,yu(n),null;break;case 13:var s=n.memoizedState;if(s!==null)return s.dehydrated!==null?(_a(n),n.flags|=128,null):(a&n.child.childLanes)!==0?wm(t,n,a):(_a(n),t=ji(t,n,a),t!==null?t.sibling:null);_a(n);break;case 19:var c=(t.flags&128)!==0;if(s=(a&n.childLanes)!==0,s||(Fr(t,n,a,!1),s=(a&n.childLanes)!==0),c){if(s)return Um(t,n,a);n.flags|=128}if(c=n.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),St(tn,tn.current),s)break;return null;case 22:return n.lanes=0,Em(t,n,a,n.pendingProps);case 24:ha(n,nn,t.memoizedState.cache)}return ji(t,n,a)}function Lm(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)rn=!0;else{if(!Zu(t,a)&&(n.flags&128)===0)return rn=!1,hx(t,n,a);rn=(t.flags&131072)!==0}else rn=!1,ye&&(n.flags&1048576)!==0&&up(n,Ws,n.index);switch(n.lanes=0,n.tag){case 16:t:{var s=n.pendingProps;if(t=er(n.elementType),n.type=t,typeof t=="function")tu(t)?(s=rr(t,s),n.tag=1,n=Rm(null,n,t,s,a)):(n.tag=0,n=Vu(null,n,t,s,a));else{if(t!=null){var c=t.$$typeof;if(c===U){n.tag=11,n=ym(null,n,t,s,a);break t}else if(c===P){n.tag=14,n=Sm(null,n,t,s,a);break t}}throw n=pt(t)||t,Error(r(306,n,""))}}return n;case 0:return Vu(t,n,n.type,n.pendingProps,a);case 1:return s=n.type,c=rr(s,n.pendingProps),Rm(t,n,s,c,a);case 3:t:{if(Ht(n,n.stateNode.containerInfo),t===null)throw Error(r(387));s=n.pendingProps;var f=n.memoizedState;c=f.element,mu(t,n),$s(n,s,null,a);var _=n.memoizedState;if(s=_.cache,ha(n,nn,s),s!==f.cache&&cu(n,[nn],a,!0),Js(),s=_.element,f.isDehydrated)if(f={element:s,isDehydrated:!1,cache:_.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=Cm(t,n,s,a);break t}else if(s!==c){c=ni(Error(r(424)),n),Xs(c),n=Cm(t,n,s,a);break t}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(je=oi(t.firstChild),xn=n,ye=!0,fa=null,ri=!0,a=Ep(n,null,s,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Qa(),s===c){n=ji(t,n,a);break t}Sn(t,n,s,a)}n=n.child}return n;case 26:return xl(t,n),t===null?(a=kg(n.type,null,n.pendingProps,null))?n.memoizedState=a:ye||(a=n.type,t=n.pendingProps,s=zl(Et.current).createElement(a),s[Ke]=n,s[_n]=t,Mn(s,a,t),k(s),n.stateNode=s):n.memoizedState=kg(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return ae(n),t===null&&ye&&(s=n.stateNode=Hg(n.type,n.pendingProps,Et.current),xn=n,ri=!0,c=je,Aa(n.type)?(wf=c,je=oi(s.firstChild)):je=c),Sn(t,n,n.pendingProps.children,a),xl(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&ye&&((c=s=je)&&(s=kx(s,n.type,n.pendingProps,ri),s!==null?(n.stateNode=s,xn=n,je=oi(s.firstChild),ri=!1,c=!0):c=!1),c||da(n)),ae(n),c=n.type,f=n.pendingProps,_=t!==null?t.memoizedProps:null,s=f.children,bf(c,f)?s=null:_!==null&&bf(c,_)&&(n.flags|=32),n.memoizedState!==null&&(c=Mu(t,n,ax,null,null,a),yo._currentValue=c),xl(t,n),Sn(t,n,s,a),n.child;case 6:return t===null&&ye&&((t=a=je)&&(a=jx(a,n.pendingProps,ri),a!==null?(n.stateNode=a,xn=n,je=null,t=!0):t=!1),t||da(n)),null;case 13:return wm(t,n,a);case 4:return Ht(n,n.stateNode.containerInfo),s=n.pendingProps,t===null?n.child=ir(n,null,s,a):Sn(t,n,s,a),n.child;case 11:return ym(t,n,n.type,n.pendingProps,a);case 7:return Sn(t,n,n.pendingProps,a),n.child;case 8:return Sn(t,n,n.pendingProps.children,a),n.child;case 12:return Sn(t,n,n.pendingProps.children,a),n.child;case 10:return s=n.pendingProps,ha(n,n.type,s.value),Sn(t,n,s.children,a),n.child;case 9:return c=n.type._context,s=n.pendingProps.children,$a(n),c=yn(c),s=s(c),n.flags|=1,Sn(t,n,s,a),n.child;case 14:return Sm(t,n,n.type,n.pendingProps,a);case 15:return Mm(t,n,n.type,n.pendingProps,a);case 19:return Um(t,n,a);case 31:return dx(t,n,a);case 22:return Em(t,n,a,n.pendingProps);case 24:return $a(n),s=yn(nn),t===null?(c=du(),c===null&&(c=Ve,f=uu(),c.pooledCache=f,f.refCount++,f!==null&&(c.pooledCacheLanes|=a),c=f),n.memoizedState={parent:s,cache:c},pu(n),ha(n,nn,c)):((t.lanes&a)!==0&&(mu(t,n),$s(n,null,null,a),Js()),c=t.memoizedState,f=n.memoizedState,c.parent!==s?(c={parent:s,cache:s},n.memoizedState=c,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=c),ha(n,nn,s)):(s=f.cache,ha(n,nn,s),s!==c.cache&&cu(n,[nn],a,!0))),Sn(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function Wi(t){t.flags|=4}function Ku(t,n,a,s,c){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(c&335544128)===c)if(t.stateNode.complete)t.flags|=8192;else if(rg())t.flags|=8192;else throw nr=al,hu}else t.flags&=-16777217}function Nm(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Yg(n))if(rg())t.flags|=8192;else throw nr=al,hu}function Sl(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?ln():536870912,t.lanes|=n,qr|=n)}function ro(t,n){if(!ye)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var s=null;a!==null;)a.alternate!==null&&(s=a),a=a.sibling;s===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:s.sibling=null}}function We(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,s=0;if(n)for(var c=t.child;c!==null;)a|=c.lanes|c.childLanes,s|=c.subtreeFlags&65011712,s|=c.flags&65011712,c.return=t,c=c.sibling;else for(c=t.child;c!==null;)a|=c.lanes|c.childLanes,s|=c.subtreeFlags,s|=c.flags,c.return=t,c=c.sibling;return t.subtreeFlags|=s,t.childLanes=a,n}function px(t,n,a){var s=n.pendingProps;switch(au(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return We(n),null;case 1:return We(n),null;case 3:return a=n.stateNode,s=null,t!==null&&(s=t.memoizedState.cache),n.memoizedState.cache!==s&&(n.flags|=2048),Gi(nn),zt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Or(n)?Wi(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,su())),We(n),null;case 26:var c=n.type,f=n.memoizedState;return t===null?(Wi(n),f!==null?(We(n),Nm(n,f)):(We(n),Ku(n,c,null,s,a))):f?f!==t.memoizedState?(Wi(n),We(n),Nm(n,f)):(We(n),n.flags&=-16777217):(t=t.memoizedProps,t!==s&&Wi(n),We(n),Ku(n,c,t,s,a)),null;case 27:if(Oe(n),a=Et.current,c=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==s&&Wi(n);else{if(!s){if(n.stateNode===null)throw Error(r(166));return We(n),null}t=K.current,Or(n)?dp(n):(t=Hg(c,s,a),n.stateNode=t,Wi(n))}return We(n),null;case 5:if(Oe(n),c=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==s&&Wi(n);else{if(!s){if(n.stateNode===null)throw Error(r(166));return We(n),null}if(f=K.current,Or(n))dp(n);else{var _=zl(Et.current);switch(f){case 1:f=_.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:f=_.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":f=_.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":f=_.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":f=_.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof s.is=="string"?_.createElement("select",{is:s.is}):_.createElement("select"),s.multiple?f.multiple=!0:s.size&&(f.size=s.size);break;default:f=typeof s.is=="string"?_.createElement(c,{is:s.is}):_.createElement(c)}}f[Ke]=n,f[_n]=s;t:for(_=n.child;_!==null;){if(_.tag===5||_.tag===6)f.appendChild(_.stateNode);else if(_.tag!==4&&_.tag!==27&&_.child!==null){_.child.return=_,_=_.child;continue}if(_===n)break t;for(;_.sibling===null;){if(_.return===null||_.return===n)break t;_=_.return}_.sibling.return=_.return,_=_.sibling}n.stateNode=f;t:switch(Mn(f,c,s),c){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break t;case"img":s=!0;break t;default:s=!1}s&&Wi(n)}}return We(n),Ku(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==s&&Wi(n);else{if(typeof s!="string"&&n.stateNode===null)throw Error(r(166));if(t=Et.current,Or(n)){if(t=n.stateNode,a=n.memoizedProps,s=null,c=xn,c!==null)switch(c.tag){case 27:case 5:s=c.memoizedProps}t[Ke]=n,t=!!(t.nodeValue===a||s!==null&&s.suppressHydrationWarning===!0||wg(t.nodeValue,a)),t||da(n,!0)}else t=zl(t).createTextNode(s),t[Ke]=n,n.stateNode=t}return We(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(s=Or(n),a!==null){if(t===null){if(!s)throw Error(r(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[Ke]=n}else Qa(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;We(n),t=!1}else a=su(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(qn(n),n):(qn(n),null);if((n.flags&128)!==0)throw Error(r(558))}return We(n),null;case 13:if(s=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(c=Or(n),s!==null&&s.dehydrated!==null){if(t===null){if(!c)throw Error(r(318));if(c=n.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(r(317));c[Ke]=n}else Qa(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;We(n),c=!1}else c=su(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=c),c=!0;if(!c)return n.flags&256?(qn(n),n):(qn(n),null)}return qn(n),(n.flags&128)!==0?(n.lanes=a,n):(a=s!==null,t=t!==null&&t.memoizedState!==null,a&&(s=n.child,c=null,s.alternate!==null&&s.alternate.memoizedState!==null&&s.alternate.memoizedState.cachePool!==null&&(c=s.alternate.memoizedState.cachePool.pool),f=null,s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(f=s.memoizedState.cachePool.pool),f!==c&&(s.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Sl(n,n.updateQueue),We(n),null);case 4:return zt(),t===null&&xf(n.stateNode.containerInfo),We(n),null;case 10:return Gi(n.type),We(n),null;case 19:if(at(tn),s=n.memoizedState,s===null)return We(n),null;if(c=(n.flags&128)!==0,f=s.rendering,f===null)if(c)ro(s,!1);else{if($e!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(f=ll(t),f!==null){for(n.flags|=128,ro(s,!1),t=f.updateQueue,n.updateQueue=t,Sl(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)op(a,t),a=a.sibling;return St(tn,tn.current&1|2),ye&&Ii(n,s.treeForkCount),n.child}t=t.sibling}s.tail!==null&&dt()>Al&&(n.flags|=128,c=!0,ro(s,!1),n.lanes=4194304)}else{if(!c)if(t=ll(f),t!==null){if(n.flags|=128,c=!0,t=t.updateQueue,n.updateQueue=t,Sl(n,t),ro(s,!0),s.tail===null&&s.tailMode==="hidden"&&!f.alternate&&!ye)return We(n),null}else 2*dt()-s.renderingStartTime>Al&&a!==536870912&&(n.flags|=128,c=!0,ro(s,!1),n.lanes=4194304);s.isBackwards?(f.sibling=n.child,n.child=f):(t=s.last,t!==null?t.sibling=f:n.child=f,s.last=f)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=dt(),t.sibling=null,a=tn.current,St(tn,c?a&1|2:a&1),ye&&Ii(n,s.treeForkCount),t):(We(n),null);case 22:case 23:return qn(n),xu(),s=n.memoizedState!==null,t!==null?t.memoizedState!==null!==s&&(n.flags|=8192):s&&(n.flags|=8192),s?(a&536870912)!==0&&(n.flags&128)===0&&(We(n),n.subtreeFlags&6&&(n.flags|=8192)):We(n),a=n.updateQueue,a!==null&&Sl(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),s=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(s=n.memoizedState.cachePool.pool),s!==a&&(n.flags|=2048),t!==null&&at(tr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Gi(nn),We(n),null;case 25:return null;case 30:return null}throw Error(r(156,n.tag))}function mx(t,n){switch(au(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Gi(nn),zt(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return Oe(n),null;case 31:if(n.memoizedState!==null){if(qn(n),n.alternate===null)throw Error(r(340));Qa()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(qn(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(r(340));Qa()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return at(tn),null;case 4:return zt(),null;case 10:return Gi(n.type),null;case 22:case 23:return qn(n),xu(),t!==null&&at(tr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Gi(nn),null;case 25:return null;default:return null}}function Om(t,n){switch(au(n),n.tag){case 3:Gi(nn),zt();break;case 26:case 27:case 5:Oe(n);break;case 4:zt();break;case 31:n.memoizedState!==null&&qn(n);break;case 13:qn(n);break;case 19:at(tn);break;case 10:Gi(n.type);break;case 22:case 23:qn(n),xu(),t!==null&&at(tr);break;case 24:Gi(nn)}}function so(t,n){try{var a=n.updateQueue,s=a!==null?a.lastEffect:null;if(s!==null){var c=s.next;a=c;do{if((a.tag&t)===t){s=void 0;var f=a.create,_=a.inst;s=f(),_.destroy=s}a=a.next}while(a!==c)}}catch(E){Ne(n,n.return,E)}}function xa(t,n,a){try{var s=n.updateQueue,c=s!==null?s.lastEffect:null;if(c!==null){var f=c.next;s=f;do{if((s.tag&t)===t){var _=s.inst,E=_.destroy;if(E!==void 0){_.destroy=void 0,c=n;var B=a,tt=E;try{tt()}catch(ut){Ne(c,B,ut)}}}s=s.next}while(s!==f)}}catch(ut){Ne(n,n.return,ut)}}function Fm(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{Tp(n,a)}catch(s){Ne(t,t.return,s)}}}function zm(t,n,a){a.props=rr(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(s){Ne(t,n,s)}}function oo(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var s=t.stateNode;break;case 30:s=t.stateNode;break;default:s=t.stateNode}typeof a=="function"?t.refCleanup=a(s):a.current=s}}catch(c){Ne(t,n,c)}}function wi(t,n){var a=t.ref,s=t.refCleanup;if(a!==null)if(typeof s=="function")try{s()}catch(c){Ne(t,n,c)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(c){Ne(t,n,c)}else a.current=null}function Pm(t){var n=t.type,a=t.memoizedProps,s=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&s.focus();break t;case"img":a.src?s.src=a.src:a.srcSet&&(s.srcset=a.srcSet)}}catch(c){Ne(t,t.return,c)}}function Qu(t,n,a){try{var s=t.stateNode;Px(s,t.type,a,n),s[_n]=n}catch(c){Ne(t,t.return,c)}}function Bm(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Aa(t.type)||t.tag===4}function Ju(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Bm(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Aa(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function $u(t,n,a){var s=t.tag;if(s===5||s===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=zi));else if(s!==4&&(s===27&&Aa(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for($u(t,n,a),t=t.sibling;t!==null;)$u(t,n,a),t=t.sibling}function Ml(t,n,a){var s=t.tag;if(s===5||s===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(s!==4&&(s===27&&Aa(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(Ml(t,n,a),t=t.sibling;t!==null;)Ml(t,n,a),t=t.sibling}function Im(t){var n=t.stateNode,a=t.memoizedProps;try{for(var s=t.type,c=n.attributes;c.length;)n.removeAttributeNode(c[0]);Mn(n,s,a),n[Ke]=t,n[_n]=a}catch(f){Ne(t,t.return,f)}}var Xi=!1,sn=!1,tf=!1,Hm=typeof WeakSet=="function"?WeakSet:Set,pn=null;function gx(t,n){if(t=t.containerInfo,Mf=kl,t=Jh(t),qc(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else t:{a=(a=t.ownerDocument)&&a.defaultView||window;var s=a.getSelection&&a.getSelection();if(s&&s.rangeCount!==0){a=s.anchorNode;var c=s.anchorOffset,f=s.focusNode;s=s.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var _=0,E=-1,B=-1,tt=0,ut=0,_t=t,et=null;e:for(;;){for(var lt;_t!==a||c!==0&&_t.nodeType!==3||(E=_+c),_t!==f||s!==0&&_t.nodeType!==3||(B=_+s),_t.nodeType===3&&(_+=_t.nodeValue.length),(lt=_t.firstChild)!==null;)et=_t,_t=lt;for(;;){if(_t===t)break e;if(et===a&&++tt===c&&(E=_),et===f&&++ut===s&&(B=_),(lt=_t.nextSibling)!==null)break;_t=et,et=_t.parentNode}_t=lt}a=E===-1||B===-1?null:{start:E,end:B}}else a=null}a=a||{start:0,end:0}}else a=null;for(Ef={focusedElem:t,selectionRange:a},kl=!1,pn=n;pn!==null;)if(n=pn,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,pn=t;else for(;pn!==null;){switch(n=pn,f=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)c=t[a],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&f!==null){t=void 0,a=n,c=f.memoizedProps,f=f.memoizedState,s=a.stateNode;try{var It=rr(a.type,c);t=s.getSnapshotBeforeUpdate(It,f),s.__reactInternalSnapshotBeforeUpdate=t}catch(Qt){Ne(a,a.return,Qt)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)Af(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Af(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(r(163))}if(t=n.sibling,t!==null){t.return=n.return,pn=t;break}pn=n.return}}function Gm(t,n,a){var s=a.flags;switch(a.tag){case 0:case 11:case 15:Yi(t,a),s&4&&so(5,a);break;case 1:if(Yi(t,a),s&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(_){Ne(a,a.return,_)}else{var c=rr(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(c,n,t.__reactInternalSnapshotBeforeUpdate)}catch(_){Ne(a,a.return,_)}}s&64&&Fm(a),s&512&&oo(a,a.return);break;case 3:if(Yi(t,a),s&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Tp(t,n)}catch(_){Ne(a,a.return,_)}}break;case 27:n===null&&s&4&&Im(a);case 26:case 5:Yi(t,a),n===null&&s&4&&Pm(a),s&512&&oo(a,a.return);break;case 12:Yi(t,a);break;case 31:Yi(t,a),s&4&&jm(t,a);break;case 13:Yi(t,a),s&4&&Wm(t,a),s&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=Tx.bind(null,a),Wx(t,a))));break;case 22:if(s=a.memoizedState!==null||Xi,!s){n=n!==null&&n.memoizedState!==null||sn,c=Xi;var f=sn;Xi=s,(sn=n)&&!f?Zi(t,a,(a.subtreeFlags&8772)!==0):Yi(t,a),Xi=c,sn=f}break;case 30:break;default:Yi(t,a)}}function Vm(t){var n=t.alternate;n!==null&&(t.alternate=null,Vm(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Fs(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Ye=null,zn=!1;function qi(t,n,a){for(a=a.child;a!==null;)km(t,n,a),a=a.sibling}function km(t,n,a){if(kt&&typeof kt.onCommitFiberUnmount=="function")try{kt.onCommitFiberUnmount(qt,a)}catch{}switch(a.tag){case 26:sn||wi(a,n),qi(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:sn||wi(a,n);var s=Ye,c=zn;Aa(a.type)&&(Ye=a.stateNode,zn=!1),qi(t,n,a),_o(a.stateNode),Ye=s,zn=c;break;case 5:sn||wi(a,n);case 6:if(s=Ye,c=zn,Ye=null,qi(t,n,a),Ye=s,zn=c,Ye!==null)if(zn)try{(Ye.nodeType===9?Ye.body:Ye.nodeName==="HTML"?Ye.ownerDocument.body:Ye).removeChild(a.stateNode)}catch(f){Ne(a,n,f)}else try{Ye.removeChild(a.stateNode)}catch(f){Ne(a,n,f)}break;case 18:Ye!==null&&(zn?(t=Ye,Fg(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),es(t)):Fg(Ye,a.stateNode));break;case 4:s=Ye,c=zn,Ye=a.stateNode.containerInfo,zn=!0,qi(t,n,a),Ye=s,zn=c;break;case 0:case 11:case 14:case 15:xa(2,a,n),sn||xa(4,a,n),qi(t,n,a);break;case 1:sn||(wi(a,n),s=a.stateNode,typeof s.componentWillUnmount=="function"&&zm(a,n,s)),qi(t,n,a);break;case 21:qi(t,n,a);break;case 22:sn=(s=sn)||a.memoizedState!==null,qi(t,n,a),sn=s;break;default:qi(t,n,a)}}function jm(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{es(t)}catch(a){Ne(n,n.return,a)}}}function Wm(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{es(t)}catch(a){Ne(n,n.return,a)}}function _x(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new Hm),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new Hm),n;default:throw Error(r(435,t.tag))}}function El(t,n){var a=_x(t);n.forEach(function(s){if(!a.has(s)){a.add(s);var c=Ax.bind(null,t,s);s.then(c,c)}})}function Pn(t,n){var a=n.deletions;if(a!==null)for(var s=0;s<a.length;s++){var c=a[s],f=t,_=n,E=_;t:for(;E!==null;){switch(E.tag){case 27:if(Aa(E.type)){Ye=E.stateNode,zn=!1;break t}break;case 5:Ye=E.stateNode,zn=!1;break t;case 3:case 4:Ye=E.stateNode.containerInfo,zn=!0;break t}E=E.return}if(Ye===null)throw Error(r(160));km(f,_,c),Ye=null,zn=!1,f=c.alternate,f!==null&&(f.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Xm(n,t),n=n.sibling}var gi=null;function Xm(t,n){var a=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Pn(n,t),Bn(t),s&4&&(xa(3,t,t.return),so(3,t),xa(5,t,t.return));break;case 1:Pn(n,t),Bn(t),s&512&&(sn||a===null||wi(a,a.return)),s&64&&Xi&&(t=t.updateQueue,t!==null&&(s=t.callbacks,s!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?s:a.concat(s))));break;case 26:var c=gi;if(Pn(n,t),Bn(t),s&512&&(sn||a===null||wi(a,a.return)),s&4){var f=a!==null?a.memoizedState:null;if(s=t.memoizedState,a===null)if(s===null)if(t.stateNode===null){t:{s=t.type,a=t.memoizedProps,c=c.ownerDocument||c;e:switch(s){case"title":f=c.getElementsByTagName("title")[0],(!f||f[Wa]||f[Ke]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=c.createElement(s),c.head.insertBefore(f,c.querySelector("head > title"))),Mn(f,s,a),f[Ke]=t,k(f),s=f;break t;case"link":var _=Xg("link","href",c).get(s+(a.href||""));if(_){for(var E=0;E<_.length;E++)if(f=_[E],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){_.splice(E,1);break e}}f=c.createElement(s),Mn(f,s,a),c.head.appendChild(f);break;case"meta":if(_=Xg("meta","content",c).get(s+(a.content||""))){for(E=0;E<_.length;E++)if(f=_[E],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){_.splice(E,1);break e}}f=c.createElement(s),Mn(f,s,a),c.head.appendChild(f);break;default:throw Error(r(468,s))}f[Ke]=t,k(f),s=f}t.stateNode=s}else qg(c,t.type,t.stateNode);else t.stateNode=Wg(c,s,t.memoizedProps);else f!==s?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,s===null?qg(c,t.type,t.stateNode):Wg(c,s,t.memoizedProps)):s===null&&t.stateNode!==null&&Qu(t,t.memoizedProps,a.memoizedProps)}break;case 27:Pn(n,t),Bn(t),s&512&&(sn||a===null||wi(a,a.return)),a!==null&&s&4&&Qu(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Pn(n,t),Bn(t),s&512&&(sn||a===null||wi(a,a.return)),t.flags&32){c=t.stateNode;try{On(c,"")}catch(It){Ne(t,t.return,It)}}s&4&&t.stateNode!=null&&(c=t.memoizedProps,Qu(t,c,a!==null?a.memoizedProps:c)),s&1024&&(tf=!0);break;case 6:if(Pn(n,t),Bn(t),s&4){if(t.stateNode===null)throw Error(r(162));s=t.memoizedProps,a=t.stateNode;try{a.nodeValue=s}catch(It){Ne(t,t.return,It)}}break;case 3:if(Il=null,c=gi,gi=Pl(n.containerInfo),Pn(n,t),gi=c,Bn(t),s&4&&a!==null&&a.memoizedState.isDehydrated)try{es(n.containerInfo)}catch(It){Ne(t,t.return,It)}tf&&(tf=!1,qm(t));break;case 4:s=gi,gi=Pl(t.stateNode.containerInfo),Pn(n,t),Bn(t),gi=s;break;case 12:Pn(n,t),Bn(t);break;case 31:Pn(n,t),Bn(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,El(t,s)));break;case 13:Pn(n,t),Bn(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Tl=dt()),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,El(t,s)));break;case 22:c=t.memoizedState!==null;var B=a!==null&&a.memoizedState!==null,tt=Xi,ut=sn;if(Xi=tt||c,sn=ut||B,Pn(n,t),sn=ut,Xi=tt,Bn(t),s&8192)t:for(n=t.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,c&&(a===null||B||Xi||sn||sr(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){B=a=n;try{if(f=B.stateNode,c)_=f.style,typeof _.setProperty=="function"?_.setProperty("display","none","important"):_.display="none";else{E=B.stateNode;var _t=B.memoizedProps.style,et=_t!=null&&_t.hasOwnProperty("display")?_t.display:null;E.style.display=et==null||typeof et=="boolean"?"":(""+et).trim()}}catch(It){Ne(B,B.return,It)}}}else if(n.tag===6){if(a===null){B=n;try{B.stateNode.nodeValue=c?"":B.memoizedProps}catch(It){Ne(B,B.return,It)}}}else if(n.tag===18){if(a===null){B=n;try{var lt=B.stateNode;c?zg(lt,!0):zg(B.stateNode,!1)}catch(It){Ne(B,B.return,It)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break t;for(;n.sibling===null;){if(n.return===null||n.return===t)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}s&4&&(s=t.updateQueue,s!==null&&(a=s.retryQueue,a!==null&&(s.retryQueue=null,El(t,a))));break;case 19:Pn(n,t),Bn(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,El(t,s)));break;case 30:break;case 21:break;default:Pn(n,t),Bn(t)}}function Bn(t){var n=t.flags;if(n&2){try{for(var a,s=t.return;s!==null;){if(Bm(s)){a=s;break}s=s.return}if(a==null)throw Error(r(160));switch(a.tag){case 27:var c=a.stateNode,f=Ju(t);Ml(t,f,c);break;case 5:var _=a.stateNode;a.flags&32&&(On(_,""),a.flags&=-33);var E=Ju(t);Ml(t,E,_);break;case 3:case 4:var B=a.stateNode.containerInfo,tt=Ju(t);$u(t,tt,B);break;default:throw Error(r(161))}}catch(ut){Ne(t,t.return,ut)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function qm(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;qm(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function Yi(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Gm(t,n.alternate,n),n=n.sibling}function sr(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:xa(4,n,n.return),sr(n);break;case 1:wi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&zm(n,n.return,a),sr(n);break;case 27:_o(n.stateNode);case 26:case 5:wi(n,n.return),sr(n);break;case 22:n.memoizedState===null&&sr(n);break;case 30:sr(n);break;default:sr(n)}t=t.sibling}}function Zi(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var s=n.alternate,c=t,f=n,_=f.flags;switch(f.tag){case 0:case 11:case 15:Zi(c,f,a),so(4,f);break;case 1:if(Zi(c,f,a),s=f,c=s.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(tt){Ne(s,s.return,tt)}if(s=f,c=s.updateQueue,c!==null){var E=s.stateNode;try{var B=c.shared.hiddenCallbacks;if(B!==null)for(c.shared.hiddenCallbacks=null,c=0;c<B.length;c++)bp(B[c],E)}catch(tt){Ne(s,s.return,tt)}}a&&_&64&&Fm(f),oo(f,f.return);break;case 27:Im(f);case 26:case 5:Zi(c,f,a),a&&s===null&&_&4&&Pm(f),oo(f,f.return);break;case 12:Zi(c,f,a);break;case 31:Zi(c,f,a),a&&_&4&&jm(c,f);break;case 13:Zi(c,f,a),a&&_&4&&Wm(c,f);break;case 22:f.memoizedState===null&&Zi(c,f,a),oo(f,f.return);break;case 30:break;default:Zi(c,f,a)}n=n.sibling}}function ef(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&qs(a))}function nf(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&qs(t))}function _i(t,n,a,s){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Ym(t,n,a,s),n=n.sibling}function Ym(t,n,a,s){var c=n.flags;switch(n.tag){case 0:case 11:case 15:_i(t,n,a,s),c&2048&&so(9,n);break;case 1:_i(t,n,a,s);break;case 3:_i(t,n,a,s),c&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&qs(t)));break;case 12:if(c&2048){_i(t,n,a,s),t=n.stateNode;try{var f=n.memoizedProps,_=f.id,E=f.onPostCommit;typeof E=="function"&&E(_,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(B){Ne(n,n.return,B)}}else _i(t,n,a,s);break;case 31:_i(t,n,a,s);break;case 13:_i(t,n,a,s);break;case 23:break;case 22:f=n.stateNode,_=n.alternate,n.memoizedState!==null?f._visibility&2?_i(t,n,a,s):lo(t,n):f._visibility&2?_i(t,n,a,s):(f._visibility|=2,jr(t,n,a,s,(n.subtreeFlags&10256)!==0||!1)),c&2048&&ef(_,n);break;case 24:_i(t,n,a,s),c&2048&&nf(n.alternate,n);break;default:_i(t,n,a,s)}}function jr(t,n,a,s,c){for(c=c&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=t,_=n,E=a,B=s,tt=_.flags;switch(_.tag){case 0:case 11:case 15:jr(f,_,E,B,c),so(8,_);break;case 23:break;case 22:var ut=_.stateNode;_.memoizedState!==null?ut._visibility&2?jr(f,_,E,B,c):lo(f,_):(ut._visibility|=2,jr(f,_,E,B,c)),c&&tt&2048&&ef(_.alternate,_);break;case 24:jr(f,_,E,B,c),c&&tt&2048&&nf(_.alternate,_);break;default:jr(f,_,E,B,c)}n=n.sibling}}function lo(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,s=n,c=s.flags;switch(s.tag){case 22:lo(a,s),c&2048&&ef(s.alternate,s);break;case 24:lo(a,s),c&2048&&nf(s.alternate,s);break;default:lo(a,s)}n=n.sibling}}var co=8192;function Wr(t,n,a){if(t.subtreeFlags&co)for(t=t.child;t!==null;)Zm(t,n,a),t=t.sibling}function Zm(t,n,a){switch(t.tag){case 26:Wr(t,n,a),t.flags&co&&t.memoizedState!==null&&iy(a,gi,t.memoizedState,t.memoizedProps);break;case 5:Wr(t,n,a);break;case 3:case 4:var s=gi;gi=Pl(t.stateNode.containerInfo),Wr(t,n,a),gi=s;break;case 22:t.memoizedState===null&&(s=t.alternate,s!==null&&s.memoizedState!==null?(s=co,co=16777216,Wr(t,n,a),co=s):Wr(t,n,a));break;default:Wr(t,n,a)}}function Km(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function uo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];pn=s,Jm(s,t)}Km(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Qm(t),t=t.sibling}function Qm(t){switch(t.tag){case 0:case 11:case 15:uo(t),t.flags&2048&&xa(9,t,t.return);break;case 3:uo(t);break;case 12:uo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,bl(t)):uo(t);break;default:uo(t)}}function bl(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];pn=s,Jm(s,t)}Km(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:xa(8,n,n.return),bl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,bl(n));break;default:bl(n)}t=t.sibling}}function Jm(t,n){for(;pn!==null;){var a=pn;switch(a.tag){case 0:case 11:case 15:xa(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var s=a.memoizedState.cachePool.pool;s!=null&&s.refCount++}break;case 24:qs(a.memoizedState.cache)}if(s=a.child,s!==null)s.return=a,pn=s;else t:for(a=t;pn!==null;){s=pn;var c=s.sibling,f=s.return;if(Vm(s),s===a){pn=null;break t}if(c!==null){c.return=f,pn=c;break t}pn=f}}}var vx={getCacheForType:function(t){var n=yn(nn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return yn(nn).controller.signal}},xx=typeof WeakMap=="function"?WeakMap:Map,we=0,Ve=null,de=null,ge=0,Le=0,Yn=null,ya=!1,Xr=!1,af=!1,Ki=0,$e=0,Sa=0,or=0,rf=0,Zn=0,qr=0,fo=null,In=null,sf=!1,Tl=0,$m=0,Al=1/0,Rl=null,Ma=null,un=0,Ea=null,Yr=null,Qi=0,of=0,lf=null,tg=null,ho=0,cf=null;function Kn(){return(we&2)!==0&&ge!==0?ge&-ge:z.T!==null?mf():Ns()}function eg(){if(Zn===0)if((ge&536870912)===0||ye){var t=ct;ct<<=1,(ct&3932160)===0&&(ct=262144),Zn=t}else Zn=536870912;return t=Xn.current,t!==null&&(t.flags|=32),Zn}function Hn(t,n,a){(t===Ve&&(Le===2||Le===9)||t.cancelPendingCommit!==null)&&(Zr(t,0),ba(t,ge,Zn,!1)),gn(t,a),((we&2)===0||t!==Ve)&&(t===Ve&&((we&2)===0&&(or|=a),$e===4&&ba(t,ge,Zn,!1)),Di(t))}function ng(t,n,a){if((we&6)!==0)throw Error(r(327));var s=!a&&(n&127)===0&&(n&t.expiredLanes)===0||$t(t,n),c=s?Mx(t,n):ff(t,n,!0),f=s;do{if(c===0){Xr&&!s&&ba(t,n,0,!1);break}else{if(a=t.current.alternate,f&&!yx(a)){c=ff(t,n,!1),f=!1;continue}if(c===2){if(f=n,t.errorRecoveryDisabledLanes&f)var _=0;else _=t.pendingLanes&-536870913,_=_!==0?_:_&536870912?536870912:0;if(_!==0){n=_;t:{var E=t;c=fo;var B=E.current.memoizedState.isDehydrated;if(B&&(Zr(E,_).flags|=256),_=ff(E,_,!1),_!==2){if(af&&!B){E.errorRecoveryDisabledLanes|=f,or|=f,c=4;break t}f=In,In=c,f!==null&&(In===null?In=f:In.push.apply(In,f))}c=_}if(f=!1,c!==2)continue}}if(c===1){Zr(t,0),ba(t,n,0,!0);break}t:{switch(s=t,f=c,f){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n)break;case 6:ba(s,n,Zn,!ya);break t;case 2:In=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(c=Tl+300-dt(),10<c)){if(ba(s,n,Zn,!ya),Dt(s,0,!0)!==0)break t;Qi=n,s.timeoutHandle=Ng(ig.bind(null,s,a,In,Rl,sf,n,Zn,or,qr,ya,f,"Throttled",-0,0),c);break t}ig(s,a,In,Rl,sf,n,Zn,or,qr,ya,f,null,-0,0)}}break}while(!0);Di(t)}function ig(t,n,a,s,c,f,_,E,B,tt,ut,_t,et,lt){if(t.timeoutHandle=-1,_t=n.subtreeFlags,_t&8192||(_t&16785408)===16785408){_t={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:zi},Zm(n,f,_t);var It=(f&62914560)===f?Tl-dt():(f&4194048)===f?$m-dt():0;if(It=ay(_t,It),It!==null){Qi=f,t.cancelPendingCommit=It(fg.bind(null,t,n,f,a,s,c,_,E,B,ut,_t,null,et,lt)),ba(t,f,_,!tt);return}}fg(t,n,f,a,s,c,_,E,B)}function yx(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var s=0;s<a.length;s++){var c=a[s],f=c.getSnapshot;c=c.value;try{if(!jn(f(),c))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ba(t,n,a,s){n&=~rf,n&=~or,t.suspendedLanes|=n,t.pingedLanes&=~n,s&&(t.warmLanes|=n),s=t.expirationTimes;for(var c=n;0<c;){var f=31-Jt(c),_=1<<f;s[f]=-1,c&=~_}a!==0&&Us(t,a,n)}function Cl(){return(we&6)===0?(po(0),!1):!0}function uf(){if(de!==null){if(Le===0)var t=de.return;else t=de,Hi=Ja=null,Tu(t),Ir=null,Zs=0,t=de;for(;t!==null;)Om(t.alternate,t),t=t.return;de=null}}function Zr(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Hx(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Qi=0,uf(),Ve=t,de=a=Bi(t.current,null),ge=n,Le=0,Yn=null,ya=!1,Xr=$t(t,n),af=!1,qr=Zn=rf=or=Sa=$e=0,In=fo=null,sf=!1,(n&8)!==0&&(n|=n&32);var s=t.entangledLanes;if(s!==0)for(t=t.entanglements,s&=n;0<s;){var c=31-Jt(s),f=1<<c;n|=t[c],s&=~f}return Ki=n,Zo(),a}function ag(t,n){se=null,z.H=io,n===Br||n===il?(n=yp(),Le=3):n===hu?(n=yp(),Le=4):Le=n===Gu?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Yn=n,de===null&&($e=1,_l(t,ni(n,t.current)))}function rg(){var t=Xn.current;return t===null?!0:(ge&4194048)===ge?si===null:(ge&62914560)===ge||(ge&536870912)!==0?t===si:!1}function sg(){var t=z.H;return z.H=io,t===null?io:t}function og(){var t=z.A;return z.A=vx,t}function wl(){$e=4,ya||(ge&4194048)!==ge&&Xn.current!==null||(Xr=!0),(Sa&134217727)===0&&(or&134217727)===0||Ve===null||ba(Ve,ge,Zn,!1)}function ff(t,n,a){var s=we;we|=2;var c=sg(),f=og();(Ve!==t||ge!==n)&&(Rl=null,Zr(t,n)),n=!1;var _=$e;t:do try{if(Le!==0&&de!==null){var E=de,B=Yn;switch(Le){case 8:uf(),_=6;break t;case 3:case 2:case 9:case 6:Xn.current===null&&(n=!0);var tt=Le;if(Le=0,Yn=null,Kr(t,E,B,tt),a&&Xr){_=0;break t}break;default:tt=Le,Le=0,Yn=null,Kr(t,E,B,tt)}}Sx(),_=$e;break}catch(ut){ag(t,ut)}while(!0);return n&&t.shellSuspendCounter++,Hi=Ja=null,we=s,z.H=c,z.A=f,de===null&&(Ve=null,ge=0,Zo()),_}function Sx(){for(;de!==null;)lg(de)}function Mx(t,n){var a=we;we|=2;var s=sg(),c=og();Ve!==t||ge!==n?(Rl=null,Al=dt()+500,Zr(t,n)):Xr=$t(t,n);t:do try{if(Le!==0&&de!==null){n=de;var f=Yn;e:switch(Le){case 1:Le=0,Yn=null,Kr(t,n,f,1);break;case 2:case 9:if(vp(f)){Le=0,Yn=null,cg(n);break}n=function(){Le!==2&&Le!==9||Ve!==t||(Le=7),Di(t)},f.then(n,n);break t;case 3:Le=7;break t;case 4:Le=5;break t;case 7:vp(f)?(Le=0,Yn=null,cg(n)):(Le=0,Yn=null,Kr(t,n,f,7));break;case 5:var _=null;switch(de.tag){case 26:_=de.memoizedState;case 5:case 27:var E=de;if(_?Yg(_):E.stateNode.complete){Le=0,Yn=null;var B=E.sibling;if(B!==null)de=B;else{var tt=E.return;tt!==null?(de=tt,Dl(tt)):de=null}break e}}Le=0,Yn=null,Kr(t,n,f,5);break;case 6:Le=0,Yn=null,Kr(t,n,f,6);break;case 8:uf(),$e=6;break t;default:throw Error(r(462))}}Ex();break}catch(ut){ag(t,ut)}while(!0);return Hi=Ja=null,z.H=s,z.A=c,we=a,de!==null?0:(Ve=null,ge=0,Zo(),$e)}function Ex(){for(;de!==null&&!T();)lg(de)}function lg(t){var n=Lm(t.alternate,t,Ki);t.memoizedProps=t.pendingProps,n===null?Dl(t):de=n}function cg(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=Am(a,n,n.pendingProps,n.type,void 0,ge);break;case 11:n=Am(a,n,n.pendingProps,n.type.render,n.ref,ge);break;case 5:Tu(n);default:Om(a,n),n=de=op(n,Ki),n=Lm(a,n,Ki)}t.memoizedProps=t.pendingProps,n===null?Dl(t):de=n}function Kr(t,n,a,s){Hi=Ja=null,Tu(n),Ir=null,Zs=0;var c=n.return;try{if(fx(t,c,n,a,ge)){$e=1,_l(t,ni(a,t.current)),de=null;return}}catch(f){if(c!==null)throw de=c,f;$e=1,_l(t,ni(a,t.current)),de=null;return}n.flags&32768?(ye||s===1?t=!0:Xr||(ge&536870912)!==0?t=!1:(ya=t=!0,(s===2||s===9||s===3||s===6)&&(s=Xn.current,s!==null&&s.tag===13&&(s.flags|=16384))),ug(n,t)):Dl(n)}function Dl(t){var n=t;do{if((n.flags&32768)!==0){ug(n,ya);return}t=n.return;var a=px(n.alternate,n,Ki);if(a!==null){de=a;return}if(n=n.sibling,n!==null){de=n;return}de=n=t}while(n!==null);$e===0&&($e=5)}function ug(t,n){do{var a=mx(t.alternate,t);if(a!==null){a.flags&=32767,de=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){de=t;return}de=t=a}while(t!==null);$e=6,de=null}function fg(t,n,a,s,c,f,_,E,B){t.cancelPendingCommit=null;do Ul();while(un!==0);if((we&6)!==0)throw Error(r(327));if(n!==null){if(n===t.current)throw Error(r(177));if(f=n.lanes|n.childLanes,f|=Jc,di(t,a,f,_,E,B),t===Ve&&(de=Ve=null,ge=0),Yr=n,Ea=t,Qi=a,of=f,lf=c,tg=s,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Rx(wt,function(){return gg(),null})):(t.callbackNode=null,t.callbackPriority=0),s=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||s){s=z.T,z.T=null,c=Z.p,Z.p=2,_=we,we|=4;try{gx(t,n,a)}finally{we=_,Z.p=c,z.T=s}}un=1,dg(),hg(),pg()}}function dg(){if(un===1){un=0;var t=Ea,n=Yr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var s=Z.p;Z.p=2;var c=we;we|=4;try{Xm(n,t);var f=Ef,_=Jh(t.containerInfo),E=f.focusedElem,B=f.selectionRange;if(_!==E&&E&&E.ownerDocument&&Qh(E.ownerDocument.documentElement,E)){if(B!==null&&qc(E)){var tt=B.start,ut=B.end;if(ut===void 0&&(ut=tt),"selectionStart"in E)E.selectionStart=tt,E.selectionEnd=Math.min(ut,E.value.length);else{var _t=E.ownerDocument||document,et=_t&&_t.defaultView||window;if(et.getSelection){var lt=et.getSelection(),It=E.textContent.length,Qt=Math.min(B.start,It),Ie=B.end===void 0?Qt:Math.min(B.end,It);!lt.extend&&Qt>Ie&&(_=Ie,Ie=Qt,Qt=_);var Y=Kh(E,Qt),G=Kh(E,Ie);if(Y&&G&&(lt.rangeCount!==1||lt.anchorNode!==Y.node||lt.anchorOffset!==Y.offset||lt.focusNode!==G.node||lt.focusOffset!==G.offset)){var $=_t.createRange();$.setStart(Y.node,Y.offset),lt.removeAllRanges(),Qt>Ie?(lt.addRange($),lt.extend(G.node,G.offset)):($.setEnd(G.node,G.offset),lt.addRange($))}}}}for(_t=[],lt=E;lt=lt.parentNode;)lt.nodeType===1&&_t.push({element:lt,left:lt.scrollLeft,top:lt.scrollTop});for(typeof E.focus=="function"&&E.focus(),E=0;E<_t.length;E++){var ht=_t[E];ht.element.scrollLeft=ht.left,ht.element.scrollTop=ht.top}}kl=!!Mf,Ef=Mf=null}finally{we=c,Z.p=s,z.T=a}}t.current=n,un=2}}function hg(){if(un===2){un=0;var t=Ea,n=Yr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var s=Z.p;Z.p=2;var c=we;we|=4;try{Gm(t,n.alternate,n)}finally{we=c,Z.p=s,z.T=a}}un=3}}function pg(){if(un===4||un===3){un=0,nt();var t=Ea,n=Yr,a=Qi,s=tg;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?un=5:(un=0,Yr=Ea=null,mg(t,t.pendingLanes));var c=t.pendingLanes;if(c===0&&(Ma=null),Er(a),n=n.stateNode,kt&&typeof kt.onCommitFiberRoot=="function")try{kt.onCommitFiberRoot(qt,n,void 0,(n.current.flags&128)===128)}catch{}if(s!==null){n=z.T,c=Z.p,Z.p=2,z.T=null;try{for(var f=t.onRecoverableError,_=0;_<s.length;_++){var E=s[_];f(E.value,{componentStack:E.stack})}}finally{z.T=n,Z.p=c}}(Qi&3)!==0&&Ul(),Di(t),c=t.pendingLanes,(a&261930)!==0&&(c&42)!==0?t===cf?ho++:(ho=0,cf=t):ho=0,po(0)}}function mg(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,qs(n)))}function Ul(){return dg(),hg(),pg(),gg()}function gg(){if(un!==5)return!1;var t=Ea,n=of;of=0;var a=Er(Qi),s=z.T,c=Z.p;try{Z.p=32>a?32:a,z.T=null,a=lf,lf=null;var f=Ea,_=Qi;if(un=0,Yr=Ea=null,Qi=0,(we&6)!==0)throw Error(r(331));var E=we;if(we|=4,Qm(f.current),Ym(f,f.current,_,a),we=E,po(0,!1),kt&&typeof kt.onPostCommitFiberRoot=="function")try{kt.onPostCommitFiberRoot(qt,f)}catch{}return!0}finally{Z.p=c,z.T=s,mg(t,n)}}function _g(t,n,a){n=ni(a,n),n=Hu(t.stateNode,n,2),t=ga(t,n,2),t!==null&&(gn(t,2),Di(t))}function Ne(t,n,a){if(t.tag===3)_g(t,t,a);else for(;n!==null;){if(n.tag===3){_g(n,t,a);break}else if(n.tag===1){var s=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Ma===null||!Ma.has(s))){t=ni(a,t),a=vm(2),s=ga(n,a,2),s!==null&&(xm(a,s,n,t),gn(s,2),Di(s));break}}n=n.return}}function df(t,n,a){var s=t.pingCache;if(s===null){s=t.pingCache=new xx;var c=new Set;s.set(n,c)}else c=s.get(n),c===void 0&&(c=new Set,s.set(n,c));c.has(a)||(af=!0,c.add(a),t=bx.bind(null,t,n,a),n.then(t,t))}function bx(t,n,a){var s=t.pingCache;s!==null&&s.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Ve===t&&(ge&a)===a&&($e===4||$e===3&&(ge&62914560)===ge&&300>dt()-Tl?(we&2)===0&&Zr(t,0):rf|=a,qr===ge&&(qr=0)),Di(t)}function vg(t,n){n===0&&(n=ln()),t=Za(t,n),t!==null&&(gn(t,n),Di(t))}function Tx(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),vg(t,a)}function Ax(t,n){var a=0;switch(t.tag){case 31:case 13:var s=t.stateNode,c=t.memoizedState;c!==null&&(a=c.retryLane);break;case 19:s=t.stateNode;break;case 22:s=t.stateNode._retryCache;break;default:throw Error(r(314))}s!==null&&s.delete(n),vg(t,a)}function Rx(t,n){return jt(t,n)}var Ll=null,Qr=null,hf=!1,Nl=!1,pf=!1,Ta=0;function Di(t){t!==Qr&&t.next===null&&(Qr===null?Ll=Qr=t:Qr=Qr.next=t),Nl=!0,hf||(hf=!0,wx())}function po(t,n){if(!pf&&Nl){pf=!0;do for(var a=!1,s=Ll;s!==null;){if(t!==0){var c=s.pendingLanes;if(c===0)var f=0;else{var _=s.suspendedLanes,E=s.pingedLanes;f=(1<<31-Jt(42|t)+1)-1,f&=c&~(_&~E),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,Mg(s,f))}else f=ge,f=Dt(s,s===Ve?f:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),(f&3)===0||$t(s,f)||(a=!0,Mg(s,f));s=s.next}while(a);pf=!1}}function Cx(){xg()}function xg(){Nl=hf=!1;var t=0;Ta!==0&&Ix()&&(t=Ta);for(var n=dt(),a=null,s=Ll;s!==null;){var c=s.next,f=yg(s,n);f===0?(s.next=null,a===null?Ll=c:a.next=c,c===null&&(Qr=a)):(a=s,(t!==0||(f&3)!==0)&&(Nl=!0)),s=c}un!==0&&un!==5||po(t),Ta!==0&&(Ta=0)}function yg(t,n){for(var a=t.suspendedLanes,s=t.pingedLanes,c=t.expirationTimes,f=t.pendingLanes&-62914561;0<f;){var _=31-Jt(f),E=1<<_,B=c[_];B===-1?((E&a)===0||(E&s)!==0)&&(c[_]=qe(E,n)):B<=n&&(t.expiredLanes|=E),f&=~E}if(n=Ve,a=ge,a=Dt(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s=t.callbackNode,a===0||t===n&&(Le===2||Le===9)||t.cancelPendingCommit!==null)return s!==null&&s!==null&&L(s),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||$t(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(s!==null&&L(s),Er(a)){case 2:case 8:a=Vt;break;case 32:a=wt;break;case 268435456:a=me;break;default:a=wt}return s=Sg.bind(null,t),a=jt(a,s),t.callbackPriority=n,t.callbackNode=a,n}return s!==null&&s!==null&&L(s),t.callbackPriority=2,t.callbackNode=null,2}function Sg(t,n){if(un!==0&&un!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Ul()&&t.callbackNode!==a)return null;var s=ge;return s=Dt(t,t===Ve?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s===0?null:(ng(t,s,n),yg(t,dt()),t.callbackNode!=null&&t.callbackNode===a?Sg.bind(null,t):null)}function Mg(t,n){if(Ul())return null;ng(t,n,!0)}function wx(){Gx(function(){(we&6)!==0?jt(gt,Cx):xg()})}function mf(){if(Ta===0){var t=zr;t===0&&(t=Rt,Rt<<=1,(Rt&261888)===0&&(Rt=256)),Ta=t}return Ta}function Eg(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Go(""+t)}function bg(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function Dx(t,n,a,s,c){if(n==="submit"&&a&&a.stateNode===c){var f=Eg((c[_n]||null).action),_=s.submitter;_&&(n=(n=_[_n]||null)?Eg(n.formAction):_.getAttribute("formAction"),n!==null&&(f=n,_=null));var E=new Wo("action","action",null,s,c);t.push({event:E,listeners:[{instance:null,listener:function(){if(s.defaultPrevented){if(Ta!==0){var B=_?bg(c,_):new FormData(c);Ou(a,{pending:!0,data:B,method:c.method,action:f},null,B)}}else typeof f=="function"&&(E.preventDefault(),B=_?bg(c,_):new FormData(c),Ou(a,{pending:!0,data:B,method:c.method,action:f},f,B))},currentTarget:c}]})}}for(var gf=0;gf<Qc.length;gf++){var _f=Qc[gf],Ux=_f.toLowerCase(),Lx=_f[0].toUpperCase()+_f.slice(1);mi(Ux,"on"+Lx)}mi(ep,"onAnimationEnd"),mi(np,"onAnimationIteration"),mi(ip,"onAnimationStart"),mi("dblclick","onDoubleClick"),mi("focusin","onFocus"),mi("focusout","onBlur"),mi(Yv,"onTransitionRun"),mi(Zv,"onTransitionStart"),mi(Kv,"onTransitionCancel"),mi(ap,"onTransitionEnd"),Ft("onMouseEnter",["mouseout","mouseover"]),Ft("onMouseLeave",["mouseout","mouseover"]),Ft("onPointerEnter",["pointerout","pointerover"]),Ft("onPointerLeave",["pointerout","pointerover"]),Nt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Nt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Nt("onBeforeInput",["compositionend","keypress","textInput","paste"]),Nt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Nt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Nt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var mo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Nx=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mo));function Tg(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var s=t[a],c=s.event;s=s.listeners;t:{var f=void 0;if(n)for(var _=s.length-1;0<=_;_--){var E=s[_],B=E.instance,tt=E.currentTarget;if(E=E.listener,B!==f&&c.isPropagationStopped())break t;f=E,c.currentTarget=tt;try{f(c)}catch(ut){Yo(ut)}c.currentTarget=null,f=B}else for(_=0;_<s.length;_++){if(E=s[_],B=E.instance,tt=E.currentTarget,E=E.listener,B!==f&&c.isPropagationStopped())break t;f=E,c.currentTarget=tt;try{f(c)}catch(ut){Yo(ut)}c.currentTarget=null,f=B}}}}function he(t,n){var a=n[Os];a===void 0&&(a=n[Os]=new Set);var s=t+"__bubble";a.has(s)||(Ag(n,t,2,!1),a.add(s))}function vf(t,n,a){var s=0;n&&(s|=4),Ag(a,t,s,n)}var Ol="_reactListening"+Math.random().toString(36).slice(2);function xf(t){if(!t[Ol]){t[Ol]=!0,Tt.forEach(function(a){a!=="selectionchange"&&(Nx.has(a)||vf(a,!1,t),vf(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Ol]||(n[Ol]=!0,vf("selectionchange",!1,n))}}function Ag(t,n,a,s){switch(e0(n)){case 2:var c=oy;break;case 8:c=ly;break;default:c=Of}a=c.bind(null,n,a,t),c=void 0,!Bc||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(c=!0),s?c!==void 0?t.addEventListener(n,a,{capture:!0,passive:c}):t.addEventListener(n,a,!0):c!==void 0?t.addEventListener(n,a,{passive:c}):t.addEventListener(n,a,!1)}function yf(t,n,a,s,c){var f=s;if((n&1)===0&&(n&2)===0&&s!==null)t:for(;;){if(s===null)return;var _=s.tag;if(_===3||_===4){var E=s.stateNode.containerInfo;if(E===c)break;if(_===4)for(_=s.return;_!==null;){var B=_.tag;if((B===3||B===4)&&_.stateNode.containerInfo===c)return;_=_.return}for(;E!==null;){if(_=R(E),_===null)return;if(B=_.tag,B===5||B===6||B===26||B===27){s=f=_;continue t}E=E.parentNode}}s=s.return}Uh(function(){var tt=f,ut=zc(a),_t=[];t:{var et=rp.get(t);if(et!==void 0){var lt=Wo,It=t;switch(t){case"keypress":if(ko(a)===0)break t;case"keydown":case"keyup":lt=Av;break;case"focusin":It="focus",lt=Vc;break;case"focusout":It="blur",lt=Vc;break;case"beforeblur":case"afterblur":lt=Vc;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":lt=Oh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":lt=pv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":lt=wv;break;case ep:case np:case ip:lt=_v;break;case ap:lt=Uv;break;case"scroll":case"scrollend":lt=dv;break;case"wheel":lt=Nv;break;case"copy":case"cut":case"paste":lt=xv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":lt=zh;break;case"toggle":case"beforetoggle":lt=Fv}var Qt=(n&4)!==0,Ie=!Qt&&(t==="scroll"||t==="scrollend"),Y=Qt?et!==null?et+"Capture":null:et;Qt=[];for(var G=tt,$;G!==null;){var ht=G;if($=ht.stateNode,ht=ht.tag,ht!==5&&ht!==26&&ht!==27||$===null||Y===null||(ht=zs(G,Y),ht!=null&&Qt.push(go(G,ht,$))),Ie)break;G=G.return}0<Qt.length&&(et=new lt(et,It,null,a,ut),_t.push({event:et,listeners:Qt}))}}if((n&7)===0){t:{if(et=t==="mouseover"||t==="pointerover",lt=t==="mouseout"||t==="pointerout",et&&a!==Fc&&(It=a.relatedTarget||a.fromElement)&&(R(It)||It[Fi]))break t;if((lt||et)&&(et=ut.window===ut?ut:(et=ut.ownerDocument)?et.defaultView||et.parentWindow:window,lt?(It=a.relatedTarget||a.toElement,lt=tt,It=It?R(It):null,It!==null&&(Ie=u(It),Qt=It.tag,It!==Ie||Qt!==5&&Qt!==27&&Qt!==6)&&(It=null)):(lt=null,It=tt),lt!==It)){if(Qt=Oh,ht="onMouseLeave",Y="onMouseEnter",G="mouse",(t==="pointerout"||t==="pointerover")&&(Qt=zh,ht="onPointerLeave",Y="onPointerEnter",G="pointer"),Ie=lt==null?et:it(lt),$=It==null?et:it(It),et=new Qt(ht,G+"leave",lt,a,ut),et.target=Ie,et.relatedTarget=$,ht=null,R(ut)===tt&&(Qt=new Qt(Y,G+"enter",It,a,ut),Qt.target=$,Qt.relatedTarget=Ie,ht=Qt),Ie=ht,lt&&It)e:{for(Qt=Ox,Y=lt,G=It,$=0,ht=Y;ht;ht=Qt(ht))$++;ht=0;for(var Zt=G;Zt;Zt=Qt(Zt))ht++;for(;0<$-ht;)Y=Qt(Y),$--;for(;0<ht-$;)G=Qt(G),ht--;for(;$--;){if(Y===G||G!==null&&Y===G.alternate){Qt=Y;break e}Y=Qt(Y),G=Qt(G)}Qt=null}else Qt=null;lt!==null&&Rg(_t,et,lt,Qt,!1),It!==null&&Ie!==null&&Rg(_t,Ie,It,Qt,!0)}}t:{if(et=tt?it(tt):window,lt=et.nodeName&&et.nodeName.toLowerCase(),lt==="select"||lt==="input"&&et.type==="file")var Ae=jh;else if(Vh(et))if(Wh)Ae=Wv;else{Ae=kv;var Gt=Vv}else lt=et.nodeName,!lt||lt.toLowerCase()!=="input"||et.type!=="checkbox"&&et.type!=="radio"?tt&&Oc(tt.elementType)&&(Ae=jh):Ae=jv;if(Ae&&(Ae=Ae(t,tt))){kh(_t,Ae,a,ut);break t}Gt&&Gt(t,et,tt),t==="focusout"&&tt&&et.type==="number"&&tt.memoizedProps.value!=null&&bn(et,"number",et.value)}switch(Gt=tt?it(tt):window,t){case"focusin":(Vh(Gt)||Gt.contentEditable==="true")&&(Cr=Gt,Yc=tt,js=null);break;case"focusout":js=Yc=Cr=null;break;case"mousedown":Zc=!0;break;case"contextmenu":case"mouseup":case"dragend":Zc=!1,$h(_t,a,ut);break;case"selectionchange":if(qv)break;case"keydown":case"keyup":$h(_t,a,ut)}var oe;if(jc)t:{switch(t){case"compositionstart":var _e="onCompositionStart";break t;case"compositionend":_e="onCompositionEnd";break t;case"compositionupdate":_e="onCompositionUpdate";break t}_e=void 0}else Rr?Hh(t,a)&&(_e="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(_e="onCompositionStart");_e&&(Ph&&a.locale!=="ko"&&(Rr||_e!=="onCompositionStart"?_e==="onCompositionEnd"&&Rr&&(oe=Lh()):(ca=ut,Ic="value"in ca?ca.value:ca.textContent,Rr=!0)),Gt=Fl(tt,_e),0<Gt.length&&(_e=new Fh(_e,t,null,a,ut),_t.push({event:_e,listeners:Gt}),oe?_e.data=oe:(oe=Gh(a),oe!==null&&(_e.data=oe)))),(oe=Pv?Bv(t,a):Iv(t,a))&&(_e=Fl(tt,"onBeforeInput"),0<_e.length&&(Gt=new Fh("onBeforeInput","beforeinput",null,a,ut),_t.push({event:Gt,listeners:_e}),Gt.data=oe)),Dx(_t,t,tt,a,ut)}Tg(_t,n)})}function go(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Fl(t,n){for(var a=n+"Capture",s=[];t!==null;){var c=t,f=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||f===null||(c=zs(t,a),c!=null&&s.unshift(go(t,c,f)),c=zs(t,n),c!=null&&s.push(go(t,c,f))),t.tag===3)return s;t=t.return}return[]}function Ox(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Rg(t,n,a,s,c){for(var f=n._reactName,_=[];a!==null&&a!==s;){var E=a,B=E.alternate,tt=E.stateNode;if(E=E.tag,B!==null&&B===s)break;E!==5&&E!==26&&E!==27||tt===null||(B=tt,c?(tt=zs(a,f),tt!=null&&_.unshift(go(a,tt,B))):c||(tt=zs(a,f),tt!=null&&_.push(go(a,tt,B)))),a=a.return}_.length!==0&&t.push({event:n,listeners:_})}var Fx=/\r\n?/g,zx=/\u0000|\uFFFD/g;function Cg(t){return(typeof t=="string"?t:""+t).replace(Fx,`
`).replace(zx,"")}function wg(t,n){return n=Cg(n),Cg(t)===n}function Be(t,n,a,s,c,f){switch(a){case"children":typeof s=="string"?n==="body"||n==="textarea"&&s===""||On(t,s):(typeof s=="number"||typeof s=="bigint")&&n!=="body"&&On(t,""+s);break;case"className":ke(t,"class",s);break;case"tabIndex":ke(t,"tabindex",s);break;case"dir":case"role":case"viewBox":case"width":case"height":ke(t,a,s);break;case"style":wh(t,s,f);break;case"data":if(n!=="object"){ke(t,"data",s);break}case"src":case"href":if(s===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(s==null||typeof s=="function"||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(a);break}s=Go(""+s),t.setAttribute(a,s);break;case"action":case"formAction":if(typeof s=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Be(t,n,"name",c.name,c,null),Be(t,n,"formEncType",c.formEncType,c,null),Be(t,n,"formMethod",c.formMethod,c,null),Be(t,n,"formTarget",c.formTarget,c,null)):(Be(t,n,"encType",c.encType,c,null),Be(t,n,"method",c.method,c,null),Be(t,n,"target",c.target,c,null)));if(s==null||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(a);break}s=Go(""+s),t.setAttribute(a,s);break;case"onClick":s!=null&&(t.onclick=zi);break;case"onScroll":s!=null&&he("scroll",t);break;case"onScrollEnd":s!=null&&he("scrollend",t);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(a=s.__html,a!=null){if(c.children!=null)throw Error(r(60));t.innerHTML=a}}break;case"multiple":t.multiple=s&&typeof s!="function"&&typeof s!="symbol";break;case"muted":t.muted=s&&typeof s!="function"&&typeof s!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(s==null||typeof s=="function"||typeof s=="boolean"||typeof s=="symbol"){t.removeAttribute("xlink:href");break}a=Go(""+s),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,""+s):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":s&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":s===!0?t.setAttribute(a,""):s!==!1&&s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,s):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":s!=null&&typeof s!="function"&&typeof s!="symbol"&&!isNaN(s)&&1<=s?t.setAttribute(a,s):t.removeAttribute(a);break;case"rowSpan":case"start":s==null||typeof s=="function"||typeof s=="symbol"||isNaN(s)?t.removeAttribute(a):t.setAttribute(a,s);break;case"popover":he("beforetoggle",t),he("toggle",t),xe(t,"popover",s);break;case"xlinkActuate":Te(t,"http://www.w3.org/1999/xlink","xlink:actuate",s);break;case"xlinkArcrole":Te(t,"http://www.w3.org/1999/xlink","xlink:arcrole",s);break;case"xlinkRole":Te(t,"http://www.w3.org/1999/xlink","xlink:role",s);break;case"xlinkShow":Te(t,"http://www.w3.org/1999/xlink","xlink:show",s);break;case"xlinkTitle":Te(t,"http://www.w3.org/1999/xlink","xlink:title",s);break;case"xlinkType":Te(t,"http://www.w3.org/1999/xlink","xlink:type",s);break;case"xmlBase":Te(t,"http://www.w3.org/XML/1998/namespace","xml:base",s);break;case"xmlLang":Te(t,"http://www.w3.org/XML/1998/namespace","xml:lang",s);break;case"xmlSpace":Te(t,"http://www.w3.org/XML/1998/namespace","xml:space",s);break;case"is":xe(t,"is",s);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=uv.get(a)||a,xe(t,a,s))}}function Sf(t,n,a,s,c,f){switch(a){case"style":wh(t,s,f);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(a=s.__html,a!=null){if(c.children!=null)throw Error(r(60));t.innerHTML=a}}break;case"children":typeof s=="string"?On(t,s):(typeof s=="number"||typeof s=="bigint")&&On(t,""+s);break;case"onScroll":s!=null&&he("scroll",t);break;case"onScrollEnd":s!=null&&he("scrollend",t);break;case"onClick":s!=null&&(t.onclick=zi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Ut.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(c=a.endsWith("Capture"),n=a.slice(2,c?a.length-7:void 0),f=t[_n]||null,f=f!=null?f[a]:null,typeof f=="function"&&t.removeEventListener(n,f,c),typeof s=="function")){typeof f!="function"&&f!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,s,c);break t}a in t?t[a]=s:s===!0?t.setAttribute(a,""):xe(t,a,s)}}}function Mn(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":he("error",t),he("load",t);var s=!1,c=!1,f;for(f in a)if(a.hasOwnProperty(f)){var _=a[f];if(_!=null)switch(f){case"src":s=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Be(t,n,f,_,a,null)}}c&&Be(t,n,"srcSet",a.srcSet,a,null),s&&Be(t,n,"src",a.src,a,null);return;case"input":he("invalid",t);var E=f=_=c=null,B=null,tt=null;for(s in a)if(a.hasOwnProperty(s)){var ut=a[s];if(ut!=null)switch(s){case"name":c=ut;break;case"type":_=ut;break;case"checked":B=ut;break;case"defaultChecked":tt=ut;break;case"value":f=ut;break;case"defaultValue":E=ut;break;case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(r(137,n));break;default:Be(t,n,s,ut,a,null)}}wn(t,f,E,B,tt,_,c,!1);return;case"select":he("invalid",t),s=_=f=null;for(c in a)if(a.hasOwnProperty(c)&&(E=a[c],E!=null))switch(c){case"value":f=E;break;case"defaultValue":_=E;break;case"multiple":s=E;default:Be(t,n,c,E,a,null)}n=f,a=_,t.multiple=!!s,n!=null?Qe(t,!!s,n,!1):a!=null&&Qe(t,!!s,a,!0);return;case"textarea":he("invalid",t),f=c=s=null;for(_ in a)if(a.hasOwnProperty(_)&&(E=a[_],E!=null))switch(_){case"value":s=E;break;case"defaultValue":c=E;break;case"children":f=E;break;case"dangerouslySetInnerHTML":if(E!=null)throw Error(r(91));break;default:Be(t,n,_,E,a,null)}br(t,s,c,f);return;case"option":for(B in a)if(a.hasOwnProperty(B)&&(s=a[B],s!=null))switch(B){case"selected":t.selected=s&&typeof s!="function"&&typeof s!="symbol";break;default:Be(t,n,B,s,a,null)}return;case"dialog":he("beforetoggle",t),he("toggle",t),he("cancel",t),he("close",t);break;case"iframe":case"object":he("load",t);break;case"video":case"audio":for(s=0;s<mo.length;s++)he(mo[s],t);break;case"image":he("error",t),he("load",t);break;case"details":he("toggle",t);break;case"embed":case"source":case"link":he("error",t),he("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(tt in a)if(a.hasOwnProperty(tt)&&(s=a[tt],s!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Be(t,n,tt,s,a,null)}return;default:if(Oc(n)){for(ut in a)a.hasOwnProperty(ut)&&(s=a[ut],s!==void 0&&Sf(t,n,ut,s,a,void 0));return}}for(E in a)a.hasOwnProperty(E)&&(s=a[E],s!=null&&Be(t,n,E,s,a,null))}function Px(t,n,a,s){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,f=null,_=null,E=null,B=null,tt=null,ut=null;for(lt in a){var _t=a[lt];if(a.hasOwnProperty(lt)&&_t!=null)switch(lt){case"checked":break;case"value":break;case"defaultValue":B=_t;default:s.hasOwnProperty(lt)||Be(t,n,lt,null,s,_t)}}for(var et in s){var lt=s[et];if(_t=a[et],s.hasOwnProperty(et)&&(lt!=null||_t!=null))switch(et){case"type":f=lt;break;case"name":c=lt;break;case"checked":tt=lt;break;case"defaultChecked":ut=lt;break;case"value":_=lt;break;case"defaultValue":E=lt;break;case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(r(137,n));break;default:lt!==_t&&Be(t,n,et,lt,s,_t)}}ze(t,_,E,B,tt,ut,f,c);return;case"select":lt=_=E=et=null;for(f in a)if(B=a[f],a.hasOwnProperty(f)&&B!=null)switch(f){case"value":break;case"multiple":lt=B;default:s.hasOwnProperty(f)||Be(t,n,f,null,s,B)}for(c in s)if(f=s[c],B=a[c],s.hasOwnProperty(c)&&(f!=null||B!=null))switch(c){case"value":et=f;break;case"defaultValue":E=f;break;case"multiple":_=f;default:f!==B&&Be(t,n,c,f,s,B)}n=E,a=_,s=lt,et!=null?Qe(t,!!a,et,!1):!!s!=!!a&&(n!=null?Qe(t,!!a,n,!0):Qe(t,!!a,a?[]:"",!1));return;case"textarea":lt=et=null;for(E in a)if(c=a[E],a.hasOwnProperty(E)&&c!=null&&!s.hasOwnProperty(E))switch(E){case"value":break;case"children":break;default:Be(t,n,E,null,s,c)}for(_ in s)if(c=s[_],f=a[_],s.hasOwnProperty(_)&&(c!=null||f!=null))switch(_){case"value":et=c;break;case"defaultValue":lt=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(r(91));break;default:c!==f&&Be(t,n,_,c,s,f)}vn(t,et,lt);return;case"option":for(var It in a)if(et=a[It],a.hasOwnProperty(It)&&et!=null&&!s.hasOwnProperty(It))switch(It){case"selected":t.selected=!1;break;default:Be(t,n,It,null,s,et)}for(B in s)if(et=s[B],lt=a[B],s.hasOwnProperty(B)&&et!==lt&&(et!=null||lt!=null))switch(B){case"selected":t.selected=et&&typeof et!="function"&&typeof et!="symbol";break;default:Be(t,n,B,et,s,lt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Qt in a)et=a[Qt],a.hasOwnProperty(Qt)&&et!=null&&!s.hasOwnProperty(Qt)&&Be(t,n,Qt,null,s,et);for(tt in s)if(et=s[tt],lt=a[tt],s.hasOwnProperty(tt)&&et!==lt&&(et!=null||lt!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":if(et!=null)throw Error(r(137,n));break;default:Be(t,n,tt,et,s,lt)}return;default:if(Oc(n)){for(var Ie in a)et=a[Ie],a.hasOwnProperty(Ie)&&et!==void 0&&!s.hasOwnProperty(Ie)&&Sf(t,n,Ie,void 0,s,et);for(ut in s)et=s[ut],lt=a[ut],!s.hasOwnProperty(ut)||et===lt||et===void 0&&lt===void 0||Sf(t,n,ut,et,s,lt);return}}for(var Y in a)et=a[Y],a.hasOwnProperty(Y)&&et!=null&&!s.hasOwnProperty(Y)&&Be(t,n,Y,null,s,et);for(_t in s)et=s[_t],lt=a[_t],!s.hasOwnProperty(_t)||et===lt||et==null&&lt==null||Be(t,n,_t,et,s,lt)}function Dg(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Bx(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),s=0;s<a.length;s++){var c=a[s],f=c.transferSize,_=c.initiatorType,E=c.duration;if(f&&E&&Dg(_)){for(_=0,E=c.responseEnd,s+=1;s<a.length;s++){var B=a[s],tt=B.startTime;if(tt>E)break;var ut=B.transferSize,_t=B.initiatorType;ut&&Dg(_t)&&(B=B.responseEnd,_+=ut*(B<E?1:(E-tt)/(B-tt)))}if(--s,n+=8*(f+_)/(c.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Mf=null,Ef=null;function zl(t){return t.nodeType===9?t:t.ownerDocument}function Ug(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Lg(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function bf(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Tf=null;function Ix(){var t=window.event;return t&&t.type==="popstate"?t===Tf?!1:(Tf=t,!0):(Tf=null,!1)}var Ng=typeof setTimeout=="function"?setTimeout:void 0,Hx=typeof clearTimeout=="function"?clearTimeout:void 0,Og=typeof Promise=="function"?Promise:void 0,Gx=typeof queueMicrotask=="function"?queueMicrotask:typeof Og<"u"?function(t){return Og.resolve(null).then(t).catch(Vx)}:Ng;function Vx(t){setTimeout(function(){throw t})}function Aa(t){return t==="head"}function Fg(t,n){var a=n,s=0;do{var c=a.nextSibling;if(t.removeChild(a),c&&c.nodeType===8)if(a=c.data,a==="/$"||a==="/&"){if(s===0){t.removeChild(c),es(n);return}s--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")s++;else if(a==="html")_o(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,_o(a);for(var f=a.firstChild;f;){var _=f.nextSibling,E=f.nodeName;f[Wa]||E==="SCRIPT"||E==="STYLE"||E==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=_}}else a==="body"&&_o(t.ownerDocument.body);a=c}while(a);es(n)}function zg(t,n){var a=t;t=0;do{var s=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),s&&s.nodeType===8)if(a=s.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=s}while(a)}function Af(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Af(a),Fs(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function kx(t,n,a,s){for(;t.nodeType===1;){var c=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!s&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(s){if(!t[Wa])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(f=t.getAttribute("rel"),f==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(f!==c.rel||t.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||t.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||t.getAttribute("title")!==(c.title==null?null:c.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(f=t.getAttribute("src"),(f!==(c.src==null?null:c.src)||t.getAttribute("type")!==(c.type==null?null:c.type)||t.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&f&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var f=c.name==null?null:""+c.name;if(c.type==="hidden"&&t.getAttribute("name")===f)return t}else return t;if(t=oi(t.nextSibling),t===null)break}return null}function jx(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=oi(t.nextSibling),t===null))return null;return t}function Pg(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=oi(t.nextSibling),t===null))return null;return t}function Rf(t){return t.data==="$?"||t.data==="$~"}function Cf(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Wx(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var s=function(){n(),a.removeEventListener("DOMContentLoaded",s)};a.addEventListener("DOMContentLoaded",s),t._reactRetry=s}}function oi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var wf=null;function Bg(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return oi(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function Ig(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function Hg(t,n,a){switch(n=zl(a),t){case"html":if(t=n.documentElement,!t)throw Error(r(452));return t;case"head":if(t=n.head,!t)throw Error(r(453));return t;case"body":if(t=n.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function _o(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Fs(t)}var li=new Map,Gg=new Set;function Pl(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Ji=Z.d;Z.d={f:Xx,r:qx,D:Yx,C:Zx,L:Kx,m:Qx,X:$x,S:Jx,M:ty};function Xx(){var t=Ji.f(),n=Cl();return t||n}function qx(t){var n=W(t);n!==null&&n.tag===5&&n.type==="form"?am(n):Ji.r(t)}var Jr=typeof document>"u"?null:document;function Vg(t,n,a){var s=Jr;if(s&&typeof n=="string"&&n){var c=hn(n);c='link[rel="'+t+'"][href="'+c+'"]',typeof a=="string"&&(c+='[crossorigin="'+a+'"]'),Gg.has(c)||(Gg.add(c),t={rel:t,crossOrigin:a,href:n},s.querySelector(c)===null&&(n=s.createElement("link"),Mn(n,"link",t),k(n),s.head.appendChild(n)))}}function Yx(t){Ji.D(t),Vg("dns-prefetch",t,null)}function Zx(t,n){Ji.C(t,n),Vg("preconnect",t,n)}function Kx(t,n,a){Ji.L(t,n,a);var s=Jr;if(s&&t&&n){var c='link[rel="preload"][as="'+hn(n)+'"]';n==="image"&&a&&a.imageSrcSet?(c+='[imagesrcset="'+hn(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(c+='[imagesizes="'+hn(a.imageSizes)+'"]')):c+='[href="'+hn(t)+'"]';var f=c;switch(n){case"style":f=$r(t);break;case"script":f=ts(t)}li.has(f)||(t=x({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),li.set(f,t),s.querySelector(c)!==null||n==="style"&&s.querySelector(vo(f))||n==="script"&&s.querySelector(xo(f))||(n=s.createElement("link"),Mn(n,"link",t),k(n),s.head.appendChild(n)))}}function Qx(t,n){Ji.m(t,n);var a=Jr;if(a&&t){var s=n&&typeof n.as=="string"?n.as:"script",c='link[rel="modulepreload"][as="'+hn(s)+'"][href="'+hn(t)+'"]',f=c;switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=ts(t)}if(!li.has(f)&&(t=x({rel:"modulepreload",href:t},n),li.set(f,t),a.querySelector(c)===null)){switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(xo(f)))return}s=a.createElement("link"),Mn(s,"link",t),k(s),a.head.appendChild(s)}}}function Jx(t,n,a){Ji.S(t,n,a);var s=Jr;if(s&&t){var c=rt(s).hoistableStyles,f=$r(t);n=n||"default";var _=c.get(f);if(!_){var E={loading:0,preload:null};if(_=s.querySelector(vo(f)))E.loading=5;else{t=x({rel:"stylesheet",href:t,"data-precedence":n},a),(a=li.get(f))&&Df(t,a);var B=_=s.createElement("link");k(B),Mn(B,"link",t),B._p=new Promise(function(tt,ut){B.onload=tt,B.onerror=ut}),B.addEventListener("load",function(){E.loading|=1}),B.addEventListener("error",function(){E.loading|=2}),E.loading|=4,Bl(_,n,s)}_={type:"stylesheet",instance:_,count:1,state:E},c.set(f,_)}}}function $x(t,n){Ji.X(t,n);var a=Jr;if(a&&t){var s=rt(a).hoistableScripts,c=ts(t),f=s.get(c);f||(f=a.querySelector(xo(c)),f||(t=x({src:t,async:!0},n),(n=li.get(c))&&Uf(t,n),f=a.createElement("script"),k(f),Mn(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},s.set(c,f))}}function ty(t,n){Ji.M(t,n);var a=Jr;if(a&&t){var s=rt(a).hoistableScripts,c=ts(t),f=s.get(c);f||(f=a.querySelector(xo(c)),f||(t=x({src:t,async:!0,type:"module"},n),(n=li.get(c))&&Uf(t,n),f=a.createElement("script"),k(f),Mn(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},s.set(c,f))}}function kg(t,n,a,s){var c=(c=Et.current)?Pl(c):null;if(!c)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=$r(a.href),a=rt(c).hoistableStyles,s=a.get(n),s||(s={type:"style",instance:null,count:0,state:null},a.set(n,s)),s):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=$r(a.href);var f=rt(c).hoistableStyles,_=f.get(t);if(_||(c=c.ownerDocument||c,_={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(t,_),(f=c.querySelector(vo(t)))&&!f._p&&(_.instance=f,_.state.loading=5),li.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},li.set(t,a),f||ey(c,t,a,_.state))),n&&s===null)throw Error(r(528,""));return _}if(n&&s!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=ts(a),a=rt(c).hoistableScripts,s=a.get(n),s||(s={type:"script",instance:null,count:0,state:null},a.set(n,s)),s):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function $r(t){return'href="'+hn(t)+'"'}function vo(t){return'link[rel="stylesheet"]['+t+"]"}function jg(t){return x({},t,{"data-precedence":t.precedence,precedence:null})}function ey(t,n,a,s){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?s.loading=1:(n=t.createElement("link"),s.preload=n,n.addEventListener("load",function(){return s.loading|=1}),n.addEventListener("error",function(){return s.loading|=2}),Mn(n,"link",a),k(n),t.head.appendChild(n))}function ts(t){return'[src="'+hn(t)+'"]'}function xo(t){return"script[async]"+t}function Wg(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var s=t.querySelector('style[data-href~="'+hn(a.href)+'"]');if(s)return n.instance=s,k(s),s;var c=x({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return s=(t.ownerDocument||t).createElement("style"),k(s),Mn(s,"style",c),Bl(s,a.precedence,t),n.instance=s;case"stylesheet":c=$r(a.href);var f=t.querySelector(vo(c));if(f)return n.state.loading|=4,n.instance=f,k(f),f;s=jg(a),(c=li.get(c))&&Df(s,c),f=(t.ownerDocument||t).createElement("link"),k(f);var _=f;return _._p=new Promise(function(E,B){_.onload=E,_.onerror=B}),Mn(f,"link",s),n.state.loading|=4,Bl(f,a.precedence,t),n.instance=f;case"script":return f=ts(a.src),(c=t.querySelector(xo(f)))?(n.instance=c,k(c),c):(s=a,(c=li.get(f))&&(s=x({},a),Uf(s,c)),t=t.ownerDocument||t,c=t.createElement("script"),k(c),Mn(c,"link",s),t.head.appendChild(c),n.instance=c);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(s=n.instance,n.state.loading|=4,Bl(s,a.precedence,t));return n.instance}function Bl(t,n,a){for(var s=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=s.length?s[s.length-1]:null,f=c,_=0;_<s.length;_++){var E=s[_];if(E.dataset.precedence===n)f=E;else if(f!==c)break}f?f.parentNode.insertBefore(t,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function Df(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function Uf(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Il=null;function Xg(t,n,a){if(Il===null){var s=new Map,c=Il=new Map;c.set(a,s)}else c=Il,s=c.get(a),s||(s=new Map,c.set(a,s));if(s.has(t))return s;for(s.set(t,null),a=a.getElementsByTagName(t),c=0;c<a.length;c++){var f=a[c];if(!(f[Wa]||f[Ke]||t==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var _=f.getAttribute(n)||"";_=t+_;var E=s.get(_);E?E.push(f):s.set(_,[f])}}return s}function qg(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function ny(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Yg(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function iy(t,n,a,s){if(a.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var c=$r(s.href),f=n.querySelector(vo(c));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=Hl.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=f,k(f);return}f=n.ownerDocument||n,s=jg(s),(c=li.get(c))&&Df(s,c),f=f.createElement("link"),k(f);var _=f;_._p=new Promise(function(E,B){_.onload=E,_.onerror=B}),Mn(f,"link",s),a.instance=f}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=Hl.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Lf=0;function ay(t,n){return t.stylesheets&&t.count===0&&Vl(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var s=setTimeout(function(){if(t.stylesheets&&Vl(t,t.stylesheets),t.unsuspend){var f=t.unsuspend;t.unsuspend=null,f()}},6e4+n);0<t.imgBytes&&Lf===0&&(Lf=62500*Bx());var c=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Vl(t,t.stylesheets),t.unsuspend)){var f=t.unsuspend;t.unsuspend=null,f()}},(t.imgBytes>Lf?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(s),clearTimeout(c)}}:null}function Hl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Vl(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Gl=null;function Vl(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Gl=new Map,n.forEach(ry,t),Gl=null,Hl.call(t))}function ry(t,n){if(!(n.state.loading&4)){var a=Gl.get(t);if(a)var s=a.get(null);else{a=new Map,Gl.set(t,a);for(var c=t.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<c.length;f++){var _=c[f];(_.nodeName==="LINK"||_.getAttribute("media")!=="not all")&&(a.set(_.dataset.precedence,_),s=_)}s&&a.set(null,s)}c=n.instance,_=c.getAttribute("data-precedence"),f=a.get(_)||s,f===s&&a.set(null,c),a.set(_,c),this.count++,s=Hl.bind(this),c.addEventListener("load",s),c.addEventListener("error",s),f?f.parentNode.insertBefore(c,f.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(c,t.firstChild)),n.state.loading|=4}}var yo={$$typeof:O,Provider:null,Consumer:null,_currentValue:q,_currentValue2:q,_threadCount:0};function sy(t,n,a,s,c,f,_,E,B){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ee(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ee(0),this.hiddenUpdates=Ee(null),this.identifierPrefix=s,this.onUncaughtError=c,this.onCaughtError=f,this.onRecoverableError=_,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.incompleteTransitions=new Map}function Zg(t,n,a,s,c,f,_,E,B,tt,ut,_t){return t=new sy(t,n,a,_,B,tt,ut,_t,E),n=1,f===!0&&(n|=24),f=Wn(3,null,null,n),t.current=f,f.stateNode=t,n=uu(),n.refCount++,t.pooledCache=n,n.refCount++,f.memoizedState={element:s,isDehydrated:a,cache:n},pu(f),t}function Kg(t){return t?(t=Ur,t):Ur}function Qg(t,n,a,s,c,f){c=Kg(c),s.context===null?s.context=c:s.pendingContext=c,s=ma(n),s.payload={element:a},f=f===void 0?null:f,f!==null&&(s.callback=f),a=ga(t,s,n),a!==null&&(Hn(a,t,n),Qs(a,t,n))}function Jg(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function Nf(t,n){Jg(t,n),(t=t.alternate)&&Jg(t,n)}function $g(t){if(t.tag===13||t.tag===31){var n=Za(t,67108864);n!==null&&Hn(n,t,67108864),Nf(t,67108864)}}function t0(t){if(t.tag===13||t.tag===31){var n=Kn();n=ka(n);var a=Za(t,n);a!==null&&Hn(a,t,n),Nf(t,n)}}var kl=!0;function oy(t,n,a,s){var c=z.T;z.T=null;var f=Z.p;try{Z.p=2,Of(t,n,a,s)}finally{Z.p=f,z.T=c}}function ly(t,n,a,s){var c=z.T;z.T=null;var f=Z.p;try{Z.p=8,Of(t,n,a,s)}finally{Z.p=f,z.T=c}}function Of(t,n,a,s){if(kl){var c=Ff(s);if(c===null)yf(t,n,s,jl,a),n0(t,s);else if(uy(c,t,n,a,s))s.stopPropagation();else if(n0(t,s),n&4&&-1<cy.indexOf(t)){for(;c!==null;){var f=W(c);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var _=Ct(f.pendingLanes);if(_!==0){var E=f;for(E.pendingLanes|=2,E.entangledLanes|=2;_;){var B=1<<31-Jt(_);E.entanglements[1]|=B,_&=~B}Di(f),(we&6)===0&&(Al=dt()+500,po(0))}}break;case 31:case 13:E=Za(f,2),E!==null&&Hn(E,f,2),Cl(),Nf(f,2)}if(f=Ff(s),f===null&&yf(t,n,s,jl,a),f===c)break;c=f}c!==null&&s.stopPropagation()}else yf(t,n,s,null,a)}}function Ff(t){return t=zc(t),zf(t)}var jl=null;function zf(t){if(jl=null,t=R(t),t!==null){var n=u(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=h(n),t!==null)return t;t=null}else if(a===31){if(t=d(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return jl=t,null}function e0(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Mt()){case gt:return 2;case Vt:return 8;case wt:case Pt:return 32;case me:return 268435456;default:return 32}default:return 32}}var Pf=!1,Ra=null,Ca=null,wa=null,So=new Map,Mo=new Map,Da=[],cy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function n0(t,n){switch(t){case"focusin":case"focusout":Ra=null;break;case"dragenter":case"dragleave":Ca=null;break;case"mouseover":case"mouseout":wa=null;break;case"pointerover":case"pointerout":So.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Mo.delete(n.pointerId)}}function Eo(t,n,a,s,c,f){return t===null||t.nativeEvent!==f?(t={blockedOn:n,domEventName:a,eventSystemFlags:s,nativeEvent:f,targetContainers:[c]},n!==null&&(n=W(n),n!==null&&$g(n)),t):(t.eventSystemFlags|=s,n=t.targetContainers,c!==null&&n.indexOf(c)===-1&&n.push(c),t)}function uy(t,n,a,s,c){switch(n){case"focusin":return Ra=Eo(Ra,t,n,a,s,c),!0;case"dragenter":return Ca=Eo(Ca,t,n,a,s,c),!0;case"mouseover":return wa=Eo(wa,t,n,a,s,c),!0;case"pointerover":var f=c.pointerId;return So.set(f,Eo(So.get(f)||null,t,n,a,s,c)),!0;case"gotpointercapture":return f=c.pointerId,Mo.set(f,Eo(Mo.get(f)||null,t,n,a,s,c)),!0}return!1}function i0(t){var n=R(t.target);if(n!==null){var a=u(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){t.blockedOn=n,ja(t.priority,function(){t0(a)});return}}else if(n===31){if(n=d(a),n!==null){t.blockedOn=n,ja(t.priority,function(){t0(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Wl(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=Ff(t.nativeEvent);if(a===null){a=t.nativeEvent;var s=new a.constructor(a.type,a);Fc=s,a.target.dispatchEvent(s),Fc=null}else return n=W(a),n!==null&&$g(n),t.blockedOn=a,!1;n.shift()}return!0}function a0(t,n,a){Wl(t)&&a.delete(n)}function fy(){Pf=!1,Ra!==null&&Wl(Ra)&&(Ra=null),Ca!==null&&Wl(Ca)&&(Ca=null),wa!==null&&Wl(wa)&&(wa=null),So.forEach(a0),Mo.forEach(a0)}function Xl(t,n){t.blockedOn===n&&(t.blockedOn=null,Pf||(Pf=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,fy)))}var ql=null;function r0(t){ql!==t&&(ql=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){ql===t&&(ql=null);for(var n=0;n<t.length;n+=3){var a=t[n],s=t[n+1],c=t[n+2];if(typeof s!="function"){if(zf(s||a)===null)continue;break}var f=W(a);f!==null&&(t.splice(n,3),n-=3,Ou(f,{pending:!0,data:c,method:a.method,action:s},s,c))}}))}function es(t){function n(B){return Xl(B,t)}Ra!==null&&Xl(Ra,t),Ca!==null&&Xl(Ca,t),wa!==null&&Xl(wa,t),So.forEach(n),Mo.forEach(n);for(var a=0;a<Da.length;a++){var s=Da[a];s.blockedOn===t&&(s.blockedOn=null)}for(;0<Da.length&&(a=Da[0],a.blockedOn===null);)i0(a),a.blockedOn===null&&Da.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(s=0;s<a.length;s+=3){var c=a[s],f=a[s+1],_=c[_n]||null;if(typeof f=="function")_||r0(a);else if(_){var E=null;if(f&&f.hasAttribute("formAction")){if(c=f,_=f[_n]||null)E=_.formAction;else if(zf(c)!==null)continue}else E=_.action;typeof E=="function"?a[s+1]=E:(a.splice(s,3),s-=3),r0(a)}}}function s0(){function t(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(_){return c=_})},focusReset:"manual",scroll:"manual"})}function n(){c!==null&&(c(),c=null),s||setTimeout(a,20)}function a(){if(!s&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var s=!1,c=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){s=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),c!==null&&(c(),c=null)}}}function Bf(t){this._internalRoot=t}Yl.prototype.render=Bf.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,s=Kn();Qg(a,s,t,n,null,null)},Yl.prototype.unmount=Bf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Qg(t.current,2,null,t,null,null),Cl(),n[Fi]=null}};function Yl(t){this._internalRoot=t}Yl.prototype.unstable_scheduleHydration=function(t){if(t){var n=Ns();t={blockedOn:null,target:t,priority:n};for(var a=0;a<Da.length&&n!==0&&n<Da[a].priority;a++);Da.splice(a,0,t),a===0&&i0(t)}};var o0=e.version;if(o0!=="19.2.7")throw Error(r(527,o0,"19.2.7"));Z.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=m(n),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var dy={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Zl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Zl.isDisabled&&Zl.supportsFiber)try{qt=Zl.inject(dy),kt=Zl}catch{}}return To.createRoot=function(t,n){if(!l(t))throw Error(r(299));var a=!1,s="",c=pm,f=mm,_=gm;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(_=n.onRecoverableError)),n=Zg(t,1,!1,null,null,a,s,null,c,f,_,s0),t[Fi]=n.current,xf(t),new Bf(n)},To.hydrateRoot=function(t,n,a){if(!l(t))throw Error(r(299));var s=!1,c="",f=pm,_=mm,E=gm,B=null;return a!=null&&(a.unstable_strictMode===!0&&(s=!0),a.identifierPrefix!==void 0&&(c=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(_=a.onCaughtError),a.onRecoverableError!==void 0&&(E=a.onRecoverableError),a.formState!==void 0&&(B=a.formState)),n=Zg(t,1,!0,n,a??null,s,c,B,f,_,E,s0),n.context=Kg(null),a=n.current,s=Kn(),s=ka(s),c=ma(s),c.callback=null,ga(a,c,s),a=s,n.current.lanes=a,gn(n,a),Di(n),t[Fi]=n.current,xf(t),new Yl(n)},To.version="19.2.7",To}var _0;function Ey(){if(_0)return Gf.exports;_0=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),Gf.exports=My(),Gf.exports}var by=Ey();const Ty=R_(by),Ay=[{label:"How it Works",href:"#scan"},{label:"Before / After",href:"#transform"},{label:"Languages",href:"#languages"},{label:"Try It",href:"#playground"}];function Ry(){const[o,e]=Wt.useState(!1);return Wt.useEffect(()=>{const i=()=>e(window.scrollY>40);return window.addEventListener("scroll",i,{passive:!0}),()=>window.removeEventListener("scroll",i)},[]),A.jsxs("nav",{style:{position:"fixed",top:0,left:0,right:0,zIndex:1e3,padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",transition:"background .3s, box-shadow .3s",background:o?"rgba(10,14,39,.9)":"transparent",backdropFilter:o?"blur(20px)":"none",borderBottom:o?"1px solid rgba(255,255,255,.06)":"none"},children:[A.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[A.jsx("div",{style:{width:32,height:32,background:"linear-gradient(135deg, #7C5CFC, #00D2FF)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,fontFamily:"JetBrains Mono, monospace",color:"#fff"},children:">_"}),A.jsx("span",{style:{fontFamily:"Space Grotesk, sans-serif",fontWeight:700,fontSize:18,background:"linear-gradient(135deg, #7C5CFC, #00D2FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"LintForge AI"})]}),A.jsxs("div",{style:{display:"flex",alignItems:"center",gap:32},children:[Ay.map(i=>A.jsx("a",{href:i.href,style:{color:"rgba(255,255,255,.65)",textDecoration:"none",fontSize:14,fontWeight:500,transition:"color .2s"},onMouseEnter:r=>r.target.style.color="#00D2FF",onMouseLeave:r=>r.target.style.color="rgba(255,255,255,.65)",children:i.label},i.href)),A.jsx("a",{href:"#playground",style:{background:"linear-gradient(135deg, #7C5CFC, #00D2FF)",color:"#fff",padding:"8px 20px",borderRadius:50,fontSize:14,fontWeight:600,textDecoration:"none",fontFamily:"Space Grotesk, sans-serif",transition:"transform .2s, box-shadow .2s"},onMouseEnter:i=>{i.target.style.transform="translateY(-1px)",i.target.style.boxShadow="0 8px 24px rgba(124,92,252,.5)"},onMouseLeave:i=>{i.target.style.transform="",i.target.style.boxShadow=""},children:"Try Free"})]})]})}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gh="172",Cy=0,v0=1,wy=2,C_=1,Dy=2,aa=3,Ga=0,Vn=1,Li=2,Ia=0,vs=1,x0=2,y0=3,S0=4,Uy=5,_r=100,Ly=101,Ny=102,Oy=103,Fy=104,zy=200,Py=201,By=202,Iy=203,Rd=204,Cd=205,Hy=206,Gy=207,Vy=208,ky=209,jy=210,Wy=211,Xy=212,qy=213,Yy=214,wd=0,Dd=1,Ud=2,Ss=3,Ld=4,Nd=5,Od=6,Fd=7,w_=0,Zy=1,Ky=2,Ha=0,Qy=1,Jy=2,$y=3,tS=4,eS=5,nS=6,iS=7,D_=300,Ms=301,Es=302,zd=303,Pd=304,wc=306,Bd=1e3,xr=1001,Id=1002,Ei=1003,aS=1004,Kl=1005,Ni=1006,Wf=1007,yr=1008,la=1009,U_=1010,L_=1011,No=1012,_h=1013,Sr=1014,ra=1015,Oo=1016,vh=1017,xh=1018,bs=1020,N_=35902,O_=1021,F_=1022,Mi=1023,z_=1024,P_=1025,xs=1026,Ts=1027,B_=1028,yh=1029,I_=1030,Sh=1031,Mh=1033,yc=33776,Sc=33777,Mc=33778,Ec=33779,Hd=35840,Gd=35841,Vd=35842,kd=35843,jd=36196,Wd=37492,Xd=37496,qd=37808,Yd=37809,Zd=37810,Kd=37811,Qd=37812,Jd=37813,$d=37814,th=37815,eh=37816,nh=37817,ih=37818,ah=37819,rh=37820,sh=37821,bc=36492,oh=36494,lh=36495,H_=36283,ch=36284,uh=36285,fh=36286,rS=3200,sS=3201,G_=0,oS=1,Ba="",ui="srgb",As="srgb-linear",Ac="linear",He="srgb",ns=7680,M0=519,lS=512,cS=513,uS=514,V_=515,fS=516,dS=517,hS=518,pS=519,E0=35044,b0="300 es",sa=2e3,Rc=2001;class Cs{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(i)===-1&&r[e].push(i)}hasEventListener(e,i){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(i)!==-1}removeEventListener(e,i){if(this._listeners===void 0)return;const l=this._listeners[e];if(l!==void 0){const u=l.indexOf(i);u!==-1&&l.splice(u,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const l=r.slice(0);for(let u=0,h=l.length;u<h;u++)l[u].call(this,e);e.target=null}}}const An=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Xf=Math.PI/180,dh=180/Math.PI;function Fo(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(An[o&255]+An[o>>8&255]+An[o>>16&255]+An[o>>24&255]+"-"+An[e&255]+An[e>>8&255]+"-"+An[e>>16&15|64]+An[e>>24&255]+"-"+An[i&63|128]+An[i>>8&255]+"-"+An[i>>16&255]+An[i>>24&255]+An[r&255]+An[r>>8&255]+An[r>>16&255]+An[r>>24&255]).toLowerCase()}function Se(o,e,i){return Math.max(e,Math.min(i,o))}function mS(o,e){return(o%e+e)%e}function qf(o,e,i){return(1-i)*o+i*e}function Ao(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function Gn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}class De{constructor(e=0,i=0){De.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,r=this.y,l=e.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Se(this.x,e.x,i.x),this.y=Se(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Se(this.x,e,i),this.y=Se(this.y,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Se(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(Se(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y;return i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const r=Math.cos(i),l=Math.sin(i),u=this.x-e.x,h=this.y-e.y;return this.x=u*r-h*l+e.x,this.y=u*l+h*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class le{constructor(e,i,r,l,u,h,d,p,m){le.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,r,l,u,h,d,p,m)}set(e,i,r,l,u,h,d,p,m){const v=this.elements;return v[0]=e,v[1]=l,v[2]=d,v[3]=i,v[4]=u,v[5]=p,v[6]=r,v[7]=h,v[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(e,i,r){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,u=this.elements,h=r[0],d=r[3],p=r[6],m=r[1],v=r[4],x=r[7],y=r[2],M=r[5],b=r[8],C=l[0],S=l[3],g=l[6],N=l[1],O=l[4],U=l[7],X=l[2],H=l[5],P=l[8];return u[0]=h*C+d*N+p*X,u[3]=h*S+d*O+p*H,u[6]=h*g+d*U+p*P,u[1]=m*C+v*N+x*X,u[4]=m*S+v*O+x*H,u[7]=m*g+v*U+x*P,u[2]=y*C+M*N+b*X,u[5]=y*S+M*O+b*H,u[8]=y*g+M*U+b*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[1],l=e[2],u=e[3],h=e[4],d=e[5],p=e[6],m=e[7],v=e[8];return i*h*v-i*d*m-r*u*v+r*d*p+l*u*m-l*h*p}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],u=e[3],h=e[4],d=e[5],p=e[6],m=e[7],v=e[8],x=v*h-d*m,y=d*p-v*u,M=m*u-h*p,b=i*x+r*y+l*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/b;return e[0]=x*C,e[1]=(l*m-v*r)*C,e[2]=(d*r-l*h)*C,e[3]=y*C,e[4]=(v*i-l*p)*C,e[5]=(l*u-d*i)*C,e[6]=M*C,e[7]=(r*p-m*i)*C,e[8]=(h*i-r*u)*C,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,r,l,u,h,d){const p=Math.cos(u),m=Math.sin(u);return this.set(r*p,r*m,-r*(p*h+m*d)+h+e,-l*m,l*p,-l*(-m*h+p*d)+d+i,0,0,1),this}scale(e,i){return this.premultiply(Yf.makeScale(e,i)),this}rotate(e){return this.premultiply(Yf.makeRotation(-e)),this}translate(e,i){return this.premultiply(Yf.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<9;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Yf=new le;function k_(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Cc(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function gS(){const o=Cc("canvas");return o.style.display="block",o}const T0={};function gs(o){o in T0||(T0[o]=!0,console.warn(o))}function _S(o,e,i){return new Promise(function(r,l){function u(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(u,i);break;default:r()}}setTimeout(u,i)})}function vS(o){const e=o.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function xS(o){const e=o.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const A0=new le().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),R0=new le().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function yS(){const o={enabled:!0,workingColorSpace:As,spaces:{},convert:function(l,u,h){return this.enabled===!1||u===h||!u||!h||(this.spaces[u].transfer===He&&(l.r=oa(l.r),l.g=oa(l.g),l.b=oa(l.b)),this.spaces[u].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[u].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===He&&(l.r=ys(l.r),l.g=ys(l.g),l.b=ys(l.b))),l},fromWorkingColorSpace:function(l,u){return this.convert(l,this.workingColorSpace,u)},toWorkingColorSpace:function(l,u){return this.convert(l,u,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Ba?Ac:this.spaces[l].transfer},getLuminanceCoefficients:function(l,u=this.workingColorSpace){return l.fromArray(this.spaces[u].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,u,h){return l.copy(this.spaces[u].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return o.define({[As]:{primaries:e,whitePoint:r,transfer:Ac,toXYZ:A0,fromXYZ:R0,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:ui},outputColorSpaceConfig:{drawingBufferColorSpace:ui}},[ui]:{primaries:e,whitePoint:r,transfer:He,toXYZ:A0,fromXYZ:R0,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:ui}}}),o}const Ce=yS();function oa(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function ys(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let is;class SS{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{is===void 0&&(is=Cc("canvas")),is.width=e.width,is.height=e.height;const r=is.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=is}return i.width>2048||i.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),i.toDataURL("image/jpeg",.6)):i.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Cc("canvas");i.width=e.width,i.height=e.height;const r=i.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const l=r.getImageData(0,0,e.width,e.height),u=l.data;for(let h=0;h<u.length;h++)u[h]=oa(u[h]/255)*255;return r.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(oa(i[r]/255)*255):i[r]=oa(i[r]);return{data:i,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let MS=0;class j_{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:MS++}),this.uuid=Fo(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let u;if(Array.isArray(l)){u=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?u.push(Zf(l[h].image)):u.push(Zf(l[h]))}else u=Zf(l);r.url=u}return i||(e.images[this.uuid]=r),r}}function Zf(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?SS.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ES=0;class kn extends Cs{constructor(e=kn.DEFAULT_IMAGE,i=kn.DEFAULT_MAPPING,r=xr,l=xr,u=Ni,h=yr,d=Mi,p=la,m=kn.DEFAULT_ANISOTROPY,v=Ba){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ES++}),this.uuid=Fo(),this.name="",this.source=new j_(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=u,this.minFilter=h,this.anisotropy=m,this.format=d,this.internalFormat=null,this.type=p,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==D_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bd:e.x=e.x-Math.floor(e.x);break;case xr:e.x=e.x<0?0:1;break;case Id:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bd:e.y=e.y-Math.floor(e.y);break;case xr:e.y=e.y<0?0:1;break;case Id:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}kn.DEFAULT_IMAGE=null;kn.DEFAULT_MAPPING=D_;kn.DEFAULT_ANISOTROPY=1;class Ge{constructor(e=0,i=0,r=0,l=1){Ge.prototype.isVector4=!0,this.x=e,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,r,l){return this.x=e,this.y=i,this.z=r,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,u=this.w,h=e.elements;return this.x=h[0]*i+h[4]*r+h[8]*l+h[12]*u,this.y=h[1]*i+h[5]*r+h[9]*l+h[13]*u,this.z=h[2]*i+h[6]*r+h[10]*l+h[14]*u,this.w=h[3]*i+h[7]*r+h[11]*l+h[15]*u,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,r,l,u;const p=e.elements,m=p[0],v=p[4],x=p[8],y=p[1],M=p[5],b=p[9],C=p[2],S=p[6],g=p[10];if(Math.abs(v-y)<.01&&Math.abs(x-C)<.01&&Math.abs(b-S)<.01){if(Math.abs(v+y)<.1&&Math.abs(x+C)<.1&&Math.abs(b+S)<.1&&Math.abs(m+M+g-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const O=(m+1)/2,U=(M+1)/2,X=(g+1)/2,H=(v+y)/4,P=(x+C)/4,Q=(b+S)/4;return O>U&&O>X?O<.01?(r=0,l=.707106781,u=.707106781):(r=Math.sqrt(O),l=H/r,u=P/r):U>X?U<.01?(r=.707106781,l=0,u=.707106781):(l=Math.sqrt(U),r=H/l,u=Q/l):X<.01?(r=.707106781,l=.707106781,u=0):(u=Math.sqrt(X),r=P/u,l=Q/u),this.set(r,l,u,i),this}let N=Math.sqrt((S-b)*(S-b)+(x-C)*(x-C)+(y-v)*(y-v));return Math.abs(N)<.001&&(N=1),this.x=(S-b)/N,this.y=(x-C)/N,this.z=(y-v)/N,this.w=Math.acos((m+M+g-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Se(this.x,e.x,i.x),this.y=Se(this.y,e.y,i.y),this.z=Se(this.z,e.z,i.z),this.w=Se(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Se(this.x,e,i),this.y=Se(this.y,e,i),this.z=Se(this.z,e,i),this.w=Se(this.w,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Se(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this.w=e.w+(i.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bS extends Cs{constructor(e=1,i=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=1,this.scissor=new Ge(0,0,e,i),this.scissorTest=!1,this.viewport=new Ge(0,0,e,i);const l={width:e,height:i,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ni,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const u=new kn(l,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);u.flipY=!1,u.generateMipmaps=r.generateMipmaps,u.internalFormat=r.internalFormat,this.textures=[];const h=r.count;for(let d=0;d<h;d++)this.textures[d]=u.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,r=1){if(this.width!==e||this.height!==i||this.depth!==r){this.width=e,this.height=i,this.depth=r;for(let l=0,u=this.textures.length;l<u;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=r;this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,l=e.textures.length;r<l;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;const i=Object.assign({},e.texture.image);return this.texture.source=new j_(i),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mr extends bS{constructor(e=1,i=1,r={}){super(e,i,r),this.isWebGLRenderTarget=!0}}class W_ extends kn{constructor(e=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=Ei,this.minFilter=Ei,this.wrapR=xr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class TS extends kn{constructor(e=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=Ei,this.minFilter=Ei,this.wrapR=xr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zo{constructor(e=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=r,this._w=l}static slerpFlat(e,i,r,l,u,h,d){let p=r[l+0],m=r[l+1],v=r[l+2],x=r[l+3];const y=u[h+0],M=u[h+1],b=u[h+2],C=u[h+3];if(d===0){e[i+0]=p,e[i+1]=m,e[i+2]=v,e[i+3]=x;return}if(d===1){e[i+0]=y,e[i+1]=M,e[i+2]=b,e[i+3]=C;return}if(x!==C||p!==y||m!==M||v!==b){let S=1-d;const g=p*y+m*M+v*b+x*C,N=g>=0?1:-1,O=1-g*g;if(O>Number.EPSILON){const X=Math.sqrt(O),H=Math.atan2(X,g*N);S=Math.sin(S*H)/X,d=Math.sin(d*H)/X}const U=d*N;if(p=p*S+y*U,m=m*S+M*U,v=v*S+b*U,x=x*S+C*U,S===1-d){const X=1/Math.sqrt(p*p+m*m+v*v+x*x);p*=X,m*=X,v*=X,x*=X}}e[i]=p,e[i+1]=m,e[i+2]=v,e[i+3]=x}static multiplyQuaternionsFlat(e,i,r,l,u,h){const d=r[l],p=r[l+1],m=r[l+2],v=r[l+3],x=u[h],y=u[h+1],M=u[h+2],b=u[h+3];return e[i]=d*b+v*x+p*M-m*y,e[i+1]=p*b+v*y+m*x-d*M,e[i+2]=m*b+v*M+d*y-p*x,e[i+3]=v*b-d*x-p*y-m*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,r,l){return this._x=e,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const r=e._x,l=e._y,u=e._z,h=e._order,d=Math.cos,p=Math.sin,m=d(r/2),v=d(l/2),x=d(u/2),y=p(r/2),M=p(l/2),b=p(u/2);switch(h){case"XYZ":this._x=y*v*x+m*M*b,this._y=m*M*x-y*v*b,this._z=m*v*b+y*M*x,this._w=m*v*x-y*M*b;break;case"YXZ":this._x=y*v*x+m*M*b,this._y=m*M*x-y*v*b,this._z=m*v*b-y*M*x,this._w=m*v*x+y*M*b;break;case"ZXY":this._x=y*v*x-m*M*b,this._y=m*M*x+y*v*b,this._z=m*v*b+y*M*x,this._w=m*v*x-y*M*b;break;case"ZYX":this._x=y*v*x-m*M*b,this._y=m*M*x+y*v*b,this._z=m*v*b-y*M*x,this._w=m*v*x+y*M*b;break;case"YZX":this._x=y*v*x+m*M*b,this._y=m*M*x+y*v*b,this._z=m*v*b-y*M*x,this._w=m*v*x-y*M*b;break;case"XZY":this._x=y*v*x-m*M*b,this._y=m*M*x-y*v*b,this._z=m*v*b+y*M*x,this._w=m*v*x+y*M*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const r=i/2,l=Math.sin(r);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,r=i[0],l=i[4],u=i[8],h=i[1],d=i[5],p=i[9],m=i[2],v=i[6],x=i[10],y=r+d+x;if(y>0){const M=.5/Math.sqrt(y+1);this._w=.25/M,this._x=(v-p)*M,this._y=(u-m)*M,this._z=(h-l)*M}else if(r>d&&r>x){const M=2*Math.sqrt(1+r-d-x);this._w=(v-p)/M,this._x=.25*M,this._y=(l+h)/M,this._z=(u+m)/M}else if(d>x){const M=2*Math.sqrt(1+d-r-x);this._w=(u-m)/M,this._x=(l+h)/M,this._y=.25*M,this._z=(p+v)/M}else{const M=2*Math.sqrt(1+x-r-d);this._w=(h-l)/M,this._x=(u+m)/M,this._y=(p+v)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let r=e.dot(i)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Se(this.dot(e),-1,1)))}rotateTowards(e,i){const r=this.angleTo(e);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const r=e._x,l=e._y,u=e._z,h=e._w,d=i._x,p=i._y,m=i._z,v=i._w;return this._x=r*v+h*d+l*m-u*p,this._y=l*v+h*p+u*d-r*m,this._z=u*v+h*m+r*p-l*d,this._w=h*v-r*d-l*p-u*m,this._onChangeCallback(),this}slerp(e,i){if(i===0)return this;if(i===1)return this.copy(e);const r=this._x,l=this._y,u=this._z,h=this._w;let d=h*e._w+r*e._x+l*e._y+u*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=h,this._x=r,this._y=l,this._z=u,this;const p=1-d*d;if(p<=Number.EPSILON){const M=1-i;return this._w=M*h+i*this._w,this._x=M*r+i*this._x,this._y=M*l+i*this._y,this._z=M*u+i*this._z,this.normalize(),this}const m=Math.sqrt(p),v=Math.atan2(m,d),x=Math.sin((1-i)*v)/m,y=Math.sin(i*v)/m;return this._w=h*x+this._w*y,this._x=r*x+this._x*y,this._y=l*x+this._y*y,this._z=u*x+this._z*y,this._onChangeCallback(),this}slerpQuaternions(e,i,r){return this.copy(e).slerp(i,r)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),u=Math.sqrt(r);return this.set(l*Math.sin(e),l*Math.cos(e),u*Math.sin(i),u*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(e=0,i=0,r=0){J.prototype.isVector3=!0,this.x=e,this.y=i,this.z=r}set(e,i,r){return r===void 0&&(r=this.z),this.x=e,this.y=i,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(C0.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(C0.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,r=this.y,l=this.z,u=e.elements;return this.x=u[0]*i+u[3]*r+u[6]*l,this.y=u[1]*i+u[4]*r+u[7]*l,this.z=u[2]*i+u[5]*r+u[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,u=e.elements,h=1/(u[3]*i+u[7]*r+u[11]*l+u[15]);return this.x=(u[0]*i+u[4]*r+u[8]*l+u[12])*h,this.y=(u[1]*i+u[5]*r+u[9]*l+u[13])*h,this.z=(u[2]*i+u[6]*r+u[10]*l+u[14])*h,this}applyQuaternion(e){const i=this.x,r=this.y,l=this.z,u=e.x,h=e.y,d=e.z,p=e.w,m=2*(h*l-d*r),v=2*(d*i-u*l),x=2*(u*r-h*i);return this.x=i+p*m+h*x-d*v,this.y=r+p*v+d*m-u*x,this.z=l+p*x+u*v-h*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,r=this.y,l=this.z,u=e.elements;return this.x=u[0]*i+u[4]*r+u[8]*l,this.y=u[1]*i+u[5]*r+u[9]*l,this.z=u[2]*i+u[6]*r+u[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Se(this.x,e.x,i.x),this.y=Se(this.y,e.y,i.y),this.z=Se(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Se(this.x,e,i),this.y=Se(this.y,e,i),this.z=Se(this.z,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Se(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const r=e.x,l=e.y,u=e.z,h=i.x,d=i.y,p=i.z;return this.x=l*p-u*d,this.y=u*h-r*p,this.z=r*d-l*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const r=e.dot(this)/i;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Kf.copy(this).projectOnVector(e),this.sub(Kf)}reflect(e){return this.sub(Kf.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(Se(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y,l=this.z-e.z;return i*i+r*r+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,r){const l=Math.sin(i)*e;return this.x=l*Math.sin(r),this.y=Math.cos(i)*e,this.z=l*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,r){return this.x=e*Math.sin(i),this.y=r,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(e),this.y=i,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Kf=new J,C0=new zo;class Po{constructor(e=new J(1/0,1/0,1/0),i=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i+=3)this.expandByPoint(vi.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,r=e.count;i<r;i++)this.expandByPoint(vi.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const r=vi.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const u=r.getAttribute("position");if(i===!0&&u!==void 0&&e.isInstancedMesh!==!0)for(let h=0,d=u.count;h<d;h++)e.isMesh===!0?e.getVertexPosition(h,vi):vi.fromBufferAttribute(u,h),vi.applyMatrix4(e.matrixWorld),this.expandByPoint(vi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ql.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Ql.copy(r.boundingBox)),Ql.applyMatrix4(e.matrixWorld),this.union(Ql)}const l=e.children;for(let u=0,h=l.length;u<h;u++)this.expandByObject(l[u],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vi),vi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,r;return e.normal.x>0?(i=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),i<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ro),Jl.subVectors(this.max,Ro),as.subVectors(e.a,Ro),rs.subVectors(e.b,Ro),ss.subVectors(e.c,Ro),La.subVectors(rs,as),Na.subVectors(ss,rs),lr.subVectors(as,ss);let i=[0,-La.z,La.y,0,-Na.z,Na.y,0,-lr.z,lr.y,La.z,0,-La.x,Na.z,0,-Na.x,lr.z,0,-lr.x,-La.y,La.x,0,-Na.y,Na.x,0,-lr.y,lr.x,0];return!Qf(i,as,rs,ss,Jl)||(i=[1,0,0,0,1,0,0,0,1],!Qf(i,as,rs,ss,Jl))?!1:($l.crossVectors(La,Na),i=[$l.x,$l.y,$l.z],Qf(i,as,rs,ss,Jl))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($i),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const $i=[new J,new J,new J,new J,new J,new J,new J,new J],vi=new J,Ql=new Po,as=new J,rs=new J,ss=new J,La=new J,Na=new J,lr=new J,Ro=new J,Jl=new J,$l=new J,cr=new J;function Qf(o,e,i,r,l){for(let u=0,h=o.length-3;u<=h;u+=3){cr.fromArray(o,u);const d=l.x*Math.abs(cr.x)+l.y*Math.abs(cr.y)+l.z*Math.abs(cr.z),p=e.dot(cr),m=i.dot(cr),v=r.dot(cr);if(Math.max(-Math.max(p,m,v),Math.min(p,m,v))>d)return!1}return!0}const AS=new Po,Co=new J,Jf=new J;class Dc{constructor(e=new J,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const r=this.center;i!==void 0?r.copy(i):AS.setFromPoints(e).getCenter(r);let l=0;for(let u=0,h=e.length;u<h;u++)l=Math.max(l,r.distanceToSquared(e[u]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const r=this.center.distanceToSquared(e);return i.copy(e),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Co.subVectors(e,this.center);const i=Co.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(Co,l/r),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Jf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Co.copy(e.center).add(Jf)),this.expandByPoint(Co.copy(e.center).sub(Jf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ta=new J,$f=new J,tc=new J,Oa=new J,td=new J,ec=new J,ed=new J;class X_{constructor(e=new J,i=new J(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ta)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=ta.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(ta.copy(this.origin).addScaledVector(this.direction,i),ta.distanceToSquared(e))}distanceSqToSegment(e,i,r,l){$f.copy(e).add(i).multiplyScalar(.5),tc.copy(i).sub(e).normalize(),Oa.copy(this.origin).sub($f);const u=e.distanceTo(i)*.5,h=-this.direction.dot(tc),d=Oa.dot(this.direction),p=-Oa.dot(tc),m=Oa.lengthSq(),v=Math.abs(1-h*h);let x,y,M,b;if(v>0)if(x=h*p-d,y=h*d-p,b=u*v,x>=0)if(y>=-b)if(y<=b){const C=1/v;x*=C,y*=C,M=x*(x+h*y+2*d)+y*(h*x+y+2*p)+m}else y=u,x=Math.max(0,-(h*y+d)),M=-x*x+y*(y+2*p)+m;else y=-u,x=Math.max(0,-(h*y+d)),M=-x*x+y*(y+2*p)+m;else y<=-b?(x=Math.max(0,-(-h*u+d)),y=x>0?-u:Math.min(Math.max(-u,-p),u),M=-x*x+y*(y+2*p)+m):y<=b?(x=0,y=Math.min(Math.max(-u,-p),u),M=y*(y+2*p)+m):(x=Math.max(0,-(h*u+d)),y=x>0?u:Math.min(Math.max(-u,-p),u),M=-x*x+y*(y+2*p)+m);else y=h>0?-u:u,x=Math.max(0,-(h*y+d)),M=-x*x+y*(y+2*p)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,x),l&&l.copy($f).addScaledVector(tc,y),M}intersectSphere(e,i){ta.subVectors(e.center,this.origin);const r=ta.dot(this.direction),l=ta.dot(ta)-r*r,u=e.radius*e.radius;if(l>u)return null;const h=Math.sqrt(u-l),d=r-h,p=r+h;return p<0?null:d<0?this.at(p,i):this.at(d,i)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/i;return r>=0?r:null}intersectPlane(e,i){const r=this.distanceToPlane(e);return r===null?null:this.at(r,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let r,l,u,h,d,p;const m=1/this.direction.x,v=1/this.direction.y,x=1/this.direction.z,y=this.origin;return m>=0?(r=(e.min.x-y.x)*m,l=(e.max.x-y.x)*m):(r=(e.max.x-y.x)*m,l=(e.min.x-y.x)*m),v>=0?(u=(e.min.y-y.y)*v,h=(e.max.y-y.y)*v):(u=(e.max.y-y.y)*v,h=(e.min.y-y.y)*v),r>h||u>l||((u>r||isNaN(r))&&(r=u),(h<l||isNaN(l))&&(l=h),x>=0?(d=(e.min.z-y.z)*x,p=(e.max.z-y.z)*x):(d=(e.max.z-y.z)*x,p=(e.min.z-y.z)*x),r>p||d>l)||((d>r||r!==r)&&(r=d),(p<l||l!==l)&&(l=p),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(e){return this.intersectBox(e,ta)!==null}intersectTriangle(e,i,r,l,u){td.subVectors(i,e),ec.subVectors(r,e),ed.crossVectors(td,ec);let h=this.direction.dot(ed),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;Oa.subVectors(this.origin,e);const p=d*this.direction.dot(ec.crossVectors(Oa,ec));if(p<0)return null;const m=d*this.direction.dot(td.cross(Oa));if(m<0||p+m>h)return null;const v=-d*Oa.dot(ed);return v<0?null:this.at(v/h,u)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ze{constructor(e,i,r,l,u,h,d,p,m,v,x,y,M,b,C,S){Ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,r,l,u,h,d,p,m,v,x,y,M,b,C,S)}set(e,i,r,l,u,h,d,p,m,v,x,y,M,b,C,S){const g=this.elements;return g[0]=e,g[4]=i,g[8]=r,g[12]=l,g[1]=u,g[5]=h,g[9]=d,g[13]=p,g[2]=m,g[6]=v,g[10]=x,g[14]=y,g[3]=M,g[7]=b,g[11]=C,g[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(e){const i=this.elements,r=e.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,r){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,i,r){return this.set(e.x,i.x,r.x,0,e.y,i.y,r.y,0,e.z,i.z,r.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,r=e.elements,l=1/os.setFromMatrixColumn(e,0).length(),u=1/os.setFromMatrixColumn(e,1).length(),h=1/os.setFromMatrixColumn(e,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*u,i[5]=r[5]*u,i[6]=r[6]*u,i[7]=0,i[8]=r[8]*h,i[9]=r[9]*h,i[10]=r[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,r=e.x,l=e.y,u=e.z,h=Math.cos(r),d=Math.sin(r),p=Math.cos(l),m=Math.sin(l),v=Math.cos(u),x=Math.sin(u);if(e.order==="XYZ"){const y=h*v,M=h*x,b=d*v,C=d*x;i[0]=p*v,i[4]=-p*x,i[8]=m,i[1]=M+b*m,i[5]=y-C*m,i[9]=-d*p,i[2]=C-y*m,i[6]=b+M*m,i[10]=h*p}else if(e.order==="YXZ"){const y=p*v,M=p*x,b=m*v,C=m*x;i[0]=y+C*d,i[4]=b*d-M,i[8]=h*m,i[1]=h*x,i[5]=h*v,i[9]=-d,i[2]=M*d-b,i[6]=C+y*d,i[10]=h*p}else if(e.order==="ZXY"){const y=p*v,M=p*x,b=m*v,C=m*x;i[0]=y-C*d,i[4]=-h*x,i[8]=b+M*d,i[1]=M+b*d,i[5]=h*v,i[9]=C-y*d,i[2]=-h*m,i[6]=d,i[10]=h*p}else if(e.order==="ZYX"){const y=h*v,M=h*x,b=d*v,C=d*x;i[0]=p*v,i[4]=b*m-M,i[8]=y*m+C,i[1]=p*x,i[5]=C*m+y,i[9]=M*m-b,i[2]=-m,i[6]=d*p,i[10]=h*p}else if(e.order==="YZX"){const y=h*p,M=h*m,b=d*p,C=d*m;i[0]=p*v,i[4]=C-y*x,i[8]=b*x+M,i[1]=x,i[5]=h*v,i[9]=-d*v,i[2]=-m*v,i[6]=M*x+b,i[10]=y-C*x}else if(e.order==="XZY"){const y=h*p,M=h*m,b=d*p,C=d*m;i[0]=p*v,i[4]=-x,i[8]=m*v,i[1]=y*x+C,i[5]=h*v,i[9]=M*x-b,i[2]=b*x-M,i[6]=d*v,i[10]=C*x+y}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(RS,e,CS)}lookAt(e,i,r){const l=this.elements;return Qn.subVectors(e,i),Qn.lengthSq()===0&&(Qn.z=1),Qn.normalize(),Fa.crossVectors(r,Qn),Fa.lengthSq()===0&&(Math.abs(r.z)===1?Qn.x+=1e-4:Qn.z+=1e-4,Qn.normalize(),Fa.crossVectors(r,Qn)),Fa.normalize(),nc.crossVectors(Qn,Fa),l[0]=Fa.x,l[4]=nc.x,l[8]=Qn.x,l[1]=Fa.y,l[5]=nc.y,l[9]=Qn.y,l[2]=Fa.z,l[6]=nc.z,l[10]=Qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,u=this.elements,h=r[0],d=r[4],p=r[8],m=r[12],v=r[1],x=r[5],y=r[9],M=r[13],b=r[2],C=r[6],S=r[10],g=r[14],N=r[3],O=r[7],U=r[11],X=r[15],H=l[0],P=l[4],Q=l[8],D=l[12],w=l[1],V=l[5],st=l[9],ot=l[13],pt=l[2],mt=l[6],z=l[10],Z=l[14],q=l[3],xt=l[7],bt=l[11],F=l[15];return u[0]=h*H+d*w+p*pt+m*q,u[4]=h*P+d*V+p*mt+m*xt,u[8]=h*Q+d*st+p*z+m*bt,u[12]=h*D+d*ot+p*Z+m*F,u[1]=v*H+x*w+y*pt+M*q,u[5]=v*P+x*V+y*mt+M*xt,u[9]=v*Q+x*st+y*z+M*bt,u[13]=v*D+x*ot+y*Z+M*F,u[2]=b*H+C*w+S*pt+g*q,u[6]=b*P+C*V+S*mt+g*xt,u[10]=b*Q+C*st+S*z+g*bt,u[14]=b*D+C*ot+S*Z+g*F,u[3]=N*H+O*w+U*pt+X*q,u[7]=N*P+O*V+U*mt+X*xt,u[11]=N*Q+O*st+U*z+X*bt,u[15]=N*D+O*ot+U*Z+X*F,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[4],l=e[8],u=e[12],h=e[1],d=e[5],p=e[9],m=e[13],v=e[2],x=e[6],y=e[10],M=e[14],b=e[3],C=e[7],S=e[11],g=e[15];return b*(+u*p*x-l*m*x-u*d*y+r*m*y+l*d*M-r*p*M)+C*(+i*p*M-i*m*y+u*h*y-l*h*M+l*m*v-u*p*v)+S*(+i*m*x-i*d*M-u*h*x+r*h*M+u*d*v-r*m*v)+g*(-l*d*v-i*p*x+i*d*y+l*h*x-r*h*y+r*p*v)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,r){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=r),this}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],u=e[3],h=e[4],d=e[5],p=e[6],m=e[7],v=e[8],x=e[9],y=e[10],M=e[11],b=e[12],C=e[13],S=e[14],g=e[15],N=x*S*m-C*y*m+C*p*M-d*S*M-x*p*g+d*y*g,O=b*y*m-v*S*m-b*p*M+h*S*M+v*p*g-h*y*g,U=v*C*m-b*x*m+b*d*M-h*C*M-v*d*g+h*x*g,X=b*x*p-v*C*p-b*d*y+h*C*y+v*d*S-h*x*S,H=i*N+r*O+l*U+u*X;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/H;return e[0]=N*P,e[1]=(C*y*u-x*S*u-C*l*M+r*S*M+x*l*g-r*y*g)*P,e[2]=(d*S*u-C*p*u+C*l*m-r*S*m-d*l*g+r*p*g)*P,e[3]=(x*p*u-d*y*u-x*l*m+r*y*m+d*l*M-r*p*M)*P,e[4]=O*P,e[5]=(v*S*u-b*y*u+b*l*M-i*S*M-v*l*g+i*y*g)*P,e[6]=(b*p*u-h*S*u-b*l*m+i*S*m+h*l*g-i*p*g)*P,e[7]=(h*y*u-v*p*u+v*l*m-i*y*m-h*l*M+i*p*M)*P,e[8]=U*P,e[9]=(b*x*u-v*C*u-b*r*M+i*C*M+v*r*g-i*x*g)*P,e[10]=(h*C*u-b*d*u+b*r*m-i*C*m-h*r*g+i*d*g)*P,e[11]=(v*d*u-h*x*u-v*r*m+i*x*m+h*r*M-i*d*M)*P,e[12]=X*P,e[13]=(v*C*l-b*x*l+b*r*y-i*C*y-v*r*S+i*x*S)*P,e[14]=(b*d*l-h*C*l-b*r*p+i*C*p+h*r*S-i*d*S)*P,e[15]=(h*x*l-v*d*l+v*r*p-i*x*p-h*r*y+i*d*y)*P,this}scale(e){const i=this.elements,r=e.x,l=e.y,u=e.z;return i[0]*=r,i[4]*=l,i[8]*=u,i[1]*=r,i[5]*=l,i[9]*=u,i[2]*=r,i[6]*=l,i[10]*=u,i[3]*=r,i[7]*=l,i[11]*=u,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(e,i,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const r=Math.cos(i),l=Math.sin(i),u=1-r,h=e.x,d=e.y,p=e.z,m=u*h,v=u*d;return this.set(m*h+r,m*d-l*p,m*p+l*d,0,m*d+l*p,v*d+r,v*p-l*h,0,m*p-l*d,v*p+l*h,u*p*p+r,0,0,0,0,1),this}makeScale(e,i,r){return this.set(e,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,i,r,l,u,h){return this.set(1,r,u,0,e,1,h,0,i,l,1,0,0,0,0,1),this}compose(e,i,r){const l=this.elements,u=i._x,h=i._y,d=i._z,p=i._w,m=u+u,v=h+h,x=d+d,y=u*m,M=u*v,b=u*x,C=h*v,S=h*x,g=d*x,N=p*m,O=p*v,U=p*x,X=r.x,H=r.y,P=r.z;return l[0]=(1-(C+g))*X,l[1]=(M+U)*X,l[2]=(b-O)*X,l[3]=0,l[4]=(M-U)*H,l[5]=(1-(y+g))*H,l[6]=(S+N)*H,l[7]=0,l[8]=(b+O)*P,l[9]=(S-N)*P,l[10]=(1-(y+C))*P,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,r){const l=this.elements;let u=os.set(l[0],l[1],l[2]).length();const h=os.set(l[4],l[5],l[6]).length(),d=os.set(l[8],l[9],l[10]).length();this.determinant()<0&&(u=-u),e.x=l[12],e.y=l[13],e.z=l[14],xi.copy(this);const m=1/u,v=1/h,x=1/d;return xi.elements[0]*=m,xi.elements[1]*=m,xi.elements[2]*=m,xi.elements[4]*=v,xi.elements[5]*=v,xi.elements[6]*=v,xi.elements[8]*=x,xi.elements[9]*=x,xi.elements[10]*=x,i.setFromRotationMatrix(xi),r.x=u,r.y=h,r.z=d,this}makePerspective(e,i,r,l,u,h,d=sa){const p=this.elements,m=2*u/(i-e),v=2*u/(r-l),x=(i+e)/(i-e),y=(r+l)/(r-l);let M,b;if(d===sa)M=-(h+u)/(h-u),b=-2*h*u/(h-u);else if(d===Rc)M=-h/(h-u),b=-h*u/(h-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=m,p[4]=0,p[8]=x,p[12]=0,p[1]=0,p[5]=v,p[9]=y,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=b,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,r,l,u,h,d=sa){const p=this.elements,m=1/(i-e),v=1/(r-l),x=1/(h-u),y=(i+e)*m,M=(r+l)*v;let b,C;if(d===sa)b=(h+u)*x,C=-2*x;else if(d===Rc)b=u*x,C=-1*x;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-y,p[1]=0,p[5]=2*v,p[9]=0,p[13]=-M,p[2]=0,p[6]=0,p[10]=C,p[14]=-b,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<16;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e[i+9]=r[9],e[i+10]=r[10],e[i+11]=r[11],e[i+12]=r[12],e[i+13]=r[13],e[i+14]=r[14],e[i+15]=r[15],e}}const os=new J,xi=new Ze,RS=new J(0,0,0),CS=new J(1,1,1),Fa=new J,nc=new J,Qn=new J,w0=new Ze,D0=new zo;class Oi{constructor(e=0,i=0,r=0,l=Oi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,r,l=this._order){return this._x=e,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,r=!0){const l=e.elements,u=l[0],h=l[4],d=l[8],p=l[1],m=l[5],v=l[9],x=l[2],y=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(Se(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,M),this._z=Math.atan2(-h,u)):(this._x=Math.atan2(y,m),this._z=0);break;case"YXZ":this._x=Math.asin(-Se(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-x,u),this._z=0);break;case"ZXY":this._x=Math.asin(Se(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-x,M),this._z=Math.atan2(-h,m)):(this._y=0,this._z=Math.atan2(p,u));break;case"ZYX":this._y=Math.asin(-Se(x,-1,1)),Math.abs(x)<.9999999?(this._x=Math.atan2(y,M),this._z=Math.atan2(p,u)):(this._x=0,this._z=Math.atan2(-h,m));break;case"YZX":this._z=Math.asin(Se(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,m),this._y=Math.atan2(-x,u)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-Se(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(y,m),this._y=Math.atan2(d,u)):(this._x=Math.atan2(-v,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,r){return w0.makeRotationFromQuaternion(e),this.setFromRotationMatrix(w0,i,r)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return D0.setFromEuler(this),this.setFromQuaternion(D0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Oi.DEFAULT_ORDER="XYZ";class q_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wS=0;const U0=new J,ls=new zo,ea=new Ze,ic=new J,wo=new J,DS=new J,US=new zo,L0=new J(1,0,0),N0=new J(0,1,0),O0=new J(0,0,1),F0={type:"added"},LS={type:"removed"},cs={type:"childadded",child:null},nd={type:"childremoved",child:null};class Ln extends Cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wS++}),this.uuid=Fo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ln.DEFAULT_UP.clone();const e=new J,i=new Oi,r=new zo,l=new J(1,1,1);function u(){r.setFromEuler(i,!1)}function h(){i.setFromQuaternion(r,void 0,!1)}i._onChange(u),r._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Ze},normalMatrix:{value:new le}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=Ln.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new q_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return ls.setFromAxisAngle(e,i),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,i){return ls.setFromAxisAngle(e,i),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(L0,e)}rotateY(e){return this.rotateOnAxis(N0,e)}rotateZ(e){return this.rotateOnAxis(O0,e)}translateOnAxis(e,i){return U0.copy(e).applyQuaternion(this.quaternion),this.position.add(U0.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(L0,e)}translateY(e){return this.translateOnAxis(N0,e)}translateZ(e){return this.translateOnAxis(O0,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ea.copy(this.matrixWorld).invert())}lookAt(e,i,r){e.isVector3?ic.copy(e):ic.set(e,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),wo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ea.lookAt(wo,ic,this.up):ea.lookAt(ic,wo,this.up),this.quaternion.setFromRotationMatrix(ea),l&&(ea.extractRotation(l.matrixWorld),ls.setFromRotationMatrix(ea),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(F0),cs.child=e,this.dispatchEvent(cs),cs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(LS),nd.child=e,this.dispatchEvent(nd),nd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ea.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ea.multiply(e.parent.matrixWorld)),e.applyMatrix4(ea),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(F0),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const h=this.children[r].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,r=[]){this[e]===i&&r.push(this);const l=this.children;for(let u=0,h=l.length;u<h;u++)l[u].getObjectsByProperty(e,i,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wo,e,DS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wo,US,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(e)}updateWorldMatrix(e,i){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let u=0,h=l.length;u<h;u++)l[u].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",r={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function u(d,p){return d[p.uuid]===void 0&&(d[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=u(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const p=d.shapes;if(Array.isArray(p))for(let m=0,v=p.length;m<v;m++){const x=p[m];u(e.shapes,x)}else u(e.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let p=0,m=this.material.length;p<m;p++)d.push(u(e.materials,this.material[p]));l.material=d}else l.material=u(e.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const p=this.animations[d];l.animations.push(u(e.animations,p))}}if(i){const d=h(e.geometries),p=h(e.materials),m=h(e.textures),v=h(e.images),x=h(e.shapes),y=h(e.skeletons),M=h(e.animations),b=h(e.nodes);d.length>0&&(r.geometries=d),p.length>0&&(r.materials=p),m.length>0&&(r.textures=m),v.length>0&&(r.images=v),x.length>0&&(r.shapes=x),y.length>0&&(r.skeletons=y),M.length>0&&(r.animations=M),b.length>0&&(r.nodes=b)}return r.object=l,r;function h(d){const p=[];for(const m in d){const v=d[m];delete v.metadata,p.push(v)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let r=0;r<e.children.length;r++){const l=e.children[r];this.add(l.clone())}return this}}Ln.DEFAULT_UP=new J(0,1,0);Ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const yi=new J,na=new J,id=new J,ia=new J,us=new J,fs=new J,z0=new J,ad=new J,rd=new J,sd=new J,od=new Ge,ld=new Ge,cd=new Ge;class Si{constructor(e=new J,i=new J,r=new J){this.a=e,this.b=i,this.c=r}static getNormal(e,i,r,l){l.subVectors(r,i),yi.subVectors(e,i),l.cross(yi);const u=l.lengthSq();return u>0?l.multiplyScalar(1/Math.sqrt(u)):l.set(0,0,0)}static getBarycoord(e,i,r,l,u){yi.subVectors(l,i),na.subVectors(r,i),id.subVectors(e,i);const h=yi.dot(yi),d=yi.dot(na),p=yi.dot(id),m=na.dot(na),v=na.dot(id),x=h*m-d*d;if(x===0)return u.set(0,0,0),null;const y=1/x,M=(m*p-d*v)*y,b=(h*v-d*p)*y;return u.set(1-M-b,b,M)}static containsPoint(e,i,r,l){return this.getBarycoord(e,i,r,l,ia)===null?!1:ia.x>=0&&ia.y>=0&&ia.x+ia.y<=1}static getInterpolation(e,i,r,l,u,h,d,p){return this.getBarycoord(e,i,r,l,ia)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(u,ia.x),p.addScaledVector(h,ia.y),p.addScaledVector(d,ia.z),p)}static getInterpolatedAttribute(e,i,r,l,u,h){return od.setScalar(0),ld.setScalar(0),cd.setScalar(0),od.fromBufferAttribute(e,i),ld.fromBufferAttribute(e,r),cd.fromBufferAttribute(e,l),h.setScalar(0),h.addScaledVector(od,u.x),h.addScaledVector(ld,u.y),h.addScaledVector(cd,u.z),h}static isFrontFacing(e,i,r,l){return yi.subVectors(r,i),na.subVectors(e,i),yi.cross(na).dot(l)<0}set(e,i,r){return this.a.copy(e),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(e,i,r,l){return this.a.copy(e[i]),this.b.copy(e[r]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,r,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return yi.subVectors(this.c,this.b),na.subVectors(this.a,this.b),yi.cross(na).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Si.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Si.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,r,l,u){return Si.getInterpolation(e,this.a,this.b,this.c,i,r,l,u)}containsPoint(e){return Si.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Si.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const r=this.a,l=this.b,u=this.c;let h,d;us.subVectors(l,r),fs.subVectors(u,r),ad.subVectors(e,r);const p=us.dot(ad),m=fs.dot(ad);if(p<=0&&m<=0)return i.copy(r);rd.subVectors(e,l);const v=us.dot(rd),x=fs.dot(rd);if(v>=0&&x<=v)return i.copy(l);const y=p*x-v*m;if(y<=0&&p>=0&&v<=0)return h=p/(p-v),i.copy(r).addScaledVector(us,h);sd.subVectors(e,u);const M=us.dot(sd),b=fs.dot(sd);if(b>=0&&M<=b)return i.copy(u);const C=M*m-p*b;if(C<=0&&m>=0&&b<=0)return d=m/(m-b),i.copy(r).addScaledVector(fs,d);const S=v*b-M*x;if(S<=0&&x-v>=0&&M-b>=0)return z0.subVectors(u,l),d=(x-v)/(x-v+(M-b)),i.copy(l).addScaledVector(z0,d);const g=1/(S+C+y);return h=C*g,d=y*g,i.copy(r).addScaledVector(us,h).addScaledVector(fs,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Y_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},za={h:0,s:0,l:0},ac={h:0,s:0,l:0};function ud(o,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(e-o)*6*i:i<1/2?e:i<2/3?o+(e-o)*6*(2/3-i):o}class be{constructor(e,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,r)}set(e,i,r){if(i===void 0&&r===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=ui){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ce.toWorkingColorSpace(this,i),this}setRGB(e,i,r,l=Ce.workingColorSpace){return this.r=e,this.g=i,this.b=r,Ce.toWorkingColorSpace(this,l),this}setHSL(e,i,r,l=Ce.workingColorSpace){if(e=mS(e,1),i=Se(i,0,1),r=Se(r,0,1),i===0)this.r=this.g=this.b=r;else{const u=r<=.5?r*(1+i):r+i-r*i,h=2*r-u;this.r=ud(h,u,e+1/3),this.g=ud(h,u,e),this.b=ud(h,u,e-1/3)}return Ce.toWorkingColorSpace(this,l),this}setStyle(e,i=ui){function r(u){u!==void 0&&parseFloat(u)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let u;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,i);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,i);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const u=l[1],h=u.length;if(h===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(u,16),i);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=ui){const r=Y_[e.toLowerCase()];return r!==void 0?this.setHex(r,i):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oa(e.r),this.g=oa(e.g),this.b=oa(e.b),this}copyLinearToSRGB(e){return this.r=ys(e.r),this.g=ys(e.g),this.b=ys(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ui){return Ce.fromWorkingColorSpace(Rn.copy(this),e),Math.round(Se(Rn.r*255,0,255))*65536+Math.round(Se(Rn.g*255,0,255))*256+Math.round(Se(Rn.b*255,0,255))}getHexString(e=ui){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Ce.workingColorSpace){Ce.fromWorkingColorSpace(Rn.copy(this),i);const r=Rn.r,l=Rn.g,u=Rn.b,h=Math.max(r,l,u),d=Math.min(r,l,u);let p,m;const v=(d+h)/2;if(d===h)p=0,m=0;else{const x=h-d;switch(m=v<=.5?x/(h+d):x/(2-h-d),h){case r:p=(l-u)/x+(l<u?6:0);break;case l:p=(u-r)/x+2;break;case u:p=(r-l)/x+4;break}p/=6}return e.h=p,e.s=m,e.l=v,e}getRGB(e,i=Ce.workingColorSpace){return Ce.fromWorkingColorSpace(Rn.copy(this),i),e.r=Rn.r,e.g=Rn.g,e.b=Rn.b,e}getStyle(e=ui){Ce.fromWorkingColorSpace(Rn.copy(this),e);const i=Rn.r,r=Rn.g,l=Rn.b;return e!==ui?`color(${e} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(e,i,r){return this.getHSL(za),this.setHSL(za.h+e,za.s+i,za.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,r){return this.r=e.r+(i.r-e.r)*r,this.g=e.g+(i.g-e.g)*r,this.b=e.b+(i.b-e.b)*r,this}lerpHSL(e,i){this.getHSL(za),e.getHSL(ac);const r=qf(za.h,ac.h,i),l=qf(za.s,ac.s,i),u=qf(za.l,ac.l,i);return this.setHSL(r,l,u),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,r=this.g,l=this.b,u=e.elements;return this.r=u[0]*i+u[3]*r+u[6]*l,this.g=u[1]*i+u[4]*r+u[7]*l,this.b=u[2]*i+u[5]*r+u[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rn=new be;be.NAMES=Y_;let NS=0;class ws extends Cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:NS++}),this.uuid=Fo(),this.name="",this.type="Material",this.blending=vs,this.side=Ga,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Rd,this.blendDst=Cd,this.blendEquation=_r,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new be(0,0,0),this.blendAlpha=0,this.depthFunc=Ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=M0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ns,this.stencilZFail=ns,this.stencilZPass=ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const r=e[i];if(r===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==vs&&(r.blending=this.blending),this.side!==Ga&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Rd&&(r.blendSrc=this.blendSrc),this.blendDst!==Cd&&(r.blendDst=this.blendDst),this.blendEquation!==_r&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Ss&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==M0&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ns&&(r.stencilFail=this.stencilFail),this.stencilZFail!==ns&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==ns&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(u){const h=[];for(const d in u){const p=u[d];delete p.metadata,h.push(p)}return h}if(i){const u=l(e.textures),h=l(e.images);u.length>0&&(r.textures=u),h.length>0&&(r.images=h)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let u=0;u!==l;++u)r[u]=i[u].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Z_ extends ws{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Oi,this.combine=w_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const on=new J,rc=new De;class bi{constructor(e,i,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=r,this.usage=E0,this.updateRanges=[],this.gpuType=ra,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,r){e*=this.itemSize,r*=i.itemSize;for(let l=0,u=this.itemSize;l<u;l++)this.array[e+l]=i.array[r+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)rc.fromBufferAttribute(this,i),rc.applyMatrix3(e),this.setXY(i,rc.x,rc.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)on.fromBufferAttribute(this,i),on.applyMatrix3(e),this.setXYZ(i,on.x,on.y,on.z);return this}applyMatrix4(e){for(let i=0,r=this.count;i<r;i++)on.fromBufferAttribute(this,i),on.applyMatrix4(e),this.setXYZ(i,on.x,on.y,on.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)on.fromBufferAttribute(this,i),on.applyNormalMatrix(e),this.setXYZ(i,on.x,on.y,on.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)on.fromBufferAttribute(this,i),on.transformDirection(e),this.setXYZ(i,on.x,on.y,on.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let r=this.array[e*this.itemSize+i];return this.normalized&&(r=Ao(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=Gn(r,this.array)),this.array[e*this.itemSize+i]=r,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=Ao(i,this.array)),i}setX(e,i){return this.normalized&&(i=Gn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=Ao(i,this.array)),i}setY(e,i){return this.normalized&&(i=Gn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=Ao(i,this.array)),i}setZ(e,i){return this.normalized&&(i=Gn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=Ao(i,this.array)),i}setW(e,i){return this.normalized&&(i=Gn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,r){return e*=this.itemSize,this.normalized&&(i=Gn(i,this.array),r=Gn(r,this.array)),this.array[e+0]=i,this.array[e+1]=r,this}setXYZ(e,i,r,l){return e*=this.itemSize,this.normalized&&(i=Gn(i,this.array),r=Gn(r,this.array),l=Gn(l,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this}setXYZW(e,i,r,l,u){return e*=this.itemSize,this.normalized&&(i=Gn(i,this.array),r=Gn(r,this.array),l=Gn(l,this.array),u=Gn(u,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this.array[e+3]=u,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==E0&&(e.usage=this.usage),e}}class K_ extends bi{constructor(e,i,r){super(new Uint16Array(e),i,r)}}class Q_ extends bi{constructor(e,i,r){super(new Uint32Array(e),i,r)}}class ti extends bi{constructor(e,i,r){super(new Float32Array(e),i,r)}}let OS=0;const ci=new Ze,fd=new Ln,ds=new J,Jn=new Po,Do=new Po,mn=new J;class Ti extends Cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:OS++}),this.uuid=Fo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(k_(e)?Q_:K_)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,r=0){this.groups.push({start:e,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const u=new le().getNormalMatrix(e);r.applyNormalMatrix(u),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ci.makeRotationFromQuaternion(e),this.applyMatrix4(ci),this}rotateX(e){return ci.makeRotationX(e),this.applyMatrix4(ci),this}rotateY(e){return ci.makeRotationY(e),this.applyMatrix4(ci),this}rotateZ(e){return ci.makeRotationZ(e),this.applyMatrix4(ci),this}translate(e,i,r){return ci.makeTranslation(e,i,r),this.applyMatrix4(ci),this}scale(e,i,r){return ci.makeScale(e,i,r),this.applyMatrix4(ci),this}lookAt(e){return fd.lookAt(e),fd.updateMatrix(),this.applyMatrix4(fd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ds).negate(),this.translate(ds.x,ds.y,ds.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];r.push(h.x,h.y,h.z||0)}this.setAttribute("position",new ti(r,3))}else{const r=Math.min(e.length,i.count);for(let l=0;l<r;l++){const u=e[l];i.setXYZ(l,u.x,u.y,u.z||0)}e.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Po);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let r=0,l=i.length;r<l;r++){const u=i[r];Jn.setFromBufferAttribute(u),this.morphTargetsRelative?(mn.addVectors(this.boundingBox.min,Jn.min),this.boundingBox.expandByPoint(mn),mn.addVectors(this.boundingBox.max,Jn.max),this.boundingBox.expandByPoint(mn)):(this.boundingBox.expandByPoint(Jn.min),this.boundingBox.expandByPoint(Jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Dc);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){const r=this.boundingSphere.center;if(Jn.setFromBufferAttribute(e),i)for(let u=0,h=i.length;u<h;u++){const d=i[u];Do.setFromBufferAttribute(d),this.morphTargetsRelative?(mn.addVectors(Jn.min,Do.min),Jn.expandByPoint(mn),mn.addVectors(Jn.max,Do.max),Jn.expandByPoint(mn)):(Jn.expandByPoint(Do.min),Jn.expandByPoint(Do.max))}Jn.getCenter(r);let l=0;for(let u=0,h=e.count;u<h;u++)mn.fromBufferAttribute(e,u),l=Math.max(l,r.distanceToSquared(mn));if(i)for(let u=0,h=i.length;u<h;u++){const d=i[u],p=this.morphTargetsRelative;for(let m=0,v=d.count;m<v;m++)mn.fromBufferAttribute(d,m),p&&(ds.fromBufferAttribute(e,m),mn.add(ds)),l=Math.max(l,r.distanceToSquared(mn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,u=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bi(new Float32Array(4*r.count),4));const h=this.getAttribute("tangent"),d=[],p=[];for(let Q=0;Q<r.count;Q++)d[Q]=new J,p[Q]=new J;const m=new J,v=new J,x=new J,y=new De,M=new De,b=new De,C=new J,S=new J;function g(Q,D,w){m.fromBufferAttribute(r,Q),v.fromBufferAttribute(r,D),x.fromBufferAttribute(r,w),y.fromBufferAttribute(u,Q),M.fromBufferAttribute(u,D),b.fromBufferAttribute(u,w),v.sub(m),x.sub(m),M.sub(y),b.sub(y);const V=1/(M.x*b.y-b.x*M.y);isFinite(V)&&(C.copy(v).multiplyScalar(b.y).addScaledVector(x,-M.y).multiplyScalar(V),S.copy(x).multiplyScalar(M.x).addScaledVector(v,-b.x).multiplyScalar(V),d[Q].add(C),d[D].add(C),d[w].add(C),p[Q].add(S),p[D].add(S),p[w].add(S))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let Q=0,D=N.length;Q<D;++Q){const w=N[Q],V=w.start,st=w.count;for(let ot=V,pt=V+st;ot<pt;ot+=3)g(e.getX(ot+0),e.getX(ot+1),e.getX(ot+2))}const O=new J,U=new J,X=new J,H=new J;function P(Q){X.fromBufferAttribute(l,Q),H.copy(X);const D=d[Q];O.copy(D),O.sub(X.multiplyScalar(X.dot(D))).normalize(),U.crossVectors(H,D);const V=U.dot(p[Q])<0?-1:1;h.setXYZW(Q,O.x,O.y,O.z,V)}for(let Q=0,D=N.length;Q<D;++Q){const w=N[Q],V=w.start,st=w.count;for(let ot=V,pt=V+st;ot<pt;ot+=3)P(e.getX(ot+0)),P(e.getX(ot+1)),P(e.getX(ot+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new bi(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let y=0,M=r.count;y<M;y++)r.setXYZ(y,0,0,0);const l=new J,u=new J,h=new J,d=new J,p=new J,m=new J,v=new J,x=new J;if(e)for(let y=0,M=e.count;y<M;y+=3){const b=e.getX(y+0),C=e.getX(y+1),S=e.getX(y+2);l.fromBufferAttribute(i,b),u.fromBufferAttribute(i,C),h.fromBufferAttribute(i,S),v.subVectors(h,u),x.subVectors(l,u),v.cross(x),d.fromBufferAttribute(r,b),p.fromBufferAttribute(r,C),m.fromBufferAttribute(r,S),d.add(v),p.add(v),m.add(v),r.setXYZ(b,d.x,d.y,d.z),r.setXYZ(C,p.x,p.y,p.z),r.setXYZ(S,m.x,m.y,m.z)}else for(let y=0,M=i.count;y<M;y+=3)l.fromBufferAttribute(i,y+0),u.fromBufferAttribute(i,y+1),h.fromBufferAttribute(i,y+2),v.subVectors(h,u),x.subVectors(l,u),v.cross(x),r.setXYZ(y+0,v.x,v.y,v.z),r.setXYZ(y+1,v.x,v.y,v.z),r.setXYZ(y+2,v.x,v.y,v.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,r=e.count;i<r;i++)mn.fromBufferAttribute(e,i),mn.normalize(),e.setXYZ(i,mn.x,mn.y,mn.z)}toNonIndexed(){function e(d,p){const m=d.array,v=d.itemSize,x=d.normalized,y=new m.constructor(p.length*v);let M=0,b=0;for(let C=0,S=p.length;C<S;C++){d.isInterleavedBufferAttribute?M=p[C]*d.data.stride+d.offset:M=p[C]*v;for(let g=0;g<v;g++)y[b++]=m[M++]}return new bi(y,v,x)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Ti,r=this.index.array,l=this.attributes;for(const d in l){const p=l[d],m=e(p,r);i.setAttribute(d,m)}const u=this.morphAttributes;for(const d in u){const p=[],m=u[d];for(let v=0,x=m.length;v<x;v++){const y=m[v],M=e(y,r);p.push(M)}i.morphAttributes[d]=p}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,p=h.length;d<p;d++){const m=h[d];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(e[m]=p[m]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const p in r){const m=r[p];e.data.attributes[p]=m.toJSON(e.data)}const l={};let u=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],v=[];for(let x=0,y=m.length;x<y;x++){const M=m[x];v.push(M.toJSON(e.data))}v.length>0&&(l[p]=v,u=!0)}u&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(i));const l=e.attributes;for(const m in l){const v=l[m];this.setAttribute(m,v.clone(i))}const u=e.morphAttributes;for(const m in u){const v=[],x=u[m];for(let y=0,M=x.length;y<M;y++)v.push(x[y].clone(i));this.morphAttributes[m]=v}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let m=0,v=h.length;m<v;m++){const x=h[m];this.addGroup(x.start,x.count,x.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const P0=new Ze,ur=new X_,sc=new Dc,B0=new J,oc=new J,lc=new J,cc=new J,dd=new J,uc=new J,I0=new J,fc=new J;class fi extends Ln{constructor(e=new Ti,i=new Z_){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,h=l.length;u<h;u++){const d=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=u}}}}getVertexPosition(e,i){const r=this.geometry,l=r.attributes.position,u=r.morphAttributes.position,h=r.morphTargetsRelative;i.fromBufferAttribute(l,e);const d=this.morphTargetInfluences;if(u&&d){uc.set(0,0,0);for(let p=0,m=u.length;p<m;p++){const v=d[p],x=u[p];v!==0&&(dd.fromBufferAttribute(x,e),h?uc.addScaledVector(dd,v):uc.addScaledVector(dd.sub(i),v))}i.add(uc)}return i}raycast(e,i){const r=this.geometry,l=this.material,u=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),sc.copy(r.boundingSphere),sc.applyMatrix4(u),ur.copy(e.ray).recast(e.near),!(sc.containsPoint(ur.origin)===!1&&(ur.intersectSphere(sc,B0)===null||ur.origin.distanceToSquared(B0)>(e.far-e.near)**2))&&(P0.copy(u).invert(),ur.copy(e.ray).applyMatrix4(P0),!(r.boundingBox!==null&&ur.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,i,ur)))}_computeIntersections(e,i,r){let l;const u=this.geometry,h=this.material,d=u.index,p=u.attributes.position,m=u.attributes.uv,v=u.attributes.uv1,x=u.attributes.normal,y=u.groups,M=u.drawRange;if(d!==null)if(Array.isArray(h))for(let b=0,C=y.length;b<C;b++){const S=y[b],g=h[S.materialIndex],N=Math.max(S.start,M.start),O=Math.min(d.count,Math.min(S.start+S.count,M.start+M.count));for(let U=N,X=O;U<X;U+=3){const H=d.getX(U),P=d.getX(U+1),Q=d.getX(U+2);l=dc(this,g,e,r,m,v,x,H,P,Q),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const b=Math.max(0,M.start),C=Math.min(d.count,M.start+M.count);for(let S=b,g=C;S<g;S+=3){const N=d.getX(S),O=d.getX(S+1),U=d.getX(S+2);l=dc(this,h,e,r,m,v,x,N,O,U),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}else if(p!==void 0)if(Array.isArray(h))for(let b=0,C=y.length;b<C;b++){const S=y[b],g=h[S.materialIndex],N=Math.max(S.start,M.start),O=Math.min(p.count,Math.min(S.start+S.count,M.start+M.count));for(let U=N,X=O;U<X;U+=3){const H=U,P=U+1,Q=U+2;l=dc(this,g,e,r,m,v,x,H,P,Q),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const b=Math.max(0,M.start),C=Math.min(p.count,M.start+M.count);for(let S=b,g=C;S<g;S+=3){const N=S,O=S+1,U=S+2;l=dc(this,h,e,r,m,v,x,N,O,U),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}}}function FS(o,e,i,r,l,u,h,d){let p;if(e.side===Vn?p=r.intersectTriangle(h,u,l,!0,d):p=r.intersectTriangle(l,u,h,e.side===Ga,d),p===null)return null;fc.copy(d),fc.applyMatrix4(o.matrixWorld);const m=i.ray.origin.distanceTo(fc);return m<i.near||m>i.far?null:{distance:m,point:fc.clone(),object:o}}function dc(o,e,i,r,l,u,h,d,p,m){o.getVertexPosition(d,oc),o.getVertexPosition(p,lc),o.getVertexPosition(m,cc);const v=FS(o,e,i,r,oc,lc,cc,I0);if(v){const x=new J;Si.getBarycoord(I0,oc,lc,cc,x),l&&(v.uv=Si.getInterpolatedAttribute(l,d,p,m,x,new De)),u&&(v.uv1=Si.getInterpolatedAttribute(u,d,p,m,x,new De)),h&&(v.normal=Si.getInterpolatedAttribute(h,d,p,m,x,new J),v.normal.dot(r.direction)>0&&v.normal.multiplyScalar(-1));const y={a:d,b:p,c:m,normal:new J,materialIndex:0};Si.getNormal(oc,lc,cc,y.normal),v.face=y,v.barycoord=x}return v}class Bo extends Ti{constructor(e=1,i=1,r=1,l=1,u=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:r,widthSegments:l,heightSegments:u,depthSegments:h};const d=this;l=Math.floor(l),u=Math.floor(u),h=Math.floor(h);const p=[],m=[],v=[],x=[];let y=0,M=0;b("z","y","x",-1,-1,r,i,e,h,u,0),b("z","y","x",1,-1,r,i,-e,h,u,1),b("x","z","y",1,1,e,r,i,l,h,2),b("x","z","y",1,-1,e,r,-i,l,h,3),b("x","y","z",1,-1,e,i,r,l,u,4),b("x","y","z",-1,-1,e,i,-r,l,u,5),this.setIndex(p),this.setAttribute("position",new ti(m,3)),this.setAttribute("normal",new ti(v,3)),this.setAttribute("uv",new ti(x,2));function b(C,S,g,N,O,U,X,H,P,Q,D){const w=U/P,V=X/Q,st=U/2,ot=X/2,pt=H/2,mt=P+1,z=Q+1;let Z=0,q=0;const xt=new J;for(let bt=0;bt<z;bt++){const F=bt*V-ot;for(let at=0;at<mt;at++){const St=at*w-st;xt[C]=St*N,xt[S]=F*O,xt[g]=pt,m.push(xt.x,xt.y,xt.z),xt[C]=0,xt[S]=0,xt[g]=H>0?1:-1,v.push(xt.x,xt.y,xt.z),x.push(at/P),x.push(1-bt/Q),Z+=1}}for(let bt=0;bt<Q;bt++)for(let F=0;F<P;F++){const at=y+F+mt*bt,St=y+F+mt*(bt+1),K=y+(F+1)+mt*(bt+1),ft=y+(F+1)+mt*bt;p.push(at,St,ft),p.push(St,K,ft),q+=6}d.addGroup(M,q,D),M+=q,y+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Rs(o){const e={};for(const i in o){e[i]={};for(const r in o[i]){const l=o[i][r];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][r]=null):e[i][r]=l.clone():Array.isArray(l)?e[i][r]=l.slice():e[i][r]=l}}return e}function Un(o){const e={};for(let i=0;i<o.length;i++){const r=Rs(o[i]);for(const l in r)e[l]=r[l]}return e}function zS(o){const e=[];for(let i=0;i<o.length;i++)e.push(o[i].clone());return e}function J_(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ce.workingColorSpace}const PS={clone:Rs,merge:Un};var BS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,IS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Va extends ws{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=BS,this.fragmentShader=IS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Rs(e.uniforms),this.uniformsGroups=zS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}}class $_ extends Ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=sa}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pa=new J,H0=new De,G0=new De;class $n extends $_{constructor(e=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=dh*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Xf*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return dh*2*Math.atan(Math.tan(Xf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,r){Pa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Pa.x,Pa.y).multiplyScalar(-e/Pa.z),Pa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Pa.x,Pa.y).multiplyScalar(-e/Pa.z)}getViewSize(e,i){return this.getViewBounds(e,H0,G0),i.subVectors(G0,H0)}setViewOffset(e,i,r,l,u,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=u,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Xf*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,u=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const p=h.fullWidth,m=h.fullHeight;u+=h.offsetX*l/p,i-=h.offsetY*r/m,l*=h.width/p,r*=h.height/m}const d=this.filmOffset;d!==0&&(u+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+l,i,i-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const hs=-90,ps=1;class HS extends Ln{constructor(e,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new $n(hs,ps,e,i);l.layers=this.layers,this.add(l);const u=new $n(hs,ps,e,i);u.layers=this.layers,this.add(u);const h=new $n(hs,ps,e,i);h.layers=this.layers,this.add(h);const d=new $n(hs,ps,e,i);d.layers=this.layers,this.add(d);const p=new $n(hs,ps,e,i);p.layers=this.layers,this.add(p);const m=new $n(hs,ps,e,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[r,l,u,h,d,p]=i;for(const m of i)this.remove(m);if(e===sa)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===Rc)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of i)this.add(m),m.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[u,h,d,p,m,v]=this.children,x=e.getRenderTarget(),y=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;const C=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,l),e.render(i,u),e.setRenderTarget(r,1,l),e.render(i,h),e.setRenderTarget(r,2,l),e.render(i,d),e.setRenderTarget(r,3,l),e.render(i,p),e.setRenderTarget(r,4,l),e.render(i,m),r.texture.generateMipmaps=C,e.setRenderTarget(r,5,l),e.render(i,v),e.setRenderTarget(x,y,M),e.xr.enabled=b,r.texture.needsPMREMUpdate=!0}}class tv extends kn{constructor(e,i,r,l,u,h,d,p,m,v){e=e!==void 0?e:[],i=i!==void 0?i:Ms,super(e,i,r,l,u,h,d,p,m,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class GS extends Mr{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},l=[r,r,r,r,r,r];this.texture=new tv(l,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Ni}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new Bo(5,5,5),u=new Va({name:"CubemapFromEquirect",uniforms:Rs(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Vn,blending:Ia});u.uniforms.tEquirect.value=i;const h=new fi(l,u),d=i.minFilter;return i.minFilter===yr&&(i.minFilter=Ni),new HS(1,10,this).update(e,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(e,i,r,l){const u=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,r,l);e.setRenderTarget(u)}}class Eh{constructor(e,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new be(e),this.density=i}clone(){return new Eh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class VS extends Ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Oi,this.environmentIntensity=1,this.environmentRotation=new Oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const hd=new J,kS=new J,jS=new le;class mr{constructor(e=new J(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,r,l){return this.normal.set(e,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,r){const l=hd.subVectors(r,i).cross(kS.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const r=e.delta(hd),l=this.normal.dot(r);if(l===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const u=-(e.start.dot(this.normal)+this.constant)/l;return u<0||u>1?null:i.copy(e.start).addScaledVector(r,u)}intersectsLine(e){const i=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return i<0&&r>0||r<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const r=i||jS.getNormalMatrix(e),l=this.coplanarPoint(hd).applyMatrix4(e),u=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(u),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fr=new Dc,hc=new J;class bh{constructor(e=new mr,i=new mr,r=new mr,l=new mr,u=new mr,h=new mr){this.planes=[e,i,r,l,u,h]}set(e,i,r,l,u,h){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(r),d[3].copy(l),d[4].copy(u),d[5].copy(h),this}copy(e){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,i=sa){const r=this.planes,l=e.elements,u=l[0],h=l[1],d=l[2],p=l[3],m=l[4],v=l[5],x=l[6],y=l[7],M=l[8],b=l[9],C=l[10],S=l[11],g=l[12],N=l[13],O=l[14],U=l[15];if(r[0].setComponents(p-u,y-m,S-M,U-g).normalize(),r[1].setComponents(p+u,y+m,S+M,U+g).normalize(),r[2].setComponents(p+h,y+v,S+b,U+N).normalize(),r[3].setComponents(p-h,y-v,S-b,U-N).normalize(),r[4].setComponents(p-d,y-x,S-C,U-O).normalize(),i===sa)r[5].setComponents(p+d,y+x,S+C,U+O).normalize();else if(i===Rc)r[5].setComponents(d,x,C,O).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),fr.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fr)}intersectsSprite(e){return fr.center.set(0,0,0),fr.radius=.7071067811865476,fr.applyMatrix4(e.matrixWorld),this.intersectsSphere(fr)}intersectsSphere(e){const i=this.planes,r=e.center,l=-e.radius;for(let u=0;u<6;u++)if(i[u].distanceToPoint(r)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(hc.x=l.normal.x>0?e.max.x:e.min.x,hc.y=l.normal.y>0?e.max.y:e.min.y,hc.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(hc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ev extends ws{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const V0=new Ze,hh=new X_,pc=new Dc,mc=new J;class WS extends Ln{constructor(e=new Ti,i=new ev){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=i,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,i){const r=this.geometry,l=this.matrixWorld,u=e.params.Points.threshold,h=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),pc.copy(r.boundingSphere),pc.applyMatrix4(l),pc.radius+=u,e.ray.intersectsSphere(pc)===!1)return;V0.copy(l).invert(),hh.copy(e.ray).applyMatrix4(V0);const d=u/((this.scale.x+this.scale.y+this.scale.z)/3),p=d*d,m=r.index,x=r.attributes.position;if(m!==null){const y=Math.max(0,h.start),M=Math.min(m.count,h.start+h.count);for(let b=y,C=M;b<C;b++){const S=m.getX(b);mc.fromBufferAttribute(x,S),k0(mc,S,p,l,e,i,this)}}else{const y=Math.max(0,h.start),M=Math.min(x.count,h.start+h.count);for(let b=y,C=M;b<C;b++)mc.fromBufferAttribute(x,b),k0(mc,b,p,l,e,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,h=l.length;u<h;u++){const d=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=u}}}}}function k0(o,e,i,r,l,u,h){const d=hh.distanceSqToPoint(o);if(d<i){const p=new J;hh.closestPointToPoint(o,p),p.applyMatrix4(r);const m=l.ray.origin.distanceTo(p);if(m<l.near||m>l.far)return;u.push({distance:m,distanceToRay:Math.sqrt(d),point:p,index:e,face:null,faceIndex:null,barycoord:null,object:h})}}class gc extends Ln{constructor(){super(),this.isGroup=!0,this.type="Group"}}class nv extends kn{constructor(e,i,r,l,u,h,d,p,m,v=xs){if(v!==xs&&v!==Ts)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&v===xs&&(r=Sr),r===void 0&&v===Ts&&(r=bs),super(null,l,u,h,d,p,v,r,m),this.isDepthTexture=!0,this.image={width:e,height:i},this.magFilter=d!==void 0?d:Ei,this.minFilter=p!==void 0?p:Ei,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Io extends Ti{constructor(e=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:r,heightSegments:l};const u=e/2,h=i/2,d=Math.floor(r),p=Math.floor(l),m=d+1,v=p+1,x=e/d,y=i/p,M=[],b=[],C=[],S=[];for(let g=0;g<v;g++){const N=g*y-h;for(let O=0;O<m;O++){const U=O*x-u;b.push(U,-N,0),C.push(0,0,1),S.push(O/d),S.push(1-g/p)}}for(let g=0;g<p;g++)for(let N=0;N<d;N++){const O=N+m*g,U=N+m*(g+1),X=N+1+m*(g+1),H=N+1+m*g;M.push(O,U,H),M.push(U,X,H)}this.setIndex(M),this.setAttribute("position",new ti(b,3)),this.setAttribute("normal",new ti(C,3)),this.setAttribute("uv",new ti(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Io(e.width,e.height,e.widthSegments,e.heightSegments)}}class Th extends Ti{constructor(e=1,i=32,r=16,l=0,u=Math.PI*2,h=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:r,phiStart:l,phiLength:u,thetaStart:h,thetaLength:d},i=Math.max(3,Math.floor(i)),r=Math.max(2,Math.floor(r));const p=Math.min(h+d,Math.PI);let m=0;const v=[],x=new J,y=new J,M=[],b=[],C=[],S=[];for(let g=0;g<=r;g++){const N=[],O=g/r;let U=0;g===0&&h===0?U=.5/i:g===r&&p===Math.PI&&(U=-.5/i);for(let X=0;X<=i;X++){const H=X/i;x.x=-e*Math.cos(l+H*u)*Math.sin(h+O*d),x.y=e*Math.cos(h+O*d),x.z=e*Math.sin(l+H*u)*Math.sin(h+O*d),b.push(x.x,x.y,x.z),y.copy(x).normalize(),C.push(y.x,y.y,y.z),S.push(H+U,1-O),N.push(m++)}v.push(N)}for(let g=0;g<r;g++)for(let N=0;N<i;N++){const O=v[g][N+1],U=v[g][N],X=v[g+1][N],H=v[g+1][N+1];(g!==0||h>0)&&M.push(O,U,H),(g!==r-1||p<Math.PI)&&M.push(U,X,H)}this.setIndex(M),this.setAttribute("position",new ti(b,3)),this.setAttribute("normal",new ti(C,3)),this.setAttribute("uv",new ti(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Th(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ah extends Ti{constructor(e=1,i=.4,r=12,l=48,u=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:i,radialSegments:r,tubularSegments:l,arc:u},r=Math.floor(r),l=Math.floor(l);const h=[],d=[],p=[],m=[],v=new J,x=new J,y=new J;for(let M=0;M<=r;M++)for(let b=0;b<=l;b++){const C=b/l*u,S=M/r*Math.PI*2;x.x=(e+i*Math.cos(S))*Math.cos(C),x.y=(e+i*Math.cos(S))*Math.sin(C),x.z=i*Math.sin(S),d.push(x.x,x.y,x.z),v.x=e*Math.cos(C),v.y=e*Math.sin(C),y.subVectors(x,v).normalize(),p.push(y.x,y.y,y.z),m.push(b/l),m.push(M/r)}for(let M=1;M<=r;M++)for(let b=1;b<=l;b++){const C=(l+1)*M+b-1,S=(l+1)*(M-1)+b-1,g=(l+1)*(M-1)+b,N=(l+1)*M+b;h.push(C,S,N),h.push(S,g,N)}this.setIndex(h),this.setAttribute("position",new ti(d,3)),this.setAttribute("normal",new ti(p,3)),this.setAttribute("uv",new ti(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ah(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class pd extends ws{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=G_,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Oi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class XS extends ws{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qS extends ws{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class iv extends Ln{constructor(e,i=1){super(),this.isLight=!0,this.type="Light",this.color=new be(e),this.intensity=i}dispose(){}copy(e,i){return super.copy(e,i),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const i=super.toJSON(e);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}const md=new Ze,j0=new J,W0=new J;class YS{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new De(512,512),this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bh,this._frameExtents=new De(1,1),this._viewportCount=1,this._viewports=[new Ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const i=this.camera,r=this.matrix;j0.setFromMatrixPosition(e.matrixWorld),i.position.copy(j0),W0.setFromMatrixPosition(e.target.matrixWorld),i.lookAt(W0),i.updateMatrixWorld(),md.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(md),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(md)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const X0=new Ze,Uo=new J,gd=new J;class ZS extends YS{constructor(){super(new $n(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new De(4,2),this._viewportCount=6,this._viewports=[new Ge(2,1,1,1),new Ge(0,1,1,1),new Ge(3,1,1,1),new Ge(1,1,1,1),new Ge(3,0,1,1),new Ge(1,0,1,1)],this._cubeDirections=[new J(1,0,0),new J(-1,0,0),new J(0,0,1),new J(0,0,-1),new J(0,1,0),new J(0,-1,0)],this._cubeUps=[new J(0,1,0),new J(0,1,0),new J(0,1,0),new J(0,1,0),new J(0,0,1),new J(0,0,-1)]}updateMatrices(e,i=0){const r=this.camera,l=this.matrix,u=e.distance||r.far;u!==r.far&&(r.far=u,r.updateProjectionMatrix()),Uo.setFromMatrixPosition(e.matrixWorld),r.position.copy(Uo),gd.copy(r.position),gd.add(this._cubeDirections[i]),r.up.copy(this._cubeUps[i]),r.lookAt(gd),r.updateMatrixWorld(),l.makeTranslation(-Uo.x,-Uo.y,-Uo.z),X0.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),this._frustum.setFromProjectionMatrix(X0)}}class q0 extends iv{constructor(e,i,r=0,l=2){super(e,i),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=l,this.shadow=new ZS}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,i){return super.copy(e,i),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class KS extends $_{constructor(e=-1,i=1,r=1,l=-1,u=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=r,this.bottom=l,this.near=u,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,r,l,u,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=u,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let u=r-e,h=r+e,d=l+i,p=l-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=m*this.view.offsetX,h=u+m*this.view.width,d-=v*this.view.offsetY,p=d-v*this.view.height}this.projectionMatrix.makeOrthographic(u,h,d,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class QS extends iv{constructor(e,i){super(e,i),this.isAmbientLight=!0,this.type="AmbientLight"}}class JS extends $n{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class $S{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Y0(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const i=Y0();e=(i-this.oldTime)/1e3,this.oldTime=i,this.elapsedTime+=e}return e}}function Y0(){return performance.now()}function Z0(o,e,i,r){const l=tM(r);switch(i){case O_:return o*e;case z_:return o*e;case P_:return o*e*2;case B_:return o*e/l.components*l.byteLength;case yh:return o*e/l.components*l.byteLength;case I_:return o*e*2/l.components*l.byteLength;case Sh:return o*e*2/l.components*l.byteLength;case F_:return o*e*3/l.components*l.byteLength;case Mi:return o*e*4/l.components*l.byteLength;case Mh:return o*e*4/l.components*l.byteLength;case yc:case Sc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case Mc:case Ec:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case Gd:case kd:return Math.max(o,16)*Math.max(e,8)/4;case Hd:case Vd:return Math.max(o,8)*Math.max(e,8)/2;case jd:case Wd:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case Xd:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case qd:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case Yd:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case Zd:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case Kd:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case Qd:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case Jd:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case $d:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case th:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case eh:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case nh:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case ih:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case ah:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case rh:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case sh:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case bc:case oh:case lh:return Math.ceil(o/4)*Math.ceil(e/4)*16;case H_:case ch:return Math.ceil(o/4)*Math.ceil(e/4)*8;case uh:case fh:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function tM(o){switch(o){case la:case U_:return{byteLength:1,components:1};case No:case L_:case Oo:return{byteLength:2,components:1};case vh:case xh:return{byteLength:2,components:4};case Sr:case _h:case ra:return{byteLength:4,components:1};case N_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gh);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function av(){let o=null,e=!1,i=null,r=null;function l(u,h){i(u,h),r=o.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&(r=o.requestAnimationFrame(l),e=!0)},stop:function(){o.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(u){i=u},setContext:function(u){o=u}}}function eM(o){const e=new WeakMap;function i(d,p){const m=d.array,v=d.usage,x=m.byteLength,y=o.createBuffer();o.bindBuffer(p,y),o.bufferData(p,m,v),d.onUploadCallback();let M;if(m instanceof Float32Array)M=o.FLOAT;else if(m instanceof Uint16Array)d.isFloat16BufferAttribute?M=o.HALF_FLOAT:M=o.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=o.SHORT;else if(m instanceof Uint32Array)M=o.UNSIGNED_INT;else if(m instanceof Int32Array)M=o.INT;else if(m instanceof Int8Array)M=o.BYTE;else if(m instanceof Uint8Array)M=o.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:y,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:d.version,size:x}}function r(d,p,m){const v=p.array,x=p.updateRanges;if(o.bindBuffer(m,d),x.length===0)o.bufferSubData(m,0,v);else{x.sort((M,b)=>M.start-b.start);let y=0;for(let M=1;M<x.length;M++){const b=x[y],C=x[M];C.start<=b.start+b.count+1?b.count=Math.max(b.count,C.start+C.count-b.start):(++y,x[y]=C)}x.length=y+1;for(let M=0,b=x.length;M<b;M++){const C=x[M];o.bufferSubData(m,C.start*v.BYTES_PER_ELEMENT,v,C.start,C.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function u(d){d.isInterleavedBufferAttribute&&(d=d.data);const p=e.get(d);p&&(o.deleteBuffer(p.buffer),e.delete(d))}function h(d,p){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=e.get(d);(!v||v.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const m=e.get(d);if(m===void 0)e.set(d,i(d,p));else if(m.version<d.version){if(m.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(m.buffer,d,p),m.version=d.version}}return{get:l,remove:u,update:h}}var nM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,iM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,aM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,oM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,fM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,mM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_M=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,vM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,SM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,MM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,EM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,bM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,TM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,AM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,RM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,CM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,DM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,UM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,LM="gl_FragColor = linearToOutputTexel( gl_FragColor );",NM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,OM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,FM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,zM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,PM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,BM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,IM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,HM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,GM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,VM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,WM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,XM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,YM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ZM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,KM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,QM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,JM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$M=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,tE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,eE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,iE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,aE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_E=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,vE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,SE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ME=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,EE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,TE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,AE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,RE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,CE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,DE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,UE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,LE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,NE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,OE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,FE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,PE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,BE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,IE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,HE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,GE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,VE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,kE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,WE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,XE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,YE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ZE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,KE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,QE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,JE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$E=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,tb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const eb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ib=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ab=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ob=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,lb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,cb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ub=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,db=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,gb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_b=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Mb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Eb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ab=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Db=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ub=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Nb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ob=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ce={alphahash_fragment:nM,alphahash_pars_fragment:iM,alphamap_fragment:aM,alphamap_pars_fragment:rM,alphatest_fragment:sM,alphatest_pars_fragment:oM,aomap_fragment:lM,aomap_pars_fragment:cM,batching_pars_vertex:uM,batching_vertex:fM,begin_vertex:dM,beginnormal_vertex:hM,bsdfs:pM,iridescence_fragment:mM,bumpmap_pars_fragment:gM,clipping_planes_fragment:_M,clipping_planes_pars_fragment:vM,clipping_planes_pars_vertex:xM,clipping_planes_vertex:yM,color_fragment:SM,color_pars_fragment:MM,color_pars_vertex:EM,color_vertex:bM,common:TM,cube_uv_reflection_fragment:AM,defaultnormal_vertex:RM,displacementmap_pars_vertex:CM,displacementmap_vertex:wM,emissivemap_fragment:DM,emissivemap_pars_fragment:UM,colorspace_fragment:LM,colorspace_pars_fragment:NM,envmap_fragment:OM,envmap_common_pars_fragment:FM,envmap_pars_fragment:zM,envmap_pars_vertex:PM,envmap_physical_pars_fragment:YM,envmap_vertex:BM,fog_vertex:IM,fog_pars_vertex:HM,fog_fragment:GM,fog_pars_fragment:VM,gradientmap_pars_fragment:kM,lightmap_pars_fragment:jM,lights_lambert_fragment:WM,lights_lambert_pars_fragment:XM,lights_pars_begin:qM,lights_toon_fragment:ZM,lights_toon_pars_fragment:KM,lights_phong_fragment:QM,lights_phong_pars_fragment:JM,lights_physical_fragment:$M,lights_physical_pars_fragment:tE,lights_fragment_begin:eE,lights_fragment_maps:nE,lights_fragment_end:iE,logdepthbuf_fragment:aE,logdepthbuf_pars_fragment:rE,logdepthbuf_pars_vertex:sE,logdepthbuf_vertex:oE,map_fragment:lE,map_pars_fragment:cE,map_particle_fragment:uE,map_particle_pars_fragment:fE,metalnessmap_fragment:dE,metalnessmap_pars_fragment:hE,morphinstance_vertex:pE,morphcolor_vertex:mE,morphnormal_vertex:gE,morphtarget_pars_vertex:_E,morphtarget_vertex:vE,normal_fragment_begin:xE,normal_fragment_maps:yE,normal_pars_fragment:SE,normal_pars_vertex:ME,normal_vertex:EE,normalmap_pars_fragment:bE,clearcoat_normal_fragment_begin:TE,clearcoat_normal_fragment_maps:AE,clearcoat_pars_fragment:RE,iridescence_pars_fragment:CE,opaque_fragment:wE,packing:DE,premultiplied_alpha_fragment:UE,project_vertex:LE,dithering_fragment:NE,dithering_pars_fragment:OE,roughnessmap_fragment:FE,roughnessmap_pars_fragment:zE,shadowmap_pars_fragment:PE,shadowmap_pars_vertex:BE,shadowmap_vertex:IE,shadowmask_pars_fragment:HE,skinbase_vertex:GE,skinning_pars_vertex:VE,skinning_vertex:kE,skinnormal_vertex:jE,specularmap_fragment:WE,specularmap_pars_fragment:XE,tonemapping_fragment:qE,tonemapping_pars_fragment:YE,transmission_fragment:ZE,transmission_pars_fragment:KE,uv_pars_fragment:QE,uv_pars_vertex:JE,uv_vertex:$E,worldpos_vertex:tb,background_vert:eb,background_frag:nb,backgroundCube_vert:ib,backgroundCube_frag:ab,cube_vert:rb,cube_frag:sb,depth_vert:ob,depth_frag:lb,distanceRGBA_vert:cb,distanceRGBA_frag:ub,equirect_vert:fb,equirect_frag:db,linedashed_vert:hb,linedashed_frag:pb,meshbasic_vert:mb,meshbasic_frag:gb,meshlambert_vert:_b,meshlambert_frag:vb,meshmatcap_vert:xb,meshmatcap_frag:yb,meshnormal_vert:Sb,meshnormal_frag:Mb,meshphong_vert:Eb,meshphong_frag:bb,meshphysical_vert:Tb,meshphysical_frag:Ab,meshtoon_vert:Rb,meshtoon_frag:Cb,points_vert:wb,points_frag:Db,shadow_vert:Ub,shadow_frag:Lb,sprite_vert:Nb,sprite_frag:Ob},Lt={common:{diffuse:{value:new be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new le},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new le}},envmap:{envMap:{value:null},envMapRotation:{value:new le},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new le},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0},uvTransform:{value:new le}},sprite:{diffuse:{value:new be(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new le},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0}}},Ui={basic:{uniforms:Un([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:ce.meshbasic_vert,fragmentShader:ce.meshbasic_frag},lambert:{uniforms:Un([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new be(0)}}]),vertexShader:ce.meshlambert_vert,fragmentShader:ce.meshlambert_frag},phong:{uniforms:Un([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new be(0)},specular:{value:new be(1118481)},shininess:{value:30}}]),vertexShader:ce.meshphong_vert,fragmentShader:ce.meshphong_frag},standard:{uniforms:Un([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag},toon:{uniforms:Un([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new be(0)}}]),vertexShader:ce.meshtoon_vert,fragmentShader:ce.meshtoon_frag},matcap:{uniforms:Un([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:ce.meshmatcap_vert,fragmentShader:ce.meshmatcap_frag},points:{uniforms:Un([Lt.points,Lt.fog]),vertexShader:ce.points_vert,fragmentShader:ce.points_frag},dashed:{uniforms:Un([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ce.linedashed_vert,fragmentShader:ce.linedashed_frag},depth:{uniforms:Un([Lt.common,Lt.displacementmap]),vertexShader:ce.depth_vert,fragmentShader:ce.depth_frag},normal:{uniforms:Un([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:ce.meshnormal_vert,fragmentShader:ce.meshnormal_frag},sprite:{uniforms:Un([Lt.sprite,Lt.fog]),vertexShader:ce.sprite_vert,fragmentShader:ce.sprite_frag},background:{uniforms:{uvTransform:{value:new le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ce.background_vert,fragmentShader:ce.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new le}},vertexShader:ce.backgroundCube_vert,fragmentShader:ce.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ce.cube_vert,fragmentShader:ce.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ce.equirect_vert,fragmentShader:ce.equirect_frag},distanceRGBA:{uniforms:Un([Lt.common,Lt.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ce.distanceRGBA_vert,fragmentShader:ce.distanceRGBA_frag},shadow:{uniforms:Un([Lt.lights,Lt.fog,{color:{value:new be(0)},opacity:{value:1}}]),vertexShader:ce.shadow_vert,fragmentShader:ce.shadow_frag}};Ui.physical={uniforms:Un([Ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new le},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new le},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new le},sheen:{value:0},sheenColor:{value:new be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new le},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new le},attenuationDistance:{value:0},attenuationColor:{value:new be(0)},specularColor:{value:new be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new le},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new le}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag};const _c={r:0,b:0,g:0},dr=new Oi,Fb=new Ze;function zb(o,e,i,r,l,u,h){const d=new be(0);let p=u===!0?0:1,m,v,x=null,y=0,M=null;function b(O){let U=O.isScene===!0?O.background:null;return U&&U.isTexture&&(U=(O.backgroundBlurriness>0?i:e).get(U)),U}function C(O){let U=!1;const X=b(O);X===null?g(d,p):X&&X.isColor&&(g(X,1),U=!0);const H=o.xr.getEnvironmentBlendMode();H==="additive"?r.buffers.color.setClear(0,0,0,1,h):H==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,h),(o.autoClear||U)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function S(O,U){const X=b(U);X&&(X.isCubeTexture||X.mapping===wc)?(v===void 0&&(v=new fi(new Bo(1,1,1),new Va({name:"BackgroundCubeMaterial",uniforms:Rs(Ui.backgroundCube.uniforms),vertexShader:Ui.backgroundCube.vertexShader,fragmentShader:Ui.backgroundCube.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(H,P,Q){this.matrixWorld.copyPosition(Q.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(v)),dr.copy(U.backgroundRotation),dr.x*=-1,dr.y*=-1,dr.z*=-1,X.isCubeTexture&&X.isRenderTargetTexture===!1&&(dr.y*=-1,dr.z*=-1),v.material.uniforms.envMap.value=X,v.material.uniforms.flipEnvMap.value=X.isCubeTexture&&X.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(Fb.makeRotationFromEuler(dr)),v.material.toneMapped=Ce.getTransfer(X.colorSpace)!==He,(x!==X||y!==X.version||M!==o.toneMapping)&&(v.material.needsUpdate=!0,x=X,y=X.version,M=o.toneMapping),v.layers.enableAll(),O.unshift(v,v.geometry,v.material,0,0,null)):X&&X.isTexture&&(m===void 0&&(m=new fi(new Io(2,2),new Va({name:"BackgroundMaterial",uniforms:Rs(Ui.background.uniforms),vertexShader:Ui.background.vertexShader,fragmentShader:Ui.background.fragmentShader,side:Ga,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(m)),m.material.uniforms.t2D.value=X,m.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,m.material.toneMapped=Ce.getTransfer(X.colorSpace)!==He,X.matrixAutoUpdate===!0&&X.updateMatrix(),m.material.uniforms.uvTransform.value.copy(X.matrix),(x!==X||y!==X.version||M!==o.toneMapping)&&(m.material.needsUpdate=!0,x=X,y=X.version,M=o.toneMapping),m.layers.enableAll(),O.unshift(m,m.geometry,m.material,0,0,null))}function g(O,U){O.getRGB(_c,J_(o)),r.buffers.color.setClear(_c.r,_c.g,_c.b,U,h)}function N(){v!==void 0&&(v.geometry.dispose(),v.material.dispose()),m!==void 0&&(m.geometry.dispose(),m.material.dispose())}return{getClearColor:function(){return d},setClearColor:function(O,U=1){d.set(O),p=U,g(d,p)},getClearAlpha:function(){return p},setClearAlpha:function(O){p=O,g(d,p)},render:C,addToRenderList:S,dispose:N}}function Pb(o,e){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),r={},l=y(null);let u=l,h=!1;function d(w,V,st,ot,pt){let mt=!1;const z=x(ot,st,V);u!==z&&(u=z,m(u.object)),mt=M(w,ot,st,pt),mt&&b(w,ot,st,pt),pt!==null&&e.update(pt,o.ELEMENT_ARRAY_BUFFER),(mt||h)&&(h=!1,U(w,V,st,ot),pt!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(pt).buffer))}function p(){return o.createVertexArray()}function m(w){return o.bindVertexArray(w)}function v(w){return o.deleteVertexArray(w)}function x(w,V,st){const ot=st.wireframe===!0;let pt=r[w.id];pt===void 0&&(pt={},r[w.id]=pt);let mt=pt[V.id];mt===void 0&&(mt={},pt[V.id]=mt);let z=mt[ot];return z===void 0&&(z=y(p()),mt[ot]=z),z}function y(w){const V=[],st=[],ot=[];for(let pt=0;pt<i;pt++)V[pt]=0,st[pt]=0,ot[pt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:st,attributeDivisors:ot,object:w,attributes:{},index:null}}function M(w,V,st,ot){const pt=u.attributes,mt=V.attributes;let z=0;const Z=st.getAttributes();for(const q in Z)if(Z[q].location>=0){const bt=pt[q];let F=mt[q];if(F===void 0&&(q==="instanceMatrix"&&w.instanceMatrix&&(F=w.instanceMatrix),q==="instanceColor"&&w.instanceColor&&(F=w.instanceColor)),bt===void 0||bt.attribute!==F||F&&bt.data!==F.data)return!0;z++}return u.attributesNum!==z||u.index!==ot}function b(w,V,st,ot){const pt={},mt=V.attributes;let z=0;const Z=st.getAttributes();for(const q in Z)if(Z[q].location>=0){let bt=mt[q];bt===void 0&&(q==="instanceMatrix"&&w.instanceMatrix&&(bt=w.instanceMatrix),q==="instanceColor"&&w.instanceColor&&(bt=w.instanceColor));const F={};F.attribute=bt,bt&&bt.data&&(F.data=bt.data),pt[q]=F,z++}u.attributes=pt,u.attributesNum=z,u.index=ot}function C(){const w=u.newAttributes;for(let V=0,st=w.length;V<st;V++)w[V]=0}function S(w){g(w,0)}function g(w,V){const st=u.newAttributes,ot=u.enabledAttributes,pt=u.attributeDivisors;st[w]=1,ot[w]===0&&(o.enableVertexAttribArray(w),ot[w]=1),pt[w]!==V&&(o.vertexAttribDivisor(w,V),pt[w]=V)}function N(){const w=u.newAttributes,V=u.enabledAttributes;for(let st=0,ot=V.length;st<ot;st++)V[st]!==w[st]&&(o.disableVertexAttribArray(st),V[st]=0)}function O(w,V,st,ot,pt,mt,z){z===!0?o.vertexAttribIPointer(w,V,st,pt,mt):o.vertexAttribPointer(w,V,st,ot,pt,mt)}function U(w,V,st,ot){C();const pt=ot.attributes,mt=st.getAttributes(),z=V.defaultAttributeValues;for(const Z in mt){const q=mt[Z];if(q.location>=0){let xt=pt[Z];if(xt===void 0&&(Z==="instanceMatrix"&&w.instanceMatrix&&(xt=w.instanceMatrix),Z==="instanceColor"&&w.instanceColor&&(xt=w.instanceColor)),xt!==void 0){const bt=xt.normalized,F=xt.itemSize,at=e.get(xt);if(at===void 0)continue;const St=at.buffer,K=at.type,ft=at.bytesPerElement,Et=K===o.INT||K===o.UNSIGNED_INT||xt.gpuType===_h;if(xt.isInterleavedBufferAttribute){const yt=xt.data,Ht=yt.stride,zt=xt.offset;if(yt.isInstancedInterleavedBuffer){for(let ae=0;ae<q.locationSize;ae++)g(q.location+ae,yt.meshPerAttribute);w.isInstancedMesh!==!0&&ot._maxInstanceCount===void 0&&(ot._maxInstanceCount=yt.meshPerAttribute*yt.count)}else for(let ae=0;ae<q.locationSize;ae++)S(q.location+ae);o.bindBuffer(o.ARRAY_BUFFER,St);for(let ae=0;ae<q.locationSize;ae++)O(q.location+ae,F/q.locationSize,K,bt,Ht*ft,(zt+F/q.locationSize*ae)*ft,Et)}else{if(xt.isInstancedBufferAttribute){for(let yt=0;yt<q.locationSize;yt++)g(q.location+yt,xt.meshPerAttribute);w.isInstancedMesh!==!0&&ot._maxInstanceCount===void 0&&(ot._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let yt=0;yt<q.locationSize;yt++)S(q.location+yt);o.bindBuffer(o.ARRAY_BUFFER,St);for(let yt=0;yt<q.locationSize;yt++)O(q.location+yt,F/q.locationSize,K,bt,F*ft,F/q.locationSize*yt*ft,Et)}}else if(z!==void 0){const bt=z[Z];if(bt!==void 0)switch(bt.length){case 2:o.vertexAttrib2fv(q.location,bt);break;case 3:o.vertexAttrib3fv(q.location,bt);break;case 4:o.vertexAttrib4fv(q.location,bt);break;default:o.vertexAttrib1fv(q.location,bt)}}}}N()}function X(){Q();for(const w in r){const V=r[w];for(const st in V){const ot=V[st];for(const pt in ot)v(ot[pt].object),delete ot[pt];delete V[st]}delete r[w]}}function H(w){if(r[w.id]===void 0)return;const V=r[w.id];for(const st in V){const ot=V[st];for(const pt in ot)v(ot[pt].object),delete ot[pt];delete V[st]}delete r[w.id]}function P(w){for(const V in r){const st=r[V];if(st[w.id]===void 0)continue;const ot=st[w.id];for(const pt in ot)v(ot[pt].object),delete ot[pt];delete st[w.id]}}function Q(){D(),h=!0,u!==l&&(u=l,m(u.object))}function D(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:Q,resetDefaultState:D,dispose:X,releaseStatesOfGeometry:H,releaseStatesOfProgram:P,initAttributes:C,enableAttribute:S,disableUnusedAttributes:N}}function Bb(o,e,i){let r;function l(m){r=m}function u(m,v){o.drawArrays(r,m,v),i.update(v,r,1)}function h(m,v,x){x!==0&&(o.drawArraysInstanced(r,m,v,x),i.update(v,r,x))}function d(m,v,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,v,0,x);let M=0;for(let b=0;b<x;b++)M+=v[b];i.update(M,r,1)}function p(m,v,x,y){if(x===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let b=0;b<m.length;b++)h(m[b],v[b],y[b]);else{M.multiDrawArraysInstancedWEBGL(r,m,0,v,0,y,0,x);let b=0;for(let C=0;C<x;C++)b+=v[C]*y[C];i.update(b,r,1)}}this.setMode=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function Ib(o,e,i,r){let l;function u(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");l=o.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(P){return!(P!==Mi&&r.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(P){const Q=P===Oo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==la&&r.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==ra&&!Q)}function p(P){if(P==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const v=p(m);v!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",v,"instead."),m=v);const x=i.logarithmicDepthBuffer===!0,y=i.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),M=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),b=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=o.getParameter(o.MAX_TEXTURE_SIZE),S=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),g=o.getParameter(o.MAX_VERTEX_ATTRIBS),N=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),O=o.getParameter(o.MAX_VARYING_VECTORS),U=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),X=b>0,H=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:p,textureFormatReadable:h,textureTypeReadable:d,precision:m,logarithmicDepthBuffer:x,reverseDepthBuffer:y,maxTextures:M,maxVertexTextures:b,maxTextureSize:C,maxCubemapSize:S,maxAttributes:g,maxVertexUniforms:N,maxVaryings:O,maxFragmentUniforms:U,vertexTextures:X,maxSamples:H}}function Hb(o){const e=this;let i=null,r=0,l=!1,u=!1;const h=new mr,d=new le,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(x,y){const M=x.length!==0||y||r!==0||l;return l=y,r=x.length,M},this.beginShadows=function(){u=!0,v(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(x,y){i=v(x,y,0)},this.setState=function(x,y,M){const b=x.clippingPlanes,C=x.clipIntersection,S=x.clipShadows,g=o.get(x);if(!l||b===null||b.length===0||u&&!S)u?v(null):m();else{const N=u?0:r,O=N*4;let U=g.clippingState||null;p.value=U,U=v(b,y,O,M);for(let X=0;X!==O;++X)U[X]=i[X];g.clippingState=U,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=N}};function m(){p.value!==i&&(p.value=i,p.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function v(x,y,M,b){const C=x!==null?x.length:0;let S=null;if(C!==0){if(S=p.value,b!==!0||S===null){const g=M+C*4,N=y.matrixWorldInverse;d.getNormalMatrix(N),(S===null||S.length<g)&&(S=new Float32Array(g));for(let O=0,U=M;O!==C;++O,U+=4)h.copy(x[O]).applyMatrix4(N,d),h.normal.toArray(S,U),S[U+3]=h.constant}p.value=S,p.needsUpdate=!0}return e.numPlanes=C,e.numIntersection=0,S}}function Gb(o){let e=new WeakMap;function i(h,d){return d===zd?h.mapping=Ms:d===Pd&&(h.mapping=Es),h}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===zd||d===Pd)if(e.has(h)){const p=e.get(h).texture;return i(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const m=new GS(p.height);return m.fromEquirectangularTexture(o,h),e.set(h,m),h.addEventListener("dispose",l),i(m.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(){e=new WeakMap}return{get:r,dispose:u}}const _s=4,K0=[.125,.215,.35,.446,.526,.582],vr=20,_d=new KS,Q0=new be;let vd=null,xd=0,yd=0,Sd=!1;const gr=(1+Math.sqrt(5))/2,ms=1/gr,J0=[new J(-gr,ms,0),new J(gr,ms,0),new J(-ms,0,gr),new J(ms,0,gr),new J(0,gr,-ms),new J(0,gr,ms),new J(-1,1,-1),new J(1,1,-1),new J(-1,1,1),new J(1,1,1)];class $0{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,i=0,r=.1,l=100){vd=this._renderer.getRenderTarget(),xd=this._renderer.getActiveCubeFace(),yd=this._renderer.getActiveMipmapLevel(),Sd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(e,r,l,u),i>0&&this._blur(u,0,0,i),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=n_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=e_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(vd,xd,yd),this._renderer.xr.enabled=Sd,e.scissorTest=!1,vc(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Ms||e.mapping===Es?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vd=this._renderer.getRenderTarget(),xd=this._renderer.getActiveCubeFace(),yd=this._renderer.getActiveMipmapLevel(),Sd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:Ni,minFilter:Ni,generateMipmaps:!1,type:Oo,format:Mi,colorSpace:As,depthBuffer:!1},l=t_(e,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=t_(e,i,r);const{_lodMax:u}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Vb(u)),this._blurMaterial=kb(u,e,i)}return l}_compileMaterial(e){const i=new fi(this._lodPlanes[0],e);this._renderer.compile(i,_d)}_sceneToCubeUV(e,i,r,l){const d=new $n(90,1,i,r),p=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],v=this._renderer,x=v.autoClear,y=v.toneMapping;v.getClearColor(Q0),v.toneMapping=Ha,v.autoClear=!1;const M=new Z_({name:"PMREM.Background",side:Vn,depthWrite:!1,depthTest:!1}),b=new fi(new Bo,M);let C=!1;const S=e.background;S?S.isColor&&(M.color.copy(S),e.background=null,C=!0):(M.color.copy(Q0),C=!0);for(let g=0;g<6;g++){const N=g%3;N===0?(d.up.set(0,p[g],0),d.lookAt(m[g],0,0)):N===1?(d.up.set(0,0,p[g]),d.lookAt(0,m[g],0)):(d.up.set(0,p[g],0),d.lookAt(0,0,m[g]));const O=this._cubeSize;vc(l,N*O,g>2?O:0,O,O),v.setRenderTarget(l),C&&v.render(b,d),v.render(e,d)}b.geometry.dispose(),b.material.dispose(),v.toneMapping=y,v.autoClear=x,e.background=S}_textureToCubeUV(e,i){const r=this._renderer,l=e.mapping===Ms||e.mapping===Es;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=n_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=e_());const u=l?this._cubemapMaterial:this._equirectMaterial,h=new fi(this._lodPlanes[0],u),d=u.uniforms;d.envMap.value=e;const p=this._cubeSize;vc(i,0,0,3*p,2*p),r.setRenderTarget(i),r.render(h,_d)}_applyPMREM(e){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let u=1;u<l;u++){const h=Math.sqrt(this._sigmas[u]*this._sigmas[u]-this._sigmas[u-1]*this._sigmas[u-1]),d=J0[(l-u-1)%J0.length];this._blur(e,u-1,u,h,d)}i.autoClear=r}_blur(e,i,r,l,u){const h=this._pingPongRenderTarget;this._halfBlur(e,h,i,r,l,"latitudinal",u),this._halfBlur(h,e,r,r,l,"longitudinal",u)}_halfBlur(e,i,r,l,u,h,d){const p=this._renderer,m=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,x=new fi(this._lodPlanes[l],m),y=m.uniforms,M=this._sizeLods[r]-1,b=isFinite(u)?Math.PI/(2*M):2*Math.PI/(2*vr-1),C=u/b,S=isFinite(u)?1+Math.floor(v*C):vr;S>vr&&console.warn(`sigmaRadians, ${u}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${vr}`);const g=[];let N=0;for(let P=0;P<vr;++P){const Q=P/C,D=Math.exp(-Q*Q/2);g.push(D),P===0?N+=D:P<S&&(N+=2*D)}for(let P=0;P<g.length;P++)g[P]=g[P]/N;y.envMap.value=e.texture,y.samples.value=S,y.weights.value=g,y.latitudinal.value=h==="latitudinal",d&&(y.poleAxis.value=d);const{_lodMax:O}=this;y.dTheta.value=b,y.mipInt.value=O-r;const U=this._sizeLods[l],X=3*U*(l>O-_s?l-O+_s:0),H=4*(this._cubeSize-U);vc(i,X,H,3*U,2*U),p.setRenderTarget(i),p.render(x,_d)}}function Vb(o){const e=[],i=[],r=[];let l=o;const u=o-_s+1+K0.length;for(let h=0;h<u;h++){const d=Math.pow(2,l);i.push(d);let p=1/d;h>o-_s?p=K0[h-o+_s-1]:h===0&&(p=0),r.push(p);const m=1/(d-2),v=-m,x=1+m,y=[v,v,x,v,x,x,v,v,x,x,v,x],M=6,b=6,C=3,S=2,g=1,N=new Float32Array(C*b*M),O=new Float32Array(S*b*M),U=new Float32Array(g*b*M);for(let H=0;H<M;H++){const P=H%3*2/3-1,Q=H>2?0:-1,D=[P,Q,0,P+2/3,Q,0,P+2/3,Q+1,0,P,Q,0,P+2/3,Q+1,0,P,Q+1,0];N.set(D,C*b*H),O.set(y,S*b*H);const w=[H,H,H,H,H,H];U.set(w,g*b*H)}const X=new Ti;X.setAttribute("position",new bi(N,C)),X.setAttribute("uv",new bi(O,S)),X.setAttribute("faceIndex",new bi(U,g)),e.push(X),l>_s&&l--}return{lodPlanes:e,sizeLods:i,sigmas:r}}function t_(o,e,i){const r=new Mr(o,e,i);return r.texture.mapping=wc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function vc(o,e,i,r,l){o.viewport.set(e,i,r,l),o.scissor.set(e,i,r,l)}function kb(o,e,i){const r=new Float32Array(vr),l=new J(0,1,0);return new Va({name:"SphericalGaussianBlur",defines:{n:vr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ia,depthTest:!1,depthWrite:!1})}function e_(){return new Va({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ia,depthTest:!1,depthWrite:!1})}function n_(){return new Va({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ia,depthTest:!1,depthWrite:!1})}function Rh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jb(o){let e=new WeakMap,i=null;function r(d){if(d&&d.isTexture){const p=d.mapping,m=p===zd||p===Pd,v=p===Ms||p===Es;if(m||v){let x=e.get(d);const y=x!==void 0?x.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==y)return i===null&&(i=new $0(o)),x=m?i.fromEquirectangular(d,x):i.fromCubemap(d,x),x.texture.pmremVersion=d.pmremVersion,e.set(d,x),x.texture;if(x!==void 0)return x.texture;{const M=d.image;return m&&M&&M.height>0||v&&M&&l(M)?(i===null&&(i=new $0(o)),x=m?i.fromEquirectangular(d):i.fromCubemap(d),x.texture.pmremVersion=d.pmremVersion,e.set(d,x),d.addEventListener("dispose",u),x.texture):null}}}return d}function l(d){let p=0;const m=6;for(let v=0;v<m;v++)d[v]!==void 0&&p++;return p===m}function u(d){const p=d.target;p.removeEventListener("dispose",u);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function h(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function Wb(o){const e={};function i(r){if(e[r]!==void 0)return e[r];let l;switch(r){case"WEBGL_depth_texture":l=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=o.getExtension(r)}return e[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&gs("THREE.WebGLRenderer: "+r+" extension not supported."),l}}}function Xb(o,e,i,r){const l={},u=new WeakMap;function h(x){const y=x.target;y.index!==null&&e.remove(y.index);for(const b in y.attributes)e.remove(y.attributes[b]);y.removeEventListener("dispose",h),delete l[y.id];const M=u.get(y);M&&(e.remove(M),u.delete(y)),r.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,i.memory.geometries--}function d(x,y){return l[y.id]===!0||(y.addEventListener("dispose",h),l[y.id]=!0,i.memory.geometries++),y}function p(x){const y=x.attributes;for(const M in y)e.update(y[M],o.ARRAY_BUFFER)}function m(x){const y=[],M=x.index,b=x.attributes.position;let C=0;if(M!==null){const N=M.array;C=M.version;for(let O=0,U=N.length;O<U;O+=3){const X=N[O+0],H=N[O+1],P=N[O+2];y.push(X,H,H,P,P,X)}}else if(b!==void 0){const N=b.array;C=b.version;for(let O=0,U=N.length/3-1;O<U;O+=3){const X=O+0,H=O+1,P=O+2;y.push(X,H,H,P,P,X)}}else return;const S=new(k_(y)?Q_:K_)(y,1);S.version=C;const g=u.get(x);g&&e.remove(g),u.set(x,S)}function v(x){const y=u.get(x);if(y){const M=x.index;M!==null&&y.version<M.version&&m(x)}else m(x);return u.get(x)}return{get:d,update:p,getWireframeAttribute:v}}function qb(o,e,i){let r;function l(y){r=y}let u,h;function d(y){u=y.type,h=y.bytesPerElement}function p(y,M){o.drawElements(r,M,u,y*h),i.update(M,r,1)}function m(y,M,b){b!==0&&(o.drawElementsInstanced(r,M,u,y*h,b),i.update(M,r,b))}function v(y,M,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,M,0,u,y,0,b);let S=0;for(let g=0;g<b;g++)S+=M[g];i.update(S,r,1)}function x(y,M,b,C){if(b===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let g=0;g<y.length;g++)m(y[g]/h,M[g],C[g]);else{S.multiDrawElementsInstancedWEBGL(r,M,0,u,y,0,C,0,b);let g=0;for(let N=0;N<b;N++)g+=M[N]*C[N];i.update(g,r,1)}}this.setMode=l,this.setIndex=d,this.render=p,this.renderInstances=m,this.renderMultiDraw=v,this.renderMultiDrawInstances=x}function Yb(o){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(u,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(u/3);break;case o.LINES:i.lines+=d*(u/2);break;case o.LINE_STRIP:i.lines+=d*(u-1);break;case o.LINE_LOOP:i.lines+=d*u;break;case o.POINTS:i.points+=d*u;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:r}}function Zb(o,e,i){const r=new WeakMap,l=new Ge;function u(h,d,p){const m=h.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,x=v!==void 0?v.length:0;let y=r.get(d);if(y===void 0||y.count!==x){let w=function(){Q.dispose(),r.delete(d),d.removeEventListener("dispose",w)};var M=w;y!==void 0&&y.texture.dispose();const b=d.morphAttributes.position!==void 0,C=d.morphAttributes.normal!==void 0,S=d.morphAttributes.color!==void 0,g=d.morphAttributes.position||[],N=d.morphAttributes.normal||[],O=d.morphAttributes.color||[];let U=0;b===!0&&(U=1),C===!0&&(U=2),S===!0&&(U=3);let X=d.attributes.position.count*U,H=1;X>e.maxTextureSize&&(H=Math.ceil(X/e.maxTextureSize),X=e.maxTextureSize);const P=new Float32Array(X*H*4*x),Q=new W_(P,X,H,x);Q.type=ra,Q.needsUpdate=!0;const D=U*4;for(let V=0;V<x;V++){const st=g[V],ot=N[V],pt=O[V],mt=X*H*4*V;for(let z=0;z<st.count;z++){const Z=z*D;b===!0&&(l.fromBufferAttribute(st,z),P[mt+Z+0]=l.x,P[mt+Z+1]=l.y,P[mt+Z+2]=l.z,P[mt+Z+3]=0),C===!0&&(l.fromBufferAttribute(ot,z),P[mt+Z+4]=l.x,P[mt+Z+5]=l.y,P[mt+Z+6]=l.z,P[mt+Z+7]=0),S===!0&&(l.fromBufferAttribute(pt,z),P[mt+Z+8]=l.x,P[mt+Z+9]=l.y,P[mt+Z+10]=l.z,P[mt+Z+11]=pt.itemSize===4?l.w:1)}}y={count:x,texture:Q,size:new De(X,H)},r.set(d,y),d.addEventListener("dispose",w)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)p.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let b=0;for(let S=0;S<m.length;S++)b+=m[S];const C=d.morphTargetsRelative?1:1-b;p.getUniforms().setValue(o,"morphTargetBaseInfluence",C),p.getUniforms().setValue(o,"morphTargetInfluences",m)}p.getUniforms().setValue(o,"morphTargetsTexture",y.texture,i),p.getUniforms().setValue(o,"morphTargetsTextureSize",y.size)}return{update:u}}function Kb(o,e,i,r){let l=new WeakMap;function u(p){const m=r.render.frame,v=p.geometry,x=e.get(p,v);if(l.get(x)!==m&&(e.update(x),l.set(x,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",d)===!1&&p.addEventListener("dispose",d),l.get(p)!==m&&(i.update(p.instanceMatrix,o.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,o.ARRAY_BUFFER),l.set(p,m))),p.isSkinnedMesh){const y=p.skeleton;l.get(y)!==m&&(y.update(),l.set(y,m))}return x}function h(){l=new WeakMap}function d(p){const m=p.target;m.removeEventListener("dispose",d),i.remove(m.instanceMatrix),m.instanceColor!==null&&i.remove(m.instanceColor)}return{update:u,dispose:h}}const rv=new kn,i_=new nv(1,1),sv=new W_,ov=new TS,lv=new tv,a_=[],r_=[],s_=new Float32Array(16),o_=new Float32Array(9),l_=new Float32Array(4);function Ds(o,e,i){const r=o[0];if(r<=0||r>0)return o;const l=e*i;let u=a_[l];if(u===void 0&&(u=new Float32Array(l),a_[l]=u),e!==0){r.toArray(u,0);for(let h=1,d=0;h!==e;++h)d+=i,o[h].toArray(u,d)}return u}function fn(o,e){if(o.length!==e.length)return!1;for(let i=0,r=o.length;i<r;i++)if(o[i]!==e[i])return!1;return!0}function dn(o,e){for(let i=0,r=e.length;i<r;i++)o[i]=e[i]}function Uc(o,e){let i=r_[e];i===void 0&&(i=new Int32Array(e),r_[e]=i);for(let r=0;r!==e;++r)i[r]=o.allocateTextureUnit();return i}function Qb(o,e){const i=this.cache;i[0]!==e&&(o.uniform1f(this.addr,e),i[0]=e)}function Jb(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(fn(i,e))return;o.uniform2fv(this.addr,e),dn(i,e)}}function $b(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(fn(i,e))return;o.uniform3fv(this.addr,e),dn(i,e)}}function t1(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(fn(i,e))return;o.uniform4fv(this.addr,e),dn(i,e)}}function e1(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(fn(i,e))return;o.uniformMatrix2fv(this.addr,!1,e),dn(i,e)}else{if(fn(i,r))return;l_.set(r),o.uniformMatrix2fv(this.addr,!1,l_),dn(i,r)}}function n1(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(fn(i,e))return;o.uniformMatrix3fv(this.addr,!1,e),dn(i,e)}else{if(fn(i,r))return;o_.set(r),o.uniformMatrix3fv(this.addr,!1,o_),dn(i,r)}}function i1(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(fn(i,e))return;o.uniformMatrix4fv(this.addr,!1,e),dn(i,e)}else{if(fn(i,r))return;s_.set(r),o.uniformMatrix4fv(this.addr,!1,s_),dn(i,r)}}function a1(o,e){const i=this.cache;i[0]!==e&&(o.uniform1i(this.addr,e),i[0]=e)}function r1(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(fn(i,e))return;o.uniform2iv(this.addr,e),dn(i,e)}}function s1(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(fn(i,e))return;o.uniform3iv(this.addr,e),dn(i,e)}}function o1(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(fn(i,e))return;o.uniform4iv(this.addr,e),dn(i,e)}}function l1(o,e){const i=this.cache;i[0]!==e&&(o.uniform1ui(this.addr,e),i[0]=e)}function c1(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(fn(i,e))return;o.uniform2uiv(this.addr,e),dn(i,e)}}function u1(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(fn(i,e))return;o.uniform3uiv(this.addr,e),dn(i,e)}}function f1(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(fn(i,e))return;o.uniform4uiv(this.addr,e),dn(i,e)}}function d1(o,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(o.uniform1i(this.addr,l),r[0]=l);let u;this.type===o.SAMPLER_2D_SHADOW?(i_.compareFunction=V_,u=i_):u=rv,i.setTexture2D(e||u,l)}function h1(o,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(o.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(e||ov,l)}function p1(o,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(o.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(e||lv,l)}function m1(o,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(o.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(e||sv,l)}function g1(o){switch(o){case 5126:return Qb;case 35664:return Jb;case 35665:return $b;case 35666:return t1;case 35674:return e1;case 35675:return n1;case 35676:return i1;case 5124:case 35670:return a1;case 35667:case 35671:return r1;case 35668:case 35672:return s1;case 35669:case 35673:return o1;case 5125:return l1;case 36294:return c1;case 36295:return u1;case 36296:return f1;case 35678:case 36198:case 36298:case 36306:case 35682:return d1;case 35679:case 36299:case 36307:return h1;case 35680:case 36300:case 36308:case 36293:return p1;case 36289:case 36303:case 36311:case 36292:return m1}}function _1(o,e){o.uniform1fv(this.addr,e)}function v1(o,e){const i=Ds(e,this.size,2);o.uniform2fv(this.addr,i)}function x1(o,e){const i=Ds(e,this.size,3);o.uniform3fv(this.addr,i)}function y1(o,e){const i=Ds(e,this.size,4);o.uniform4fv(this.addr,i)}function S1(o,e){const i=Ds(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function M1(o,e){const i=Ds(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function E1(o,e){const i=Ds(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function b1(o,e){o.uniform1iv(this.addr,e)}function T1(o,e){o.uniform2iv(this.addr,e)}function A1(o,e){o.uniform3iv(this.addr,e)}function R1(o,e){o.uniform4iv(this.addr,e)}function C1(o,e){o.uniform1uiv(this.addr,e)}function w1(o,e){o.uniform2uiv(this.addr,e)}function D1(o,e){o.uniform3uiv(this.addr,e)}function U1(o,e){o.uniform4uiv(this.addr,e)}function L1(o,e,i){const r=this.cache,l=e.length,u=Uc(i,l);fn(r,u)||(o.uniform1iv(this.addr,u),dn(r,u));for(let h=0;h!==l;++h)i.setTexture2D(e[h]||rv,u[h])}function N1(o,e,i){const r=this.cache,l=e.length,u=Uc(i,l);fn(r,u)||(o.uniform1iv(this.addr,u),dn(r,u));for(let h=0;h!==l;++h)i.setTexture3D(e[h]||ov,u[h])}function O1(o,e,i){const r=this.cache,l=e.length,u=Uc(i,l);fn(r,u)||(o.uniform1iv(this.addr,u),dn(r,u));for(let h=0;h!==l;++h)i.setTextureCube(e[h]||lv,u[h])}function F1(o,e,i){const r=this.cache,l=e.length,u=Uc(i,l);fn(r,u)||(o.uniform1iv(this.addr,u),dn(r,u));for(let h=0;h!==l;++h)i.setTexture2DArray(e[h]||sv,u[h])}function z1(o){switch(o){case 5126:return _1;case 35664:return v1;case 35665:return x1;case 35666:return y1;case 35674:return S1;case 35675:return M1;case 35676:return E1;case 5124:case 35670:return b1;case 35667:case 35671:return T1;case 35668:case 35672:return A1;case 35669:case 35673:return R1;case 5125:return C1;case 36294:return w1;case 36295:return D1;case 36296:return U1;case 35678:case 36198:case 36298:case 36306:case 35682:return L1;case 35679:case 36299:case 36307:return N1;case 35680:case 36300:case 36308:case 36293:return O1;case 36289:case 36303:case 36311:case 36292:return F1}}class P1{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.setValue=g1(i.type)}}class B1{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=z1(i.type)}}class I1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,r){const l=this.seq;for(let u=0,h=l.length;u!==h;++u){const d=l[u];d.setValue(e,i[d.id],r)}}}const Md=/(\w+)(\])?(\[|\.)?/g;function c_(o,e){o.seq.push(e),o.map[e.id]=e}function H1(o,e,i){const r=o.name,l=r.length;for(Md.lastIndex=0;;){const u=Md.exec(r),h=Md.lastIndex;let d=u[1];const p=u[2]==="]",m=u[3];if(p&&(d=d|0),m===void 0||m==="["&&h+2===l){c_(i,m===void 0?new P1(d,o,e):new B1(d,o,e));break}else{let x=i.map[d];x===void 0&&(x=new I1(d),c_(i,x)),i=x}}}class Tc{constructor(e,i){this.seq=[],this.map={};const r=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let l=0;l<r;++l){const u=e.getActiveUniform(i,l),h=e.getUniformLocation(i,u.name);H1(u,h,this)}}setValue(e,i,r,l){const u=this.map[i];u!==void 0&&u.setValue(e,r,l)}setOptional(e,i,r){const l=i[r];l!==void 0&&this.setValue(e,r,l)}static upload(e,i,r,l){for(let u=0,h=i.length;u!==h;++u){const d=i[u],p=r[d.id];p.needsUpdate!==!1&&d.setValue(e,p.value,l)}}static seqWithValue(e,i){const r=[];for(let l=0,u=e.length;l!==u;++l){const h=e[l];h.id in i&&r.push(h)}return r}}function u_(o,e,i){const r=o.createShader(e);return o.shaderSource(r,i),o.compileShader(r),r}const G1=37297;let V1=0;function k1(o,e){const i=o.split(`
`),r=[],l=Math.max(e-6,0),u=Math.min(e+6,i.length);for(let h=l;h<u;h++){const d=h+1;r.push(`${d===e?">":" "} ${d}: ${i[h]}`)}return r.join(`
`)}const f_=new le;function j1(o){Ce._getMatrix(f_,Ce.workingColorSpace,o);const e=`mat3( ${f_.elements.map(i=>i.toFixed(4))} )`;switch(Ce.getTransfer(o)){case Ac:return[e,"LinearTransferOETF"];case He:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function d_(o,e,i){const r=o.getShaderParameter(e,o.COMPILE_STATUS),l=o.getShaderInfoLog(e).trim();if(r&&l==="")return"";const u=/ERROR: 0:(\d+)/.exec(l);if(u){const h=parseInt(u[1]);return i.toUpperCase()+`

`+l+`

`+k1(o.getShaderSource(e),h)}else return l}function W1(o,e){const i=j1(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function X1(o,e){let i;switch(e){case Qy:i="Linear";break;case Jy:i="Reinhard";break;case $y:i="Cineon";break;case tS:i="ACESFilmic";break;case nS:i="AgX";break;case iS:i="Neutral";break;case eS:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const xc=new J;function q1(){Ce.getLuminanceCoefficients(xc);const o=xc.x.toFixed(4),e=xc.y.toFixed(4),i=xc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Y1(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lo).join(`
`)}function Z1(o){const e=[];for(const i in o){const r=o[i];r!==!1&&e.push("#define "+i+" "+r)}return e.join(`
`)}function K1(o,e){const i={},r=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const u=o.getActiveAttrib(e,l),h=u.name;let d=1;u.type===o.FLOAT_MAT2&&(d=2),u.type===o.FLOAT_MAT3&&(d=3),u.type===o.FLOAT_MAT4&&(d=4),i[h]={type:u.type,location:o.getAttribLocation(e,h),locationSize:d}}return i}function Lo(o){return o!==""}function h_(o,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function p_(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Q1=/^[ \t]*#include +<([\w\d./]+)>/gm;function ph(o){return o.replace(Q1,$1)}const J1=new Map;function $1(o,e){let i=ce[e];if(i===void 0){const r=J1.get(e);if(r!==void 0)i=ce[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return ph(i)}const tT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function m_(o){return o.replace(tT,eT)}function eT(o,e,i,r){let l="";for(let u=parseInt(e);u<parseInt(i);u++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return l}function g_(o){let e=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function nT(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===C_?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===Dy?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===aa&&(e="SHADOWMAP_TYPE_VSM"),e}function iT(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case Ms:case Es:e="ENVMAP_TYPE_CUBE";break;case wc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function aT(o){let e="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case Es:e="ENVMAP_MODE_REFRACTION";break}return e}function rT(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case w_:e="ENVMAP_BLENDING_MULTIPLY";break;case Zy:e="ENVMAP_BLENDING_MIX";break;case Ky:e="ENVMAP_BLENDING_ADD";break}return e}function sT(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function oT(o,e,i,r){const l=o.getContext(),u=i.defines;let h=i.vertexShader,d=i.fragmentShader;const p=nT(i),m=iT(i),v=aT(i),x=rT(i),y=sT(i),M=Y1(i),b=Z1(u),C=l.createProgram();let S,g,N=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Lo).join(`
`),S.length>0&&(S+=`
`),g=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Lo).join(`
`),g.length>0&&(g+=`
`)):(S=[g_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lo).join(`
`),g=[g_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+v:"",i.envMap?"#define "+x:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Ha?"#define TONE_MAPPING":"",i.toneMapping!==Ha?ce.tonemapping_pars_fragment:"",i.toneMapping!==Ha?X1("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ce.colorspace_pars_fragment,W1("linearToOutputTexel",i.outputColorSpace),q1(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Lo).join(`
`)),h=ph(h),h=h_(h,i),h=p_(h,i),d=ph(d),d=h_(d,i),d=p_(d,i),h=m_(h),d=m_(d),i.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,S=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,g=["#define varying in",i.glslVersion===b0?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===b0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const O=N+S+h,U=N+g+d,X=u_(l,l.VERTEX_SHADER,O),H=u_(l,l.FRAGMENT_SHADER,U);l.attachShader(C,X),l.attachShader(C,H),i.index0AttributeName!==void 0?l.bindAttribLocation(C,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(C,0,"position"),l.linkProgram(C);function P(V){if(o.debug.checkShaderErrors){const st=l.getProgramInfoLog(C).trim(),ot=l.getShaderInfoLog(X).trim(),pt=l.getShaderInfoLog(H).trim();let mt=!0,z=!0;if(l.getProgramParameter(C,l.LINK_STATUS)===!1)if(mt=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,C,X,H);else{const Z=d_(l,X,"vertex"),q=d_(l,H,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(C,l.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+st+`
`+Z+`
`+q)}else st!==""?console.warn("THREE.WebGLProgram: Program Info Log:",st):(ot===""||pt==="")&&(z=!1);z&&(V.diagnostics={runnable:mt,programLog:st,vertexShader:{log:ot,prefix:S},fragmentShader:{log:pt,prefix:g}})}l.deleteShader(X),l.deleteShader(H),Q=new Tc(l,C),D=K1(l,C)}let Q;this.getUniforms=function(){return Q===void 0&&P(this),Q};let D;this.getAttributes=function(){return D===void 0&&P(this),D};let w=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=l.getProgramParameter(C,G1)),w},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(C),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=V1++,this.cacheKey=e,this.usedTimes=1,this.program=C,this.vertexShader=X,this.fragmentShader=H,this}let lT=0;class cT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,r=e.fragmentShader,l=this._getShaderStage(i),u=this._getShaderStage(r),h=this._getShaderCacheForMaterial(e);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(u)===!1&&(h.add(u),u.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let r=i.get(e);return r===void 0&&(r=new Set,i.set(e,r)),r}_getShaderStage(e){const i=this.shaderCache;let r=i.get(e);return r===void 0&&(r=new uT(e),i.set(e,r)),r}}class uT{constructor(e){this.id=lT++,this.code=e,this.usedTimes=0}}function fT(o,e,i,r,l,u,h){const d=new q_,p=new cT,m=new Set,v=[],x=l.logarithmicDepthBuffer,y=l.vertexTextures;let M=l.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function C(D){return m.add(D),D===0?"uv":`uv${D}`}function S(D,w,V,st,ot){const pt=st.fog,mt=ot.geometry,z=D.isMeshStandardMaterial?st.environment:null,Z=(D.isMeshStandardMaterial?i:e).get(D.envMap||z),q=Z&&Z.mapping===wc?Z.image.height:null,xt=b[D.type];D.precision!==null&&(M=l.getMaxPrecision(D.precision),M!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",M,"instead."));const bt=mt.morphAttributes.position||mt.morphAttributes.normal||mt.morphAttributes.color,F=bt!==void 0?bt.length:0;let at=0;mt.morphAttributes.position!==void 0&&(at=1),mt.morphAttributes.normal!==void 0&&(at=2),mt.morphAttributes.color!==void 0&&(at=3);let St,K,ft,Et;if(xt){const Ee=Ui[xt];St=Ee.vertexShader,K=Ee.fragmentShader}else St=D.vertexShader,K=D.fragmentShader,p.update(D),ft=p.getVertexShaderID(D),Et=p.getFragmentShaderID(D);const yt=o.getRenderTarget(),Ht=o.state.buffers.depth.getReversed(),zt=ot.isInstancedMesh===!0,ae=ot.isBatchedMesh===!0,Oe=!!D.map,fe=!!D.matcap,Xe=!!Z,I=!!D.aoMap,En=!!D.lightMap,ue=!!D.bumpMap,pe=!!D.normalMap,Xt=!!D.displacementMap,Ue=!!D.emissiveMap,jt=!!D.metalnessMap,L=!!D.roughnessMap,T=D.anisotropy>0,nt=D.clearcoat>0,dt=D.dispersion>0,Mt=D.iridescence>0,gt=D.sheen>0,Vt=D.transmission>0,wt=T&&!!D.anisotropyMap,Pt=nt&&!!D.clearcoatMap,me=nt&&!!D.clearcoatNormalMap,At=nt&&!!D.clearcoatRoughnessMap,Bt=Mt&&!!D.iridescenceMap,qt=Mt&&!!D.iridescenceThicknessMap,kt=gt&&!!D.sheenColorMap,Ot=gt&&!!D.sheenRoughnessMap,Jt=!!D.specularMap,re=!!D.specularColorMap,Fe=!!D.specularIntensityMap,j=Vt&&!!D.transmissionMap,Rt=Vt&&!!D.thicknessMap,ct=!!D.gradientMap,vt=!!D.alphaMap,Ct=D.alphaTest>0,Dt=!!D.alphaHash,$t=!!D.extensions;let qe=Ha;D.toneMapped&&(yt===null||yt.isXRRenderTarget===!0)&&(qe=o.toneMapping);const ln={shaderID:xt,shaderType:D.type,shaderName:D.name,vertexShader:St,fragmentShader:K,defines:D.defines,customVertexShaderID:ft,customFragmentShaderID:Et,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:M,batching:ae,batchingColor:ae&&ot._colorsTexture!==null,instancing:zt,instancingColor:zt&&ot.instanceColor!==null,instancingMorph:zt&&ot.morphTexture!==null,supportsVertexTextures:y,outputColorSpace:yt===null?o.outputColorSpace:yt.isXRRenderTarget===!0?yt.texture.colorSpace:As,alphaToCoverage:!!D.alphaToCoverage,map:Oe,matcap:fe,envMap:Xe,envMapMode:Xe&&Z.mapping,envMapCubeUVHeight:q,aoMap:I,lightMap:En,bumpMap:ue,normalMap:pe,displacementMap:y&&Xt,emissiveMap:Ue,normalMapObjectSpace:pe&&D.normalMapType===oS,normalMapTangentSpace:pe&&D.normalMapType===G_,metalnessMap:jt,roughnessMap:L,anisotropy:T,anisotropyMap:wt,clearcoat:nt,clearcoatMap:Pt,clearcoatNormalMap:me,clearcoatRoughnessMap:At,dispersion:dt,iridescence:Mt,iridescenceMap:Bt,iridescenceThicknessMap:qt,sheen:gt,sheenColorMap:kt,sheenRoughnessMap:Ot,specularMap:Jt,specularColorMap:re,specularIntensityMap:Fe,transmission:Vt,transmissionMap:j,thicknessMap:Rt,gradientMap:ct,opaque:D.transparent===!1&&D.blending===vs&&D.alphaToCoverage===!1,alphaMap:vt,alphaTest:Ct,alphaHash:Dt,combine:D.combine,mapUv:Oe&&C(D.map.channel),aoMapUv:I&&C(D.aoMap.channel),lightMapUv:En&&C(D.lightMap.channel),bumpMapUv:ue&&C(D.bumpMap.channel),normalMapUv:pe&&C(D.normalMap.channel),displacementMapUv:Xt&&C(D.displacementMap.channel),emissiveMapUv:Ue&&C(D.emissiveMap.channel),metalnessMapUv:jt&&C(D.metalnessMap.channel),roughnessMapUv:L&&C(D.roughnessMap.channel),anisotropyMapUv:wt&&C(D.anisotropyMap.channel),clearcoatMapUv:Pt&&C(D.clearcoatMap.channel),clearcoatNormalMapUv:me&&C(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&C(D.clearcoatRoughnessMap.channel),iridescenceMapUv:Bt&&C(D.iridescenceMap.channel),iridescenceThicknessMapUv:qt&&C(D.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&C(D.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&C(D.sheenRoughnessMap.channel),specularMapUv:Jt&&C(D.specularMap.channel),specularColorMapUv:re&&C(D.specularColorMap.channel),specularIntensityMapUv:Fe&&C(D.specularIntensityMap.channel),transmissionMapUv:j&&C(D.transmissionMap.channel),thicknessMapUv:Rt&&C(D.thicknessMap.channel),alphaMapUv:vt&&C(D.alphaMap.channel),vertexTangents:!!mt.attributes.tangent&&(pe||T),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!mt.attributes.color&&mt.attributes.color.itemSize===4,pointsUvs:ot.isPoints===!0&&!!mt.attributes.uv&&(Oe||vt),fog:!!pt,useFog:D.fog===!0,fogExp2:!!pt&&pt.isFogExp2,flatShading:D.flatShading===!0,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:x,reverseDepthBuffer:Ht,skinning:ot.isSkinnedMesh===!0,morphTargets:mt.morphAttributes.position!==void 0,morphNormals:mt.morphAttributes.normal!==void 0,morphColors:mt.morphAttributes.color!==void 0,morphTargetsCount:F,morphTextureStride:at,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:D.dithering,shadowMapEnabled:o.shadowMap.enabled&&V.length>0,shadowMapType:o.shadowMap.type,toneMapping:qe,decodeVideoTexture:Oe&&D.map.isVideoTexture===!0&&Ce.getTransfer(D.map.colorSpace)===He,decodeVideoTextureEmissive:Ue&&D.emissiveMap.isVideoTexture===!0&&Ce.getTransfer(D.emissiveMap.colorSpace)===He,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===Li,flipSided:D.side===Vn,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:$t&&D.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($t&&D.extensions.multiDraw===!0||ae)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return ln.vertexUv1s=m.has(1),ln.vertexUv2s=m.has(2),ln.vertexUv3s=m.has(3),m.clear(),ln}function g(D){const w=[];if(D.shaderID?w.push(D.shaderID):(w.push(D.customVertexShaderID),w.push(D.customFragmentShaderID)),D.defines!==void 0)for(const V in D.defines)w.push(V),w.push(D.defines[V]);return D.isRawShaderMaterial===!1&&(N(w,D),O(w,D),w.push(o.outputColorSpace)),w.push(D.customProgramCacheKey),w.join()}function N(D,w){D.push(w.precision),D.push(w.outputColorSpace),D.push(w.envMapMode),D.push(w.envMapCubeUVHeight),D.push(w.mapUv),D.push(w.alphaMapUv),D.push(w.lightMapUv),D.push(w.aoMapUv),D.push(w.bumpMapUv),D.push(w.normalMapUv),D.push(w.displacementMapUv),D.push(w.emissiveMapUv),D.push(w.metalnessMapUv),D.push(w.roughnessMapUv),D.push(w.anisotropyMapUv),D.push(w.clearcoatMapUv),D.push(w.clearcoatNormalMapUv),D.push(w.clearcoatRoughnessMapUv),D.push(w.iridescenceMapUv),D.push(w.iridescenceThicknessMapUv),D.push(w.sheenColorMapUv),D.push(w.sheenRoughnessMapUv),D.push(w.specularMapUv),D.push(w.specularColorMapUv),D.push(w.specularIntensityMapUv),D.push(w.transmissionMapUv),D.push(w.thicknessMapUv),D.push(w.combine),D.push(w.fogExp2),D.push(w.sizeAttenuation),D.push(w.morphTargetsCount),D.push(w.morphAttributeCount),D.push(w.numDirLights),D.push(w.numPointLights),D.push(w.numSpotLights),D.push(w.numSpotLightMaps),D.push(w.numHemiLights),D.push(w.numRectAreaLights),D.push(w.numDirLightShadows),D.push(w.numPointLightShadows),D.push(w.numSpotLightShadows),D.push(w.numSpotLightShadowsWithMaps),D.push(w.numLightProbes),D.push(w.shadowMapType),D.push(w.toneMapping),D.push(w.numClippingPlanes),D.push(w.numClipIntersection),D.push(w.depthPacking)}function O(D,w){d.disableAll(),w.supportsVertexTextures&&d.enable(0),w.instancing&&d.enable(1),w.instancingColor&&d.enable(2),w.instancingMorph&&d.enable(3),w.matcap&&d.enable(4),w.envMap&&d.enable(5),w.normalMapObjectSpace&&d.enable(6),w.normalMapTangentSpace&&d.enable(7),w.clearcoat&&d.enable(8),w.iridescence&&d.enable(9),w.alphaTest&&d.enable(10),w.vertexColors&&d.enable(11),w.vertexAlphas&&d.enable(12),w.vertexUv1s&&d.enable(13),w.vertexUv2s&&d.enable(14),w.vertexUv3s&&d.enable(15),w.vertexTangents&&d.enable(16),w.anisotropy&&d.enable(17),w.alphaHash&&d.enable(18),w.batching&&d.enable(19),w.dispersion&&d.enable(20),w.batchingColor&&d.enable(21),D.push(d.mask),d.disableAll(),w.fog&&d.enable(0),w.useFog&&d.enable(1),w.flatShading&&d.enable(2),w.logarithmicDepthBuffer&&d.enable(3),w.reverseDepthBuffer&&d.enable(4),w.skinning&&d.enable(5),w.morphTargets&&d.enable(6),w.morphNormals&&d.enable(7),w.morphColors&&d.enable(8),w.premultipliedAlpha&&d.enable(9),w.shadowMapEnabled&&d.enable(10),w.doubleSided&&d.enable(11),w.flipSided&&d.enable(12),w.useDepthPacking&&d.enable(13),w.dithering&&d.enable(14),w.transmission&&d.enable(15),w.sheen&&d.enable(16),w.opaque&&d.enable(17),w.pointsUvs&&d.enable(18),w.decodeVideoTexture&&d.enable(19),w.decodeVideoTextureEmissive&&d.enable(20),w.alphaToCoverage&&d.enable(21),D.push(d.mask)}function U(D){const w=b[D.type];let V;if(w){const st=Ui[w];V=PS.clone(st.uniforms)}else V=D.uniforms;return V}function X(D,w){let V;for(let st=0,ot=v.length;st<ot;st++){const pt=v[st];if(pt.cacheKey===w){V=pt,++V.usedTimes;break}}return V===void 0&&(V=new oT(o,w,D,u),v.push(V)),V}function H(D){if(--D.usedTimes===0){const w=v.indexOf(D);v[w]=v[v.length-1],v.pop(),D.destroy()}}function P(D){p.remove(D)}function Q(){p.dispose()}return{getParameters:S,getProgramCacheKey:g,getUniforms:U,acquireProgram:X,releaseProgram:H,releaseShaderCache:P,programs:v,dispose:Q}}function dT(){let o=new WeakMap;function e(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function r(h){o.delete(h)}function l(h,d,p){o.get(h)[d]=p}function u(){o=new WeakMap}return{has:e,get:i,remove:r,update:l,dispose:u}}function hT(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function __(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function v_(){const o=[];let e=0;const i=[],r=[],l=[];function u(){e=0,i.length=0,r.length=0,l.length=0}function h(x,y,M,b,C,S){let g=o[e];return g===void 0?(g={id:x.id,object:x,geometry:y,material:M,groupOrder:b,renderOrder:x.renderOrder,z:C,group:S},o[e]=g):(g.id=x.id,g.object=x,g.geometry=y,g.material=M,g.groupOrder=b,g.renderOrder=x.renderOrder,g.z=C,g.group=S),e++,g}function d(x,y,M,b,C,S){const g=h(x,y,M,b,C,S);M.transmission>0?r.push(g):M.transparent===!0?l.push(g):i.push(g)}function p(x,y,M,b,C,S){const g=h(x,y,M,b,C,S);M.transmission>0?r.unshift(g):M.transparent===!0?l.unshift(g):i.unshift(g)}function m(x,y){i.length>1&&i.sort(x||hT),r.length>1&&r.sort(y||__),l.length>1&&l.sort(y||__)}function v(){for(let x=e,y=o.length;x<y;x++){const M=o[x];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:r,transparent:l,init:u,push:d,unshift:p,finish:v,sort:m}}function pT(){let o=new WeakMap;function e(r,l){const u=o.get(r);let h;return u===void 0?(h=new v_,o.set(r,[h])):l>=u.length?(h=new v_,u.push(h)):h=u[l],h}function i(){o=new WeakMap}return{get:e,dispose:i}}function mT(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new J,color:new be};break;case"SpotLight":i={position:new J,direction:new J,color:new be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new J,color:new be,distance:0,decay:0};break;case"HemisphereLight":i={direction:new J,skyColor:new be,groundColor:new be};break;case"RectAreaLight":i={color:new be,position:new J,halfWidth:new J,halfHeight:new J};break}return o[e.id]=i,i}}}function gT(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=i,i}}}let _T=0;function vT(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function xT(o){const e=new mT,i=gT(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)r.probe.push(new J);const l=new J,u=new Ze,h=new Ze;function d(m){let v=0,x=0,y=0;for(let D=0;D<9;D++)r.probe[D].set(0,0,0);let M=0,b=0,C=0,S=0,g=0,N=0,O=0,U=0,X=0,H=0,P=0;m.sort(vT);for(let D=0,w=m.length;D<w;D++){const V=m[D],st=V.color,ot=V.intensity,pt=V.distance,mt=V.shadow&&V.shadow.map?V.shadow.map.texture:null;if(V.isAmbientLight)v+=st.r*ot,x+=st.g*ot,y+=st.b*ot;else if(V.isLightProbe){for(let z=0;z<9;z++)r.probe[z].addScaledVector(V.sh.coefficients[z],ot);P++}else if(V.isDirectionalLight){const z=e.get(V);if(z.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const Z=V.shadow,q=i.get(V);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,r.directionalShadow[M]=q,r.directionalShadowMap[M]=mt,r.directionalShadowMatrix[M]=V.shadow.matrix,N++}r.directional[M]=z,M++}else if(V.isSpotLight){const z=e.get(V);z.position.setFromMatrixPosition(V.matrixWorld),z.color.copy(st).multiplyScalar(ot),z.distance=pt,z.coneCos=Math.cos(V.angle),z.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),z.decay=V.decay,r.spot[C]=z;const Z=V.shadow;if(V.map&&(r.spotLightMap[X]=V.map,X++,Z.updateMatrices(V),V.castShadow&&H++),r.spotLightMatrix[C]=Z.matrix,V.castShadow){const q=i.get(V);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,r.spotShadow[C]=q,r.spotShadowMap[C]=mt,U++}C++}else if(V.isRectAreaLight){const z=e.get(V);z.color.copy(st).multiplyScalar(ot),z.halfWidth.set(V.width*.5,0,0),z.halfHeight.set(0,V.height*.5,0),r.rectArea[S]=z,S++}else if(V.isPointLight){const z=e.get(V);if(z.color.copy(V.color).multiplyScalar(V.intensity),z.distance=V.distance,z.decay=V.decay,V.castShadow){const Z=V.shadow,q=i.get(V);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,q.shadowCameraNear=Z.camera.near,q.shadowCameraFar=Z.camera.far,r.pointShadow[b]=q,r.pointShadowMap[b]=mt,r.pointShadowMatrix[b]=V.shadow.matrix,O++}r.point[b]=z,b++}else if(V.isHemisphereLight){const z=e.get(V);z.skyColor.copy(V.color).multiplyScalar(ot),z.groundColor.copy(V.groundColor).multiplyScalar(ot),r.hemi[g]=z,g++}}S>0&&(o.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Lt.LTC_FLOAT_1,r.rectAreaLTC2=Lt.LTC_FLOAT_2):(r.rectAreaLTC1=Lt.LTC_HALF_1,r.rectAreaLTC2=Lt.LTC_HALF_2)),r.ambient[0]=v,r.ambient[1]=x,r.ambient[2]=y;const Q=r.hash;(Q.directionalLength!==M||Q.pointLength!==b||Q.spotLength!==C||Q.rectAreaLength!==S||Q.hemiLength!==g||Q.numDirectionalShadows!==N||Q.numPointShadows!==O||Q.numSpotShadows!==U||Q.numSpotMaps!==X||Q.numLightProbes!==P)&&(r.directional.length=M,r.spot.length=C,r.rectArea.length=S,r.point.length=b,r.hemi.length=g,r.directionalShadow.length=N,r.directionalShadowMap.length=N,r.pointShadow.length=O,r.pointShadowMap.length=O,r.spotShadow.length=U,r.spotShadowMap.length=U,r.directionalShadowMatrix.length=N,r.pointShadowMatrix.length=O,r.spotLightMatrix.length=U+X-H,r.spotLightMap.length=X,r.numSpotLightShadowsWithMaps=H,r.numLightProbes=P,Q.directionalLength=M,Q.pointLength=b,Q.spotLength=C,Q.rectAreaLength=S,Q.hemiLength=g,Q.numDirectionalShadows=N,Q.numPointShadows=O,Q.numSpotShadows=U,Q.numSpotMaps=X,Q.numLightProbes=P,r.version=_T++)}function p(m,v){let x=0,y=0,M=0,b=0,C=0;const S=v.matrixWorldInverse;for(let g=0,N=m.length;g<N;g++){const O=m[g];if(O.isDirectionalLight){const U=r.directional[x];U.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(S),x++}else if(O.isSpotLight){const U=r.spot[M];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(S),U.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(S),M++}else if(O.isRectAreaLight){const U=r.rectArea[b];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(S),h.identity(),u.copy(O.matrixWorld),u.premultiply(S),h.extractRotation(u),U.halfWidth.set(O.width*.5,0,0),U.halfHeight.set(0,O.height*.5,0),U.halfWidth.applyMatrix4(h),U.halfHeight.applyMatrix4(h),b++}else if(O.isPointLight){const U=r.point[y];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(S),y++}else if(O.isHemisphereLight){const U=r.hemi[C];U.direction.setFromMatrixPosition(O.matrixWorld),U.direction.transformDirection(S),C++}}}return{setup:d,setupView:p,state:r}}function x_(o){const e=new xT(o),i=[],r=[];function l(v){m.camera=v,i.length=0,r.length=0}function u(v){i.push(v)}function h(v){r.push(v)}function d(){e.setup(i)}function p(v){e.setupView(i,v)}const m={lightsArray:i,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:l,state:m,setupLights:d,setupLightsView:p,pushLight:u,pushShadow:h}}function yT(o){let e=new WeakMap;function i(l,u=0){const h=e.get(l);let d;return h===void 0?(d=new x_(o),e.set(l,[d])):u>=h.length?(d=new x_(o),h.push(d)):d=h[u],d}function r(){e=new WeakMap}return{get:i,dispose:r}}const ST=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,MT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ET(o,e,i){let r=new bh;const l=new De,u=new De,h=new Ge,d=new XS({depthPacking:sS}),p=new qS,m={},v=i.maxTextureSize,x={[Ga]:Vn,[Vn]:Ga,[Li]:Li},y=new Va({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:ST,fragmentShader:MT}),M=y.clone();M.defines.HORIZONTAL_PASS=1;const b=new Ti;b.setAttribute("position",new bi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new fi(b,y),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=C_;let g=this.type;this.render=function(H,P,Q){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||H.length===0)return;const D=o.getRenderTarget(),w=o.getActiveCubeFace(),V=o.getActiveMipmapLevel(),st=o.state;st.setBlending(Ia),st.buffers.color.setClear(1,1,1,1),st.buffers.depth.setTest(!0),st.setScissorTest(!1);const ot=g!==aa&&this.type===aa,pt=g===aa&&this.type!==aa;for(let mt=0,z=H.length;mt<z;mt++){const Z=H[mt],q=Z.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;l.copy(q.mapSize);const xt=q.getFrameExtents();if(l.multiply(xt),u.copy(q.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(u.x=Math.floor(v/xt.x),l.x=u.x*xt.x,q.mapSize.x=u.x),l.y>v&&(u.y=Math.floor(v/xt.y),l.y=u.y*xt.y,q.mapSize.y=u.y)),q.map===null||ot===!0||pt===!0){const F=this.type!==aa?{minFilter:Ei,magFilter:Ei}:{};q.map!==null&&q.map.dispose(),q.map=new Mr(l.x,l.y,F),q.map.texture.name=Z.name+".shadowMap",q.camera.updateProjectionMatrix()}o.setRenderTarget(q.map),o.clear();const bt=q.getViewportCount();for(let F=0;F<bt;F++){const at=q.getViewport(F);h.set(u.x*at.x,u.y*at.y,u.x*at.z,u.y*at.w),st.viewport(h),q.updateMatrices(Z,F),r=q.getFrustum(),U(P,Q,q.camera,Z,this.type)}q.isPointLightShadow!==!0&&this.type===aa&&N(q,Q),q.needsUpdate=!1}g=this.type,S.needsUpdate=!1,o.setRenderTarget(D,w,V)};function N(H,P){const Q=e.update(C);y.defines.VSM_SAMPLES!==H.blurSamples&&(y.defines.VSM_SAMPLES=H.blurSamples,M.defines.VSM_SAMPLES=H.blurSamples,y.needsUpdate=!0,M.needsUpdate=!0),H.mapPass===null&&(H.mapPass=new Mr(l.x,l.y)),y.uniforms.shadow_pass.value=H.map.texture,y.uniforms.resolution.value=H.mapSize,y.uniforms.radius.value=H.radius,o.setRenderTarget(H.mapPass),o.clear(),o.renderBufferDirect(P,null,Q,y,C,null),M.uniforms.shadow_pass.value=H.mapPass.texture,M.uniforms.resolution.value=H.mapSize,M.uniforms.radius.value=H.radius,o.setRenderTarget(H.map),o.clear(),o.renderBufferDirect(P,null,Q,M,C,null)}function O(H,P,Q,D){let w=null;const V=Q.isPointLight===!0?H.customDistanceMaterial:H.customDepthMaterial;if(V!==void 0)w=V;else if(w=Q.isPointLight===!0?p:d,o.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const st=w.uuid,ot=P.uuid;let pt=m[st];pt===void 0&&(pt={},m[st]=pt);let mt=pt[ot];mt===void 0&&(mt=w.clone(),pt[ot]=mt,P.addEventListener("dispose",X)),w=mt}if(w.visible=P.visible,w.wireframe=P.wireframe,D===aa?w.side=P.shadowSide!==null?P.shadowSide:P.side:w.side=P.shadowSide!==null?P.shadowSide:x[P.side],w.alphaMap=P.alphaMap,w.alphaTest=P.alphaTest,w.map=P.map,w.clipShadows=P.clipShadows,w.clippingPlanes=P.clippingPlanes,w.clipIntersection=P.clipIntersection,w.displacementMap=P.displacementMap,w.displacementScale=P.displacementScale,w.displacementBias=P.displacementBias,w.wireframeLinewidth=P.wireframeLinewidth,w.linewidth=P.linewidth,Q.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const st=o.properties.get(w);st.light=Q}return w}function U(H,P,Q,D,w){if(H.visible===!1)return;if(H.layers.test(P.layers)&&(H.isMesh||H.isLine||H.isPoints)&&(H.castShadow||H.receiveShadow&&w===aa)&&(!H.frustumCulled||r.intersectsObject(H))){H.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,H.matrixWorld);const ot=e.update(H),pt=H.material;if(Array.isArray(pt)){const mt=ot.groups;for(let z=0,Z=mt.length;z<Z;z++){const q=mt[z],xt=pt[q.materialIndex];if(xt&&xt.visible){const bt=O(H,xt,D,w);H.onBeforeShadow(o,H,P,Q,ot,bt,q),o.renderBufferDirect(Q,null,ot,bt,H,q),H.onAfterShadow(o,H,P,Q,ot,bt,q)}}}else if(pt.visible){const mt=O(H,pt,D,w);H.onBeforeShadow(o,H,P,Q,ot,mt,null),o.renderBufferDirect(Q,null,ot,mt,H,null),H.onAfterShadow(o,H,P,Q,ot,mt,null)}}const st=H.children;for(let ot=0,pt=st.length;ot<pt;ot++)U(st[ot],P,Q,D,w)}function X(H){H.target.removeEventListener("dispose",X);for(const Q in m){const D=m[Q],w=H.target.uuid;w in D&&(D[w].dispose(),delete D[w])}}}const bT={[wd]:Dd,[Ud]:Od,[Ld]:Fd,[Ss]:Nd,[Dd]:wd,[Od]:Ud,[Fd]:Ld,[Nd]:Ss};function TT(o,e){function i(){let j=!1;const Rt=new Ge;let ct=null;const vt=new Ge(0,0,0,0);return{setMask:function(Ct){ct!==Ct&&!j&&(o.colorMask(Ct,Ct,Ct,Ct),ct=Ct)},setLocked:function(Ct){j=Ct},setClear:function(Ct,Dt,$t,qe,ln){ln===!0&&(Ct*=qe,Dt*=qe,$t*=qe),Rt.set(Ct,Dt,$t,qe),vt.equals(Rt)===!1&&(o.clearColor(Ct,Dt,$t,qe),vt.copy(Rt))},reset:function(){j=!1,ct=null,vt.set(-1,0,0,0)}}}function r(){let j=!1,Rt=!1,ct=null,vt=null,Ct=null;return{setReversed:function(Dt){if(Rt!==Dt){const $t=e.get("EXT_clip_control");Rt?$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.ZERO_TO_ONE_EXT):$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.NEGATIVE_ONE_TO_ONE_EXT);const qe=Ct;Ct=null,this.setClear(qe)}Rt=Dt},getReversed:function(){return Rt},setTest:function(Dt){Dt?yt(o.DEPTH_TEST):Ht(o.DEPTH_TEST)},setMask:function(Dt){ct!==Dt&&!j&&(o.depthMask(Dt),ct=Dt)},setFunc:function(Dt){if(Rt&&(Dt=bT[Dt]),vt!==Dt){switch(Dt){case wd:o.depthFunc(o.NEVER);break;case Dd:o.depthFunc(o.ALWAYS);break;case Ud:o.depthFunc(o.LESS);break;case Ss:o.depthFunc(o.LEQUAL);break;case Ld:o.depthFunc(o.EQUAL);break;case Nd:o.depthFunc(o.GEQUAL);break;case Od:o.depthFunc(o.GREATER);break;case Fd:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}vt=Dt}},setLocked:function(Dt){j=Dt},setClear:function(Dt){Ct!==Dt&&(Rt&&(Dt=1-Dt),o.clearDepth(Dt),Ct=Dt)},reset:function(){j=!1,ct=null,vt=null,Ct=null,Rt=!1}}}function l(){let j=!1,Rt=null,ct=null,vt=null,Ct=null,Dt=null,$t=null,qe=null,ln=null;return{setTest:function(Ee){j||(Ee?yt(o.STENCIL_TEST):Ht(o.STENCIL_TEST))},setMask:function(Ee){Rt!==Ee&&!j&&(o.stencilMask(Ee),Rt=Ee)},setFunc:function(Ee,gn,di){(ct!==Ee||vt!==gn||Ct!==di)&&(o.stencilFunc(Ee,gn,di),ct=Ee,vt=gn,Ct=di)},setOp:function(Ee,gn,di){(Dt!==Ee||$t!==gn||qe!==di)&&(o.stencilOp(Ee,gn,di),Dt=Ee,$t=gn,qe=di)},setLocked:function(Ee){j=Ee},setClear:function(Ee){ln!==Ee&&(o.clearStencil(Ee),ln=Ee)},reset:function(){j=!1,Rt=null,ct=null,vt=null,Ct=null,Dt=null,$t=null,qe=null,ln=null}}}const u=new i,h=new r,d=new l,p=new WeakMap,m=new WeakMap;let v={},x={},y=new WeakMap,M=[],b=null,C=!1,S=null,g=null,N=null,O=null,U=null,X=null,H=null,P=new be(0,0,0),Q=0,D=!1,w=null,V=null,st=null,ot=null,pt=null;const mt=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Z=0;const q=o.getParameter(o.VERSION);q.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(q)[1]),z=Z>=1):q.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),z=Z>=2);let xt=null,bt={};const F=o.getParameter(o.SCISSOR_BOX),at=o.getParameter(o.VIEWPORT),St=new Ge().fromArray(F),K=new Ge().fromArray(at);function ft(j,Rt,ct,vt){const Ct=new Uint8Array(4),Dt=o.createTexture();o.bindTexture(j,Dt),o.texParameteri(j,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(j,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let $t=0;$t<ct;$t++)j===o.TEXTURE_3D||j===o.TEXTURE_2D_ARRAY?o.texImage3D(Rt,0,o.RGBA,1,1,vt,0,o.RGBA,o.UNSIGNED_BYTE,Ct):o.texImage2D(Rt+$t,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,Ct);return Dt}const Et={};Et[o.TEXTURE_2D]=ft(o.TEXTURE_2D,o.TEXTURE_2D,1),Et[o.TEXTURE_CUBE_MAP]=ft(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[o.TEXTURE_2D_ARRAY]=ft(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),Et[o.TEXTURE_3D]=ft(o.TEXTURE_3D,o.TEXTURE_3D,1,1),u.setClear(0,0,0,1),h.setClear(1),d.setClear(0),yt(o.DEPTH_TEST),h.setFunc(Ss),ue(!1),pe(v0),yt(o.CULL_FACE),I(Ia);function yt(j){v[j]!==!0&&(o.enable(j),v[j]=!0)}function Ht(j){v[j]!==!1&&(o.disable(j),v[j]=!1)}function zt(j,Rt){return x[j]!==Rt?(o.bindFramebuffer(j,Rt),x[j]=Rt,j===o.DRAW_FRAMEBUFFER&&(x[o.FRAMEBUFFER]=Rt),j===o.FRAMEBUFFER&&(x[o.DRAW_FRAMEBUFFER]=Rt),!0):!1}function ae(j,Rt){let ct=M,vt=!1;if(j){ct=y.get(Rt),ct===void 0&&(ct=[],y.set(Rt,ct));const Ct=j.textures;if(ct.length!==Ct.length||ct[0]!==o.COLOR_ATTACHMENT0){for(let Dt=0,$t=Ct.length;Dt<$t;Dt++)ct[Dt]=o.COLOR_ATTACHMENT0+Dt;ct.length=Ct.length,vt=!0}}else ct[0]!==o.BACK&&(ct[0]=o.BACK,vt=!0);vt&&o.drawBuffers(ct)}function Oe(j){return b!==j?(o.useProgram(j),b=j,!0):!1}const fe={[_r]:o.FUNC_ADD,[Ly]:o.FUNC_SUBTRACT,[Ny]:o.FUNC_REVERSE_SUBTRACT};fe[Oy]=o.MIN,fe[Fy]=o.MAX;const Xe={[zy]:o.ZERO,[Py]:o.ONE,[By]:o.SRC_COLOR,[Rd]:o.SRC_ALPHA,[jy]:o.SRC_ALPHA_SATURATE,[Vy]:o.DST_COLOR,[Hy]:o.DST_ALPHA,[Iy]:o.ONE_MINUS_SRC_COLOR,[Cd]:o.ONE_MINUS_SRC_ALPHA,[ky]:o.ONE_MINUS_DST_COLOR,[Gy]:o.ONE_MINUS_DST_ALPHA,[Wy]:o.CONSTANT_COLOR,[Xy]:o.ONE_MINUS_CONSTANT_COLOR,[qy]:o.CONSTANT_ALPHA,[Yy]:o.ONE_MINUS_CONSTANT_ALPHA};function I(j,Rt,ct,vt,Ct,Dt,$t,qe,ln,Ee){if(j===Ia){C===!0&&(Ht(o.BLEND),C=!1);return}if(C===!1&&(yt(o.BLEND),C=!0),j!==Uy){if(j!==S||Ee!==D){if((g!==_r||U!==_r)&&(o.blendEquation(o.FUNC_ADD),g=_r,U=_r),Ee)switch(j){case vs:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case x0:o.blendFunc(o.ONE,o.ONE);break;case y0:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case S0:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}else switch(j){case vs:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case x0:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case y0:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case S0:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}N=null,O=null,X=null,H=null,P.set(0,0,0),Q=0,S=j,D=Ee}return}Ct=Ct||Rt,Dt=Dt||ct,$t=$t||vt,(Rt!==g||Ct!==U)&&(o.blendEquationSeparate(fe[Rt],fe[Ct]),g=Rt,U=Ct),(ct!==N||vt!==O||Dt!==X||$t!==H)&&(o.blendFuncSeparate(Xe[ct],Xe[vt],Xe[Dt],Xe[$t]),N=ct,O=vt,X=Dt,H=$t),(qe.equals(P)===!1||ln!==Q)&&(o.blendColor(qe.r,qe.g,qe.b,ln),P.copy(qe),Q=ln),S=j,D=!1}function En(j,Rt){j.side===Li?Ht(o.CULL_FACE):yt(o.CULL_FACE);let ct=j.side===Vn;Rt&&(ct=!ct),ue(ct),j.blending===vs&&j.transparent===!1?I(Ia):I(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),h.setFunc(j.depthFunc),h.setTest(j.depthTest),h.setMask(j.depthWrite),u.setMask(j.colorWrite);const vt=j.stencilWrite;d.setTest(vt),vt&&(d.setMask(j.stencilWriteMask),d.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),d.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass)),Ue(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?yt(o.SAMPLE_ALPHA_TO_COVERAGE):Ht(o.SAMPLE_ALPHA_TO_COVERAGE)}function ue(j){w!==j&&(j?o.frontFace(o.CW):o.frontFace(o.CCW),w=j)}function pe(j){j!==Cy?(yt(o.CULL_FACE),j!==V&&(j===v0?o.cullFace(o.BACK):j===wy?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Ht(o.CULL_FACE),V=j}function Xt(j){j!==st&&(z&&o.lineWidth(j),st=j)}function Ue(j,Rt,ct){j?(yt(o.POLYGON_OFFSET_FILL),(ot!==Rt||pt!==ct)&&(o.polygonOffset(Rt,ct),ot=Rt,pt=ct)):Ht(o.POLYGON_OFFSET_FILL)}function jt(j){j?yt(o.SCISSOR_TEST):Ht(o.SCISSOR_TEST)}function L(j){j===void 0&&(j=o.TEXTURE0+mt-1),xt!==j&&(o.activeTexture(j),xt=j)}function T(j,Rt,ct){ct===void 0&&(xt===null?ct=o.TEXTURE0+mt-1:ct=xt);let vt=bt[ct];vt===void 0&&(vt={type:void 0,texture:void 0},bt[ct]=vt),(vt.type!==j||vt.texture!==Rt)&&(xt!==ct&&(o.activeTexture(ct),xt=ct),o.bindTexture(j,Rt||Et[j]),vt.type=j,vt.texture=Rt)}function nt(){const j=bt[xt];j!==void 0&&j.type!==void 0&&(o.bindTexture(j.type,null),j.type=void 0,j.texture=void 0)}function dt(){try{o.compressedTexImage2D.apply(o,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Mt(){try{o.compressedTexImage3D.apply(o,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function gt(){try{o.texSubImage2D.apply(o,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Vt(){try{o.texSubImage3D.apply(o,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function wt(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Pt(){try{o.compressedTexSubImage3D.apply(o,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function me(){try{o.texStorage2D.apply(o,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function At(){try{o.texStorage3D.apply(o,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Bt(){try{o.texImage2D.apply(o,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function qt(){try{o.texImage3D.apply(o,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function kt(j){St.equals(j)===!1&&(o.scissor(j.x,j.y,j.z,j.w),St.copy(j))}function Ot(j){K.equals(j)===!1&&(o.viewport(j.x,j.y,j.z,j.w),K.copy(j))}function Jt(j,Rt){let ct=m.get(Rt);ct===void 0&&(ct=new WeakMap,m.set(Rt,ct));let vt=ct.get(j);vt===void 0&&(vt=o.getUniformBlockIndex(Rt,j.name),ct.set(j,vt))}function re(j,Rt){const vt=m.get(Rt).get(j);p.get(Rt)!==vt&&(o.uniformBlockBinding(Rt,vt,j.__bindingPointIndex),p.set(Rt,vt))}function Fe(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),v={},xt=null,bt={},x={},y=new WeakMap,M=[],b=null,C=!1,S=null,g=null,N=null,O=null,U=null,X=null,H=null,P=new be(0,0,0),Q=0,D=!1,w=null,V=null,st=null,ot=null,pt=null,St.set(0,0,o.canvas.width,o.canvas.height),K.set(0,0,o.canvas.width,o.canvas.height),u.reset(),h.reset(),d.reset()}return{buffers:{color:u,depth:h,stencil:d},enable:yt,disable:Ht,bindFramebuffer:zt,drawBuffers:ae,useProgram:Oe,setBlending:I,setMaterial:En,setFlipSided:ue,setCullFace:pe,setLineWidth:Xt,setPolygonOffset:Ue,setScissorTest:jt,activeTexture:L,bindTexture:T,unbindTexture:nt,compressedTexImage2D:dt,compressedTexImage3D:Mt,texImage2D:Bt,texImage3D:qt,updateUBOMapping:Jt,uniformBlockBinding:re,texStorage2D:me,texStorage3D:At,texSubImage2D:gt,texSubImage3D:Vt,compressedTexSubImage2D:wt,compressedTexSubImage3D:Pt,scissor:kt,viewport:Ot,reset:Fe}}function AT(o,e,i,r,l,u,h){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new De,v=new WeakMap;let x;const y=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(L,T){return M?new OffscreenCanvas(L,T):Cc("canvas")}function C(L,T,nt){let dt=1;const Mt=jt(L);if((Mt.width>nt||Mt.height>nt)&&(dt=nt/Math.max(Mt.width,Mt.height)),dt<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const gt=Math.floor(dt*Mt.width),Vt=Math.floor(dt*Mt.height);x===void 0&&(x=b(gt,Vt));const wt=T?b(gt,Vt):x;return wt.width=gt,wt.height=Vt,wt.getContext("2d").drawImage(L,0,0,gt,Vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Mt.width+"x"+Mt.height+") to ("+gt+"x"+Vt+")."),wt}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Mt.width+"x"+Mt.height+")."),L;return L}function S(L){return L.generateMipmaps}function g(L){o.generateMipmap(L)}function N(L){return L.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?o.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function O(L,T,nt,dt,Mt=!1){if(L!==null){if(o[L]!==void 0)return o[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let gt=T;if(T===o.RED&&(nt===o.FLOAT&&(gt=o.R32F),nt===o.HALF_FLOAT&&(gt=o.R16F),nt===o.UNSIGNED_BYTE&&(gt=o.R8)),T===o.RED_INTEGER&&(nt===o.UNSIGNED_BYTE&&(gt=o.R8UI),nt===o.UNSIGNED_SHORT&&(gt=o.R16UI),nt===o.UNSIGNED_INT&&(gt=o.R32UI),nt===o.BYTE&&(gt=o.R8I),nt===o.SHORT&&(gt=o.R16I),nt===o.INT&&(gt=o.R32I)),T===o.RG&&(nt===o.FLOAT&&(gt=o.RG32F),nt===o.HALF_FLOAT&&(gt=o.RG16F),nt===o.UNSIGNED_BYTE&&(gt=o.RG8)),T===o.RG_INTEGER&&(nt===o.UNSIGNED_BYTE&&(gt=o.RG8UI),nt===o.UNSIGNED_SHORT&&(gt=o.RG16UI),nt===o.UNSIGNED_INT&&(gt=o.RG32UI),nt===o.BYTE&&(gt=o.RG8I),nt===o.SHORT&&(gt=o.RG16I),nt===o.INT&&(gt=o.RG32I)),T===o.RGB_INTEGER&&(nt===o.UNSIGNED_BYTE&&(gt=o.RGB8UI),nt===o.UNSIGNED_SHORT&&(gt=o.RGB16UI),nt===o.UNSIGNED_INT&&(gt=o.RGB32UI),nt===o.BYTE&&(gt=o.RGB8I),nt===o.SHORT&&(gt=o.RGB16I),nt===o.INT&&(gt=o.RGB32I)),T===o.RGBA_INTEGER&&(nt===o.UNSIGNED_BYTE&&(gt=o.RGBA8UI),nt===o.UNSIGNED_SHORT&&(gt=o.RGBA16UI),nt===o.UNSIGNED_INT&&(gt=o.RGBA32UI),nt===o.BYTE&&(gt=o.RGBA8I),nt===o.SHORT&&(gt=o.RGBA16I),nt===o.INT&&(gt=o.RGBA32I)),T===o.RGB&&nt===o.UNSIGNED_INT_5_9_9_9_REV&&(gt=o.RGB9_E5),T===o.RGBA){const Vt=Mt?Ac:Ce.getTransfer(dt);nt===o.FLOAT&&(gt=o.RGBA32F),nt===o.HALF_FLOAT&&(gt=o.RGBA16F),nt===o.UNSIGNED_BYTE&&(gt=Vt===He?o.SRGB8_ALPHA8:o.RGBA8),nt===o.UNSIGNED_SHORT_4_4_4_4&&(gt=o.RGBA4),nt===o.UNSIGNED_SHORT_5_5_5_1&&(gt=o.RGB5_A1)}return(gt===o.R16F||gt===o.R32F||gt===o.RG16F||gt===o.RG32F||gt===o.RGBA16F||gt===o.RGBA32F)&&e.get("EXT_color_buffer_float"),gt}function U(L,T){let nt;return L?T===null||T===Sr||T===bs?nt=o.DEPTH24_STENCIL8:T===ra?nt=o.DEPTH32F_STENCIL8:T===No&&(nt=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Sr||T===bs?nt=o.DEPTH_COMPONENT24:T===ra?nt=o.DEPTH_COMPONENT32F:T===No&&(nt=o.DEPTH_COMPONENT16),nt}function X(L,T){return S(L)===!0||L.isFramebufferTexture&&L.minFilter!==Ei&&L.minFilter!==Ni?Math.log2(Math.max(T.width,T.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?T.mipmaps.length:1}function H(L){const T=L.target;T.removeEventListener("dispose",H),Q(T),T.isVideoTexture&&v.delete(T)}function P(L){const T=L.target;T.removeEventListener("dispose",P),w(T)}function Q(L){const T=r.get(L);if(T.__webglInit===void 0)return;const nt=L.source,dt=y.get(nt);if(dt){const Mt=dt[T.__cacheKey];Mt.usedTimes--,Mt.usedTimes===0&&D(L),Object.keys(dt).length===0&&y.delete(nt)}r.remove(L)}function D(L){const T=r.get(L);o.deleteTexture(T.__webglTexture);const nt=L.source,dt=y.get(nt);delete dt[T.__cacheKey],h.memory.textures--}function w(L){const T=r.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),r.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let dt=0;dt<6;dt++){if(Array.isArray(T.__webglFramebuffer[dt]))for(let Mt=0;Mt<T.__webglFramebuffer[dt].length;Mt++)o.deleteFramebuffer(T.__webglFramebuffer[dt][Mt]);else o.deleteFramebuffer(T.__webglFramebuffer[dt]);T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer[dt])}else{if(Array.isArray(T.__webglFramebuffer))for(let dt=0;dt<T.__webglFramebuffer.length;dt++)o.deleteFramebuffer(T.__webglFramebuffer[dt]);else o.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&o.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let dt=0;dt<T.__webglColorRenderbuffer.length;dt++)T.__webglColorRenderbuffer[dt]&&o.deleteRenderbuffer(T.__webglColorRenderbuffer[dt]);T.__webglDepthRenderbuffer&&o.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const nt=L.textures;for(let dt=0,Mt=nt.length;dt<Mt;dt++){const gt=r.get(nt[dt]);gt.__webglTexture&&(o.deleteTexture(gt.__webglTexture),h.memory.textures--),r.remove(nt[dt])}r.remove(L)}let V=0;function st(){V=0}function ot(){const L=V;return L>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+l.maxTextures),V+=1,L}function pt(L){const T=[];return T.push(L.wrapS),T.push(L.wrapT),T.push(L.wrapR||0),T.push(L.magFilter),T.push(L.minFilter),T.push(L.anisotropy),T.push(L.internalFormat),T.push(L.format),T.push(L.type),T.push(L.generateMipmaps),T.push(L.premultiplyAlpha),T.push(L.flipY),T.push(L.unpackAlignment),T.push(L.colorSpace),T.join()}function mt(L,T){const nt=r.get(L);if(L.isVideoTexture&&Xt(L),L.isRenderTargetTexture===!1&&L.version>0&&nt.__version!==L.version){const dt=L.image;if(dt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(nt,L,T);return}}i.bindTexture(o.TEXTURE_2D,nt.__webglTexture,o.TEXTURE0+T)}function z(L,T){const nt=r.get(L);if(L.version>0&&nt.__version!==L.version){K(nt,L,T);return}i.bindTexture(o.TEXTURE_2D_ARRAY,nt.__webglTexture,o.TEXTURE0+T)}function Z(L,T){const nt=r.get(L);if(L.version>0&&nt.__version!==L.version){K(nt,L,T);return}i.bindTexture(o.TEXTURE_3D,nt.__webglTexture,o.TEXTURE0+T)}function q(L,T){const nt=r.get(L);if(L.version>0&&nt.__version!==L.version){ft(nt,L,T);return}i.bindTexture(o.TEXTURE_CUBE_MAP,nt.__webglTexture,o.TEXTURE0+T)}const xt={[Bd]:o.REPEAT,[xr]:o.CLAMP_TO_EDGE,[Id]:o.MIRRORED_REPEAT},bt={[Ei]:o.NEAREST,[aS]:o.NEAREST_MIPMAP_NEAREST,[Kl]:o.NEAREST_MIPMAP_LINEAR,[Ni]:o.LINEAR,[Wf]:o.LINEAR_MIPMAP_NEAREST,[yr]:o.LINEAR_MIPMAP_LINEAR},F={[lS]:o.NEVER,[pS]:o.ALWAYS,[cS]:o.LESS,[V_]:o.LEQUAL,[uS]:o.EQUAL,[hS]:o.GEQUAL,[fS]:o.GREATER,[dS]:o.NOTEQUAL};function at(L,T){if(T.type===ra&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Ni||T.magFilter===Wf||T.magFilter===Kl||T.magFilter===yr||T.minFilter===Ni||T.minFilter===Wf||T.minFilter===Kl||T.minFilter===yr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(L,o.TEXTURE_WRAP_S,xt[T.wrapS]),o.texParameteri(L,o.TEXTURE_WRAP_T,xt[T.wrapT]),(L===o.TEXTURE_3D||L===o.TEXTURE_2D_ARRAY)&&o.texParameteri(L,o.TEXTURE_WRAP_R,xt[T.wrapR]),o.texParameteri(L,o.TEXTURE_MAG_FILTER,bt[T.magFilter]),o.texParameteri(L,o.TEXTURE_MIN_FILTER,bt[T.minFilter]),T.compareFunction&&(o.texParameteri(L,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(L,o.TEXTURE_COMPARE_FUNC,F[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Ei||T.minFilter!==Kl&&T.minFilter!==yr||T.type===ra&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||r.get(T).__currentAnisotropy){const nt=e.get("EXT_texture_filter_anisotropic");o.texParameterf(L,nt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),r.get(T).__currentAnisotropy=T.anisotropy}}}function St(L,T){let nt=!1;L.__webglInit===void 0&&(L.__webglInit=!0,T.addEventListener("dispose",H));const dt=T.source;let Mt=y.get(dt);Mt===void 0&&(Mt={},y.set(dt,Mt));const gt=pt(T);if(gt!==L.__cacheKey){Mt[gt]===void 0&&(Mt[gt]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,nt=!0),Mt[gt].usedTimes++;const Vt=Mt[L.__cacheKey];Vt!==void 0&&(Mt[L.__cacheKey].usedTimes--,Vt.usedTimes===0&&D(T)),L.__cacheKey=gt,L.__webglTexture=Mt[gt].texture}return nt}function K(L,T,nt){let dt=o.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(dt=o.TEXTURE_2D_ARRAY),T.isData3DTexture&&(dt=o.TEXTURE_3D);const Mt=St(L,T),gt=T.source;i.bindTexture(dt,L.__webglTexture,o.TEXTURE0+nt);const Vt=r.get(gt);if(gt.version!==Vt.__version||Mt===!0){i.activeTexture(o.TEXTURE0+nt);const wt=Ce.getPrimaries(Ce.workingColorSpace),Pt=T.colorSpace===Ba?null:Ce.getPrimaries(T.colorSpace),me=T.colorSpace===Ba||wt===Pt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let At=C(T.image,!1,l.maxTextureSize);At=Ue(T,At);const Bt=u.convert(T.format,T.colorSpace),qt=u.convert(T.type);let kt=O(T.internalFormat,Bt,qt,T.colorSpace,T.isVideoTexture);at(dt,T);let Ot;const Jt=T.mipmaps,re=T.isVideoTexture!==!0,Fe=Vt.__version===void 0||Mt===!0,j=gt.dataReady,Rt=X(T,At);if(T.isDepthTexture)kt=U(T.format===Ts,T.type),Fe&&(re?i.texStorage2D(o.TEXTURE_2D,1,kt,At.width,At.height):i.texImage2D(o.TEXTURE_2D,0,kt,At.width,At.height,0,Bt,qt,null));else if(T.isDataTexture)if(Jt.length>0){re&&Fe&&i.texStorage2D(o.TEXTURE_2D,Rt,kt,Jt[0].width,Jt[0].height);for(let ct=0,vt=Jt.length;ct<vt;ct++)Ot=Jt[ct],re?j&&i.texSubImage2D(o.TEXTURE_2D,ct,0,0,Ot.width,Ot.height,Bt,qt,Ot.data):i.texImage2D(o.TEXTURE_2D,ct,kt,Ot.width,Ot.height,0,Bt,qt,Ot.data);T.generateMipmaps=!1}else re?(Fe&&i.texStorage2D(o.TEXTURE_2D,Rt,kt,At.width,At.height),j&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,At.width,At.height,Bt,qt,At.data)):i.texImage2D(o.TEXTURE_2D,0,kt,At.width,At.height,0,Bt,qt,At.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){re&&Fe&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Rt,kt,Jt[0].width,Jt[0].height,At.depth);for(let ct=0,vt=Jt.length;ct<vt;ct++)if(Ot=Jt[ct],T.format!==Mi)if(Bt!==null)if(re){if(j)if(T.layerUpdates.size>0){const Ct=Z0(Ot.width,Ot.height,T.format,T.type);for(const Dt of T.layerUpdates){const $t=Ot.data.subarray(Dt*Ct/Ot.data.BYTES_PER_ELEMENT,(Dt+1)*Ct/Ot.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ct,0,0,Dt,Ot.width,Ot.height,1,Bt,$t)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ct,0,0,0,Ot.width,Ot.height,At.depth,Bt,Ot.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,ct,kt,Ot.width,Ot.height,At.depth,0,Ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else re?j&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,ct,0,0,0,Ot.width,Ot.height,At.depth,Bt,qt,Ot.data):i.texImage3D(o.TEXTURE_2D_ARRAY,ct,kt,Ot.width,Ot.height,At.depth,0,Bt,qt,Ot.data)}else{re&&Fe&&i.texStorage2D(o.TEXTURE_2D,Rt,kt,Jt[0].width,Jt[0].height);for(let ct=0,vt=Jt.length;ct<vt;ct++)Ot=Jt[ct],T.format!==Mi?Bt!==null?re?j&&i.compressedTexSubImage2D(o.TEXTURE_2D,ct,0,0,Ot.width,Ot.height,Bt,Ot.data):i.compressedTexImage2D(o.TEXTURE_2D,ct,kt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?j&&i.texSubImage2D(o.TEXTURE_2D,ct,0,0,Ot.width,Ot.height,Bt,qt,Ot.data):i.texImage2D(o.TEXTURE_2D,ct,kt,Ot.width,Ot.height,0,Bt,qt,Ot.data)}else if(T.isDataArrayTexture)if(re){if(Fe&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Rt,kt,At.width,At.height,At.depth),j)if(T.layerUpdates.size>0){const ct=Z0(At.width,At.height,T.format,T.type);for(const vt of T.layerUpdates){const Ct=At.data.subarray(vt*ct/At.data.BYTES_PER_ELEMENT,(vt+1)*ct/At.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,vt,At.width,At.height,1,Bt,qt,Ct)}T.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,Bt,qt,At.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,kt,At.width,At.height,At.depth,0,Bt,qt,At.data);else if(T.isData3DTexture)re?(Fe&&i.texStorage3D(o.TEXTURE_3D,Rt,kt,At.width,At.height,At.depth),j&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,Bt,qt,At.data)):i.texImage3D(o.TEXTURE_3D,0,kt,At.width,At.height,At.depth,0,Bt,qt,At.data);else if(T.isFramebufferTexture){if(Fe)if(re)i.texStorage2D(o.TEXTURE_2D,Rt,kt,At.width,At.height);else{let ct=At.width,vt=At.height;for(let Ct=0;Ct<Rt;Ct++)i.texImage2D(o.TEXTURE_2D,Ct,kt,ct,vt,0,Bt,qt,null),ct>>=1,vt>>=1}}else if(Jt.length>0){if(re&&Fe){const ct=jt(Jt[0]);i.texStorage2D(o.TEXTURE_2D,Rt,kt,ct.width,ct.height)}for(let ct=0,vt=Jt.length;ct<vt;ct++)Ot=Jt[ct],re?j&&i.texSubImage2D(o.TEXTURE_2D,ct,0,0,Bt,qt,Ot):i.texImage2D(o.TEXTURE_2D,ct,kt,Bt,qt,Ot);T.generateMipmaps=!1}else if(re){if(Fe){const ct=jt(At);i.texStorage2D(o.TEXTURE_2D,Rt,kt,ct.width,ct.height)}j&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Bt,qt,At)}else i.texImage2D(o.TEXTURE_2D,0,kt,Bt,qt,At);S(T)&&g(dt),Vt.__version=gt.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function ft(L,T,nt){if(T.image.length!==6)return;const dt=St(L,T),Mt=T.source;i.bindTexture(o.TEXTURE_CUBE_MAP,L.__webglTexture,o.TEXTURE0+nt);const gt=r.get(Mt);if(Mt.version!==gt.__version||dt===!0){i.activeTexture(o.TEXTURE0+nt);const Vt=Ce.getPrimaries(Ce.workingColorSpace),wt=T.colorSpace===Ba?null:Ce.getPrimaries(T.colorSpace),Pt=T.colorSpace===Ba||Vt===wt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);const me=T.isCompressedTexture||T.image[0].isCompressedTexture,At=T.image[0]&&T.image[0].isDataTexture,Bt=[];for(let vt=0;vt<6;vt++)!me&&!At?Bt[vt]=C(T.image[vt],!0,l.maxCubemapSize):Bt[vt]=At?T.image[vt].image:T.image[vt],Bt[vt]=Ue(T,Bt[vt]);const qt=Bt[0],kt=u.convert(T.format,T.colorSpace),Ot=u.convert(T.type),Jt=O(T.internalFormat,kt,Ot,T.colorSpace),re=T.isVideoTexture!==!0,Fe=gt.__version===void 0||dt===!0,j=Mt.dataReady;let Rt=X(T,qt);at(o.TEXTURE_CUBE_MAP,T);let ct;if(me){re&&Fe&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Rt,Jt,qt.width,qt.height);for(let vt=0;vt<6;vt++){ct=Bt[vt].mipmaps;for(let Ct=0;Ct<ct.length;Ct++){const Dt=ct[Ct];T.format!==Mi?kt!==null?re?j&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,0,0,Dt.width,Dt.height,kt,Dt.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,Jt,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):re?j&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,0,0,Dt.width,Dt.height,kt,Ot,Dt.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,Jt,Dt.width,Dt.height,0,kt,Ot,Dt.data)}}}else{if(ct=T.mipmaps,re&&Fe){ct.length>0&&Rt++;const vt=jt(Bt[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Rt,Jt,vt.width,vt.height)}for(let vt=0;vt<6;vt++)if(At){re?j&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Bt[vt].width,Bt[vt].height,kt,Ot,Bt[vt].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,Jt,Bt[vt].width,Bt[vt].height,0,kt,Ot,Bt[vt].data);for(let Ct=0;Ct<ct.length;Ct++){const $t=ct[Ct].image[vt].image;re?j&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,0,0,$t.width,$t.height,kt,Ot,$t.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,Jt,$t.width,$t.height,0,kt,Ot,$t.data)}}else{re?j&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,kt,Ot,Bt[vt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,Jt,kt,Ot,Bt[vt]);for(let Ct=0;Ct<ct.length;Ct++){const Dt=ct[Ct];re?j&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,0,0,kt,Ot,Dt.image[vt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,Jt,kt,Ot,Dt.image[vt])}}}S(T)&&g(o.TEXTURE_CUBE_MAP),gt.__version=Mt.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function Et(L,T,nt,dt,Mt,gt){const Vt=u.convert(nt.format,nt.colorSpace),wt=u.convert(nt.type),Pt=O(nt.internalFormat,Vt,wt,nt.colorSpace),me=r.get(T),At=r.get(nt);if(At.__renderTarget=T,!me.__hasExternalTextures){const Bt=Math.max(1,T.width>>gt),qt=Math.max(1,T.height>>gt);Mt===o.TEXTURE_3D||Mt===o.TEXTURE_2D_ARRAY?i.texImage3D(Mt,gt,Pt,Bt,qt,T.depth,0,Vt,wt,null):i.texImage2D(Mt,gt,Pt,Bt,qt,0,Vt,wt,null)}i.bindFramebuffer(o.FRAMEBUFFER,L),pe(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,dt,Mt,At.__webglTexture,0,ue(T)):(Mt===o.TEXTURE_2D||Mt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&Mt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,dt,Mt,At.__webglTexture,gt),i.bindFramebuffer(o.FRAMEBUFFER,null)}function yt(L,T,nt){if(o.bindRenderbuffer(o.RENDERBUFFER,L),T.depthBuffer){const dt=T.depthTexture,Mt=dt&&dt.isDepthTexture?dt.type:null,gt=U(T.stencilBuffer,Mt),Vt=T.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,wt=ue(T);pe(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,wt,gt,T.width,T.height):nt?o.renderbufferStorageMultisample(o.RENDERBUFFER,wt,gt,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,gt,T.width,T.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Vt,o.RENDERBUFFER,L)}else{const dt=T.textures;for(let Mt=0;Mt<dt.length;Mt++){const gt=dt[Mt],Vt=u.convert(gt.format,gt.colorSpace),wt=u.convert(gt.type),Pt=O(gt.internalFormat,Vt,wt,gt.colorSpace),me=ue(T);nt&&pe(T)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,me,Pt,T.width,T.height):pe(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,me,Pt,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,Pt,T.width,T.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Ht(L,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(o.FRAMEBUFFER,L),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const dt=r.get(T.depthTexture);dt.__renderTarget=T,(!dt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),mt(T.depthTexture,0);const Mt=dt.__webglTexture,gt=ue(T);if(T.depthTexture.format===xs)pe(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Mt,0,gt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Mt,0);else if(T.depthTexture.format===Ts)pe(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Mt,0,gt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Mt,0);else throw new Error("Unknown depthTexture format")}function zt(L){const T=r.get(L),nt=L.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==L.depthTexture){const dt=L.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),dt){const Mt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,dt.removeEventListener("dispose",Mt)};dt.addEventListener("dispose",Mt),T.__depthDisposeCallback=Mt}T.__boundDepthTexture=dt}if(L.depthTexture&&!T.__autoAllocateDepthBuffer){if(nt)throw new Error("target.depthTexture not supported in Cube render targets");Ht(T.__webglFramebuffer,L)}else if(nt){T.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer[dt]),T.__webglDepthbuffer[dt]===void 0)T.__webglDepthbuffer[dt]=o.createRenderbuffer(),yt(T.__webglDepthbuffer[dt],L,!1);else{const Mt=L.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,gt=T.__webglDepthbuffer[dt];o.bindRenderbuffer(o.RENDERBUFFER,gt),o.framebufferRenderbuffer(o.FRAMEBUFFER,Mt,o.RENDERBUFFER,gt)}}else if(i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=o.createRenderbuffer(),yt(T.__webglDepthbuffer,L,!1);else{const dt=L.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Mt=T.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,Mt),o.framebufferRenderbuffer(o.FRAMEBUFFER,dt,o.RENDERBUFFER,Mt)}i.bindFramebuffer(o.FRAMEBUFFER,null)}function ae(L,T,nt){const dt=r.get(L);T!==void 0&&Et(dt.__webglFramebuffer,L,L.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),nt!==void 0&&zt(L)}function Oe(L){const T=L.texture,nt=r.get(L),dt=r.get(T);L.addEventListener("dispose",P);const Mt=L.textures,gt=L.isWebGLCubeRenderTarget===!0,Vt=Mt.length>1;if(Vt||(dt.__webglTexture===void 0&&(dt.__webglTexture=o.createTexture()),dt.__version=T.version,h.memory.textures++),gt){nt.__webglFramebuffer=[];for(let wt=0;wt<6;wt++)if(T.mipmaps&&T.mipmaps.length>0){nt.__webglFramebuffer[wt]=[];for(let Pt=0;Pt<T.mipmaps.length;Pt++)nt.__webglFramebuffer[wt][Pt]=o.createFramebuffer()}else nt.__webglFramebuffer[wt]=o.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){nt.__webglFramebuffer=[];for(let wt=0;wt<T.mipmaps.length;wt++)nt.__webglFramebuffer[wt]=o.createFramebuffer()}else nt.__webglFramebuffer=o.createFramebuffer();if(Vt)for(let wt=0,Pt=Mt.length;wt<Pt;wt++){const me=r.get(Mt[wt]);me.__webglTexture===void 0&&(me.__webglTexture=o.createTexture(),h.memory.textures++)}if(L.samples>0&&pe(L)===!1){nt.__webglMultisampledFramebuffer=o.createFramebuffer(),nt.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,nt.__webglMultisampledFramebuffer);for(let wt=0;wt<Mt.length;wt++){const Pt=Mt[wt];nt.__webglColorRenderbuffer[wt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,nt.__webglColorRenderbuffer[wt]);const me=u.convert(Pt.format,Pt.colorSpace),At=u.convert(Pt.type),Bt=O(Pt.internalFormat,me,At,Pt.colorSpace,L.isXRRenderTarget===!0),qt=ue(L);o.renderbufferStorageMultisample(o.RENDERBUFFER,qt,Bt,L.width,L.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+wt,o.RENDERBUFFER,nt.__webglColorRenderbuffer[wt])}o.bindRenderbuffer(o.RENDERBUFFER,null),L.depthBuffer&&(nt.__webglDepthRenderbuffer=o.createRenderbuffer(),yt(nt.__webglDepthRenderbuffer,L,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(gt){i.bindTexture(o.TEXTURE_CUBE_MAP,dt.__webglTexture),at(o.TEXTURE_CUBE_MAP,T);for(let wt=0;wt<6;wt++)if(T.mipmaps&&T.mipmaps.length>0)for(let Pt=0;Pt<T.mipmaps.length;Pt++)Et(nt.__webglFramebuffer[wt][Pt],L,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+wt,Pt);else Et(nt.__webglFramebuffer[wt],L,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+wt,0);S(T)&&g(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Vt){for(let wt=0,Pt=Mt.length;wt<Pt;wt++){const me=Mt[wt],At=r.get(me);i.bindTexture(o.TEXTURE_2D,At.__webglTexture),at(o.TEXTURE_2D,me),Et(nt.__webglFramebuffer,L,me,o.COLOR_ATTACHMENT0+wt,o.TEXTURE_2D,0),S(me)&&g(o.TEXTURE_2D)}i.unbindTexture()}else{let wt=o.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(wt=L.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(wt,dt.__webglTexture),at(wt,T),T.mipmaps&&T.mipmaps.length>0)for(let Pt=0;Pt<T.mipmaps.length;Pt++)Et(nt.__webglFramebuffer[Pt],L,T,o.COLOR_ATTACHMENT0,wt,Pt);else Et(nt.__webglFramebuffer,L,T,o.COLOR_ATTACHMENT0,wt,0);S(T)&&g(wt),i.unbindTexture()}L.depthBuffer&&zt(L)}function fe(L){const T=L.textures;for(let nt=0,dt=T.length;nt<dt;nt++){const Mt=T[nt];if(S(Mt)){const gt=N(L),Vt=r.get(Mt).__webglTexture;i.bindTexture(gt,Vt),g(gt),i.unbindTexture()}}}const Xe=[],I=[];function En(L){if(L.samples>0){if(pe(L)===!1){const T=L.textures,nt=L.width,dt=L.height;let Mt=o.COLOR_BUFFER_BIT;const gt=L.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Vt=r.get(L),wt=T.length>1;if(wt)for(let Pt=0;Pt<T.length;Pt++)i.bindFramebuffer(o.FRAMEBUFFER,Vt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Pt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,Vt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Pt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,Vt.__webglMultisampledFramebuffer),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Vt.__webglFramebuffer);for(let Pt=0;Pt<T.length;Pt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(Mt|=o.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(Mt|=o.STENCIL_BUFFER_BIT)),wt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Vt.__webglColorRenderbuffer[Pt]);const me=r.get(T[Pt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,me,0)}o.blitFramebuffer(0,0,nt,dt,0,0,nt,dt,Mt,o.NEAREST),p===!0&&(Xe.length=0,I.length=0,Xe.push(o.COLOR_ATTACHMENT0+Pt),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Xe.push(gt),I.push(gt),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,I)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,Xe))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),wt)for(let Pt=0;Pt<T.length;Pt++){i.bindFramebuffer(o.FRAMEBUFFER,Vt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Pt,o.RENDERBUFFER,Vt.__webglColorRenderbuffer[Pt]);const me=r.get(T[Pt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,Vt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Pt,o.TEXTURE_2D,me,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Vt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&p){const T=L.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[T])}}}function ue(L){return Math.min(l.maxSamples,L.samples)}function pe(L){const T=r.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Xt(L){const T=h.render.frame;v.get(L)!==T&&(v.set(L,T),L.update())}function Ue(L,T){const nt=L.colorSpace,dt=L.format,Mt=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||nt!==As&&nt!==Ba&&(Ce.getTransfer(nt)===He?(dt!==Mi||Mt!==la)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",nt)),T}function jt(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(m.width=L.naturalWidth||L.width,m.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(m.width=L.displayWidth,m.height=L.displayHeight):(m.width=L.width,m.height=L.height),m}this.allocateTextureUnit=ot,this.resetTextureUnits=st,this.setTexture2D=mt,this.setTexture2DArray=z,this.setTexture3D=Z,this.setTextureCube=q,this.rebindTextures=ae,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=fe,this.updateMultisampleRenderTarget=En,this.setupDepthRenderbuffer=zt,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=pe}function RT(o,e){function i(r,l=Ba){let u;const h=Ce.getTransfer(l);if(r===la)return o.UNSIGNED_BYTE;if(r===vh)return o.UNSIGNED_SHORT_4_4_4_4;if(r===xh)return o.UNSIGNED_SHORT_5_5_5_1;if(r===N_)return o.UNSIGNED_INT_5_9_9_9_REV;if(r===U_)return o.BYTE;if(r===L_)return o.SHORT;if(r===No)return o.UNSIGNED_SHORT;if(r===_h)return o.INT;if(r===Sr)return o.UNSIGNED_INT;if(r===ra)return o.FLOAT;if(r===Oo)return o.HALF_FLOAT;if(r===O_)return o.ALPHA;if(r===F_)return o.RGB;if(r===Mi)return o.RGBA;if(r===z_)return o.LUMINANCE;if(r===P_)return o.LUMINANCE_ALPHA;if(r===xs)return o.DEPTH_COMPONENT;if(r===Ts)return o.DEPTH_STENCIL;if(r===B_)return o.RED;if(r===yh)return o.RED_INTEGER;if(r===I_)return o.RG;if(r===Sh)return o.RG_INTEGER;if(r===Mh)return o.RGBA_INTEGER;if(r===yc||r===Sc||r===Mc||r===Ec)if(h===He)if(u=e.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(r===yc)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Sc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Mc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ec)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=e.get("WEBGL_compressed_texture_s3tc"),u!==null){if(r===yc)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Sc)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Mc)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ec)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Hd||r===Gd||r===Vd||r===kd)if(u=e.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(r===Hd)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Gd)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Vd)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===kd)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===jd||r===Wd||r===Xd)if(u=e.get("WEBGL_compressed_texture_etc"),u!==null){if(r===jd||r===Wd)return h===He?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(r===Xd)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===qd||r===Yd||r===Zd||r===Kd||r===Qd||r===Jd||r===$d||r===th||r===eh||r===nh||r===ih||r===ah||r===rh||r===sh)if(u=e.get("WEBGL_compressed_texture_astc"),u!==null){if(r===qd)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Yd)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Zd)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Kd)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Qd)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Jd)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===$d)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===th)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===eh)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===nh)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===ih)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===ah)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===rh)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===sh)return h===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===bc||r===oh||r===lh)if(u=e.get("EXT_texture_compression_bptc"),u!==null){if(r===bc)return h===He?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===oh)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===lh)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===H_||r===ch||r===uh||r===fh)if(u=e.get("EXT_texture_compression_rgtc"),u!==null){if(r===bc)return u.COMPRESSED_RED_RGTC1_EXT;if(r===ch)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===uh)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===fh)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===bs?o.UNSIGNED_INT_24_8:o[r]!==void 0?o[r]:null}return{convert:i}}const CT={type:"move"};class Ed{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const r of e.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,r){let l=null,u=null,h=null;const d=this._targetRay,p=this._grip,m=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(m&&e.hand){h=!0;for(const C of e.hand.values()){const S=i.getJointPose(C,r),g=this._getHandJoint(m,C);S!==null&&(g.matrix.fromArray(S.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=S.radius),g.visible=S!==null}const v=m.joints["index-finger-tip"],x=m.joints["thumb-tip"],y=v.position.distanceTo(x.position),M=.02,b=.005;m.inputState.pinching&&y>M+b?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&y<=M-b&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(u=i.getPose(e.gripSpace,r),u!==null&&(p.matrix.fromArray(u.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,u.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(u.linearVelocity)):p.hasLinearVelocity=!1,u.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(u.angularVelocity)):p.hasAngularVelocity=!1));d!==null&&(l=i.getPose(e.targetRaySpace,r),l===null&&u!==null&&(l=u),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(CT)))}return d!==null&&(d.visible=l!==null),p!==null&&(p.visible=u!==null),m!==null&&(m.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const r=new gc;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[i.jointName]=r,e.add(r)}return e.joints[i.jointName]}}const wT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,DT=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class UT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i,r){if(this.texture===null){const l=new kn,u=e.properties.get(l);u.__webglTexture=i.texture,(i.depthNear!==r.depthNear||i.depthFar!==r.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,r=new Va({vertexShader:wT,fragmentShader:DT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new fi(new Io(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class LT extends Cs{constructor(e,i){super();const r=this;let l=null,u=1,h=null,d="local-floor",p=1,m=null,v=null,x=null,y=null,M=null,b=null;const C=new UT,S=i.getContextAttributes();let g=null,N=null;const O=[],U=[],X=new De;let H=null;const P=new $n;P.viewport=new Ge;const Q=new $n;Q.viewport=new Ge;const D=[P,Q],w=new JS;let V=null,st=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ft=O[K];return ft===void 0&&(ft=new Ed,O[K]=ft),ft.getTargetRaySpace()},this.getControllerGrip=function(K){let ft=O[K];return ft===void 0&&(ft=new Ed,O[K]=ft),ft.getGripSpace()},this.getHand=function(K){let ft=O[K];return ft===void 0&&(ft=new Ed,O[K]=ft),ft.getHandSpace()};function ot(K){const ft=U.indexOf(K.inputSource);if(ft===-1)return;const Et=O[ft];Et!==void 0&&(Et.update(K.inputSource,K.frame,m||h),Et.dispatchEvent({type:K.type,data:K.inputSource}))}function pt(){l.removeEventListener("select",ot),l.removeEventListener("selectstart",ot),l.removeEventListener("selectend",ot),l.removeEventListener("squeeze",ot),l.removeEventListener("squeezestart",ot),l.removeEventListener("squeezeend",ot),l.removeEventListener("end",pt),l.removeEventListener("inputsourceschange",mt);for(let K=0;K<O.length;K++){const ft=U[K];ft!==null&&(U[K]=null,O[K].disconnect(ft))}V=null,st=null,C.reset(),e.setRenderTarget(g),M=null,y=null,x=null,l=null,N=null,St.stop(),r.isPresenting=!1,e.setPixelRatio(H),e.setSize(X.width,X.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){u=K,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){d=K,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||h},this.setReferenceSpace=function(K){m=K},this.getBaseLayer=function(){return y!==null?y:M},this.getBinding=function(){return x},this.getFrame=function(){return b},this.getSession=function(){return l},this.setSession=async function(K){if(l=K,l!==null){if(g=e.getRenderTarget(),l.addEventListener("select",ot),l.addEventListener("selectstart",ot),l.addEventListener("selectend",ot),l.addEventListener("squeeze",ot),l.addEventListener("squeezestart",ot),l.addEventListener("squeezeend",ot),l.addEventListener("end",pt),l.addEventListener("inputsourceschange",mt),S.xrCompatible!==!0&&await i.makeXRCompatible(),H=e.getPixelRatio(),e.getSize(X),l.enabledFeatures!==void 0&&l.enabledFeatures.includes("layers")){let Et=null,yt=null,Ht=null;S.depth&&(Ht=S.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Et=S.stencil?Ts:xs,yt=S.stencil?bs:Sr);const zt={colorFormat:i.RGBA8,depthFormat:Ht,scaleFactor:u};x=new XRWebGLBinding(l,i),y=x.createProjectionLayer(zt),l.updateRenderState({layers:[y]}),e.setPixelRatio(1),e.setSize(y.textureWidth,y.textureHeight,!1),N=new Mr(y.textureWidth,y.textureHeight,{format:Mi,type:la,depthTexture:new nv(y.textureWidth,y.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,Et),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:y.ignoreDepthValues===!1})}else{const Et={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:u};M=new XRWebGLLayer(l,i,Et),l.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),N=new Mr(M.framebufferWidth,M.framebufferHeight,{format:Mi,type:la,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil})}N.isXRRenderTarget=!0,this.setFoveation(p),m=null,h=await l.requestReferenceSpace(d),St.setContext(l),St.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return C.getDepthTexture()};function mt(K){for(let ft=0;ft<K.removed.length;ft++){const Et=K.removed[ft],yt=U.indexOf(Et);yt>=0&&(U[yt]=null,O[yt].disconnect(Et))}for(let ft=0;ft<K.added.length;ft++){const Et=K.added[ft];let yt=U.indexOf(Et);if(yt===-1){for(let zt=0;zt<O.length;zt++)if(zt>=U.length){U.push(Et),yt=zt;break}else if(U[zt]===null){U[zt]=Et,yt=zt;break}if(yt===-1)break}const Ht=O[yt];Ht&&Ht.connect(Et)}}const z=new J,Z=new J;function q(K,ft,Et){z.setFromMatrixPosition(ft.matrixWorld),Z.setFromMatrixPosition(Et.matrixWorld);const yt=z.distanceTo(Z),Ht=ft.projectionMatrix.elements,zt=Et.projectionMatrix.elements,ae=Ht[14]/(Ht[10]-1),Oe=Ht[14]/(Ht[10]+1),fe=(Ht[9]+1)/Ht[5],Xe=(Ht[9]-1)/Ht[5],I=(Ht[8]-1)/Ht[0],En=(zt[8]+1)/zt[0],ue=ae*I,pe=ae*En,Xt=yt/(-I+En),Ue=Xt*-I;if(ft.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ue),K.translateZ(Xt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ht[10]===-1)K.projectionMatrix.copy(ft.projectionMatrix),K.projectionMatrixInverse.copy(ft.projectionMatrixInverse);else{const jt=ae+Xt,L=Oe+Xt,T=ue-Ue,nt=pe+(yt-Ue),dt=fe*Oe/L*jt,Mt=Xe*Oe/L*jt;K.projectionMatrix.makePerspective(T,nt,dt,Mt,jt,L),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function xt(K,ft){ft===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ft.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(l===null)return;let ft=K.near,Et=K.far;C.texture!==null&&(C.depthNear>0&&(ft=C.depthNear),C.depthFar>0&&(Et=C.depthFar)),w.near=Q.near=P.near=ft,w.far=Q.far=P.far=Et,(V!==w.near||st!==w.far)&&(l.updateRenderState({depthNear:w.near,depthFar:w.far}),V=w.near,st=w.far),P.layers.mask=K.layers.mask|2,Q.layers.mask=K.layers.mask|4,w.layers.mask=P.layers.mask|Q.layers.mask;const yt=K.parent,Ht=w.cameras;xt(w,yt);for(let zt=0;zt<Ht.length;zt++)xt(Ht[zt],yt);Ht.length===2?q(w,P,Q):w.projectionMatrix.copy(P.projectionMatrix),bt(K,w,yt)};function bt(K,ft,Et){Et===null?K.matrix.copy(ft.matrixWorld):(K.matrix.copy(Et.matrixWorld),K.matrix.invert(),K.matrix.multiply(ft.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ft.projectionMatrix),K.projectionMatrixInverse.copy(ft.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=dh*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(y===null&&M===null))return p},this.setFoveation=function(K){p=K,y!==null&&(y.fixedFoveation=K),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=K)},this.hasDepthSensing=function(){return C.texture!==null},this.getDepthSensingMesh=function(){return C.getMesh(w)};let F=null;function at(K,ft){if(v=ft.getViewerPose(m||h),b=ft,v!==null){const Et=v.views;M!==null&&(e.setRenderTargetFramebuffer(N,M.framebuffer),e.setRenderTarget(N));let yt=!1;Et.length!==w.cameras.length&&(w.cameras.length=0,yt=!0);for(let zt=0;zt<Et.length;zt++){const ae=Et[zt];let Oe=null;if(M!==null)Oe=M.getViewport(ae);else{const Xe=x.getViewSubImage(y,ae);Oe=Xe.viewport,zt===0&&(e.setRenderTargetTextures(N,Xe.colorTexture,y.ignoreDepthValues?void 0:Xe.depthStencilTexture),e.setRenderTarget(N))}let fe=D[zt];fe===void 0&&(fe=new $n,fe.layers.enable(zt),fe.viewport=new Ge,D[zt]=fe),fe.matrix.fromArray(ae.transform.matrix),fe.matrix.decompose(fe.position,fe.quaternion,fe.scale),fe.projectionMatrix.fromArray(ae.projectionMatrix),fe.projectionMatrixInverse.copy(fe.projectionMatrix).invert(),fe.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),zt===0&&(w.matrix.copy(fe.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),yt===!0&&w.cameras.push(fe)}const Ht=l.enabledFeatures;if(Ht&&Ht.includes("depth-sensing")){const zt=x.getDepthInformation(Et[0]);zt&&zt.isValid&&zt.texture&&C.init(e,zt,l.renderState)}}for(let Et=0;Et<O.length;Et++){const yt=U[Et],Ht=O[Et];yt!==null&&Ht!==void 0&&Ht.update(yt,ft,m||h)}F&&F(K,ft),ft.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:ft}),b=null}const St=new av;St.setAnimationLoop(at),this.setAnimationLoop=function(K){F=K},this.dispose=function(){}}}const hr=new Oi,NT=new Ze;function OT(o,e){function i(S,g){S.matrixAutoUpdate===!0&&S.updateMatrix(),g.value.copy(S.matrix)}function r(S,g){g.color.getRGB(S.fogColor.value,J_(o)),g.isFog?(S.fogNear.value=g.near,S.fogFar.value=g.far):g.isFogExp2&&(S.fogDensity.value=g.density)}function l(S,g,N,O,U){g.isMeshBasicMaterial||g.isMeshLambertMaterial?u(S,g):g.isMeshToonMaterial?(u(S,g),x(S,g)):g.isMeshPhongMaterial?(u(S,g),v(S,g)):g.isMeshStandardMaterial?(u(S,g),y(S,g),g.isMeshPhysicalMaterial&&M(S,g,U)):g.isMeshMatcapMaterial?(u(S,g),b(S,g)):g.isMeshDepthMaterial?u(S,g):g.isMeshDistanceMaterial?(u(S,g),C(S,g)):g.isMeshNormalMaterial?u(S,g):g.isLineBasicMaterial?(h(S,g),g.isLineDashedMaterial&&d(S,g)):g.isPointsMaterial?p(S,g,N,O):g.isSpriteMaterial?m(S,g):g.isShadowMaterial?(S.color.value.copy(g.color),S.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function u(S,g){S.opacity.value=g.opacity,g.color&&S.diffuse.value.copy(g.color),g.emissive&&S.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(S.map.value=g.map,i(g.map,S.mapTransform)),g.alphaMap&&(S.alphaMap.value=g.alphaMap,i(g.alphaMap,S.alphaMapTransform)),g.bumpMap&&(S.bumpMap.value=g.bumpMap,i(g.bumpMap,S.bumpMapTransform),S.bumpScale.value=g.bumpScale,g.side===Vn&&(S.bumpScale.value*=-1)),g.normalMap&&(S.normalMap.value=g.normalMap,i(g.normalMap,S.normalMapTransform),S.normalScale.value.copy(g.normalScale),g.side===Vn&&S.normalScale.value.negate()),g.displacementMap&&(S.displacementMap.value=g.displacementMap,i(g.displacementMap,S.displacementMapTransform),S.displacementScale.value=g.displacementScale,S.displacementBias.value=g.displacementBias),g.emissiveMap&&(S.emissiveMap.value=g.emissiveMap,i(g.emissiveMap,S.emissiveMapTransform)),g.specularMap&&(S.specularMap.value=g.specularMap,i(g.specularMap,S.specularMapTransform)),g.alphaTest>0&&(S.alphaTest.value=g.alphaTest);const N=e.get(g),O=N.envMap,U=N.envMapRotation;O&&(S.envMap.value=O,hr.copy(U),hr.x*=-1,hr.y*=-1,hr.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1&&(hr.y*=-1,hr.z*=-1),S.envMapRotation.value.setFromMatrix4(NT.makeRotationFromEuler(hr)),S.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=g.reflectivity,S.ior.value=g.ior,S.refractionRatio.value=g.refractionRatio),g.lightMap&&(S.lightMap.value=g.lightMap,S.lightMapIntensity.value=g.lightMapIntensity,i(g.lightMap,S.lightMapTransform)),g.aoMap&&(S.aoMap.value=g.aoMap,S.aoMapIntensity.value=g.aoMapIntensity,i(g.aoMap,S.aoMapTransform))}function h(S,g){S.diffuse.value.copy(g.color),S.opacity.value=g.opacity,g.map&&(S.map.value=g.map,i(g.map,S.mapTransform))}function d(S,g){S.dashSize.value=g.dashSize,S.totalSize.value=g.dashSize+g.gapSize,S.scale.value=g.scale}function p(S,g,N,O){S.diffuse.value.copy(g.color),S.opacity.value=g.opacity,S.size.value=g.size*N,S.scale.value=O*.5,g.map&&(S.map.value=g.map,i(g.map,S.uvTransform)),g.alphaMap&&(S.alphaMap.value=g.alphaMap,i(g.alphaMap,S.alphaMapTransform)),g.alphaTest>0&&(S.alphaTest.value=g.alphaTest)}function m(S,g){S.diffuse.value.copy(g.color),S.opacity.value=g.opacity,S.rotation.value=g.rotation,g.map&&(S.map.value=g.map,i(g.map,S.mapTransform)),g.alphaMap&&(S.alphaMap.value=g.alphaMap,i(g.alphaMap,S.alphaMapTransform)),g.alphaTest>0&&(S.alphaTest.value=g.alphaTest)}function v(S,g){S.specular.value.copy(g.specular),S.shininess.value=Math.max(g.shininess,1e-4)}function x(S,g){g.gradientMap&&(S.gradientMap.value=g.gradientMap)}function y(S,g){S.metalness.value=g.metalness,g.metalnessMap&&(S.metalnessMap.value=g.metalnessMap,i(g.metalnessMap,S.metalnessMapTransform)),S.roughness.value=g.roughness,g.roughnessMap&&(S.roughnessMap.value=g.roughnessMap,i(g.roughnessMap,S.roughnessMapTransform)),g.envMap&&(S.envMapIntensity.value=g.envMapIntensity)}function M(S,g,N){S.ior.value=g.ior,g.sheen>0&&(S.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),S.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(S.sheenColorMap.value=g.sheenColorMap,i(g.sheenColorMap,S.sheenColorMapTransform)),g.sheenRoughnessMap&&(S.sheenRoughnessMap.value=g.sheenRoughnessMap,i(g.sheenRoughnessMap,S.sheenRoughnessMapTransform))),g.clearcoat>0&&(S.clearcoat.value=g.clearcoat,S.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(S.clearcoatMap.value=g.clearcoatMap,i(g.clearcoatMap,S.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,i(g.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(S.clearcoatNormalMap.value=g.clearcoatNormalMap,i(g.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Vn&&S.clearcoatNormalScale.value.negate())),g.dispersion>0&&(S.dispersion.value=g.dispersion),g.iridescence>0&&(S.iridescence.value=g.iridescence,S.iridescenceIOR.value=g.iridescenceIOR,S.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(S.iridescenceMap.value=g.iridescenceMap,i(g.iridescenceMap,S.iridescenceMapTransform)),g.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=g.iridescenceThicknessMap,i(g.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),g.transmission>0&&(S.transmission.value=g.transmission,S.transmissionSamplerMap.value=N.texture,S.transmissionSamplerSize.value.set(N.width,N.height),g.transmissionMap&&(S.transmissionMap.value=g.transmissionMap,i(g.transmissionMap,S.transmissionMapTransform)),S.thickness.value=g.thickness,g.thicknessMap&&(S.thicknessMap.value=g.thicknessMap,i(g.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=g.attenuationDistance,S.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(S.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(S.anisotropyMap.value=g.anisotropyMap,i(g.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=g.specularIntensity,S.specularColor.value.copy(g.specularColor),g.specularColorMap&&(S.specularColorMap.value=g.specularColorMap,i(g.specularColorMap,S.specularColorMapTransform)),g.specularIntensityMap&&(S.specularIntensityMap.value=g.specularIntensityMap,i(g.specularIntensityMap,S.specularIntensityMapTransform))}function b(S,g){g.matcap&&(S.matcap.value=g.matcap)}function C(S,g){const N=e.get(g).light;S.referencePosition.value.setFromMatrixPosition(N.matrixWorld),S.nearDistance.value=N.shadow.camera.near,S.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function FT(o,e,i,r){let l={},u={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function p(N,O){const U=O.program;r.uniformBlockBinding(N,U)}function m(N,O){let U=l[N.id];U===void 0&&(b(N),U=v(N),l[N.id]=U,N.addEventListener("dispose",S));const X=O.program;r.updateUBOMapping(N,X);const H=e.render.frame;u[N.id]!==H&&(y(N),u[N.id]=H)}function v(N){const O=x();N.__bindingPointIndex=O;const U=o.createBuffer(),X=N.__size,H=N.usage;return o.bindBuffer(o.UNIFORM_BUFFER,U),o.bufferData(o.UNIFORM_BUFFER,X,H),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,O,U),U}function x(){for(let N=0;N<d;N++)if(h.indexOf(N)===-1)return h.push(N),N;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(N){const O=l[N.id],U=N.uniforms,X=N.__cache;o.bindBuffer(o.UNIFORM_BUFFER,O);for(let H=0,P=U.length;H<P;H++){const Q=Array.isArray(U[H])?U[H]:[U[H]];for(let D=0,w=Q.length;D<w;D++){const V=Q[D];if(M(V,H,D,X)===!0){const st=V.__offset,ot=Array.isArray(V.value)?V.value:[V.value];let pt=0;for(let mt=0;mt<ot.length;mt++){const z=ot[mt],Z=C(z);typeof z=="number"||typeof z=="boolean"?(V.__data[0]=z,o.bufferSubData(o.UNIFORM_BUFFER,st+pt,V.__data)):z.isMatrix3?(V.__data[0]=z.elements[0],V.__data[1]=z.elements[1],V.__data[2]=z.elements[2],V.__data[3]=0,V.__data[4]=z.elements[3],V.__data[5]=z.elements[4],V.__data[6]=z.elements[5],V.__data[7]=0,V.__data[8]=z.elements[6],V.__data[9]=z.elements[7],V.__data[10]=z.elements[8],V.__data[11]=0):(z.toArray(V.__data,pt),pt+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,st,V.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function M(N,O,U,X){const H=N.value,P=O+"_"+U;if(X[P]===void 0)return typeof H=="number"||typeof H=="boolean"?X[P]=H:X[P]=H.clone(),!0;{const Q=X[P];if(typeof H=="number"||typeof H=="boolean"){if(Q!==H)return X[P]=H,!0}else if(Q.equals(H)===!1)return Q.copy(H),!0}return!1}function b(N){const O=N.uniforms;let U=0;const X=16;for(let P=0,Q=O.length;P<Q;P++){const D=Array.isArray(O[P])?O[P]:[O[P]];for(let w=0,V=D.length;w<V;w++){const st=D[w],ot=Array.isArray(st.value)?st.value:[st.value];for(let pt=0,mt=ot.length;pt<mt;pt++){const z=ot[pt],Z=C(z),q=U%X,xt=q%Z.boundary,bt=q+xt;U+=xt,bt!==0&&X-bt<Z.storage&&(U+=X-bt),st.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),st.__offset=U,U+=Z.storage}}}const H=U%X;return H>0&&(U+=X-H),N.__size=U,N.__cache={},this}function C(N){const O={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(O.boundary=4,O.storage=4):N.isVector2?(O.boundary=8,O.storage=8):N.isVector3||N.isColor?(O.boundary=16,O.storage=12):N.isVector4?(O.boundary=16,O.storage=16):N.isMatrix3?(O.boundary=48,O.storage=48):N.isMatrix4?(O.boundary=64,O.storage=64):N.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",N),O}function S(N){const O=N.target;O.removeEventListener("dispose",S);const U=h.indexOf(O.__bindingPointIndex);h.splice(U,1),o.deleteBuffer(l[O.id]),delete l[O.id],delete u[O.id]}function g(){for(const N in l)o.deleteBuffer(l[N]);h=[],l={},u={}}return{bind:p,update:m,dispose:g}}class zT{constructor(e={}){const{canvas:i=gS(),context:r=null,depth:l=!0,stencil:u=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:x=!1,reverseDepthBuffer:y=!1}=e;this.isWebGLRenderer=!0;let M;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=r.getContextAttributes().alpha}else M=h;const b=new Uint32Array(4),C=new Int32Array(4);let S=null,g=null;const N=[],O=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ui,this.toneMapping=Ha,this.toneMappingExposure=1;const U=this;let X=!1,H=0,P=0,Q=null,D=-1,w=null;const V=new Ge,st=new Ge;let ot=null;const pt=new be(0);let mt=0,z=i.width,Z=i.height,q=1,xt=null,bt=null;const F=new Ge(0,0,z,Z),at=new Ge(0,0,z,Z);let St=!1;const K=new bh;let ft=!1,Et=!1;this.transmissionResolutionScale=1;const yt=new Ze,Ht=new Ze,zt=new J,ae=new Ge,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let fe=!1;function Xe(){return Q===null?q:1}let I=r;function En(R,W){return i.getContext(R,W)}try{const R={alpha:!0,depth:l,stencil:u,antialias:d,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:v,failIfMajorPerformanceCaveat:x};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${gh}`),i.addEventListener("webglcontextlost",vt,!1),i.addEventListener("webglcontextrestored",Ct,!1),i.addEventListener("webglcontextcreationerror",Dt,!1),I===null){const W="webgl2";if(I=En(W,R),I===null)throw En(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ue,pe,Xt,Ue,jt,L,T,nt,dt,Mt,gt,Vt,wt,Pt,me,At,Bt,qt,kt,Ot,Jt,re,Fe,j;function Rt(){ue=new Wb(I),ue.init(),re=new RT(I,ue),pe=new Ib(I,ue,e,re),Xt=new TT(I,ue),pe.reverseDepthBuffer&&y&&Xt.buffers.depth.setReversed(!0),Ue=new Yb(I),jt=new dT,L=new AT(I,ue,Xt,jt,pe,re,Ue),T=new Gb(U),nt=new jb(U),dt=new eM(I),Fe=new Pb(I,dt),Mt=new Xb(I,dt,Ue,Fe),gt=new Kb(I,Mt,dt,Ue),kt=new Zb(I,pe,L),At=new Hb(jt),Vt=new fT(U,T,nt,ue,pe,Fe,At),wt=new OT(U,jt),Pt=new pT,me=new yT(ue),qt=new zb(U,T,nt,Xt,gt,M,p),Bt=new ET(U,gt,pe),j=new FT(I,Ue,pe,Xt),Ot=new Bb(I,ue,Ue),Jt=new qb(I,ue,Ue),Ue.programs=Vt.programs,U.capabilities=pe,U.extensions=ue,U.properties=jt,U.renderLists=Pt,U.shadowMap=Bt,U.state=Xt,U.info=Ue}Rt();const ct=new LT(U,I);this.xr=ct,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const R=ue.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ue.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(R){R!==void 0&&(q=R,this.setSize(z,Z,!1))},this.getSize=function(R){return R.set(z,Z)},this.setSize=function(R,W,it=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=R,Z=W,i.width=Math.floor(R*q),i.height=Math.floor(W*q),it===!0&&(i.style.width=R+"px",i.style.height=W+"px"),this.setViewport(0,0,R,W)},this.getDrawingBufferSize=function(R){return R.set(z*q,Z*q).floor()},this.setDrawingBufferSize=function(R,W,it){z=R,Z=W,q=it,i.width=Math.floor(R*it),i.height=Math.floor(W*it),this.setViewport(0,0,R,W)},this.getCurrentViewport=function(R){return R.copy(V)},this.getViewport=function(R){return R.copy(F)},this.setViewport=function(R,W,it,rt){R.isVector4?F.set(R.x,R.y,R.z,R.w):F.set(R,W,it,rt),Xt.viewport(V.copy(F).multiplyScalar(q).round())},this.getScissor=function(R){return R.copy(at)},this.setScissor=function(R,W,it,rt){R.isVector4?at.set(R.x,R.y,R.z,R.w):at.set(R,W,it,rt),Xt.scissor(st.copy(at).multiplyScalar(q).round())},this.getScissorTest=function(){return St},this.setScissorTest=function(R){Xt.setScissorTest(St=R)},this.setOpaqueSort=function(R){xt=R},this.setTransparentSort=function(R){bt=R},this.getClearColor=function(R){return R.copy(qt.getClearColor())},this.setClearColor=function(){qt.setClearColor.apply(qt,arguments)},this.getClearAlpha=function(){return qt.getClearAlpha()},this.setClearAlpha=function(){qt.setClearAlpha.apply(qt,arguments)},this.clear=function(R=!0,W=!0,it=!0){let rt=0;if(R){let k=!1;if(Q!==null){const Tt=Q.texture.format;k=Tt===Mh||Tt===Sh||Tt===yh}if(k){const Tt=Q.texture.type,Ut=Tt===la||Tt===Sr||Tt===No||Tt===bs||Tt===vh||Tt===xh,Nt=qt.getClearColor(),Ft=qt.getClearAlpha(),te=Nt.r,ee=Nt.g,Yt=Nt.b;Ut?(b[0]=te,b[1]=ee,b[2]=Yt,b[3]=Ft,I.clearBufferuiv(I.COLOR,0,b)):(C[0]=te,C[1]=ee,C[2]=Yt,C[3]=Ft,I.clearBufferiv(I.COLOR,0,C))}else rt|=I.COLOR_BUFFER_BIT}W&&(rt|=I.DEPTH_BUFFER_BIT),it&&(rt|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",vt,!1),i.removeEventListener("webglcontextrestored",Ct,!1),i.removeEventListener("webglcontextcreationerror",Dt,!1),qt.dispose(),Pt.dispose(),me.dispose(),jt.dispose(),T.dispose(),nt.dispose(),gt.dispose(),Fe.dispose(),j.dispose(),Vt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Us),ct.removeEventListener("sessionend",Ls),Ai.stop()};function vt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),X=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),X=!1;const R=Ue.autoReset,W=Bt.enabled,it=Bt.autoUpdate,rt=Bt.needsUpdate,k=Bt.type;Rt(),Ue.autoReset=R,Bt.enabled=W,Bt.autoUpdate=it,Bt.needsUpdate=rt,Bt.type=k}function Dt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function $t(R){const W=R.target;W.removeEventListener("dispose",$t),qe(W)}function qe(R){ln(R),jt.remove(R)}function ln(R){const W=jt.get(R).programs;W!==void 0&&(W.forEach(function(it){Vt.releaseProgram(it)}),R.isShaderMaterial&&Vt.releaseShaderCache(R))}this.renderBufferDirect=function(R,W,it,rt,k,Tt){W===null&&(W=Oe);const Ut=k.isMesh&&k.matrixWorld.determinant()<0,Nt=Os(R,W,it,rt,k);Xt.setMaterial(rt,Ut);let Ft=it.index,te=1;if(rt.wireframe===!0){if(Ft=Mt.getWireframeAttribute(it),Ft===void 0)return;te=2}const ee=it.drawRange,Yt=it.attributes.position;let ve=ee.start*te,xe=(ee.start+ee.count)*te;Tt!==null&&(ve=Math.max(ve,Tt.start*te),xe=Math.min(xe,(Tt.start+Tt.count)*te)),Ft!==null?(ve=Math.max(ve,0),xe=Math.min(xe,Ft.count)):Yt!=null&&(ve=Math.max(ve,0),xe=Math.min(xe,Yt.count));const ke=xe-ve;if(ke<0||ke===1/0)return;Fe.setup(k,rt,Nt,it,Ft);let Te,ne=Ot;if(Ft!==null&&(Te=dt.get(Ft),ne=Jt,ne.setIndex(Te)),k.isMesh)rt.wireframe===!0?(Xt.setLineWidth(rt.wireframeLinewidth*Xe()),ne.setMode(I.LINES)):ne.setMode(I.TRIANGLES);else if(k.isLine){let Kt=rt.linewidth;Kt===void 0&&(Kt=1),Xt.setLineWidth(Kt*Xe()),k.isLineSegments?ne.setMode(I.LINES):k.isLineLoop?ne.setMode(I.LINE_LOOP):ne.setMode(I.LINE_STRIP)}else k.isPoints?ne.setMode(I.POINTS):k.isSprite&&ne.setMode(I.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ne.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(ue.get("WEBGL_multi_draw"))ne.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Kt=k._multiDrawStarts,cn=k._multiDrawCounts,Me=k._multiDrawCount,Nn=Ft?dt.get(Ft).bytesPerElement:1,pi=jt.get(rt).currentProgram.getUniforms();for(let Cn=0;Cn<Me;Cn++)pi.setValue(I,"_gl_DrawID",Cn),ne.render(Kt[Cn]/Nn,cn[Cn])}else if(k.isInstancedMesh)ne.renderInstances(ve,ke,k.count);else if(it.isInstancedBufferGeometry){const Kt=it._maxInstanceCount!==void 0?it._maxInstanceCount:1/0,cn=Math.min(it.instanceCount,Kt);ne.renderInstances(ve,ke,cn)}else ne.render(ve,ke)};function Ee(R,W,it){R.transparent===!0&&R.side===Li&&R.forceSinglePass===!1?(R.side=Vn,R.needsUpdate=!0,Ke(R,W,it),R.side=Ga,R.needsUpdate=!0,Ke(R,W,it),R.side=Li):Ke(R,W,it)}this.compile=function(R,W,it=null){it===null&&(it=R),g=me.get(it),g.init(W),O.push(g),it.traverseVisible(function(k){k.isLight&&k.layers.test(W.layers)&&(g.pushLight(k),k.castShadow&&g.pushShadow(k))}),R!==it&&R.traverseVisible(function(k){k.isLight&&k.layers.test(W.layers)&&(g.pushLight(k),k.castShadow&&g.pushShadow(k))}),g.setupLights();const rt=new Set;return R.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const Tt=k.material;if(Tt)if(Array.isArray(Tt))for(let Ut=0;Ut<Tt.length;Ut++){const Nt=Tt[Ut];Ee(Nt,it,k),rt.add(Nt)}else Ee(Tt,it,k),rt.add(Tt)}),O.pop(),g=null,rt},this.compileAsync=function(R,W,it=null){const rt=this.compile(R,W,it);return new Promise(k=>{function Tt(){if(rt.forEach(function(Ut){jt.get(Ut).currentProgram.isReady()&&rt.delete(Ut)}),rt.size===0){k(R);return}setTimeout(Tt,10)}ue.get("KHR_parallel_shader_compile")!==null?Tt():setTimeout(Tt,10)})};let gn=null;function di(R){gn&&gn(R)}function Us(){Ai.stop()}function Ls(){Ai.start()}const Ai=new av;Ai.setAnimationLoop(di),typeof self<"u"&&Ai.setContext(self),this.setAnimationLoop=function(R){gn=R,ct.setAnimationLoop(R),R===null?Ai.stop():Ai.start()},ct.addEventListener("sessionstart",Us),ct.addEventListener("sessionend",Ls),this.render=function(R,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(X===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(W),W=ct.getCamera()),R.isScene===!0&&R.onBeforeRender(U,R,W,Q),g=me.get(R,O.length),g.init(W),O.push(g),Ht.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),K.setFromProjectionMatrix(Ht),Et=this.localClippingEnabled,ft=At.init(this.clippingPlanes,Et),S=Pt.get(R,N.length),S.init(),N.push(S),ct.enabled===!0&&ct.isPresenting===!0){const Tt=U.xr.getDepthSensingMesh();Tt!==null&&ka(Tt,W,-1/0,U.sortObjects)}ka(R,W,0,U.sortObjects),S.finish(),U.sortObjects===!0&&S.sort(xt,bt),fe=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,fe&&qt.addToRenderList(S,R),this.info.render.frame++,ft===!0&&At.beginShadows();const it=g.state.shadowsArray;Bt.render(it,R,W),ft===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=S.opaque,k=S.transmissive;if(g.setupLights(),W.isArrayCamera){const Tt=W.cameras;if(k.length>0)for(let Ut=0,Nt=Tt.length;Ut<Nt;Ut++){const Ft=Tt[Ut];Ns(rt,k,R,Ft)}fe&&qt.render(R);for(let Ut=0,Nt=Tt.length;Ut<Nt;Ut++){const Ft=Tt[Ut];Er(S,R,Ft,Ft.viewport)}}else k.length>0&&Ns(rt,k,R,W),fe&&qt.render(R),Er(S,R,W);Q!==null&&P===0&&(L.updateMultisampleRenderTarget(Q),L.updateRenderTargetMipmap(Q)),R.isScene===!0&&R.onAfterRender(U,R,W),Fe.resetDefaultState(),D=-1,w=null,O.pop(),O.length>0?(g=O[O.length-1],ft===!0&&At.setGlobalState(U.clippingPlanes,g.state.camera)):g=null,N.pop(),N.length>0?S=N[N.length-1]:S=null};function ka(R,W,it,rt){if(R.visible===!1)return;if(R.layers.test(W.layers)){if(R.isGroup)it=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(W);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||K.intersectsSprite(R)){rt&&ae.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Ht);const Ut=gt.update(R),Nt=R.material;Nt.visible&&S.push(R,Ut,Nt,it,ae.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||K.intersectsObject(R))){const Ut=gt.update(R),Nt=R.material;if(rt&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ae.copy(R.boundingSphere.center)):(Ut.boundingSphere===null&&Ut.computeBoundingSphere(),ae.copy(Ut.boundingSphere.center)),ae.applyMatrix4(R.matrixWorld).applyMatrix4(Ht)),Array.isArray(Nt)){const Ft=Ut.groups;for(let te=0,ee=Ft.length;te<ee;te++){const Yt=Ft[te],ve=Nt[Yt.materialIndex];ve&&ve.visible&&S.push(R,Ut,ve,it,ae.z,Yt)}}else Nt.visible&&S.push(R,Ut,Nt,it,ae.z,null)}}const Tt=R.children;for(let Ut=0,Nt=Tt.length;Ut<Nt;Ut++)ka(Tt[Ut],W,it,rt)}function Er(R,W,it,rt){const k=R.opaque,Tt=R.transmissive,Ut=R.transparent;g.setupLightsView(it),ft===!0&&At.setGlobalState(U.clippingPlanes,it),rt&&Xt.viewport(V.copy(rt)),k.length>0&&ja(k,W,it),Tt.length>0&&ja(Tt,W,it),Ut.length>0&&ja(Ut,W,it),Xt.buffers.depth.setTest(!0),Xt.buffers.depth.setMask(!0),Xt.buffers.color.setMask(!0),Xt.setPolygonOffset(!1)}function Ns(R,W,it,rt){if((it.isScene===!0?it.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[rt.id]===void 0&&(g.state.transmissionRenderTarget[rt.id]=new Mr(1,1,{generateMipmaps:!0,type:ue.has("EXT_color_buffer_half_float")||ue.has("EXT_color_buffer_float")?Oo:la,minFilter:yr,samples:4,stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ce.workingColorSpace}));const Tt=g.state.transmissionRenderTarget[rt.id],Ut=rt.viewport||V;Tt.setSize(Ut.z*U.transmissionResolutionScale,Ut.w*U.transmissionResolutionScale);const Nt=U.getRenderTarget();U.setRenderTarget(Tt),U.getClearColor(pt),mt=U.getClearAlpha(),mt<1&&U.setClearColor(16777215,.5),U.clear(),fe&&qt.render(it);const Ft=U.toneMapping;U.toneMapping=Ha;const te=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),g.setupLightsView(rt),ft===!0&&At.setGlobalState(U.clippingPlanes,rt),ja(R,it,rt),L.updateMultisampleRenderTarget(Tt),L.updateRenderTargetMipmap(Tt),ue.has("WEBGL_multisampled_render_to_texture")===!1){let ee=!1;for(let Yt=0,ve=W.length;Yt<ve;Yt++){const xe=W[Yt],ke=xe.object,Te=xe.geometry,ne=xe.material,Kt=xe.group;if(ne.side===Li&&ke.layers.test(rt.layers)){const cn=ne.side;ne.side=Vn,ne.needsUpdate=!0,hi(ke,it,rt,Te,ne,Kt),ne.side=cn,ne.needsUpdate=!0,ee=!0}}ee===!0&&(L.updateMultisampleRenderTarget(Tt),L.updateRenderTargetMipmap(Tt))}U.setRenderTarget(Nt),U.setClearColor(pt,mt),te!==void 0&&(rt.viewport=te),U.toneMapping=Ft}function ja(R,W,it){const rt=W.isScene===!0?W.overrideMaterial:null;for(let k=0,Tt=R.length;k<Tt;k++){const Ut=R[k],Nt=Ut.object,Ft=Ut.geometry,te=rt===null?Ut.material:rt,ee=Ut.group;Nt.layers.test(it.layers)&&hi(Nt,W,it,Ft,te,ee)}}function hi(R,W,it,rt,k,Tt){R.onBeforeRender(U,W,it,rt,k,Tt),R.modelViewMatrix.multiplyMatrices(it.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),k.onBeforeRender(U,W,it,rt,R,Tt),k.transparent===!0&&k.side===Li&&k.forceSinglePass===!1?(k.side=Vn,k.needsUpdate=!0,U.renderBufferDirect(it,W,rt,k,R,Tt),k.side=Ga,k.needsUpdate=!0,U.renderBufferDirect(it,W,rt,k,R,Tt),k.side=Li):U.renderBufferDirect(it,W,rt,k,R,Tt),R.onAfterRender(U,W,it,rt,k,Tt)}function Ke(R,W,it){W.isScene!==!0&&(W=Oe);const rt=jt.get(R),k=g.state.lights,Tt=g.state.shadowsArray,Ut=k.state.version,Nt=Vt.getParameters(R,k.state,Tt,W,it),Ft=Vt.getProgramCacheKey(Nt);let te=rt.programs;rt.environment=R.isMeshStandardMaterial?W.environment:null,rt.fog=W.fog,rt.envMap=(R.isMeshStandardMaterial?nt:T).get(R.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&R.envMap===null?W.environmentRotation:R.envMapRotation,te===void 0&&(R.addEventListener("dispose",$t),te=new Map,rt.programs=te);let ee=te.get(Ft);if(ee!==void 0){if(rt.currentProgram===ee&&rt.lightsStateVersion===Ut)return Fi(R,Nt),ee}else Nt.uniforms=Vt.getUniforms(R),R.onBeforeCompile(Nt,U),ee=Vt.acquireProgram(Nt,Ft),te.set(Ft,ee),rt.uniforms=Nt.uniforms;const Yt=rt.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Yt.clippingPlanes=At.uniform),Fi(R,Nt),rt.needsLights=Nc(R),rt.lightsStateVersion=Ut,rt.needsLights&&(Yt.ambientLightColor.value=k.state.ambient,Yt.lightProbe.value=k.state.probe,Yt.directionalLights.value=k.state.directional,Yt.directionalLightShadows.value=k.state.directionalShadow,Yt.spotLights.value=k.state.spot,Yt.spotLightShadows.value=k.state.spotShadow,Yt.rectAreaLights.value=k.state.rectArea,Yt.ltc_1.value=k.state.rectAreaLTC1,Yt.ltc_2.value=k.state.rectAreaLTC2,Yt.pointLights.value=k.state.point,Yt.pointLightShadows.value=k.state.pointShadow,Yt.hemisphereLights.value=k.state.hemi,Yt.directionalShadowMap.value=k.state.directionalShadowMap,Yt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Yt.spotShadowMap.value=k.state.spotShadowMap,Yt.spotLightMatrix.value=k.state.spotLightMatrix,Yt.spotLightMap.value=k.state.spotLightMap,Yt.pointShadowMap.value=k.state.pointShadowMap,Yt.pointShadowMatrix.value=k.state.pointShadowMatrix),rt.currentProgram=ee,rt.uniformsList=null,ee}function _n(R){if(R.uniformsList===null){const W=R.currentProgram.getUniforms();R.uniformsList=Tc.seqWithValue(W.seq,R.uniforms)}return R.uniformsList}function Fi(R,W){const it=jt.get(R);it.outputColorSpace=W.outputColorSpace,it.batching=W.batching,it.batchingColor=W.batchingColor,it.instancing=W.instancing,it.instancingColor=W.instancingColor,it.instancingMorph=W.instancingMorph,it.skinning=W.skinning,it.morphTargets=W.morphTargets,it.morphNormals=W.morphNormals,it.morphColors=W.morphColors,it.morphTargetsCount=W.morphTargetsCount,it.numClippingPlanes=W.numClippingPlanes,it.numIntersection=W.numClipIntersection,it.vertexAlphas=W.vertexAlphas,it.vertexTangents=W.vertexTangents,it.toneMapping=W.toneMapping}function Os(R,W,it,rt,k){W.isScene!==!0&&(W=Oe),L.resetTextureUnits();const Tt=W.fog,Ut=rt.isMeshStandardMaterial?W.environment:null,Nt=Q===null?U.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:As,Ft=(rt.isMeshStandardMaterial?nt:T).get(rt.envMap||Ut),te=rt.vertexColors===!0&&!!it.attributes.color&&it.attributes.color.itemSize===4,ee=!!it.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),Yt=!!it.morphAttributes.position,ve=!!it.morphAttributes.normal,xe=!!it.morphAttributes.color;let ke=Ha;rt.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(ke=U.toneMapping);const Te=it.morphAttributes.position||it.morphAttributes.normal||it.morphAttributes.color,ne=Te!==void 0?Te.length:0,Kt=jt.get(rt),cn=g.state.lights;if(ft===!0&&(Et===!0||R!==w)){const Qe=R===w&&rt.id===D;At.setState(rt,R,Qe)}let Me=!1;rt.version===Kt.__version?(Kt.needsLights&&Kt.lightsStateVersion!==cn.state.version||Kt.outputColorSpace!==Nt||k.isBatchedMesh&&Kt.batching===!1||!k.isBatchedMesh&&Kt.batching===!0||k.isBatchedMesh&&Kt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Kt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Kt.instancing===!1||!k.isInstancedMesh&&Kt.instancing===!0||k.isSkinnedMesh&&Kt.skinning===!1||!k.isSkinnedMesh&&Kt.skinning===!0||k.isInstancedMesh&&Kt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Kt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Kt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Kt.instancingMorph===!1&&k.morphTexture!==null||Kt.envMap!==Ft||rt.fog===!0&&Kt.fog!==Tt||Kt.numClippingPlanes!==void 0&&(Kt.numClippingPlanes!==At.numPlanes||Kt.numIntersection!==At.numIntersection)||Kt.vertexAlphas!==te||Kt.vertexTangents!==ee||Kt.morphTargets!==Yt||Kt.morphNormals!==ve||Kt.morphColors!==xe||Kt.toneMapping!==ke||Kt.morphTargetsCount!==ne)&&(Me=!0):(Me=!0,Kt.__version=rt.version);let Nn=Kt.currentProgram;Me===!0&&(Nn=Ke(rt,W,k));let pi=!1,Cn=!1,hn=!1;const ze=Nn.getUniforms(),wn=Kt.uniforms;if(Xt.useProgram(Nn.program)&&(pi=!0,Cn=!0,hn=!0),rt.id!==D&&(D=rt.id,Cn=!0),pi||w!==R){Xt.buffers.depth.getReversed()?(yt.copy(R.projectionMatrix),vS(yt),xS(yt),ze.setValue(I,"projectionMatrix",yt)):ze.setValue(I,"projectionMatrix",R.projectionMatrix),ze.setValue(I,"viewMatrix",R.matrixWorldInverse);const vn=ze.map.cameraPosition;vn!==void 0&&vn.setValue(I,zt.setFromMatrixPosition(R.matrixWorld)),pe.logarithmicDepthBuffer&&ze.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&ze.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),w!==R&&(w=R,Cn=!0,hn=!0)}if(k.isSkinnedMesh){ze.setOptional(I,k,"bindMatrix"),ze.setOptional(I,k,"bindMatrixInverse");const Qe=k.skeleton;Qe&&(Qe.boneTexture===null&&Qe.computeBoneTexture(),ze.setValue(I,"boneTexture",Qe.boneTexture,L))}k.isBatchedMesh&&(ze.setOptional(I,k,"batchingTexture"),ze.setValue(I,"batchingTexture",k._matricesTexture,L),ze.setOptional(I,k,"batchingIdTexture"),ze.setValue(I,"batchingIdTexture",k._indirectTexture,L),ze.setOptional(I,k,"batchingColorTexture"),k._colorsTexture!==null&&ze.setValue(I,"batchingColorTexture",k._colorsTexture,L));const bn=it.morphAttributes;if((bn.position!==void 0||bn.normal!==void 0||bn.color!==void 0)&&kt.update(k,it,Nn),(Cn||Kt.receiveShadow!==k.receiveShadow)&&(Kt.receiveShadow=k.receiveShadow,ze.setValue(I,"receiveShadow",k.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(wn.envMap.value=Ft,wn.flipEnvMap.value=Ft.isCubeTexture&&Ft.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&W.environment!==null&&(wn.envMapIntensity.value=W.environmentIntensity),Cn&&(ze.setValue(I,"toneMappingExposure",U.toneMappingExposure),Kt.needsLights&&Lc(wn,hn),Tt&&rt.fog===!0&&wt.refreshFogUniforms(wn,Tt),wt.refreshMaterialUniforms(wn,rt,q,Z,g.state.transmissionRenderTarget[R.id]),Tc.upload(I,_n(Kt),wn,L)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(Tc.upload(I,_n(Kt),wn,L),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&ze.setValue(I,"center",k.center),ze.setValue(I,"modelViewMatrix",k.modelViewMatrix),ze.setValue(I,"normalMatrix",k.normalMatrix),ze.setValue(I,"modelMatrix",k.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const Qe=rt.uniformsGroups;for(let vn=0,br=Qe.length;vn<br;vn++){const On=Qe[vn];j.update(On,Nn),j.bind(On,Nn)}}return Nn}function Lc(R,W){R.ambientLightColor.needsUpdate=W,R.lightProbe.needsUpdate=W,R.directionalLights.needsUpdate=W,R.directionalLightShadows.needsUpdate=W,R.pointLights.needsUpdate=W,R.pointLightShadows.needsUpdate=W,R.spotLights.needsUpdate=W,R.spotLightShadows.needsUpdate=W,R.rectAreaLights.needsUpdate=W,R.hemisphereLights.needsUpdate=W}function Nc(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(R,W,it){jt.get(R.texture).__webglTexture=W,jt.get(R.depthTexture).__webglTexture=it;const rt=jt.get(R);rt.__hasExternalTextures=!0,rt.__autoAllocateDepthBuffer=it===void 0,rt.__autoAllocateDepthBuffer||ue.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),rt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,W){const it=jt.get(R);it.__webglFramebuffer=W,it.__useDefaultFramebuffer=W===void 0};const Ho=I.createFramebuffer();this.setRenderTarget=function(R,W=0,it=0){Q=R,H=W,P=it;let rt=!0,k=null,Tt=!1,Ut=!1;if(R){const Ft=jt.get(R);if(Ft.__useDefaultFramebuffer!==void 0)Xt.bindFramebuffer(I.FRAMEBUFFER,null),rt=!1;else if(Ft.__webglFramebuffer===void 0)L.setupRenderTarget(R);else if(Ft.__hasExternalTextures)L.rebindTextures(R,jt.get(R.texture).__webglTexture,jt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Yt=R.depthTexture;if(Ft.__boundDepthTexture!==Yt){if(Yt!==null&&jt.has(Yt)&&(R.width!==Yt.image.width||R.height!==Yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(R)}}const te=R.texture;(te.isData3DTexture||te.isDataArrayTexture||te.isCompressedArrayTexture)&&(Ut=!0);const ee=jt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ee[W])?k=ee[W][it]:k=ee[W],Tt=!0):R.samples>0&&L.useMultisampledRTT(R)===!1?k=jt.get(R).__webglMultisampledFramebuffer:Array.isArray(ee)?k=ee[it]:k=ee,V.copy(R.viewport),st.copy(R.scissor),ot=R.scissorTest}else V.copy(F).multiplyScalar(q).floor(),st.copy(at).multiplyScalar(q).floor(),ot=St;if(it!==0&&(k=Ho),Xt.bindFramebuffer(I.FRAMEBUFFER,k)&&rt&&Xt.drawBuffers(R,k),Xt.viewport(V),Xt.scissor(st),Xt.setScissorTest(ot),Tt){const Ft=jt.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ft.__webglTexture,it)}else if(Ut){const Ft=jt.get(R.texture),te=W;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ft.__webglTexture,it,te)}else if(R!==null&&it!==0){const Ft=jt.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ft.__webglTexture,it)}D=-1},this.readRenderTargetPixels=function(R,W,it,rt,k,Tt,Ut){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Nt=jt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ut!==void 0&&(Nt=Nt[Ut]),Nt){Xt.bindFramebuffer(I.FRAMEBUFFER,Nt);try{const Ft=R.texture,te=Ft.format,ee=Ft.type;if(!pe.textureFormatReadable(te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!pe.textureTypeReadable(ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=R.width-rt&&it>=0&&it<=R.height-k&&I.readPixels(W,it,rt,k,re.convert(te),re.convert(ee),Tt)}finally{const Ft=Q!==null?jt.get(Q).__webglFramebuffer:null;Xt.bindFramebuffer(I.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(R,W,it,rt,k,Tt,Ut){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Nt=jt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ut!==void 0&&(Nt=Nt[Ut]),Nt){const Ft=R.texture,te=Ft.format,ee=Ft.type;if(!pe.textureFormatReadable(te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!pe.textureTypeReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=R.width-rt&&it>=0&&it<=R.height-k){Xt.bindFramebuffer(I.FRAMEBUFFER,Nt);const Yt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Yt),I.bufferData(I.PIXEL_PACK_BUFFER,Tt.byteLength,I.STREAM_READ),I.readPixels(W,it,rt,k,re.convert(te),re.convert(ee),0);const ve=Q!==null?jt.get(Q).__webglFramebuffer:null;Xt.bindFramebuffer(I.FRAMEBUFFER,ve);const xe=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await _S(I,xe,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Yt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Tt),I.deleteBuffer(Yt),I.deleteSync(xe),Tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,W=null,it=0){R.isTexture!==!0&&(gs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,R=arguments[1]);const rt=Math.pow(2,-it),k=Math.floor(R.image.width*rt),Tt=Math.floor(R.image.height*rt),Ut=W!==null?W.x:0,Nt=W!==null?W.y:0;L.setTexture2D(R,0),I.copyTexSubImage2D(I.TEXTURE_2D,it,0,0,Ut,Nt,k,Tt),Xt.unbindTexture()};const Wa=I.createFramebuffer(),Fs=I.createFramebuffer();this.copyTextureToTexture=function(R,W,it=null,rt=null,k=0,Tt=null){R.isTexture!==!0&&(gs("WebGLRenderer: copyTextureToTexture function signature has changed."),rt=arguments[0]||null,R=arguments[1],W=arguments[2],Tt=arguments[3]||0,it=null),Tt===null&&(k!==0?(gs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Tt=k,k=0):Tt=0);let Ut,Nt,Ft,te,ee,Yt,ve,xe,ke;const Te=R.isCompressedTexture?R.mipmaps[Tt]:R.image;if(it!==null)Ut=it.max.x-it.min.x,Nt=it.max.y-it.min.y,Ft=it.isBox3?it.max.z-it.min.z:1,te=it.min.x,ee=it.min.y,Yt=it.isBox3?it.min.z:0;else{const bn=Math.pow(2,-k);Ut=Math.floor(Te.width*bn),Nt=Math.floor(Te.height*bn),R.isDataArrayTexture?Ft=Te.depth:R.isData3DTexture?Ft=Math.floor(Te.depth*bn):Ft=1,te=0,ee=0,Yt=0}rt!==null?(ve=rt.x,xe=rt.y,ke=rt.z):(ve=0,xe=0,ke=0);const ne=re.convert(W.format),Kt=re.convert(W.type);let cn;W.isData3DTexture?(L.setTexture3D(W,0),cn=I.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(L.setTexture2DArray(W,0),cn=I.TEXTURE_2D_ARRAY):(L.setTexture2D(W,0),cn=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,W.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,W.unpackAlignment);const Me=I.getParameter(I.UNPACK_ROW_LENGTH),Nn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),pi=I.getParameter(I.UNPACK_SKIP_PIXELS),Cn=I.getParameter(I.UNPACK_SKIP_ROWS),hn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Te.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Te.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,te),I.pixelStorei(I.UNPACK_SKIP_ROWS,ee),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Yt);const ze=R.isDataArrayTexture||R.isData3DTexture,wn=W.isDataArrayTexture||W.isData3DTexture;if(R.isDepthTexture){const bn=jt.get(R),Qe=jt.get(W),vn=jt.get(bn.__renderTarget),br=jt.get(Qe.__renderTarget);Xt.bindFramebuffer(I.READ_FRAMEBUFFER,vn.__webglFramebuffer),Xt.bindFramebuffer(I.DRAW_FRAMEBUFFER,br.__webglFramebuffer);for(let On=0;On<Ft;On++)ze&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,jt.get(R).__webglTexture,k,Yt+On),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,jt.get(W).__webglTexture,Tt,ke+On)),I.blitFramebuffer(te,ee,Ut,Nt,ve,xe,Ut,Nt,I.DEPTH_BUFFER_BIT,I.NEAREST);Xt.bindFramebuffer(I.READ_FRAMEBUFFER,null),Xt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(k!==0||R.isRenderTargetTexture||jt.has(R)){const bn=jt.get(R),Qe=jt.get(W);Xt.bindFramebuffer(I.READ_FRAMEBUFFER,Wa),Xt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Fs);for(let vn=0;vn<Ft;vn++)ze?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,bn.__webglTexture,k,Yt+vn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,bn.__webglTexture,k),wn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Qe.__webglTexture,Tt,ke+vn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Qe.__webglTexture,Tt),k!==0?I.blitFramebuffer(te,ee,Ut,Nt,ve,xe,Ut,Nt,I.COLOR_BUFFER_BIT,I.NEAREST):wn?I.copyTexSubImage3D(cn,Tt,ve,xe,ke+vn,te,ee,Ut,Nt):I.copyTexSubImage2D(cn,Tt,ve,xe,te,ee,Ut,Nt);Xt.bindFramebuffer(I.READ_FRAMEBUFFER,null),Xt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else wn?R.isDataTexture||R.isData3DTexture?I.texSubImage3D(cn,Tt,ve,xe,ke,Ut,Nt,Ft,ne,Kt,Te.data):W.isCompressedArrayTexture?I.compressedTexSubImage3D(cn,Tt,ve,xe,ke,Ut,Nt,Ft,ne,Te.data):I.texSubImage3D(cn,Tt,ve,xe,ke,Ut,Nt,Ft,ne,Kt,Te):R.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,Tt,ve,xe,Ut,Nt,ne,Kt,Te.data):R.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,Tt,ve,xe,Te.width,Te.height,ne,Te.data):I.texSubImage2D(I.TEXTURE_2D,Tt,ve,xe,Ut,Nt,ne,Kt,Te);I.pixelStorei(I.UNPACK_ROW_LENGTH,Me),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Nn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,pi),I.pixelStorei(I.UNPACK_SKIP_ROWS,Cn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,hn),Tt===0&&W.generateMipmaps&&I.generateMipmap(cn),Xt.unbindTexture()},this.copyTextureToTexture3D=function(R,W,it=null,rt=null,k=0){return R.isTexture!==!0&&(gs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),it=arguments[0]||null,rt=arguments[1]||null,R=arguments[2],W=arguments[3],k=arguments[4]||0),gs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,W,it,rt,k)},this.initRenderTarget=function(R){jt.get(R).__webglFramebuffer===void 0&&L.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?L.setTextureCube(R,0):R.isData3DTexture?L.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?L.setTexture2DArray(R,0):L.setTexture2D(R,0),Xt.unbindTexture()},this.resetState=function(){H=0,P=0,Q=null,Xt.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return sa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorspace=Ce._getDrawingBufferColorSpace(e),i.unpackColorSpace=Ce._getUnpackColorSpace()}}function PT(){const o=Wt.useRef(null);return Wt.useEffect(()=>{const e=o.current;if(!e)return;const i=new zT({antialias:!0,alpha:!0});i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.setSize(e.clientWidth,e.clientHeight),i.setClearColor(0,0),e.appendChild(i.domElement);const r=new VS,l=new $n(60,e.clientWidth/e.clientHeight,.1,1e3);l.position.set(0,0,50),r.fog=new Eh(658983,.012),r.add(new QS(16777215,.3));const u=new q0(8150268,2,120);u.position.set(20,30,20),r.add(u);const h=new q0(54015,2,120);h.position.set(-30,-20,10),r.add(h);const d=[16729943,16753922,3069299,8150268,54015],p=[],m=160;for(let st=0;st<m;st++){const ot=3+Math.random()*8,pt=.4+Math.random()*.5,mt=new Io(ot,pt),z=d[Math.floor(Math.random()*d.length)],Z=new pd({color:z,emissive:z,emissiveIntensity:.3+Math.random()*.4,transparent:!0,opacity:.25+Math.random()*.45,side:Li}),q=new fi(mt,Z);q.position.set((Math.random()-.5)*120,(Math.random()-.5)*80,(Math.random()-.5)*80-10),q.rotation.set(Math.random()*.4-.2,Math.random()*.4-.2,Math.random()*Math.PI*2);const xt=.001+Math.random()*.003,bt=Math.random()*Math.PI*2,F=(Math.random()-.5)*.04;p.push({mesh:q,speed:xt,phase:bt,floatY:F,baseY:q.position.y}),r.add(q)}const v=new Ti,x=new Float32Array(800*3);for(let st=0;st<800*3;st++)x[st]=(Math.random()-.5)*300;v.setAttribute("position",new bi(x,3));const y=new ev({color:16777215,size:.3,transparent:!0,opacity:.4});r.add(new WS(v,y));const M=new Th(3,32,32),b=new pd({color:8150268,emissive:8150268,emissiveIntensity:1.2,transparent:!0,opacity:.85}),C=new fi(M,b);r.add(C);const S=new Ah(5,.15,8,64),g=new pd({color:54015,emissive:54015,emissiveIntensity:1}),N=new fi(S,g);r.add(N);let O=0;const U=()=>{O=window.scrollY/(document.body.scrollHeight-window.innerHeight)};window.addEventListener("scroll",U,{passive:!0});let X=0,H=0;const P=st=>{X=(st.clientX/window.innerWidth-.5)*2,H=(st.clientY/window.innerHeight-.5)*2};window.addEventListener("mousemove",P);const Q=()=>{l.aspect=e.clientWidth/e.clientHeight,l.updateProjectionMatrix(),i.setSize(e.clientWidth,e.clientHeight)};window.addEventListener("resize",Q);let D;const w=new $S,V=()=>{D=requestAnimationFrame(V);const st=w.getElapsedTime();l.position.x+=(X*8-l.position.x)*.02,l.position.y+=(-H*4-l.position.y)*.02,l.position.z=50-O*40,l.lookAt(0,0,0),p.forEach(({mesh:pt,speed:mt,phase:z,floatY:Z,baseY:q})=>{pt.rotation.z+=mt,pt.position.y=q+Math.sin(st+z)*3,pt.material.emissiveIntensity=.3+Math.sin(st*2+z)*.2});const ot=1+Math.sin(st*1.5)*.1;C.scale.setScalar(ot),b.emissiveIntensity=.8+Math.sin(st*1.5)*.4,N.rotation.x=st*.4,N.rotation.y=st*.6,i.render(r,l)};return V(),()=>{cancelAnimationFrame(D),window.removeEventListener("scroll",U),window.removeEventListener("mousemove",P),window.removeEventListener("resize",Q),i.dispose(),i.domElement.parentNode===e&&e.removeChild(i.domElement)}},[]),A.jsx("div",{ref:o,style:{position:"absolute",inset:0,zIndex:0}})}const y_=["Lint Everything.","Fix Automatically.","Ship Cleanly."];function BT(){const[o,e]=Wt.useState(0),[i,r]=Wt.useState(!0);return Wt.useEffect(()=>{const l=setInterval(()=>{r(!1),setTimeout(()=>{e(u=>(u+1)%y_.length),r(!0)},400)},2800);return()=>clearInterval(l)},[]),A.jsxs("section",{style:{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"radial-gradient(ellipse at 50% 40%, rgba(124,92,252,.18) 0%, rgba(10,14,39,1) 70%)"},children:[A.jsx(PT,{}),A.jsx("div",{style:{position:"absolute",inset:0,zIndex:1,background:"radial-gradient(ellipse at center, transparent 30%, rgba(10,14,39,.7) 100%)",pointerEvents:"none"}}),A.jsxs("div",{style:{position:"relative",zIndex:2,textAlign:"center",padding:"0 24px",maxWidth:860},children:[A.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(124,92,252,.15)",border:"1px solid rgba(124,92,252,.4)",borderRadius:50,padding:"6px 18px",marginBottom:32,fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"#B4A5FF"},children:[A.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"#7C5CFC",display:"inline-block",boxShadow:"0 0 8px #7C5CFC"}}),"AI-Powered Code Quality Platform"]}),A.jsxs("h1",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:"clamp(44px, 8vw, 88px)",fontWeight:700,lineHeight:1.05,margin:"0 0 12px",color:"#fff",letterSpacing:"-2px"},children:["Your code has a",A.jsx("br",{}),A.jsx("span",{style:{display:"inline-block",transition:"opacity .4s, transform .4s",opacity:i?1:0,transform:i?"translateY(0)":"translateY(12px)",background:"linear-gradient(135deg, #FF4757, #FFA502)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"story."})]}),A.jsx("h2",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:"clamp(44px, 8vw, 88px)",fontWeight:700,lineHeight:1.05,margin:"0 0 32px",letterSpacing:"-2px",height:"1.2em",overflow:"hidden"},children:A.jsx("span",{style:{display:"inline-block",transition:"opacity .4s, transform .4s",opacity:i?1:0,transform:i?"translateY(0)":"translateY(12px)",background:"linear-gradient(135deg, #7C5CFC, #00D2FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:y_[o]})}),A.jsx("p",{style:{fontSize:"clamp(16px, 2vw, 20px)",color:"rgba(255,255,255,.6)",maxWidth:600,margin:"0 auto 48px",lineHeight:1.7},children:"One AI that scans, lints, formats and fixes any codebase in any language — instantly. 327 rules. Zero noise."}),A.jsxs("div",{style:{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"},children:[A.jsx("a",{href:"#playground",className:"btn-primary",style:{background:"linear-gradient(135deg, #7C5CFC, #00D2FF)",border:"none",borderRadius:50,color:"#fff",fontFamily:"Space Grotesk, sans-serif",fontWeight:600,fontSize:16,padding:"16px 40px",cursor:"pointer",textDecoration:"none",display:"inline-block",transition:"transform .2s, box-shadow .2s"},onMouseEnter:l=>{l.target.style.transform="translateY(-2px)",l.target.style.boxShadow="0 20px 50px rgba(124,92,252,.5)"},onMouseLeave:l=>{l.target.style.transform="",l.target.style.boxShadow=""},children:"Try it Live — Free"}),A.jsx("a",{href:"#transform",style:{background:"transparent",border:"1px solid rgba(255,255,255,.2)",borderRadius:50,color:"rgba(255,255,255,.8)",fontFamily:"Space Grotesk, sans-serif",fontWeight:500,fontSize:16,padding:"15px 40px",cursor:"pointer",textDecoration:"none",display:"inline-block",transition:"border-color .2s, color .2s"},onMouseEnter:l=>{l.target.style.borderColor="#00D2FF",l.target.style.color="#00D2FF"},onMouseLeave:l=>{l.target.style.borderColor="rgba(255,255,255,.2)",l.target.style.color="rgba(255,255,255,.8)"},children:"See Before / After"})]}),A.jsx("div",{style:{marginTop:72,display:"flex",gap:40,justifyContent:"center",flexWrap:"wrap"},children:[["24","Languages"],["327+","Lint Rules"],["99.7%","Auto-fix Rate"],["50ms","Avg Scan Time"]].map(([l,u])=>A.jsxs("div",{style:{textAlign:"center"},children:[A.jsx("div",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:28,fontWeight:700,background:"linear-gradient(135deg, #7C5CFC, #00D2FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:l}),A.jsx("div",{style:{fontSize:13,color:"rgba(255,255,255,.45)",marginTop:2},children:u})]},u))})]}),A.jsxs("div",{style:{position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",zIndex:2,textAlign:"center"},children:[A.jsx("div",{style:{color:"rgba(255,255,255,.3)",fontSize:12,marginBottom:8,letterSpacing:2},children:"SCROLL"}),A.jsx("div",{style:{width:24,height:40,border:"2px solid rgba(255,255,255,.2)",borderRadius:12,margin:"0 auto",position:"relative"},children:A.jsx("div",{style:{width:4,height:8,background:"linear-gradient(#7C5CFC, #00D2FF)",borderRadius:2,position:"absolute",top:6,left:"50%",transform:"translateX(-50%)",animation:"fade-up 1.5s ease infinite"}})})]})]})}const IT=`import os, sys, json
from datetime  import datetime,timedelta
import requests,urllib

def getUserData(id,db,cache,logger,   config):
    data=db.query("SELECT * FROM users WHERE id="+str(id))
    if data==None:
        return None
    if data!=None:
        logger.log("got user: "+str(data))
        cached=cache.get("user_"+str(id))
        if cached!=None:
            return cached

    password=data['password']
    token=data['token']
    secret_key="hardcoded_secret_abc123"

    result={}
    result['id']=data['id']
    result['name']=data['name']
    result['password']=password
    result['token']=token

    unused_var = "this does nothing"
    x=1
    y=2

    try:
        resp=requests.get("http://api.example.com/user/"+str(id),verify=False)
        result['profile']=json.loads(resp.text)
    except:
        pass

    return result

def ProcessOrders( orders,db ):
    for i in range(0,len(orders)):
        o=orders[i]
        if o['status']=='pending' or o['status']=='PENDING':
            db.execute("UPDATE orders SET status='processing' WHERE id="+str(o['id']))
            print("updated: "+str(o['id']))
`,HT=`import json
import logging
import os
from typing import Optional

import requests

logger = logging.getLogger(__name__)

SECRET_KEY = os.environ.get("SECRET_KEY")
API_BASE_URL = os.environ.get("API_BASE_URL", "https://api.example.com")

PENDING_STATUSES = {"pending", "PENDING", "Pending"}


def get_user_data(
    user_id: int,
    db,
    cache,
    config: dict,
) -> Optional[dict]:
    """Fetch user data with caching support."""
    cache_key = f"user_{user_id}"
    if cached := cache.get(cache_key):
        return cached

    data = db.query(
        "SELECT id, name FROM users WHERE id = %s",
        (user_id,),
    )
    if data is None:
        return None

    logger.info("Fetched user %d from database", user_id)

    try:
        resp = requests.get(
            f"{API_BASE_URL}/user/{user_id}",
            timeout=5,
            verify=True,
        )
        resp.raise_for_status()
        profile = resp.json()
    except requests.RequestException:
        logger.warning("Failed to fetch profile for user %d", user_id)
        profile = {}

    return {
        "id": data["id"],
        "name": data["name"],
        "profile": profile,
    }


def process_orders(orders: list[dict], db) -> None:
    """Process all pending orders."""
    pending = [o for o in orders if o["status"] in PENDING_STATUSES]
    for order in pending:
        db.execute(
            "UPDATE orders SET status = %s WHERE id = %s",
            ("processing", order["id"]),
        )
        logger.info("Processed order %d", order["id"])
`,S_=[{line:1,type:"error",msg:"Multiple imports on one line (E401)",fix:"Split into separate import statements"},{line:1,type:"warning",msg:"Unused import: sys (F401)",fix:"Remove unused import"},{line:1,type:"warning",msg:"Unused import: urllib (F401)",fix:"Remove unused import"},{line:5,type:"error",msg:"Function has 5 arguments max 4 (PLR0913)",fix:"Reduce parameters or use a config object"},{line:6,type:"error",msg:"SQL injection vulnerability (S608)",fix:"Use parameterized queries"},{line:14,type:"error",msg:"Hardcoded secret detected (S105)",fix:"Use environment variable"},{line:23,type:"warning",msg:"Unused variable: unused_var (F841)",fix:"Remove or use the variable"},{line:24,type:"warning",msg:"Ambiguous variable name: x (E741)",fix:"Use descriptive name"},{line:29,type:"error",msg:"Insecure request: verify=False (S501)",fix:"Enable SSL verification"},{line:31,type:"error",msg:"Bare except clause (E722)",fix:"Catch specific exceptions"},{line:36,type:"warning",msg:"Use enumerate() instead of range(len()) (B007)",fix:"for i, o in enumerate(orders)"},{line:38,type:"warning",msg:"Repeated comparisons use a set (PLR1714)",fix:"Use: status in PENDING_STATUSES"},{line:39,type:"error",msg:"SQL injection vulnerability (S608)",fix:"Use parameterized queries"}],bd=[{name:"Python",color:"#3776AB",linters:["Ruff","Black","mypy","isort"],rules:847},{name:"TypeScript",color:"#3178C6",linters:["ESLint","Prettier","tsc"],rules:632},{name:"JavaScript",color:"#F7DF1E",linters:["ESLint","Prettier","JSHint"],rules:584},{name:"Rust",color:"#CE422B",linters:["Clippy","rustfmt","cargo audit"],rules:421},{name:"Go",color:"#00ADD8",linters:["golangci-lint","gofmt","staticcheck"],rules:318},{name:"Java",color:"#ED8B00",linters:["Checkstyle","PMD","SpotBugs"],rules:743},{name:"CSS",color:"#264DE4",linters:["Stylelint","CSSLint"],rules:276},{name:"Ruby",color:"#CC342D",linters:["RuboCop","Reek","Brakeman"],rules:389},{name:"Kotlin",color:"#7F52FF",linters:["Detekt","ktlint"],rules:312},{name:"Swift",color:"#FA7343",linters:["SwiftLint","swift-format"],rules:298},{name:"C++",color:"#004482",linters:["Clang-Tidy","cppcheck","cpplint"],rules:512},{name:"PHP",color:"#777BB4",linters:["PHPCS","PHPStan","Psalm"],rules:467}],GT=[{value:68,decimals:0,suffix:"%",label:"Fewer PR review comments"},{value:4.2,decimals:1,suffix:"h",label:"Saved per dev per week"},{value:99.7,decimals:1,suffix:"%",label:"Auto-fix success rate"},{value:327,decimals:0,suffix:"+",label:"Lint rules enforced"},{value:24,decimals:0,suffix:"",label:"Languages supported"},{value:50,decimals:0,suffix:"ms",label:"Average scan time"}],pr=[{id:"ingest",label:"Code Ingested",desc:"Files parsed and tokenized",color:"#7C5CFC"},{id:"ai",label:"AI Analysis",desc:"LLM detects semantic issues",color:"#00D2FF"},{id:"rules",label:"Rule Engine",desc:"327 rules applied in parallel",color:"#FFA502"},{id:"fix",label:"Auto-Fix",desc:"Safe fixes applied automatically",color:"#2ED573"},{id:"report",label:"Report Generated",desc:"Full diff with explanations",color:"#FF6B9D"}],VT=`function fetchUser(id) {
  var data = db.query("SELECT * FROM users WHERE id=" + id)
  if(data == null){
      return null
  }
  var unused = "nothing"
  try {
    var resp = fetch("http://api.com/user/"+id)
    data.profile = JSON.parse(resp)
  } catch(e) {}
  return data
}`,kT=`async function fetchUser(id) {
  if (!id || typeof id !== 'number') {
    throw new TypeError('id must be a number')
  }
  const data = await db.query(
    'SELECT id, name FROM users WHERE id = ?',
    [id]
  )
  if (!data) return null

  try {
    const resp = await fetch(\`\${API_BASE_URL}/user/\${id}\`, {
      headers: { Authorization: \`Bearer \${process.env.API_TOKEN}\` },
    })
    if (!resp.ok) throw new Error(\`HTTP \${resp.status}\`)
    data.profile = await resp.json()
  } catch (err) {
    logger.warn('Profile fetch failed', { id, err })
  }
  return data
}`;function jT(){const o=Wt.useRef(null),[e,i]=Wt.useState(!1),[r,l]=Wt.useState([]),[u,h]=Wt.useState(0);return Wt.useEffect(()=>{const d=new IntersectionObserver(([p])=>{p.isIntersecting&&i(!0)},{threshold:.25});return o.current&&d.observe(o.current),()=>d.disconnect()},[]),Wt.useEffect(()=>{if(!e)return;let d=0;const p=setInterval(()=>{d+=1,h(d),d>=100&&clearInterval(p)},28);return S_.forEach((m,v)=>{setTimeout(()=>l(x=>[...x,v]),600+v*200)}),()=>clearInterval(p)},[e]),A.jsxs("section",{id:"scan",ref:o,style:{minHeight:"100vh",background:"linear-gradient(180deg, #0A0E27 0%, #111638 50%, #0A0E27 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"120px 40px",position:"relative",overflow:"hidden"},children:[A.jsx("div",{style:{position:"absolute",inset:0,zIndex:0,backgroundImage:`
          linear-gradient(rgba(124,92,252,.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,92,252,.06) 1px, transparent 1px)`,backgroundSize:"60px 60px"}}),A.jsxs("div",{style:{position:"relative",zIndex:1,maxWidth:1200,width:"100%"},children:[A.jsxs("div",{style:{textAlign:"center",marginBottom:80},children:[A.jsx("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"#7C5CFC",letterSpacing:3,textTransform:"uppercase"},children:"Chapter 02"}),A.jsx("h2",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:"clamp(32px, 5vw, 56px)",fontWeight:700,margin:"12px 0 16px",color:"#fff",letterSpacing:"-1px"},children:"The AI Wakes Up"}),A.jsx("p",{style:{color:"rgba(255,255,255,.5)",fontSize:18,maxWidth:520,margin:"0 auto"},children:"One scan. Every language. Every rule. Every file."})]}),A.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1.4fr)",gap:48,alignItems:"start"},children:[A.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:32},children:[A.jsx(WT,{active:e,scanPct:u}),A.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center"},children:[{label:"8 Errors",bg:"rgba(255,71,87,.15)",border:"rgba(255,71,87,.4)",color:"#FF4757"},{label:"5 Warnings",bg:"rgba(255,165,2,.15)",border:"rgba(255,165,2,.4)",color:"#FFA502"},{label:"4 Style",bg:"rgba(124,92,252,.15)",border:"rgba(124,92,252,.4)",color:"#B4A5FF"},{label:"2 Security",bg:"rgba(255,71,87,.15)",border:"rgba(255,71,87,.4)",color:"#FF4757"}].map(d=>A.jsx("div",{style:{padding:"6px 14px",borderRadius:50,background:d.bg,border:`1px solid ${d.border}`,color:d.color,fontSize:13,fontWeight:600,fontFamily:"JetBrains Mono, monospace",opacity:e?1:0,transform:e?"translateY(0)":"translateY(10px)",transition:"opacity .5s 2s, transform .5s 2s"},children:d.label},d.label))})]}),A.jsxs("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:16,overflow:"hidden"},children:[A.jsxs("div",{style:{background:"#1E1E2E",padding:"12px 16px",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid rgba(255,255,255,.06)"},children:[["#FF5F57","#FFBD2E","#28CA41"].map(d=>A.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:d}},d)),A.jsx("span",{style:{marginLeft:8,fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"rgba(255,255,255,.3)"},children:"lint-report.json"}),A.jsx("div",{style:{marginLeft:"auto",fontFamily:"JetBrains Mono, monospace",fontSize:12,color:u<100?"#FFA502":"#2ED573",transition:"color .5s"},children:u<100?`Scanning... ${u}%`:"Scan Complete"})]}),A.jsx("div",{style:{height:3,background:"#1E1E2E"},children:A.jsx("div",{style:{height:"100%",width:`${u}%`,background:"linear-gradient(90deg, #7C5CFC, #00D2FF)",transition:"width .05s linear",boxShadow:"0 0 12px rgba(124,92,252,.8)"}})}),A.jsx("div",{style:{maxHeight:480,overflowY:"auto",padding:"8px 0"},children:S_.map((d,p)=>A.jsx(XT,{item:d,visible:r.includes(p)},p))})]})]})]})]})}function WT({active:o,scanPct:e}){return A.jsxs("div",{style:{position:"relative",width:300,height:300},children:[[0,1,2].map(i=>A.jsx("div",{style:{position:"absolute",inset:`${i*30}px`,border:"1px solid rgba(124,92,252,.2)",borderRadius:"50%"}},i)),o&&[0,1,2].map(i=>A.jsx("div",{style:{position:"absolute",inset:0,border:"2px solid rgba(124,92,252,.6)",borderRadius:"50%",animation:`pulse-ring 2.4s ease-out ${i*.8}s infinite`}},i)),o&&A.jsxs("div",{style:{position:"absolute",inset:0,borderRadius:"50%",overflow:"hidden",animation:"rotate-slow 4s linear infinite"},children:[A.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",width:"50%",height:2,transformOrigin:"0% 50%",background:"linear-gradient(90deg, rgba(124,92,252,.9), transparent)",boxShadow:"0 0 12px rgba(124,92,252,.8)"}}),A.jsx("div",{style:{position:"absolute",inset:0,background:"conic-gradient(from 0deg, rgba(124,92,252,.15) 0deg, transparent 90deg)",animation:"rotate-slow 4s linear infinite"}})]}),A.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:70,height:70,borderRadius:"50%",background:"radial-gradient(circle, #9B7DFF, #7C5CFC)",boxShadow:"0 0 40px rgba(124,92,252,.8), 0 0 80px rgba(124,92,252,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Space Grotesk, sans-serif",fontWeight:700,fontSize:18,color:"#fff",transition:"box-shadow .5s"},children:e<100?`${e}%`:"AI"}),o&&[0,1,2,3].map(i=>A.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",width:10,height:10,borderRadius:"50%",background:["#FF4757","#FFA502","#2ED573","#00D2FF"][i],boxShadow:`0 0 10px ${["#FF4757","#FFA502","#2ED573","#00D2FF"][i]}`,marginTop:-5,marginLeft:-5,animation:`orbit ${3+i*.5}s linear ${i*.8}s infinite`,transformOrigin:`${80+i*20}px 0`}},i))]})}function XT({item:o,visible:e}){const i=o.type==="error"?"#FF4757":"#FFA502",r=o.type==="error"?"rgba(255,71,87,.06)":"rgba(255,165,2,.06)";return A.jsxs("div",{style:{padding:"10px 16px",borderLeft:`3px solid ${i}`,margin:"2px 8px",borderRadius:"0 8px 8px 0",background:r,opacity:e?1:0,transform:e?"translateX(0)":"translateX(-16px)",transition:"opacity .35s, transform .35s"},children:[A.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:3},children:[A.jsxs("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"rgba(255,255,255,.3)"},children:["L",o.line]}),A.jsx("span",{style:{padding:"1px 8px",borderRadius:4,background:o.type==="error"?"rgba(255,71,87,.2)":"rgba(255,165,2,.2)",color:i,fontSize:10,fontWeight:700,fontFamily:"JetBrains Mono, monospace",textTransform:"uppercase"},children:o.type}),A.jsx("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"rgba(255,255,255,.75)"},children:o.msg})]}),A.jsxs("div",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"#2ED573"},children:["Fix: ",o.fix]})]})}const M_=IT.trimEnd().split(`
`),E_=HT.trimEnd().split(`
`);function qT(o){if(!o.trim())return A.jsx("span",{children:" "});const e=o,i=/(#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+\.?\d*\b)|\b(def|return|import|from|if|else|elif|for|in|try|except|pass|None|True|False|not|and|or|class|with|as|raise|async|await|const|var|let|function|export|default)\b/gm;let r=0,l=[],u;for(i.lastIndex=0;(u=i.exec(e))!==null;)u.index>r&&l.push(A.jsx("span",{style:{color:"#E4E4E7"},children:e.slice(r,u.index)},r)),u[1]?l.push(A.jsx("span",{style:{color:"#6A9955"},children:u[1]},u.index)):u[2]?l.push(A.jsx("span",{style:{color:"#CE9178"},children:u[2]},u.index)):u[3]?l.push(A.jsx("span",{style:{color:"#B5CEA8"},children:u[3]},u.index)):l.push(A.jsx("span",{style:{color:"#C586C0"},children:u[0]},u.index)),r=u.index+u[0].length;return r<e.length&&l.push(A.jsx("span",{style:{color:"#E4E4E7"},children:e.slice(r)},r)),l}function YT(o){return o.trim().startsWith("#")?null:o.includes("SELECT * FROM")||o.includes("verify=False")||o.includes("hardcoded_secret")||o.includes("except:")||o.includes("import")&&o.includes(",")||o.includes("getUserData")||o.includes("ProcessOrders")||o.includes("unused_var")||o.includes("x=")&&!o.includes("tx")&&!o.includes("ix")?"error":o.includes("== None")||o.includes("range(0,len(")||o.includes("print(")||o.includes("password")?"warn":null}function ZT(){const o=Wt.useRef(null),[e,i]=Wt.useState(!1),[r,l]=Wt.useState(50),[u,h]=Wt.useState(34),[d,p]=Wt.useState(0),m=Wt.useRef(!1);Wt.useEffect(()=>{const S=new IntersectionObserver(([g])=>{g.isIntersecting&&i(!0)},{threshold:.2});return o.current&&S.observe(o.current),()=>S.disconnect()},[]),Wt.useEffect(()=>{if(!e)return;let S=34;const g=()=>{S=Math.min(100,S+.5),h(Math.round(S)),p(Math.round((S-34)/66*13)),S<100&&setTimeout(g,30)};setTimeout(g,1e3)},[e]);const v=()=>{m.current=!0},x=S=>{if(!m.current||!o.current)return;const g=o.current.getBoundingClientRect(),N=Math.min(100,Math.max(0,(S.clientX-g.left)/g.width*100));l(N)},y=()=>{m.current=!1};Wt.useEffect(()=>(window.addEventListener("mousemove",x),window.addEventListener("mouseup",y),()=>{window.removeEventListener("mousemove",x),window.removeEventListener("mouseup",y)}),[]);const M=u<50?"#FF4757":u<80?"#FFA502":"#2ED573",b=Math.max(M_.length,E_.length),C=Array.from({length:b},(S,g)=>({bad:M_[g]??"",good:E_[g]??""}));return A.jsxs("section",{id:"transform",ref:o,style:{minHeight:"100vh",background:"#0A0E27",padding:"120px 40px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",overflow:"hidden"},children:[A.jsx("div",{style:{position:"absolute",top:-100,right:-100,width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle, rgba(124,92,252,.12) 0%, transparent 70%)",pointerEvents:"none"}}),A.jsxs("div",{style:{textAlign:"center",marginBottom:60,maxWidth:640},children:[A.jsx("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"#7C5CFC",letterSpacing:3,textTransform:"uppercase"},children:"Chapter 03"}),A.jsx("h2",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:"clamp(32px, 5vw, 56px)",fontWeight:700,margin:"12px 0 16px",color:"#fff",letterSpacing:"-1px"},children:"The Transformation"}),A.jsx("p",{style:{color:"rgba(255,255,255,.5)",fontSize:18},children:"Drag the slider. Watch chaos become clarity."})]}),A.jsxs("div",{style:{display:"flex",alignItems:"center",gap:24,marginBottom:32,flexWrap:"wrap",justifyContent:"center"},children:[A.jsx(KT,{value:u,color:M}),A.jsx("div",{style:{display:"flex",gap:16,flexWrap:"wrap"},children:[{label:"Errors Fixed",val:`${Math.min(8,Math.floor(d*8/13))}`,color:"#FF4757"},{label:"Warnings Fixed",val:`${Math.min(5,Math.floor(d*5/13))}`,color:"#FFA502"},{label:"Lines Changed",val:`${Math.floor(d*2.8)}`,color:"#00D2FF"}].map(S=>A.jsxs("div",{style:{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:"12px 20px",textAlign:"center"},children:[A.jsx("div",{style:{fontFamily:"Space Grotesk, sans-serif",fontWeight:700,fontSize:24,color:S.color},children:S.val}),A.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,.4)",marginTop:2},children:S.label})]},S.label))})]}),A.jsxs("div",{style:{width:"100%",maxWidth:1100,position:"relative",borderRadius:16,overflow:"hidden",border:"1px solid rgba(255,255,255,.08)",userSelect:"none",cursor:"col-resize"},children:[A.jsxs("div",{style:{background:"#2A2A3E",padding:"12px 16px",display:"flex",alignItems:"center",gap:24,borderBottom:"1px solid rgba(255,255,255,.06)"},children:[A.jsx("div",{style:{display:"flex",gap:8},children:["#FF5F57","#FFBD2E","#28CA41"].map(S=>A.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:S}},S))}),A.jsx("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"rgba(255,255,255,.3)"},children:"user_service.py"}),A.jsxs("div",{style:{marginLeft:"auto",display:"flex",gap:16},children:[A.jsx("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"#FF4757"},children:"BEFORE"}),A.jsx("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"rgba(255,255,255,.2)"},children:"|"}),A.jsx("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"#2ED573"},children:"AFTER"})]})]}),A.jsxs("div",{style:{position:"relative",height:480,overflow:"hidden"},children:[A.jsx("div",{style:{position:"absolute",inset:0,background:"#1E1E2E",overflowY:"auto"},children:A.jsx(b_,{lines:C,side:"bad"})}),A.jsx("div",{style:{position:"absolute",top:0,left:0,bottom:0,width:`${r}%`,background:"#1A2030",overflow:"hidden",borderRight:"2px solid rgba(0,210,255,.6)"},children:A.jsx("div",{style:{width:`${100/(r/100)}%`,position:"absolute",inset:0,overflowY:"auto"},children:A.jsx(b_,{lines:C,side:"good"})})}),A.jsx("div",{onMouseDown:v,style:{position:"absolute",top:0,bottom:0,left:`calc(${r}% - 20px)`,width:40,display:"flex",alignItems:"center",justifyContent:"center",cursor:"col-resize",zIndex:10},children:A.jsx("div",{style:{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg, #7C5CFC, #00D2FF)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 20px rgba(124,92,252,.7)",fontSize:16,color:"#fff",fontWeight:700,border:"2px solid rgba(255,255,255,.3)"},children:"<>"})})]})]})]})}function b_({lines:o,side:e}){return A.jsx("div",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:13,lineHeight:1.7,padding:"16px 0",minHeight:"100%"},children:o.map((i,r)=>{const l=e==="bad"?i.bad:i.good,u=e==="bad"?YT(i.bad):null,h=e==="good"&&i.bad!==i.good&&i.good;return A.jsxs("div",{style:{display:"flex",gap:16,padding:"0 20px",background:u==="error"?"rgba(255,71,87,.1)":u==="warn"?"rgba(255,165,2,.08)":h?"rgba(46,213,115,.07)":"transparent",borderLeft:u==="error"?"3px solid #FF4757":u==="warn"?"3px solid #FFA502":h?"3px solid #2ED573":"3px solid transparent"},children:[A.jsx("span",{style:{color:"rgba(255,255,255,.2)",minWidth:24,textAlign:"right",userSelect:"none"},children:r+1}),A.jsx("span",{style:{whiteSpace:"pre",flex:1},children:l?qT(l):A.jsx("span",{children:" "})})]},r)})})}function KT({value:o,color:e}){const r=2*Math.PI*52,l=r*(1-o/100);return A.jsxs("div",{style:{position:"relative",width:140,height:140,flexShrink:0},children:[A.jsxs("svg",{width:"140",height:"140",style:{transform:"rotate(-90deg)"},children:[A.jsx("circle",{cx:"70",cy:"70",r:52,fill:"none",stroke:"rgba(255,255,255,.06)",strokeWidth:"10"}),A.jsx("circle",{cx:"70",cy:"70",r:52,fill:"none",stroke:e,strokeWidth:"10",strokeDasharray:r,strokeDashoffset:l,strokeLinecap:"round",style:{transition:"stroke-dashoffset .15s, stroke .5s",filter:`drop-shadow(0 0 8px ${e})`}})]}),A.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[A.jsxs("div",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:28,fontWeight:700,color:e,transition:"color .5s"},children:[o,"%"]}),A.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,.4)"},children:"Code Health"})]})]})}function QT(){const o=Wt.useRef(null),[e,i]=Wt.useState(!1),[r,l]=Wt.useState(0);Wt.useEffect(()=>{const h=new IntersectionObserver(([d])=>{d.isIntersecting&&i(!0)},{threshold:.2});return o.current&&h.observe(o.current),()=>h.disconnect()},[]),Wt.useEffect(()=>{if(!e)return;const h=setInterval(()=>l(d=>(d+1)%bd.length),2200);return()=>clearInterval(h)},[e]);const u=bd[r];return A.jsxs("section",{id:"languages",ref:o,style:{minHeight:"100vh",background:"linear-gradient(180deg, #0A0E27 0%, #111638 50%, #0A0E27 100%)",padding:"120px 40px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",overflow:"hidden"},children:[A.jsx("div",{style:{position:"absolute",bottom:-200,left:"50%",transform:"translateX(-50%)",width:800,height:400,borderRadius:"50%",background:"radial-gradient(circle, rgba(0,210,255,.08) 0%, transparent 70%)",pointerEvents:"none"}}),A.jsxs("div",{style:{textAlign:"center",marginBottom:70},children:[A.jsx("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"#7C5CFC",letterSpacing:3,textTransform:"uppercase"},children:"Chapter 04"}),A.jsxs("h2",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:"clamp(32px, 5vw, 56px)",fontWeight:700,margin:"12px 0 16px",color:"#fff",letterSpacing:"-1px"},children:["Every Language.",A.jsx("br",{}),"Every Rule."]}),A.jsx("p",{style:{color:"rgba(255,255,255,.5)",fontSize:18,maxWidth:500,margin:"0 auto"},children:"24 languages. Best-in-class linters. One unified interface."})]}),A.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:60,width:"100%",maxWidth:1100,alignItems:"center"},children:[A.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:12},children:bd.map((h,d)=>A.jsxs("button",{onClick:()=>l(d),style:{background:r===d?`rgba(${T_(h.color)}, .15)`:"rgba(255,255,255,.04)",border:`1px solid ${r===d?h.color:"rgba(255,255,255,.08)"}`,borderRadius:12,padding:"14px 8px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,transition:"all .25s",transform:r===d?"scale(1.06)":"scale(1)",boxShadow:r===d?`0 0 20px ${h.color}40`:"none"},children:[A.jsx("div",{style:{width:32,height:32,borderRadius:8,background:h.color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:11,color:"#fff",fontFamily:"Space Grotesk, sans-serif",boxShadow:r===d?`0 0 12px ${h.color}`:"none"},children:h.name.slice(0,2).toUpperCase()}),A.jsx("span",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:11,fontWeight:600,color:r===d?"#fff":"rgba(255,255,255,.5)",transition:"color .25s"},children:h.name})]},h.name))}),A.jsxs("div",{style:{background:"rgba(255,255,255,.04)",border:`1px solid ${u.color}40`,borderRadius:20,padding:36,animation:"fade-up .4s ease forwards"},children:[A.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,marginBottom:28},children:[A.jsx("div",{style:{width:56,height:56,borderRadius:14,background:u.color,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Space Grotesk, sans-serif",fontWeight:700,fontSize:20,color:"#fff",boxShadow:`0 0 24px ${u.color}80`},children:u.name.slice(0,2).toUpperCase()}),A.jsxs("div",{children:[A.jsx("div",{style:{fontFamily:"Space Grotesk, sans-serif",fontWeight:700,fontSize:24,color:"#fff"},children:u.name}),A.jsxs("div",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:u.color},children:[u.rules," rules enforced"]})]})]}),A.jsxs("div",{style:{marginBottom:24},children:[A.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,.4)",marginBottom:10,textTransform:"uppercase",letterSpacing:2},children:"Linters / Formatters"}),A.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:u.linters.map(h=>A.jsx("span",{style:{padding:"5px 12px",borderRadius:8,background:`rgba(${T_(u.color)}, .12)`,border:`1px solid ${u.color}40`,fontFamily:"JetBrains Mono, monospace",fontSize:12,color:u.color},children:h},h))})]}),A.jsxs("div",{children:[A.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:8},children:[A.jsx("span",{style:{fontSize:12,color:"rgba(255,255,255,.4)"},children:"Rule Coverage"}),A.jsxs("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:u.color},children:[u.rules," / 1000"]})]}),A.jsx("div",{style:{height:6,background:"rgba(255,255,255,.08)",borderRadius:3,overflow:"hidden"},children:A.jsx("div",{style:{height:"100%",width:`${u.rules/1e3*100}%`,background:u.color,borderRadius:3,boxShadow:`0 0 8px ${u.color}`,transition:"width .8s ease"}})})]}),A.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:24},children:[{label:"Auto-fixable",val:`${Math.round(u.rules*.72)}`},{label:"Security rules",val:`${Math.round(u.rules*.18)}`}].map(h=>A.jsxs("div",{style:{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"14px",border:"1px solid rgba(255,255,255,.06)"},children:[A.jsx("div",{style:{fontFamily:"Space Grotesk, sans-serif",fontWeight:700,fontSize:22,color:"#fff"},children:h.val}),A.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,.4)",marginTop:2},children:h.label})]},h.label))})]},r)]})]})}function T_(o){const e=parseInt(o.slice(1,3),16),i=parseInt(o.slice(3,5),16),r=parseInt(o.slice(5,7),16);return`${e},${i},${r}`}function JT(){const o=Wt.useRef(null),[e,i]=Wt.useState(!1),[r,l]=Wt.useState(-1),[u,h]=Wt.useState(-1);return Wt.useEffect(()=>{const d=new IntersectionObserver(([p])=>{p.isIntersecting&&i(!0)},{threshold:.3});return o.current&&d.observe(o.current),()=>d.disconnect()},[]),Wt.useEffect(()=>{e&&(pr.forEach((d,p)=>{setTimeout(()=>l(p),400+p*600)}),setTimeout(()=>{pr.forEach((d,p)=>{setTimeout(()=>h(p),p*600)})},600))},[e]),A.jsxs("section",{id:"pipeline",ref:o,style:{minHeight:"100vh",background:"#0A0E27",padding:"120px 40px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",overflow:"hidden"},children:[A.jsxs("div",{style:{textAlign:"center",marginBottom:80},children:[A.jsx("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"#7C5CFC",letterSpacing:3,textTransform:"uppercase"},children:"Chapter 05"}),A.jsx("h2",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:"clamp(32px, 5vw, 56px)",fontWeight:700,margin:"12px 0 16px",color:"#fff",letterSpacing:"-1px"},children:"Under the Hood"}),A.jsx("p",{style:{color:"rgba(255,255,255,.5)",fontSize:18,maxWidth:500,margin:"0 auto"},children:"From raw file to clean code — the full pipeline, visualised."})]}),A.jsxs("div",{style:{width:"100%",maxWidth:1100,position:"relative",padding:"60px 0"},children:[A.jsx("div",{style:{position:"absolute",top:"50%",left:"8%",right:"8%",height:3,background:"rgba(255,255,255,.06)",transform:"translateY(-50%)",zIndex:0}}),A.jsx("div",{style:{position:"absolute",top:"50%",left:"8%",height:3,width:r>=0?`${r/(pr.length-1)*84}%`:"0%",background:"linear-gradient(90deg, #7C5CFC, #00D2FF)",transform:"translateY(-50%)",zIndex:1,transition:"width .5s ease",boxShadow:"0 0 10px rgba(124,92,252,.6)"}}),A.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:2},children:pr.map((d,p)=>A.jsx($T,{step:d,index:p,isActive:r>=p,isPacket:u===p},d.id))}),u>=0&&u<pr.length&&A.jsx("div",{style:{position:"absolute",top:"calc(50% - 12px)",left:`calc(${8+u/(pr.length-1)*84}% - 12px)`,width:24,height:24,borderRadius:6,background:"linear-gradient(135deg, #7C5CFC, #00D2FF)",boxShadow:"0 0 20px rgba(124,92,252,.9)",zIndex:3,transition:"left .55s cubic-bezier(.4,0,.2,1)"}})]}),A.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:16,width:"100%",maxWidth:1100,marginTop:40},children:pr.map((d,p)=>A.jsxs("div",{style:{background:r>=p?"rgba(255,255,255,.05)":"rgba(255,255,255,.02)",border:`1px solid ${r>=p?d.color+"50":"rgba(255,255,255,.06)"}`,borderRadius:14,padding:"20px 16px",opacity:r>=p?1:.35,transition:"all .5s ease",transform:r>=p?"translateY(0)":"translateY(16px)"},children:[A.jsx("div",{style:{width:10,height:10,borderRadius:"50%",background:d.color,marginBottom:12,boxShadow:r>=p?`0 0 10px ${d.color}`:"none",transition:"box-shadow .5s"}}),A.jsx("div",{style:{fontFamily:"Space Grotesk, sans-serif",fontWeight:600,fontSize:14,color:r>=p?"#fff":"rgba(255,255,255,.4)",marginBottom:6},children:d.label}),A.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,.4)",lineHeight:1.5},children:d.desc})]},d.id))}),A.jsx(e2,{active:e})]})}function $T({step:o,isActive:e,isPacket:i}){return A.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:16},children:[A.jsxs("div",{style:{width:80,height:80,borderRadius:20,background:e?`linear-gradient(135deg, ${o.color}33, ${o.color}22)`:"rgba(255,255,255,.04)",border:`2px solid ${e?o.color:"rgba(255,255,255,.08)"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .5s ease",boxShadow:e?`0 0 30px ${o.color}50`:"none",position:"relative",transform:i?"scale(1.12)":"scale(1)"},children:[A.jsx("svg",{width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",children:A.jsx(t2,{id:o.id,color:e?o.color:"rgba(255,255,255,.3)"})}),i&&A.jsx("div",{style:{position:"absolute",inset:-4,borderRadius:24,border:`2px solid ${o.color}`,animation:"pulse-ring 1s ease-out infinite"}})]}),A.jsx("div",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:12,fontWeight:600,color:e?"#fff":"rgba(255,255,255,.3)",textAlign:"center",transition:"color .5s"},children:o.label})]})}function t2({id:o,color:e}){switch(o){case"ingest":return A.jsx("path",{d:"M6 8h20M6 16h20M6 24h14",stroke:e,strokeWidth:"2.5",strokeLinecap:"round"});case"ai":return A.jsxs(A.Fragment,{children:[A.jsx("circle",{cx:"16",cy:"16",r:"6",stroke:e,strokeWidth:"2"}),A.jsx("line",{x1:"16",y1:"4",x2:"16",y2:"10",stroke:e,strokeWidth:"2"}),A.jsx("line",{x1:"16",y1:"22",x2:"16",y2:"28",stroke:e,strokeWidth:"2"}),A.jsx("line",{x1:"4",y1:"16",x2:"10",y2:"16",stroke:e,strokeWidth:"2"}),A.jsx("line",{x1:"22",y1:"16",x2:"28",y2:"16",stroke:e,strokeWidth:"2"})]});case"rules":return A.jsxs(A.Fragment,{children:[A.jsx("rect",{x:"5",y:"5",width:"9",height:"9",rx:"2",stroke:e,strokeWidth:"2"}),A.jsx("rect",{x:"18",y:"5",width:"9",height:"9",rx:"2",stroke:e,strokeWidth:"2"}),A.jsx("rect",{x:"5",y:"18",width:"9",height:"9",rx:"2",stroke:e,strokeWidth:"2"}),A.jsx("rect",{x:"18",y:"18",width:"9",height:"9",rx:"2",stroke:e,strokeWidth:"2"})]});case"fix":return A.jsx("path",{d:"M8 16l5 5 11-11",stroke:e,strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"});case"report":return A.jsxs(A.Fragment,{children:[A.jsx("rect",{x:"6",y:"4",width:"20",height:"24",rx:"3",stroke:e,strokeWidth:"2"}),A.jsx("line",{x1:"11",y1:"11",x2:"21",y2:"11",stroke:e,strokeWidth:"1.5"}),A.jsx("line",{x1:"11",y1:"16",x2:"21",y2:"16",stroke:e,strokeWidth:"1.5"}),A.jsx("line",{x1:"11",y1:"21",x2:"17",y2:"21",stroke:e,strokeWidth:"1.5"})]});default:return null}}const A_=[{delay:200,col:"#7C5CFC",text:"> lintforge scan ./src --ai --all-rules"},{delay:800,col:"#00D2FF",text:"  Parsing 47 files across 3 languages..."},{delay:1400,col:"#FFA502",text:"  AI model loaded (gpt-4o-mini, 8ms)"},{delay:2e3,col:"#FFA502",text:"  Rule engine: 327 rules x 47 files = 15,369 checks"},{delay:2800,col:"#FF4757",text:"  Found 13 issues: 8 errors, 5 warnings"},{delay:3400,col:"#2ED573",text:"  Auto-fixing 11 safe issues..."},{delay:4e3,col:"#2ED573",text:"  11/11 fixes applied successfully (2 require review)"},{delay:4600,col:"#fff",text:"  Report: lint-report.html (48KB)"},{delay:5e3,col:"#2ED573",text:"  Done in 312ms. Code health: 34% -> 97%"}];function e2({active:o}){const[e,i]=Wt.useState([]);return Wt.useEffect(()=>{o&&A_.forEach((r,l)=>{setTimeout(()=>i(u=>[...u,r]),r.delay)})},[o]),A.jsxs("div",{style:{width:"100%",maxWidth:1100,marginTop:60,borderRadius:16,overflow:"hidden",border:"1px solid rgba(255,255,255,.08)"},children:[A.jsxs("div",{style:{background:"#2A2A3E",padding:"12px 16px",display:"flex",alignItems:"center",gap:8},children:[["#FF5F57","#FFBD2E","#28CA41"].map(r=>A.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:r}},r)),A.jsx("span",{style:{marginLeft:8,fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"rgba(255,255,255,.3)"},children:"Terminal"})]}),A.jsxs("div",{style:{background:"#0D1117",padding:"20px 24px",minHeight:220,fontFamily:"JetBrains Mono, monospace",fontSize:13,lineHeight:2},children:[e.map((r,l)=>A.jsx("div",{style:{color:r.col,animation:"fade-up .3s ease forwards"},children:r.text},l)),e.length<A_.length&&o&&A.jsx("span",{style:{display:"inline-block",width:8,height:16,background:"#7C5CFC",animation:"flicker 1s ease-in-out infinite",verticalAlign:"middle"}})]})]})}function n2(o,e,i,r){const[l,u]=Wt.useState(0);return Wt.useEffect(()=>{if(!r)return;const h=60,d=o/h;let p=0;const m=setInterval(()=>{p=Math.min(o,p+d),u(parseFloat(p.toFixed(e))),p>=o&&clearInterval(m)},i/h);return()=>clearInterval(m)},[r,o]),l}function i2({stat:o,active:e,index:i}){const r=n2(o.value,o.decimals,1800,e);return A.jsxs("div",{style:{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:20,padding:"36px 28px",textAlign:"center",position:"relative",overflow:"hidden",opacity:e?1:0,transform:e?"translateY(0)":"translateY(30px)",transition:`opacity .6s ${i*.1}s, transform .6s ${i*.1}s`},children:[A.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(135deg, transparent 40%, rgba(124,92,252,.07) 50%, transparent 60%)",backgroundSize:"200% auto",animation:e?"shimmer 3s linear infinite":"none"}}),A.jsxs("div",{style:{fontFamily:"Space Grotesk, sans-serif",fontWeight:800,fontSize:"clamp(36px, 4vw, 56px)",background:"linear-gradient(135deg, #7C5CFC, #00D2FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1,marginBottom:12},children:[o.decimals>0?r.toFixed(o.decimals):Math.round(r),o.suffix]}),A.jsx("div",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:15,fontWeight:500,color:"rgba(255,255,255,.55)",lineHeight:1.4},children:o.label})]})}const Td=[{name:"Sarah K.",role:"Staff Engineer, Stripe",text:"Reduced our PR review time by 40%. Game-changer for our CI pipeline."},{name:"Marcus T.",role:"CTO, DevFlow",text:"We caught a SQL injection before prod. LintForge flagged it in 200ms."},{name:"Priya M.",role:"Lead Dev, Shopify",text:"The AI-suggested fixes actually make sense. Not just pattern matching."}];function a2(){const o=Wt.useRef(null),[e,i]=Wt.useState(!1),[r,l]=Wt.useState(0);Wt.useEffect(()=>{const h=new IntersectionObserver(([d])=>{d.isIntersecting&&i(!0)},{threshold:.2});return o.current&&h.observe(o.current),()=>h.disconnect()},[]),Wt.useEffect(()=>{const h=setInterval(()=>l(d=>(d+1)%Td.length),3500);return()=>clearInterval(h)},[]);const u=Td[r];return A.jsxs("section",{id:"impact",ref:o,style:{minHeight:"100vh",background:"linear-gradient(180deg, #0A0E27 0%, #111638 60%, #0A0E27 100%)",padding:"120px 40px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",overflow:"hidden"},children:[A.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundImage:`radial-gradient(ellipse at 20% 50%, rgba(124,92,252,.08) 0%, transparent 50%),
                         radial-gradient(ellipse at 80% 50%, rgba(0,210,255,.06) 0%, transparent 50%)`,pointerEvents:"none"}}),A.jsxs("div",{style:{position:"relative",zIndex:1,width:"100%",maxWidth:1100},children:[A.jsxs("div",{style:{textAlign:"center",marginBottom:70},children:[A.jsx("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"#7C5CFC",letterSpacing:3,textTransform:"uppercase"},children:"Chapter 06"}),A.jsx("h2",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:"clamp(32px, 5vw, 56px)",fontWeight:700,margin:"12px 0 16px",color:"#fff",letterSpacing:"-1px"},children:"The Impact is Real"}),A.jsx("p",{style:{color:"rgba(255,255,255,.5)",fontSize:18,maxWidth:500,margin:"0 auto"},children:"Numbers don't lie. Teams ship cleaner code, faster."})]}),A.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:20,marginBottom:60},children:GT.map((h,d)=>A.jsx(i2,{stat:h,active:e,index:d},h.label))}),A.jsx(r2,{active:e}),A.jsx("div",{style:{marginTop:60},children:A.jsxs("div",{style:{background:"rgba(255,255,255,.04)",border:"1px solid rgba(124,92,252,.2)",borderRadius:20,padding:40,textAlign:"center",animation:"fade-up .5s ease forwards"},children:[A.jsxs("div",{style:{fontSize:"clamp(16px, 2vw, 20px)",color:"rgba(255,255,255,.8)",lineHeight:1.7,fontStyle:"italic",marginBottom:24,maxWidth:600,margin:"0 auto 24px"},children:['"',u.text,'"']}),A.jsx("div",{style:{fontFamily:"Space Grotesk, sans-serif",fontWeight:700,color:"#fff",fontSize:16},children:u.name}),A.jsx("div",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"#7C5CFC",marginTop:4},children:u.role}),A.jsx("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:20},children:Td.map((h,d)=>A.jsx("div",{onClick:()=>l(d),style:{width:d===r?24:8,height:8,borderRadius:4,background:d===r?"#7C5CFC":"rgba(255,255,255,.2)",cursor:"pointer",transition:"all .3s"}},d))})]},r)})]})]})}function r2({active:o}){const e=[{before:140,after:90,color:"#FF4757"},{before:40,after:90,color:"#FFA502"},{before:200,after:90,color:"#FF4757"},{before:60,after:90,color:"#2ED573"},{before:170,after:90,color:"#FF4757"},{before:30,after:90,color:"#FFA502"},{before:190,after:90,color:"#FF4757"},{before:80,after:90,color:"#2ED573"},{before:50,after:90,color:"#7C5CFC"},{before:160,after:90,color:"#FF4757"},{before:70,after:90,color:"#2ED573"},{before:130,after:90,color:"#00D2FF"}],[i,r]=Wt.useState(0);return Wt.useEffect(()=>{o&&setTimeout(()=>r(1),800)},[o]),A.jsxs("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:20,padding:"32px 32px 24px",overflow:"hidden"},children:[A.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:16},children:[A.jsx("div",{style:{fontFamily:"Space Grotesk, sans-serif",fontWeight:600,fontSize:14,color:i<.5?"#FF4757":"#2ED573",transition:"color 1s"},children:i<.5?"Chaotic Codebase":"Linted Codebase"}),A.jsx("div",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"rgba(255,255,255,.3)"},children:"Code City Visualisation"})]}),A.jsx("div",{style:{display:"flex",alignItems:"flex-end",gap:6,height:220,padding:"0 8px"},children:e.map((l,u)=>{const h=i===0?l.before:l.after,d=i===0?l.color:"#2ED573";return A.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[A.jsx("div",{style:{width:"100%",height:h,background:`${d}22`,border:`1px solid ${d}60`,borderRadius:"3px 3px 0 0",transition:"height 1.2s cubic-bezier(.4,0,.2,1), background 1.2s, border-color 1.2s",transitionDelay:`${u*.06}s`,position:"relative",overflow:"hidden",boxShadow:i===1?`0 0 12px ${d}40`:"none"},children:A.jsx("div",{style:{position:"absolute",inset:4,display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:3},children:Array.from({length:6}).map((p,m)=>A.jsx("div",{style:{background:i===1?"#2ED57340":`${d}30`,borderRadius:1,transition:"background 1s"}},m))})}),A.jsx("div",{style:{width:"100%",height:3,background:i===1?"#2ED573":d,borderRadius:2,transition:"background 1.2s"}})]},u)})}),A.jsx("div",{style:{height:1,background:"rgba(255,255,255,.08)",marginTop:8}}),A.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:12,fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"rgba(255,255,255,.3)"},children:[A.jsx("span",{children:"Before: inconsistent, broken, risky"}),A.jsx("span",{children:"After: uniform, clean, safe"})]})]})}const Ad=[{line:2,type:"error",msg:"SQL injection: use parameterized query",col:"#FF4757"},{line:3,type:"warning",msg:"Loose equality: use !== instead of ==",col:"#FFA502"},{line:6,type:"warning",msg:"Unused variable: unused (F841)",col:"#FFA502"},{line:8,type:"error",msg:"Insecure HTTP and missing error handling",col:"#FF4757"},{line:9,type:"error",msg:"JSON.parse on raw Response object",col:"#FF4757"},{line:10,type:"error",msg:"Bare catch swallows all errors",col:"#FF4757"}];function s2(){const o=Wt.useRef(null),[e,i]=Wt.useState(VT),[r,l]=Wt.useState(""),[u,h]=Wt.useState(!1),[d,p]=Wt.useState(!1),[m,v]=Wt.useState([]),[x,y]=Wt.useState(null),[M,b]=Wt.useState("output"),C=()=>{h(!0),p(!1),l(""),v([]),y(null);const N=kT.split(`
`);let O=0;const U=setInterval(()=>{l(X=>X+N[O]+`
`),O++,O>=N.length&&(clearInterval(U),h(!1),p(!0),y(97),Ad.forEach((X,H)=>{setTimeout(()=>v(P=>[...P,X]),H*180)}))},55)},S=Ad.filter(N=>N.type==="error").length,g=Ad.filter(N=>N.type==="warning").length;return A.jsxs("section",{id:"playground",ref:o,style:{minHeight:"100vh",background:"#0A0E27",padding:"120px 40px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",overflow:"hidden"},children:[A.jsx("div",{style:{position:"absolute",top:"30%",left:"50%",transform:"translate(-50%, -50%)",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle, rgba(124,92,252,.07) 0%, transparent 70%)",pointerEvents:"none"}}),A.jsxs("div",{style:{position:"relative",zIndex:1,width:"100%",maxWidth:1200},children:[A.jsxs("div",{style:{textAlign:"center",marginBottom:60},children:[A.jsx("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"#7C5CFC",letterSpacing:3,textTransform:"uppercase"},children:"Chapter 07"}),A.jsx("h2",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:"clamp(32px, 5vw, 56px)",fontWeight:700,margin:"12px 0 16px",color:"#fff",letterSpacing:"-1px"},children:"Try It Live"}),A.jsx("p",{style:{color:"rgba(255,255,255,.5)",fontSize:18},children:"Paste your code. Watch the AI work."})]}),A.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:12},children:[A.jsx("div",{style:{display:"flex",gap:8},children:["JavaScript","Python","TypeScript"].map(N=>A.jsx("button",{style:{padding:"6px 16px",borderRadius:8,background:N==="JavaScript"?"rgba(247,223,30,.15)":"rgba(255,255,255,.05)",border:`1px solid ${N==="JavaScript"?"rgba(247,223,30,.4)":"rgba(255,255,255,.1)"}`,color:N==="JavaScript"?"#F7DF1E":"rgba(255,255,255,.5)",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"Space Grotesk, sans-serif"},children:N},N))}),A.jsx("button",{onClick:C,disabled:u,style:{background:u?"rgba(124,92,252,.4)":"linear-gradient(135deg, #7C5CFC, #00D2FF)",border:"none",borderRadius:50,color:"#fff",fontFamily:"Space Grotesk, sans-serif",fontWeight:700,fontSize:15,padding:"12px 32px",cursor:u?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:10,transition:"transform .2s, box-shadow .2s",transform:u?"scale(.98)":"scale(1)",boxShadow:u?"none":"0 8px 24px rgba(124,92,252,.4)"},children:u?A.jsxs(A.Fragment,{children:[A.jsx("div",{style:{width:16,height:16,borderRadius:"50%",border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",animation:"rotate-slow .7s linear infinite"}}),"Scanning..."]}):A.jsx(A.Fragment,{children:"Run LintForge AI"})})]}),A.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,alignItems:"start"},children:[A.jsxs("div",{style:{borderRadius:16,overflow:"hidden",border:"1px solid rgba(255,255,255,.08)"},children:[A.jsxs("div",{style:{background:"#2A2A3E",padding:"12px 16px",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid rgba(255,255,255,.06)"},children:[["#FF5F57","#FFBD2E","#28CA41"].map(N=>A.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:N}},N)),A.jsx("span",{style:{marginLeft:8,fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"rgba(255,255,255,.4)"},children:"input.js"}),A.jsxs("div",{style:{marginLeft:"auto",display:"flex",gap:6},children:[A.jsxs("span",{style:{padding:"2px 8px",borderRadius:4,background:"rgba(255,71,87,.2)",color:"#FF4757",fontSize:11,fontFamily:"JetBrains Mono, monospace"},children:[S," errors"]}),A.jsxs("span",{style:{padding:"2px 8px",borderRadius:4,background:"rgba(255,165,2,.2)",color:"#FFA502",fontSize:11,fontFamily:"JetBrains Mono, monospace"},children:[g," warnings"]})]})]}),A.jsxs("div",{style:{position:"relative",background:"#1E1E2E"},children:[A.jsx("textarea",{value:e,onChange:N=>i(N.target.value),spellCheck:!1,style:{width:"100%",minHeight:400,background:"transparent",border:"none",outline:"none",color:"#E4E4E7",fontFamily:"JetBrains Mono, monospace",fontSize:13,lineHeight:1.7,padding:"16px 16px 16px 56px",resize:"vertical",caretColor:"#7C5CFC"}}),A.jsx("div",{style:{position:"absolute",top:16,left:0,width:44,fontFamily:"JetBrains Mono, monospace",fontSize:13,lineHeight:1.7,color:"rgba(255,255,255,.2)",textAlign:"right",padding:"0 8px",userSelect:"none",pointerEvents:"none"},children:e.split(`
`).map((N,O)=>A.jsx("div",{children:O+1},O))})]})]}),A.jsxs("div",{style:{borderRadius:16,overflow:"hidden",border:"1px solid rgba(255,255,255,.08)"},children:[A.jsxs("div",{style:{background:"#2A2A3E",padding:"12px 16px",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid rgba(255,255,255,.06)"},children:[["#FF5F57","#FFBD2E","#28CA41"].map(N=>A.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:N}},N)),A.jsx("div",{style:{marginLeft:8,display:"flex",gap:0},children:["output","diag"].map(N=>A.jsx("button",{onClick:()=>b(N),style:{padding:"3px 12px",background:M===N?"rgba(124,92,252,.2)":"transparent",border:"none",borderRadius:6,color:M===N?"#B4A5FF":"rgba(255,255,255,.3)",fontFamily:"JetBrains Mono, monospace",fontSize:12,cursor:"pointer"},children:N==="output"?"Fixed Output":`Diagnostics (${m.length})`},N))}),d&&A.jsxs("div",{style:{marginLeft:"auto",display:"flex",alignItems:"center",gap:6},children:[A.jsx("div",{style:{width:8,height:8,borderRadius:"50%",background:"#2ED573",boxShadow:"0 0 6px #2ED573"}}),A.jsxs("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"#2ED573"},children:["Health: ",x,"%"]})]})]}),A.jsxs("div",{style:{background:"#1A2030",minHeight:400,position:"relative"},children:[!u&&!d&&A.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,color:"rgba(255,255,255,.25)"},children:[A.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 48 48",fill:"none",children:[A.jsx("path",{d:"M24 8 L8 40 L40 40 Z",stroke:"rgba(124,92,252,.4)",strokeWidth:"2",fill:"rgba(124,92,252,.1)"}),A.jsx("path",{d:"M24 18 L24 28",stroke:"rgba(124,92,252,.6)",strokeWidth:"2.5",strokeLinecap:"round"}),A.jsx("circle",{cx:"24",cy:"34",r:"1.5",fill:"rgba(124,92,252,.6)"})]}),A.jsx("div",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:15},children:'Hit "Run LintForge AI" to scan'})]}),u&&A.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"},children:A.jsx(o2,{})}),d&&M==="output"&&A.jsxs("pre",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:13,lineHeight:1.7,color:"#E4E4E7",padding:"16px 16px 16px 56px",margin:0,overflowX:"auto",whiteSpace:"pre",position:"relative"},children:[A.jsx("div",{style:{position:"absolute",top:16,left:0,width:44,color:"rgba(255,255,255,.2)",textAlign:"right",padding:"0 8px",userSelect:"none"},children:r.split(`
`).map((N,O)=>A.jsx("div",{children:O+1},O))}),A.jsx("code",{style:{color:"#A8FF78"},children:r})]}),d&&M==="diag"&&A.jsxs("div",{style:{padding:"12px 8px",overflowY:"auto",maxHeight:440},children:[m.map((N,O)=>A.jsx("div",{style:{margin:"4px 0",padding:"10px 14px",borderLeft:`3px solid ${N.col}`,background:N.type==="error"?"rgba(255,71,87,.08)":"rgba(255,165,2,.06)",borderRadius:"0 8px 8px 0",animation:"slide-in-left .3s ease forwards"},children:A.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[A.jsxs("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"rgba(255,255,255,.3)"},children:["L",N.line]}),A.jsx("span",{style:{padding:"1px 6px",borderRadius:3,background:N.type==="error"?"rgba(255,71,87,.2)":"rgba(255,165,2,.2)",color:N.col,fontSize:10,fontWeight:700,fontFamily:"JetBrains Mono, monospace",textTransform:"uppercase"},children:N.type}),A.jsx("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"rgba(255,255,255,.8)"},children:N.msg})]})},O)),d&&A.jsxs("div",{style:{margin:"16px 4px 4px",padding:"12px 16px",borderRadius:10,background:"rgba(46,213,115,.1)",border:"1px solid rgba(46,213,115,.3)",fontFamily:"JetBrains Mono, monospace",fontSize:13,color:"#2ED573"},children:["All fixable issues auto-resolved. Code health: 34% -> ",x,"%"]})]})]})]})]}),d&&A.jsx(l2,{})]})]})}function o2(){return A.jsxs("div",{style:{textAlign:"center"},children:[A.jsxs("div",{style:{position:"relative",width:80,height:80,margin:"0 auto 20px"},children:[A.jsx("div",{style:{position:"absolute",inset:0,border:"3px solid rgba(124,92,252,.2)",borderTopColor:"#7C5CFC",borderRadius:"50%",animation:"rotate-slow .8s linear infinite"}}),A.jsx("div",{style:{position:"absolute",inset:12,border:"2px solid rgba(0,210,255,.2)",borderTopColor:"#00D2FF",borderRadius:"50%",animation:"rotate-slow .5s linear infinite reverse"}}),A.jsx("div",{style:{position:"absolute",inset:24,background:"radial-gradient(circle, #7C5CFC, #00D2FF)",borderRadius:"50%",boxShadow:"0 0 20px rgba(124,92,252,.6)"}})]}),A.jsx("div",{style:{fontFamily:"Space Grotesk, sans-serif",color:"#B4A5FF",fontSize:15},children:"AI is scanning your code..."})]})}function l2(){const o=Array.from({length:24},(e,i)=>({x:Math.random()*100,delay:Math.random()*.5,col:["#7C5CFC","#00D2FF","#2ED573","#FFA502","#FF6B9D"][i%5],size:6+Math.random()*8}));return A.jsx("div",{style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:50},children:o.map((e,i)=>A.jsx("div",{style:{position:"absolute",left:`${e.x}%`,top:"-20px",width:e.size,height:e.size,borderRadius:Math.random()>.5?"50%":"2px",background:e.col,animation:`particle-rise 2.5s ease ${e.delay}s forwards`,transform:`rotate(${Math.random()*360}deg)`}},i))})}function c2(){const o=Wt.useRef(null),[e,i]=Wt.useState(!1);return Wt.useEffect(()=>{const r=new IntersectionObserver(([l])=>{l.isIntersecting&&i(!0)},{threshold:.3});return o.current&&r.observe(o.current),()=>r.disconnect()},[]),A.jsxs("section",{ref:o,style:{minHeight:"100vh",background:"#0A0E27",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"120px 40px",position:"relative",overflow:"hidden",textAlign:"center"},children:[A.jsx(u2,{active:e}),A.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle, rgba(124,92,252,.15) 0%, rgba(0,210,255,.05) 40%, transparent 70%)",pointerEvents:"none",animation:"float 8s ease-in-out infinite"}}),A.jsx(f2,{active:e}),A.jsxs("div",{style:{position:"relative",zIndex:2,maxWidth:800},children:[A.jsx("span",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"#7C5CFC",letterSpacing:3,textTransform:"uppercase",opacity:e?1:0,transition:"opacity .8s"},children:"Chapter 08 — Your Turn"}),A.jsxs("h2",{style:{fontFamily:"Space Grotesk, sans-serif",fontSize:"clamp(48px, 8vw, 96px)",fontWeight:800,letterSpacing:"-3px",lineHeight:1,margin:"20px 0 24px",color:"#fff",opacity:e?1:0,transform:e?"translateY(0)":"translateY(30px)",transition:"opacity .8s .2s, transform .8s .2s"},children:["Lint",A.jsx("span",{style:{background:"linear-gradient(135deg, #7C5CFC, #00D2FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"Everything."}),A.jsx("br",{}),A.jsx("span",{style:{background:"linear-gradient(135deg, #2ED573, #00D2FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontSize:"0.8em"},children:"Perfectly."})]}),A.jsx("p",{style:{fontSize:20,color:"rgba(255,255,255,.55)",maxWidth:520,margin:"0 auto 48px",lineHeight:1.7,opacity:e?1:0,transition:"opacity .8s .4s"},children:"One AI. Every language. Every rule. Zero compromises. Your codebase deserves better."}),A.jsxs("div",{style:{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",opacity:e?1:0,transform:e?"translateY(0)":"translateY(20px)",transition:"opacity .8s .6s, transform .8s .6s"},children:[A.jsx("a",{href:"#playground",style:{background:"linear-gradient(135deg, #7C5CFC, #00D2FF)",border:"none",borderRadius:50,color:"#fff",fontFamily:"Space Grotesk, sans-serif",fontWeight:700,fontSize:18,padding:"18px 48px",cursor:"pointer",textDecoration:"none",display:"inline-block",boxShadow:"0 20px 60px rgba(124,92,252,.5)",transition:"transform .2s, box-shadow .2s"},onMouseEnter:r=>{r.target.style.transform="translateY(-3px) scale(1.03)",r.target.style.boxShadow="0 28px 80px rgba(124,92,252,.7)"},onMouseLeave:r=>{r.target.style.transform="",r.target.style.boxShadow="0 20px 60px rgba(124,92,252,.5)"},children:"Start Free — No Credit Card"}),A.jsx("a",{href:"#scan",style:{background:"transparent",border:"1px solid rgba(255,255,255,.2)",borderRadius:50,color:"rgba(255,255,255,.7)",fontFamily:"Space Grotesk, sans-serif",fontWeight:500,fontSize:18,padding:"17px 48px",cursor:"pointer",textDecoration:"none",display:"inline-block",transition:"border-color .2s, color .2s"},onMouseEnter:r=>{r.target.style.borderColor="#00D2FF",r.target.style.color="#00D2FF"},onMouseLeave:r=>{r.target.style.borderColor="rgba(255,255,255,.2)",r.target.style.color="rgba(255,255,255,.7)"},children:"View Docs"})]}),A.jsx("div",{style:{display:"flex",gap:32,justifyContent:"center",marginTop:64,flexWrap:"wrap",opacity:e?1:0,transition:"opacity .8s 1s"},children:["No credit card required","Free for open source","SOC 2 Type II certified","GDPR compliant"].map(r=>A.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontFamily:"Space Grotesk, sans-serif",fontSize:13,color:"rgba(255,255,255,.4)"},children:[A.jsx("div",{style:{width:6,height:6,borderRadius:"50%",background:"#2ED573",boxShadow:"0 0 6px #2ED573"}}),r]},r))}),A.jsxs("div",{style:{marginTop:80,paddingTop:40,borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16},children:[A.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[A.jsx("div",{style:{width:28,height:28,background:"linear-gradient(135deg, #7C5CFC, #00D2FF)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"JetBrains Mono, monospace",fontWeight:700,fontSize:12,color:"#fff"},children:">_"}),A.jsx("span",{style:{fontFamily:"Space Grotesk, sans-serif",fontWeight:700,fontSize:15,background:"linear-gradient(135deg, #7C5CFC, #00D2FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"LintForge AI"})]}),A.jsx("div",{style:{fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"rgba(255,255,255,.2)"},children:"Built with AI. Loved by engineers."}),A.jsx("div",{style:{display:"flex",gap:20},children:["Privacy","Terms","GitHub","Discord"].map(r=>A.jsx("a",{href:"#",style:{fontFamily:"Space Grotesk, sans-serif",fontSize:13,color:"rgba(255,255,255,.3)",textDecoration:"none",transition:"color .2s"},onMouseEnter:l=>l.target.style.color="#7C5CFC",onMouseLeave:l=>l.target.style.color="rgba(255,255,255,.3)",children:r},r))})]})]})]})}function u2({active:o}){const e=Wt.useRef(null);return Wt.useEffect(()=>{const i=e.current;if(!i)return;const r=i.getContext("2d");i.width=i.offsetWidth,i.height=i.offsetHeight;const l=Array.from({length:200},()=>({x:Math.random()*i.width,y:Math.random()*i.height,r:.5+Math.random()*1.5,speed:.1+Math.random()*.3,alpha:.2+Math.random()*.6}));let u;const h=()=>{r.clearRect(0,0,i.width,i.height),l.forEach(d=>{d.y-=d.speed,d.y<0&&(d.y=i.height,d.x=Math.random()*i.width),r.beginPath(),r.arc(d.x,d.y,d.r,0,Math.PI*2),r.fillStyle=`rgba(255,255,255,${d.alpha})`,r.fill()}),u=requestAnimationFrame(h)};return o&&h(),()=>cancelAnimationFrame(u)},[o]),A.jsx("canvas",{ref:e,style:{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:0,opacity:.5}})}function f2({active:o}){const e=Array.from({length:12},(i,r)=>({x:10+r%4*26,y:20+Math.floor(r/4)*30,size:4+Math.random()*3,delay:r*.12}));return A.jsx("div",{style:{position:"absolute",inset:0,zIndex:1,pointerEvents:"none",opacity:.2},children:A.jsx("svg",{width:"100%",height:"100%",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid slice",children:e.map((i,r)=>A.jsxs("g",{children:[r<e.length-1&&A.jsx("line",{x1:i.x,y1:i.y,x2:e[r+1].x,y2:e[r+1].y,stroke:"#7C5CFC",strokeWidth:"0.3",strokeDasharray:"1 2",opacity:o?.6:0,style:{transition:`opacity 1s ${i.delay+.5}s`}}),A.jsx("circle",{cx:i.x,cy:i.y,r:.8,fill:"#2ED573",opacity:o?1:0,style:{transition:`opacity .5s ${i.delay}s`}})]},r))})})}function d2(){return A.jsxs("div",{style:{fontFamily:"Inter, sans-serif"},children:[A.jsx(Ry,{}),A.jsx(BT,{}),A.jsx(jT,{}),A.jsx(ZT,{}),A.jsx(QT,{}),A.jsx(JT,{}),A.jsx(a2,{}),A.jsx(s2,{}),A.jsx(c2,{})]})}Ty.createRoot(document.getElementById("root")).render(A.jsx(_y.StrictMode,{children:A.jsx(d2,{})}));
