import{S as w,i as C,s as q,e as g,c as x,j as m,k as R,f as H,a as j,b as p,m as A,l as h,t as D,g as z,d as v,h as B,q as E,u as F,p as b,o as G,r as I}from"./index-4d533810.js";import{S as J,e as y}from"./SvelteReader-7d7d6431.js";function S(i,l,o){const t=i.slice();return t[7]=l[o].text,t[8]=l[o].cfiRange,t[10]=o,t}function $(i){let l,o=(i[7]||"")+"",t,r,u,_,c,d,n,e;function a(){return i[4](i[8])}function s(){return i[5](i[8],i[10])}return{c(){l=g("li"),t=R(o),r=m(),u=g("button"),u.textContent="show",_=m(),c=g("button"),c.textContent="x",d=m()},m(f,k){p(f,l,k),h(l,t),h(l,r),h(l,u),h(l,_),h(l,c),h(l,d),n||(e=[b(u,"click",a),b(c,"click",s)],n=!0)},p(f,k){i=f,k&2&&o!==(o=(i[7]||"")+"")&&G(t,o)},d(f){f&&v(l),n=!1,I(e)}}}function K(i){let l,o,t,r,u,_,c;o=new J({props:{url:"/svelte-reader/files/啼笑因缘.epub",getRendition:i[2]}});let d=y(i[1]),n=[];for(let e=0;e<d.length;e+=1)n[e]=$(S(i,d,e));return{c(){l=g("div"),x(o.$$.fragment),t=m(),r=g("div"),u=R(`Selection:\r
  `),_=g("ul");for(let e=0;e<n.length;e+=1)n[e].c();H(l,"height","100vh"),j(r,"class","selection svelte-1s0tff2")},m(e,a){p(e,l,a),A(o,l,null),p(e,t,a),p(e,r,a),h(r,u),h(r,_);for(let s=0;s<n.length;s+=1)n[s]&&n[s].m(_,null);c=!0},p(e,[a]){if(a&11){d=y(e[1]);let s;for(s=0;s<d.length;s+=1){const f=S(e,d,s);n[s]?n[s].p(f,a):(n[s]=$(f),n[s].c(),n[s].m(_,null))}for(;s<n.length;s+=1)n[s].d(1);n.length=d.length}},i(e){c||(D(o.$$.fragment,e),c=!0)},o(e){z(o.$$.fragment,e),c=!1},d(e){e&&(v(l),v(t),v(r)),B(o),E(n,e)}}}function L(i,l,o){let t=null,r=[];const u=(e,a)=>{o(1,r=[...r,{text:t.getRange(e).toString(),cfiRange:e}]),t.annotations.add("highlight",e,{},null,"hl",{fill:"red","fill-opacity":"0.5","mix-blend-mode":"multiply"}),a.window.getSelection().removeAllRanges()},_=e=>{o(0,t=e),t.themes.default({"::selection":{background:"orange"}}),t.on("selected",u)},c=(e,a)=>{t.annotations.remove(e,"highlight"),o(1,r=r.filter((s,f)=>f!==a))};return F(()=>{t.off("selected",u)}),[t,r,_,c,e=>t.display(e),(e,a)=>c(e,a)]}class O extends w{constructor(l){super(),C(this,l,L,K,q,{})}}export{O as default};
