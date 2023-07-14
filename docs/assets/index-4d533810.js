var $t=Object.defineProperty;var xt=(t,e,n)=>e in t?$t(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var M=(t,e,n)=>(xt(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function b(){}function Y(t,e){for(const n in e)t[n]=e[n];return t}function ut(t){return t()}function et(){return Object.create(null)}function D(t){t.forEach(ut)}function G(t){return typeof t=="function"}function H(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Ot(t){return Object.keys(t).length===0}function Ct(t,...e){if(t==null){for(const o of e)o(void 0);return b}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Qt(t,e,n,o){if(t){const r=lt(t,e,n,o);return t[0](r)}}function lt(t,e,n,o){return t[1]&&o?Y(n.ctx.slice(),t[1](o(e))):n.ctx}function Zt(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const s=[],l=Math.max(e.dirty.length,r.length);for(let i=0;i<l;i+=1)s[i]=e.dirty[i]|r[i];return s}return e.dirty|r}return e.dirty}function te(t,e,n,o,r,s){if(r){const l=lt(e,n,o,s);t.p(l,r)}}function ee(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let o=0;o<n;o++)e[o]=-1;return e}return-1}function ne(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function oe(t,e){t.appendChild(e)}function U(t,e,n){t.insertBefore(e,n||null)}function V(t){t.parentNode&&t.parentNode.removeChild(t)}function re(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Pt(t){return document.createElement(t)}function ft(t){return document.createTextNode(t)}function se(){return ft(" ")}function J(){return ft("")}function ie(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function ce(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function ue(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Lt(t){return Array.from(t.childNodes)}function le(t,e){e=""+e,t.data!==e&&(t.data=e)}function fe(t,e,n,o){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,o?"important":"")}function ae(t,e,n){t.classList.toggle(e,!!n)}function jt(t,e,{bubbles:n=!1,cancelable:o=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:o})}function z(t,e){return new t(e)}let N;function T(t){N=t}function F(){if(!N)throw new Error("Function called outside component initialization");return N}function de(t){F().$$.on_mount.push(t)}function St(t){F().$$.after_update.push(t)}function At(t){F().$$.on_destroy.push(t)}function Rt(){const t=F();return(e,n,{cancelable:o=!1}={})=>{const r=t.$$.callbacks[e];if(r){const s=jt(e,n,{cancelable:o});return r.slice().forEach(l=>{l.call(t,s)}),!s.defaultPrevented}return!0}}function nt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(o=>o.call(this,e))}const S=[],ot=[];let A=[];const rt=[],at=Promise.resolve();let W=!1;function dt(){W||(W=!0,at.then(_t))}function It(){return dt(),at}function X(t){A.push(t)}const K=new Set;let L=0;function _t(){if(L!==0)return;const t=N;do{try{for(;L<S.length;){const e=S[L];L++,T(e),Dt(e.$$)}}catch(e){throw S.length=0,L=0,e}for(T(null),S.length=0,L=0;ot.length;)ot.pop()();for(let e=0;e<A.length;e+=1){const n=A[e];K.has(n)||(K.add(n),n())}A.length=0}while(S.length);for(;rt.length;)rt.pop()();W=!1,K.clear(),T(t)}function Dt(t){if(t.fragment!==null){t.update(),D(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(X)}}function Tt(t){const e=[],n=[];A.forEach(o=>t.indexOf(o)===-1?e.push(o):n.push(o)),n.forEach(o=>o()),A=e}const B=new Set;let O;function Q(){O={r:0,c:[],p:O}}function Z(){O.r||D(O.c),O=O.p}function x(t,e){t&&t.i&&(B.delete(t),t.i(e))}function C(t,e,n,o){if(t&&t.o){if(B.has(t))return;B.add(t),O.c.push(()=>{B.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}else o&&o()}function pt(t,e){const n={},o={},r={$$scope:1};let s=t.length;for(;s--;){const l=t[s],i=e[s];if(i){for(const c in l)c in i||(o[c]=1);for(const c in i)r[c]||(n[c]=i[c],r[c]=1);t[s]=i}else for(const c in l)r[c]=1}for(const l in o)l in n||(n[l]=void 0);return n}function ht(t){return typeof t=="object"&&t!==null?t:{}}function q(t){t&&t.c()}function R(t,e,n){const{fragment:o,after_update:r}=t.$$;o&&o.m(e,n),X(()=>{const s=t.$$.on_mount.map(ut).filter(G);t.$$.on_destroy?t.$$.on_destroy.push(...s):D(s),t.$$.on_mount=[]}),r.forEach(X)}function I(t,e){const n=t.$$;n.fragment!==null&&(Tt(n.after_update),D(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Nt(t,e){t.$$.dirty[0]===-1&&(S.push(t),dt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function mt(t,e,n,o,r,s,l,i=[-1]){const c=N;T(t);const u=t.$$={fragment:null,ctx:[],props:s,update:b,not_equal:r,bound:et(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:et(),dirty:i,skip_bound:!1,root:e.target||c.$$.root};l&&l(u.root);let _=!1;if(u.ctx=n?n(t,e.props||{},(p,g,...v)=>{const m=v.length?v[0]:g;return u.ctx&&r(u.ctx[p],u.ctx[p]=m)&&(!u.skip_bound&&u.bound[p]&&u.bound[p](m),_&&Nt(t,p)),g}):[],u.update(),_=!0,D(u.before_update),u.fragment=o?o(u.ctx):!1,e.target){if(e.hydrate){const p=Lt(e.target);u.fragment&&u.fragment.l(p),p.forEach(V)}else u.fragment&&u.fragment.c();e.intro&&x(t.$$.fragment),R(t,e.target,e.anchor),_t()}T(c)}class yt{constructor(){M(this,"$$");M(this,"$$set")}$destroy(){I(this,1),this.$destroy=b}$on(e,n){if(!G(n))return b;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(e){this.$$set&&!Ot(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const qt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(qt);function w(t){if(!t)throw Error("Parameter args is required");if(!t.component==!t.asyncComponent)throw Error("One and only one of component and asyncComponent is required");if(t.component&&(t.asyncComponent=()=>Promise.resolve(t.component)),typeof t.asyncComponent!="function")throw Error("Parameter asyncComponent must be a function");if(t.conditions){Array.isArray(t.conditions)||(t.conditions=[t.conditions]);for(let n=0;n<t.conditions.length;n++)if(!t.conditions[n]||typeof t.conditions[n]!="function")throw Error("Invalid parameter conditions["+n+"]")}return t.loadingComponent&&(t.asyncComponent.loading=t.loadingComponent,t.asyncComponent.loadingParams=t.loadingParams||void 0),{component:t.asyncComponent,userData:t.userData,conditions:t.conditions&&t.conditions.length?t.conditions:void 0,props:t.props&&Object.keys(t.props).length?t.props:{},_sveltesparouter:!0}}const j=[];function gt(t,e){return{subscribe:bt(t,e).subscribe}}function bt(t,e=b){let n;const o=new Set;function r(i){if(H(t,i)&&(t=i,n)){const c=!j.length;for(const u of o)u[1](),j.push(u,t);if(c){for(let u=0;u<j.length;u+=2)j[u][0](j[u+1]);j.length=0}}}function s(i){r(i(t))}function l(i,c=b){const u=[i,c];return o.add(u),o.size===1&&(n=e(r,s)||b),i(t),()=>{o.delete(u),o.size===0&&n&&(n(),n=null)}}return{set:r,update:s,subscribe:l}}function wt(t,e,n){const o=!Array.isArray(t),r=o?[t]:t;if(!r.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const s=e.length<2;return gt(n,(l,i)=>{let c=!1;const u=[];let _=0,p=b;const g=()=>{if(_)return;p();const m=e(o?u[0]:u,l,i);s?l(m):p=G(m)?m:b},v=r.map((m,P)=>Ct(m,k=>{u[P]=k,_&=~(1<<P),c&&g()},()=>{_|=1<<P}));return c=!0,g(),function(){D(v),p(),c=!1}})}function Vt(t,e){if(t instanceof RegExp)return{keys:!1,pattern:t};var n,o,r,s,l=[],i="",c=t.split("/");for(c[0]||c.shift();r=c.shift();)n=r[0],n==="*"?(l.push("wild"),i+="/(.*)"):n===":"?(o=r.indexOf("?",1),s=r.indexOf(".",1),l.push(r.substring(1,~o?o:~s?s:r.length)),i+=~o&&!~s?"(?:/([^/]+?))?":"/([^/]+?)",~s&&(i+=(~o?"?":"")+"\\"+r.substring(s))):i+="/"+r;return{keys:l,pattern:new RegExp("^"+i+(e?"(?=$|/)":"/?$"),"i")}}function Bt(t){let e,n,o;const r=[t[2]];var s=t[0];function l(i){let c={};for(let u=0;u<r.length;u+=1)c=Y(c,r[u]);return{props:c}}return s&&(e=z(s,l()),e.$on("routeEvent",t[7])),{c(){e&&q(e.$$.fragment),n=J()},m(i,c){e&&R(e,i,c),U(i,n,c),o=!0},p(i,c){const u=c&4?pt(r,[ht(i[2])]):{};if(c&1&&s!==(s=i[0])){if(e){Q();const _=e;C(_.$$.fragment,1,0,()=>{I(_,1)}),Z()}s?(e=z(s,l()),e.$on("routeEvent",i[7]),q(e.$$.fragment),x(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else s&&e.$set(u)},i(i){o||(e&&x(e.$$.fragment,i),o=!0)},o(i){e&&C(e.$$.fragment,i),o=!1},d(i){i&&V(n),e&&I(e,i)}}}function zt(t){let e,n,o;const r=[{params:t[1]},t[2]];var s=t[0];function l(i){let c={};for(let u=0;u<r.length;u+=1)c=Y(c,r[u]);return{props:c}}return s&&(e=z(s,l()),e.$on("routeEvent",t[6])),{c(){e&&q(e.$$.fragment),n=J()},m(i,c){e&&R(e,i,c),U(i,n,c),o=!0},p(i,c){const u=c&6?pt(r,[c&2&&{params:i[1]},c&4&&ht(i[2])]):{};if(c&1&&s!==(s=i[0])){if(e){Q();const _=e;C(_.$$.fragment,1,0,()=>{I(_,1)}),Z()}s?(e=z(s,l()),e.$on("routeEvent",i[6]),q(e.$$.fragment),x(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else s&&e.$set(u)},i(i){o||(e&&x(e.$$.fragment,i),o=!0)},o(i){e&&C(e.$$.fragment,i),o=!1},d(i){i&&V(n),e&&I(e,i)}}}function Ut(t){let e,n,o,r;const s=[zt,Bt],l=[];function i(c,u){return c[1]?0:1}return e=i(t),n=l[e]=s[e](t),{c(){n.c(),o=J()},m(c,u){l[e].m(c,u),U(c,o,u),r=!0},p(c,[u]){let _=e;e=i(c),e===_?l[e].p(c,u):(Q(),C(l[_],1,1,()=>{l[_]=null}),Z(),n=l[e],n?n.p(c,u):(n=l[e]=s[e](c),n.c()),x(n,1),n.m(o.parentNode,o))},i(c){r||(x(n),r=!0)},o(c){C(n),r=!1},d(c){c&&V(o),l[e].d(c)}}}function st(){const t=window.location.href.indexOf("#/");let e=t>-1?window.location.href.substr(t+1):"/";const n=e.indexOf("?");let o="";return n>-1&&(o=e.substr(n+1),e=e.substr(0,n)),{location:e,querystring:o}}const tt=gt(null,function(e){e(st());const n=()=>{e(st())};return window.addEventListener("hashchange",n,!1),function(){window.removeEventListener("hashchange",n,!1)}});wt(tt,t=>t.location);wt(tt,t=>t.querystring);const it=bt(void 0);function Ft(t){t?window.scrollTo(t.__svelte_spa_router_scrollX,t.__svelte_spa_router_scrollY):window.scrollTo(0,0)}function Mt(t,e,n){let{routes:o={}}=e,{prefix:r=""}=e,{restoreScrollState:s=!1}=e;class l{constructor(f,d){if(!d||typeof d!="function"&&(typeof d!="object"||d._sveltesparouter!==!0))throw Error("Invalid component object");if(!f||typeof f=="string"&&(f.length<1||f.charAt(0)!="/"&&f.charAt(0)!="*")||typeof f=="object"&&!(f instanceof RegExp))throw Error('Invalid value for "path" argument - strings must start with / or *');const{pattern:y,keys:h}=Vt(f);this.path=f,typeof d=="object"&&d._sveltesparouter===!0?(this.component=d.component,this.conditions=d.conditions||[],this.userData=d.userData,this.props=d.props||{}):(this.component=()=>Promise.resolve(d),this.conditions=[],this.props={}),this._pattern=y,this._keys=h}match(f){if(r){if(typeof r=="string")if(f.startsWith(r))f=f.substr(r.length)||"/";else return null;else if(r instanceof RegExp){const $=f.match(r);if($&&$[0])f=f.substr($[0].length)||"/";else return null}}const d=this._pattern.exec(f);if(d===null)return null;if(this._keys===!1)return d;const y={};let h=0;for(;h<this._keys.length;){try{y[this._keys[h]]=decodeURIComponent(d[h+1]||"")||null}catch{y[this._keys[h]]=null}h++}return y}async checkConditions(f){for(let d=0;d<this.conditions.length;d++)if(!await this.conditions[d](f))return!1;return!0}}const i=[];o instanceof Map?o.forEach((a,f)=>{i.push(new l(f,a))}):Object.keys(o).forEach(a=>{i.push(new l(a,o[a]))});let c=null,u=null,_={};const p=Rt();async function g(a,f){await It(),p(a,f)}let v=null,m=null;s&&(m=a=>{a.state&&(a.state.__svelte_spa_router_scrollY||a.state.__svelte_spa_router_scrollX)?v=a.state:v=null},window.addEventListener("popstate",m),St(()=>{Ft(v)}));let P=null,k=null;const Et=tt.subscribe(async a=>{P=a;let f=0;for(;f<i.length;){const d=i[f].match(a.location);if(!d){f++;continue}const y={route:i[f].path,location:a.location,querystring:a.querystring,userData:i[f].userData,params:d&&typeof d=="object"&&Object.keys(d).length?d:null};if(!await i[f].checkConditions(y)){n(0,c=null),k=null,g("conditionsFailed",y);return}g("routeLoading",Object.assign({},y));const h=i[f].component;if(k!=h){h.loading?(n(0,c=h.loading),k=h,n(1,u=h.loadingParams),n(2,_={}),g("routeLoaded",Object.assign({},y,{component:c,name:c.name,params:u}))):(n(0,c=null),k=null);const $=await h();if(a!=P)return;n(0,c=$&&$.default||$),k=h}d&&typeof d=="object"&&Object.keys(d).length?n(1,u=d):n(1,u=null),n(2,_=i[f].props),g("routeLoaded",Object.assign({},y,{component:c,name:c.name,params:u})).then(()=>{it.set(u)});return}n(0,c=null),k=null,it.set(void 0)});At(()=>{Et(),m&&window.removeEventListener("popstate",m)});function vt(a){nt.call(this,t,a)}function kt(a){nt.call(this,t,a)}return t.$$set=a=>{"routes"in a&&n(3,o=a.routes),"prefix"in a&&n(4,r=a.prefix),"restoreScrollState"in a&&n(5,s=a.restoreScrollState)},t.$$.update=()=>{t.$$.dirty&32&&(history.scrollRestoration=s?"manual":"auto")},[c,u,_,o,r,s,vt,kt]}class Kt extends yt{constructor(e){super(),mt(this,e,Mt,Ut,H,{routes:3,prefix:4,restoreScrollState:5})}}const Wt="modulepreload",Xt=function(t){return"/svelte-reader/"+t},ct={},E=function(e,n,o){if(!n||n.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(n.map(s=>{if(s=Xt(s),s in ct)return;ct[s]=!0;const l=s.endsWith(".css"),i=l?'[rel="stylesheet"]':"";if(!!o)for(let _=r.length-1;_>=0;_--){const p=r[_];if(p.href===s&&(!l||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${i}`))return;const u=document.createElement("link");if(u.rel=l?"stylesheet":Wt,l||(u.as="script",u.crossOrigin=""),u.href=s,document.head.appendChild(u),l)return new Promise((_,p)=>{u.addEventListener("load",_),u.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>e())},Yt={"/":w({asyncComponent:()=>E(()=>import("./index-57269da6.js"),["assets/index-57269da6.js","assets/index-33281b4b.css"])}),"/basic-usage":w({asyncComponent:()=>E(()=>import("./BasicUsage-1873ed54.js"),["assets/BasicUsage-1873ed54.js","assets/SvelteReader-7d7d6431.js","assets/SvelteReader-522343f3.css"])}),"/save-progress":w({asyncComponent:()=>E(()=>import("./SaveProgress-782df596.js"),["assets/SaveProgress-782df596.js","assets/SvelteReader-7d7d6431.js","assets/SvelteReader-522343f3.css"])}),"/display-page":w({asyncComponent:()=>E(()=>import("./DisplayPage-836dc016.js"),["assets/DisplayPage-836dc016.js","assets/SvelteReader-7d7d6431.js","assets/SvelteReader-522343f3.css","assets/DisplayPage-fc1e9663.css"])}),"/change-font-size":w({asyncComponent:()=>E(()=>import("./ChangeFontSize-619fea5d.js"),["assets/ChangeFontSize-619fea5d.js","assets/SvelteReader-7d7d6431.js","assets/SvelteReader-522343f3.css","assets/ChangeFontSize-54444c08.css"])}),"/custom-css":w({asyncComponent:()=>E(()=>import("./CustomCss-fdfded63.js"),["assets/CustomCss-fdfded63.js","assets/SvelteReader-7d7d6431.js","assets/SvelteReader-522343f3.css"])}),"/hightlight":w({asyncComponent:()=>E(()=>import("./Hightlight-e648b4d0.js"),["assets/Hightlight-e648b4d0.js","assets/SvelteReader-7d7d6431.js","assets/SvelteReader-522343f3.css","assets/Hightlight-aa3340c3.css"])}),"/display-scrolled":w({asyncComponent:()=>E(()=>import("./DisplayScrolled-8cbbc7f7.js"),["assets/DisplayScrolled-8cbbc7f7.js","assets/SvelteReader-7d7d6431.js","assets/SvelteReader-522343f3.css"])}),"/enable-opening-links":w({asyncComponent:()=>E(()=>import("./EnableOpeningLinks-19726abb.js"),["assets/EnableOpeningLinks-19726abb.js","assets/SvelteReader-7d7d6431.js","assets/SvelteReader-522343f3.css"])})};function Gt(t){let e,n,o;return n=new Kt({props:{routes:Yt}}),{c(){e=Pt("main"),q(n.$$.fragment)},m(r,s){U(r,e,s),R(n,e,null),o=!0},p:b,i(r){o||(x(n.$$.fragment,r),o=!0)},o(r){C(n.$$.fragment,r),o=!1},d(r){r&&V(e),I(n)}}}class Ht extends yt{constructor(e){super(),mt(this,e,null,Gt,H,{})}}new Ht({target:document.getElementById("app")});export{te as A,ee as B,Zt as C,ot as D,Y as E,ae as F,pt as G,ht as H,ne as I,J,ce as K,yt as S,ue as a,U as b,q as c,V as d,Pt as e,fe as f,C as g,I as h,mt as i,se as j,ft as k,oe as l,R as m,b as n,le as o,ie as p,re as q,D as r,H as s,x as t,At as u,Q as v,Z as w,Rt as x,de as y,Qt as z};
