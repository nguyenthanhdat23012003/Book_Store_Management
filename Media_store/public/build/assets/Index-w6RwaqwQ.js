import{q as T,R as N,r as l,j as e,Y as Q,a as y,y as w}from"./app-DlTfACp8.js";import{A as Y}from"./AuthenticatedLayout-R8S8T6Np.js";import{T as v}from"./TextInput-D2LPhYe3.js";import{F as x}from"./index.es-BcBtWq_M.js";import{f as D,a as z,b as L,c as O}from"./index-BKezFA-V.js";import{I as U}from"./InputLabel-Cp9sWiy5.js";import{M as X}from"./Modal-C-ysj-lq.js";import"./ApplicationLogo-CuGNAzZ7.js";import"./transition-C164aHv8.js";const B=({error:r=null})=>{const p=T(),a=p.props.cart.data,[k,m]=N.useState(!1);l.useEffect(()=>{r&&(m(!0),setTimeout(()=>{m(!1)},3e3))},[p]);const[u,h]=N.useState([]),[f,C]=l.useState(!1),[S,j]=l.useState(null),[I,c]=l.useState(!1),[d,n]=l.useState(!1);l.useState(0);const g=()=>{let s=a.filter(t=>u.includes(t.id));return s.forEach(t=>{t.quantity=i[t.id]}),s},A=()=>{w.post(route("order.store"),{products:g()})},F=()=>{w.get(route("product.removeFromCart",S))},[i,P]=l.useState(a.reduce((s,t)=>(s[t.id]=t.quantity,s),{})),b=(s,t)=>{t===0?(n(!1),c(!0),j(s)):axios.get(route("product.changeQuantity",s),{params:{quantity:t}}).then(o=>{n(!1),P(M=>({...M,[s]:t}))}).catch(o=>{console.error("Error updating quantity:",o),n(!1)})},R=s=>{h(t=>t.includes(s)?t.filter(o=>o!==s):[...t,s])},q=()=>{C(!f),h(f?[]:a.map(s=>s.id))},E=()=>a.reduce((s,t)=>u.includes(t.id)?s+t.price*t.quantity:s,0);return e.jsxs(e.Fragment,{children:[e.jsx(Q,{title:"Product"}),e.jsx("header",{className:"bg-white dark:bg-gray-800 shadow",children:e.jsxs("div",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8",children:[e.jsx("div",{className:"flex justify-between breadcrumbs",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(y,{href:route("products.index"),className:"font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight",children:"Media store"})}),e.jsx("li",{children:e.jsx(y,{href:route("cart.index"),className:"font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight",children:"Your cart"})})]})}),k&&e.jsxs("div",{role:"alert",className:"alert alert-warning fixed z-10 w-[70%] top-10 right-auto left-auto flex justify-between opacity-75 shadow text-white",children:[e.jsx("span",{children:r}),e.jsx(x,{icon:D,className:"w-24 hover:opacity-75 cursor-pointer text-red-300",onClick:()=>m(!1)})]})]})}),e.jsx("div",{className:"h-screen overflow-auto",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8 py-12 mb-12",children:e.jsxs("div",{className:"flex flex-col gap-5 flex-1 p-4 text-gray-900 dark:text-gray-100",children:[a.length===0&&e.jsx("div",{className:"p-6 bg-white rounded",children:e.jsx("div",{className:"text-center text-2xl text-warning",children:"Your cart is empty!"})}),a.length>0&&a.map(s=>e.jsxs("div",{className:"flex flex-wrap sm:items-center px-4 py-2 rounded bg-fuchsia-100 shadow-lg border border-gray",children:[e.jsxs("div",{className:"flex grow lg:w-1/5 md:w-1/3 w-2/5 justify-center items-center h-full sm:px-4",children:[e.jsx("div",{className:"sm:px-2",children:e.jsx(v,{type:"checkbox",checked:u.includes(s.id),onChange:()=>R(s.id),className:"w-5 h-5 checkbox checkbox-primary"})}),e.jsx("div",{className:"m-1",children:e.jsx("img",{src:s.image_url,className:"rounded-lg shadow-2xl w-40"})})]}),e.jsxs("div",{className:"flex grow flex-wrap lg:w-3/5 md:w-2/3 w-3/5 justify-between items-center",children:[e.jsxs("div",{className:"lg:w-1/2 w-full overflow-hidden px-4",children:[e.jsx("h1",{className:"sm:text-2xl font-bold uppercase ",children:s.type}),e.jsx("p",{className:"sm:py-3 py-1 text-ellipsis",children:s.name})]}),e.jsxs("div",{className:"text-orange-400 lg:w-3/12 md:w-1/2 w-full px-4",children:[e.jsx("h1",{className:"sm:text-2xl text-md font-bold",children:"Unit price"}),e.jsxs("p",{className:"sm:py-3 py-1",children:[e.jsx("span",{className:"text-xs",children:"đ"}),Intl.NumberFormat().format(s.price)]})]}),e.jsxs("div",{className:"sm:flex justify-between items-center lg:w-3/12 md:w-1/2 w-full",children:[e.jsxs("div",{className:"flex justify-between items-center mx-3",children:[e.jsx("button",{className:"btn px-2",disabled:d,onClick:()=>{d||(n(!0),b(s.id,i[s.id]-1))},children:e.jsx(x,{icon:z})}),e.jsx("span",{className:"px-4 py-2",children:i[s.id]}),e.jsx("button",{className:"btn px-2",disabled:d,onClick:()=>{d||(n(!0),b(s.id,i[s.id]+1))},children:e.jsx(x,{icon:L})})]}),e.jsxs("p",{className:"text-red-600 font-bold text-xl text-center",children:[e.jsx("span",{className:"text-xs",children:"đ"}),Intl.NumberFormat().format(i[s.id]*s.price)]})]})]}),e.jsx("div",{className:"lg:w-1/5 w-full flex sm:justify-end justify-center",children:e.jsx("button",{className:"btn btn-outline btn-primary my-4",onClick:()=>{j(s.id),c(!0)},children:"Remove"})})]},s.id))]})})}),e.jsx(X,{show:I,onClose:()=>c(!1),children:e.jsxs("div",{className:"text-center py-8",children:[e.jsx(x,{className:"mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200",icon:O}),e.jsx("h3",{className:"mb-5 text-lg font-normal text-gray-500 dark:text-gray-400",children:"Are you sure you want to delete this product?"}),e.jsxs("div",{className:"flex justify-center gap-4",children:[e.jsx("button",{className:"btn btn-success",onClick:()=>{c(!1),F()},children:"Confirm"}),e.jsx("button",{className:"btn btn-error",onClick:()=>c(!1),children:"Cancel"})]})]})}),e.jsx("div",{className:"fixed right-0 left-0 bottom-0 bg-pink-100 px-4 py-4 shadow",children:e.jsxs("div",{className:"max-w-3xl mx-auto flex justify-between items-center",children:[e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(v,{type:"checkbox",onChange:q,className:"w-4 h-4 checkbox",id:"select-all"}),e.jsx(U,{htmlFor:"select-all",checked:f,className:"cursor-pointer",children:"Select all"})]}),e.jsxs("div",{className:"flex sm:gap-12 gap-2 items-center ",children:[e.jsx("div",{className:"text-xl",children:e.jsxs("span",{children:["Total:"," ",e.jsx("span",{className:"text-red-600",children:Intl.NumberFormat().format(E())+" vnd"})]})}),e.jsx("button",{className:"btn btn-primary text-slate-200 text-lg",onClick:A,disabled:g().length===0,children:"Checkout"})]})]})})]})};B.layout=r=>e.jsx(Y,{user:r.props.auth.user,children:r});export{B as default};