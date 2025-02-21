import{r as s,j as m}from"./index-B4CT-cHI.js";var w={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function j(e){if(typeof e=="number")return{value:e,unit:"px"};var r,n=(e.match(/^[0-9.]*/)||"").toString();n.includes(".")?r=parseFloat(n):r=parseInt(n,10);var t=(e.match(/[^0-9]*$/)||"").toString();return w[t]?{value:r,unit:t}:(console.warn("React Spinners: ".concat(e," is not a valid css value. Defaulting to ").concat(r,"px.")),{value:r,unit:"px"})}var l=function(e,r,n){var t="react-spinners-".concat(e,"-").concat(n);if(typeof window>"u"||!window.document)return t;var o=document.createElement("style");document.head.appendChild(o);var i=o.sheet,p=`
    @keyframes `.concat(t,` {
      `).concat(r,`
    }
  `);return i&&i.insertRule(p,0),t},u=function(){return u=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++){r=arguments[n];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},u.apply(this,arguments)},E=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(e);o<t.length;o++)r.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(n[t[o]]=e[t[o]]);return n},a=[1,3,5],P=[l("PropagateLoader","25% {transform: translateX(-".concat(a[0],`rem) scale(0.75)}
    50% {transform: translateX(-`).concat(a[1],`rem) scale(0.6)}
    75% {transform: translateX(-`).concat(a[2],`rem) scale(0.5)}
    95% {transform: translateX(0rem) scale(1)}`),"propogate-0"),l("PropagateLoader","25% {transform: translateX(-".concat(a[0],`rem) scale(0.75)}
    50% {transform: translateX(-`).concat(a[1],`rem) scale(0.6)}
    75% {transform: translateX(-`).concat(a[1],`rem) scale(0.6)}
    95% {transform: translateX(0rem) scale(1)}`),"propogate-1"),l("PropagateLoader","25% {transform: translateX(-".concat(a[0],`rem) scale(0.75)}
    75% {transform: translateX(-`).concat(a[0],`rem) scale(0.75)}
    95% {transform: translateX(0rem) scale(1)}`),"propogate-2"),l("PropagateLoader","25% {transform: translateX(".concat(a[0],`rem) scale(0.75)}
    75% {transform: translateX(`).concat(a[0],`rem) scale(0.75)}
    95% {transform: translateX(0rem) scale(1)}`),"propogate-3"),l("PropagateLoader","25% {transform: translateX(".concat(a[0],`rem) scale(0.75)}
    50% {transform: translateX(`).concat(a[1],`rem) scale(0.6)}
    75% {transform: translateX(`).concat(a[1],`rem) scale(0.6)}
    95% {transform: translateX(0rem) scale(1)}`),"propogate-4"),l("PropagateLoader","25% {transform: translateX(".concat(a[0],`rem) scale(0.75)}
    50% {transform: translateX(`).concat(a[1],`rem) scale(0.6)}
    75% {transform: translateX(`).concat(a[2],`rem) scale(0.5)}
    95% {transform: translateX(0rem) scale(1)}`),"propogate-5")];function L(e){var r=e.loading,n=r===void 0?!0:r,t=e.color,o=t===void 0?"#000000":t,i=e.speedMultiplier,p=i===void 0?1:i,v=e.cssOverride,X=v===void 0?{}:v,g=e.size,h=g===void 0?15:g,x=E(e,["loading","color","speedMultiplier","cssOverride","size"]),y=j(h),f=y.value,d=y.unit,O=u({display:"inherit",position:"relative"},X),c=function(b){return{position:"absolute",fontSize:"".concat(f/3).concat(d),width:"".concat(f).concat(d),height:"".concat(f).concat(d),background:o,borderRadius:"50%",animation:"".concat(P[b]," ").concat(1.5/p,"s infinite"),animationFillMode:"forwards"}};return n?s.createElement("span",u({style:O},x),s.createElement("span",{style:c(0)}),s.createElement("span",{style:c(1)}),s.createElement("span",{style:c(2)}),s.createElement("span",{style:c(3)}),s.createElement("span",{style:c(4)}),s.createElement("span",{style:c(5)})):null}function S(){return m.jsx(m.Fragment,{children:m.jsx("div",{className:" flex justify-center items-center h-screen",children:m.jsx(L,{color:"#0aad0a",size:20})})})}export{S as default};
