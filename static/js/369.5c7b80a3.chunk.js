"use strict";(self.webpackChunkboxxerworld_customiser=self.webpackChunkboxxerworld_customiser||[]).push([[369],{9369:(e,t,a)=>{a.r(t),a.d(t,{default:()=>w});var n=a(4875),o=a(9389),i=a(2791),r=a(7760),l=a(9355),d=a(846),s=a(9740),u=a(184);const c=e=>{let{node:t,texture:a,tasselsTexture:o,tassels:l,hex:s}=e;const[c,v]=(0,i.useState)(),p=(0,i.useRef)(null),m=(0,i.useRef)(null),[f,b]=(0,i.useState)(!1),[g,x]=(0,i.useState)(!1),h=(0,i.useMemo)((()=>Object.fromEntries(Object.entries(a).map((e=>{let[t,a]=e;return[t,a.clone()]})))),[a]),{customProduct:M,setSelectedNav:j,selectedNav:w,savedParts:y,navTabs:P,texts:S,updateText:T,updateIsMinimizedCustomiserNav:R}=(0,n.b)(),k=(0,i.useMemo)((()=>S.find((e=>e.edit))),[S]),U=(0,i.useMemo)((()=>{var e,a;return null===M||void 0===M||null===(e=M.attributes)||void 0===e||null===(a=e.parts)||void 0===a?void 0:a.find((e=>{var a;return null===e||void 0===e||null===(a=e.modelParts)||void 0===a?void 0:a.data.find((e=>{var a,n;return(null===(a=e.attributes)||void 0===a?void 0:a.nodeId)===t.userData.name||(null===(n=e.attributes)||void 0===n?void 0:n.nodeId)===t.name}))}))}),[M,t]),O=(0,i.useMemo)((()=>{if(null!==U&&void 0!==U&&U.id)return(0,d.TR)({navTabs:P,value:U.id,key:"id"})}),[U,P]),D=(0,i.useMemo)((()=>{if(null!==U&&void 0!==U&&U.id)return(0,d.TR)({navTabs:P,value:"names",key:"type"})}),[P]);return(0,i.useEffect)((()=>{if(h&&m.current){let e={};for(const[t,a]of Object.entries(h)){a.wrapS=a.wrapT=r.RepeatWrapping;const n=(new r.Box3).setFromObject(m.current),o=new r.Vector3,i=n.getSize(o),l=i.x*i.y;a.repeat.set(5e-4*l,5e-4*l),e={...e,[t]:a}}v(e)}}),[h]),p.current&&(p.current.needsUpdate=!0),(0,u.jsx)(u.Fragment,{children:(0,u.jsx)("mesh",{name:t.name,geometry:t.geometry,ref:m,userData:{name:t.userData.name},onPointerDown:e=>{b(!0)},onPointerUp:()=>{x(!1),b(!1)},onPointerMove:e=>{f&&x(!0)},onClick:e=>{var a;if(b(!1),x(!1),!f||g)return;if(null!==k&&void 0!==k&&k.key)return;const n=null===(a=e.intersections.find((e=>e.object.userData.text)))||void 0===a?void 0:a.object.userData.text;if(D&&void 0!==D.index&&n&&n.key)return R(!1),j(D.index),void T(n.key,{edit:!0});O&&void 0!==O.index&&e.intersections[0].object.name===t.name&&(e.stopPropagation(),R(!1),j(O.index))},children:l?(0,u.jsx)("meshStandardMaterial",{ref:p,...o,transparent:!0,bumpScale:.15,side:r.DoubleSide,metalness:-.5}):(0,u.jsx)("meshStandardMaterial",{side:r.DoubleSide,...c,displacementScale:null!==c&&void 0!==c&&c.displacementMap?-.001:void 0,ref:p})})})},v=e=>{let{node:t,nodeId:a}=e;const o=(0,n.b)((0,i.useCallback)((e=>e.texture(a)),[a])),l=(0,n.b)((0,i.useCallback)((e=>e.optional(a)),[a])),d=!!a.includes("default"),v=(0,s.m)({...o.materials}),p=(0,s.m)({alphaMap:"https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/tassels/tassels-opacity.jpg",bumpMap:"https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/tassels/tassels-bump.jpg",map:o.materials.map},(e=>{const[t,a,n]=e;a.wrapS=a.wrapT=r.RepeatWrapping,a.flipY=!1,a.repeat.set(1.5,1),a.needsUpdate=!0,t.wrapS=t.wrapT=r.RepeatWrapping,t.flipY=!1,t.repeat.set(1.5,1),t.needsUpdate=!0,n.wrapS=t.wrapT=r.RepeatWrapping,n.flipY=!1,n.repeat.set(1.5,1),n.needsUpdate=!0}));return l?null:(0,u.jsx)(c,{node:t,texture:v,tasselsTexture:p,tassels:d,hex:o.hex})},p=e=>{var t,a,n,o,r,d;let{model:s,addNodes:c}=e;const{nodes:p}=(0,l.L)(null===s||void 0===s||null===(t=s.attributes)||void 0===t||null===(a=t.model)||void 0===a||null===(n=a.data)||void 0===n||null===(o=n.attributes)||void 0===o?void 0:o.url);return(0,i.useEffect)((()=>(delete p.Scene,c(p),()=>{c(p,!0)})),[p]),(0,u.jsx)(u.Fragment,{children:null===s||void 0===s||null===(r=s.attributes)||void 0===r||null===(d=r.parts)||void 0===d?void 0:d.data.map((e=>{var t;return(0,u.jsx)(i.Fragment,{children:(null===e||void 0===e||null===(t=e.attributes)||void 0===t?void 0:t.nodeId)&&(0,u.jsx)(v,{node:p[e.attributes.nodeId],nodeId:e.attributes.nodeId},e.attributes.nodeId)},e.id)}))})};var m=a(1435);const f=e=>{var t,a,n,o,l,d,c,v,p;let{flag:f,graphic:b,position:g,orientation:x,scale:h=1}=e;const M=null!==f&&void 0!==f&&null!==(t=f.flag)&&void 0!==t&&null!==(a=t.attributes)&&void 0!==a&&null!==(n=a.image.data)&&void 0!==n&&null!==(o=n.attributes)&&void 0!==o&&o.url?[f.flag.attributes.image.data.attributes.url]:null!==b&&void 0!==b&&null!==(l=b.graphic)&&void 0!==l&&null!==(d=l.attributes)&&void 0!==d&&null!==(c=d.image)&&void 0!==c&&null!==(v=c.data)&&void 0!==v&&null!==(p=v.attributes)&&void 0!==p&&p.url?[b.graphic.attributes.image.data.attributes.url]:[],[j]=(0,s.m)(M),w=(0,i.useMemo)((()=>{var e,t;return(null!==(e=j.source.data.width)&&void 0!==e?e:1)/(null!==(t=j.source.data.height)&&void 0!==t?t:1)}),[j]),y=(0,i.useMemo)((()=>{const e=(new r.Euler).fromArray(x),t=r.MathUtils.radToDeg(e.z),a=(null===f||void 0===f?void 0:f.decalRotation)||(null===b||void 0===b?void 0:b.decalRotation),n=t+(null!==a&&void 0!==a?a:0);return e.z=r.MathUtils.degToRad(n),e}),[null===f||void 0===f?void 0:f.decalRotation,null===b||void 0===b?void 0:b.decalRotation,x]),P=(0,i.useMemo)((()=>new r.Vector3(1*w*h,1*h,4)),[h]);return j?(0,u.jsx)(m._,{position:g,rotation:y,scale:P,children:(0,u.jsx)("meshPhongMaterial",{map:j,transparent:!0,depthTest:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-20,needsUpdate:!0})}):null},b=e=>{var t,a,n,o,l,d,s,c,v,p;let{text:f={},position:b,orientation:g,scale:x=1}=e;const h=(0,i.useMemo)((()=>{var e;const t=(new r.Euler).fromArray(g),a=r.MathUtils.radToDeg(t.z)+(null!==(e=null===f||void 0===f?void 0:f.decalRotation)&&void 0!==e?e:0);return t.z=r.MathUtils.degToRad(a),t}),[null===f||void 0===f?void 0:f.decalRotation,g]),M=(null!==f&&void 0!==f&&null!==(t=f.material)&&void 0!==t&&null!==(a=t.attributes)&&void 0!==a&&null!==(n=a.images)&&void 0!==n&&n.length&&null!==(o=f.material.attributes.images[0])&&void 0!==o&&null!==(l=o.image.data)&&void 0!==l&&null!==(d=l.attributes)&&void 0!==d&&d.url&&f.material.attributes.images[0].image.data.attributes.url,f.normalMap instanceof r.Texture&&"Luxury"===(null===(s=f.selectedName)||void 0===s||null===(c=s.attributes)||void 0===c?void 0:c.name)?f.normalMap:null),j="2"===(null===(v=f.selectedName)||void 0===v?void 0:v.id),w=!!f.puffPrice,y=!!f.crystalPrice,P="undefined"===typeof f.isVisible||f.isVisible;let S=1;y?S=4:j&&!w?S=.5:j&&w&&(S=3);const T=(0,i.useMemo)((()=>new r.Vector3(3.2*x,.4*x,4)),[x]),R=(0,i.useRef)(null),[k,U]=(0,i.useState)(0);return(0,i.useEffect)((()=>{f.preview&&R.current&&f.preview instanceof r.Texture&&(f.preview.needsUpdate=!0,R.current.needsUpdate=!0)}),[f.preview]),(0,i.useEffect)((()=>{U((e=>e+1))}),[f.normalMap,f.puffPrice,f.crystalPrice,null===(p=f.selectedName)||void 0===p?void 0:p.id]),(0,u.jsx)(m._,{position:b,rotation:h,scale:T,children:(0,u.jsx)("meshStandardMaterial",{ref:R,transparent:!0,roughness:j&&!y?1:0,depthTest:!0,depthWrite:!1,map:f.preview instanceof r.Texture?f.preview:null,normalMap:M,normalScale:new r.Vector2(S,S),opacity:P?1:0})},k)},g=e=>{let{geom:t}=e;const a=(0,n.b)((e=>e.flags)),o=(0,n.b)((e=>e.texts)),i=(0,n.b)((e=>e.graphics));return(0,u.jsxs)("mesh",{geometry:t,renderOrder:1,children:[(0,u.jsx)("meshStandardMaterial",{transparent:!0,colorWrite:!1}),a.map((e=>{if(e.decalPosition&&e.decalOrientation)return(0,u.jsx)(f,{flag:e,position:e.decalPosition,orientation:e.decalOrientation,scale:e.decalScale},e.key)})),i.map((e=>{if(e.decalPosition&&e.decalOrientation)return(0,u.jsx)(f,{graphic:e,position:e.decalPosition,orientation:e.decalOrientation,scale:e.decalScale},e.key)})),o.map((e=>{if(e.decalPosition&&e.decalOrientation)return(0,u.jsx)(b,{text:e,position:e.decalPosition,orientation:e.decalOrientation,scale:e.decalScale},e.key)}))]})};var x=a(7133);const h=e=>{let{children:t}=e;const[a,o]=(0,i.useState)(),{customProduct:r}=(0,n.b)();return t({addNodes:function(e,t){if(t){const t={...a};for(const a in e)delete t[a];o({...t})}else o((t=>({...t,...e})))},geom:(0,i.useMemo)((()=>{const e=[];if(a)for(const[o,i]of Object.entries(a)){var t,n;const a=(null!==(t=null===r||void 0===r||null===(n=r.attributes)||void 0===n?void 0:n.parts)&&void 0!==t?t:[]).filter((e=>null===e||void 0===e?void 0:e.optional)).map((e=>{var t;return null===e||void 0===e||null===(t=e.modelParts)||void 0===t?void 0:t.data})).flat().find((e=>{var t;return(null===e||void 0===e||null===(t=e.attributes)||void 0===t?void 0:t.nodeId)===o}));i.isMesh&&!a&&e.push(i.geometry.clone())}return e.length?x.qf(e):null}),[a])})},M=e=>e.selectedModels,j=(0,i.forwardRef)(((e,t)=>{let{onPointerDown:a,onPointerUp:l,onPointerMove:d,onClick:s}=e;const c=(0,n.b)(M),{remountTrigger:v}=(0,n.b)(),m=(0,o.H)((e=>e.modelRotation)),f=(0,o.H)((e=>e.addingToCart));return(0,i.useEffect)((()=>{f&&"function"!==typeof t&&null!==t&&void 0!==t&&t.current&&t.current.rotateY(r.MathUtils.degToRad(m))}),[f,m]),(0,u.jsx)("group",{name:"meshGroup",ref:t,onPointerDown:a,onPointerUp:l,onPointerMove:d,onClick:s,dispose:null,children:(0,u.jsx)(h,{children:e=>{let{addNodes:t,geom:a}=e;return(0,u.jsxs)(u.Fragment,{children:[c.map((e=>{var a;return(0,u.jsx)(p,{model:e.model,addNodes:t},null===(a=e.model)||void 0===a?void 0:a.id)})),a&&(0,u.jsx)(g,{geom:a})]})}},v)})}));j.displayName="Scene";const w=j}}]);
//# sourceMappingURL=369.5c7b80a3.chunk.js.map