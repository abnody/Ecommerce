import{r as a,W as f,u as g,k as j,j as e}from"./index-CzaisvcM.js";import p from"./Loading-Cgh1c3Vn.js";import{A as N}from"./index-1jumHTSc.js";import{m as b}from"./proxy-gqot2t9c.js";function C(){let{getWishlist:c,wishlist:l,isLoading:o,deleteProduct:n}=a.useContext(f),r=g();const[d,x]=a.useState(!0),[s,i]=a.useState([]);a.useEffect(()=>{!localStorage.getItem("userToken")&&j.error("You must log in first")&&x(!1)}),a.useEffect(()=>{c()},[]),a.useEffect(()=>{l!=null&&l.data&&(s==null?void 0:s.length)==0&&i(l.data)},[l]);const m=async t=>{i(h=>h.filter(u=>u.id!==t)),await n(t)};return e.jsx(e.Fragment,{children:d?o?e.jsx(p,{}):e.jsx("div",{className:"relative overflow-x-auto rounded-2xl  my-16",children:e.jsxs("table",{className:"w-full text-sm text-left rounded-2xl rtl:text-right text-gray-500 ",children:[e.jsx("thead",{className:"text-xs bg-[#1a1a1a] text-white  uppercase bg-#1a1a1a ",children:e.jsxs("tr",{className:"",children:[e.jsx("th",{scope:"col",className:"px-16 py-3",children:e.jsx("span",{className:"sr-only",children:"Image"})}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Product"}),e.jsx("th",{scope:"col",className:"px-6 py-3 ",children:"Action"})]})}),e.jsx("tbody",{children:e.jsx(N,{children:s==null?void 0:s.map(t=>e.jsxs(b.tr,{className:"bg-[#b3b3b3] border-b cursor-pointer  border-[#1a1a1a] hover:bg-[#8c8c8c] duration-300",exit:{opacity:0,x:-100},children:[e.jsx("td",{onClick:()=>r(`/productdetails/${t.id}`),className:"p-4",children:e.jsx("img",{src:t.imageCover,className:"w-16 md:w-32 max-w-full max-h-full",alt:t.title})}),e.jsxs("td",{onClick:()=>r(`/productdetails/${t.id}`),className:"px-6 py-4 font-semibold text-gray-900 ",children:[" ",t.title," "]}),e.jsx("td",{className:"px-6 py-4",children:e.jsx("div",{onClick:()=>m(t.id),className:"cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline",children:"Remove"})})]},t.id))})})]})}):null})}export{C as default};
