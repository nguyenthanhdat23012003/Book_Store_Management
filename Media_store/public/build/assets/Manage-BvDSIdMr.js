import{q as t,R as i,j as e,Y as d,a as l}from"./app-DlTfACp8.js";import{A as x}from"./AuthenticatedLayout-R8S8T6Np.js";import{P as c}from"./Pagination---dzqoEW.js";import"./index.es-BcBtWq_M.js";import"./ApplicationLogo-CuGNAzZ7.js";import"./transition-C164aHv8.js";const m=({products:a})=>(t(),i.useState(!1),e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Product"}),e.jsx("header",{className:"bg-white dark:bg-gray-800 shadow",children:e.jsx("div",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8",children:e.jsx("div",{className:"flex justify-between",children:e.jsx("div",{className:"breadcrumbs",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(l,{href:route("dashboard"),className:"font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight",children:"Media store"})}),e.jsx("li",{children:e.jsx(l,{href:route("products.manage"),className:"font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight",children:"Manage products"})})]})})})})}),e.jsx("div",{className:"h-screen overflow-auto",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8 py-12",children:e.jsx("div",{className:"bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg",children:e.jsxs("div",{className:"p-6 text-gray-900 dark:text-gray-100",children:[e.jsx("div",{className:"flex flex-wrap",children:a.data.map((s,r)=>e.jsx("div",{className:"xl:w-1/4 lg:w-1/3 md:w-1/2 w-full p-4",children:e.jsxs("div",{className:"card indicator w-full bg-base-100 shadow-xl",children:[e.jsxs("figure",{className:"min-h-[100px]",children:[e.jsx("span",{className:"indicator-item badge badge-primary",children:"new"}),e.jsx("img",{src:s.image_path,alt:"Shoes"})]}),e.jsxs("div",{className:"card-body",children:[e.jsx("h2",{className:"card-title uppercase",children:s.type}),e.jsx("div",{className:"h-20 overflow-hidden",children:e.jsx("p",{className:"text-ellipsis",children:s.name})}),e.jsx("div",{className:"text-2xl text-orange-400",children:Intl.NumberFormat().format(s.price)+" vnd"})]})]})},r))}),e.jsx(c,{links:a.links})]})})})})]}));m.layout=a=>e.jsx(x,{user:a.props.auth.user,children:a});export{m as default};