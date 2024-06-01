import{j as e,r as d,W as y}from"./app-DlTfACp8.js";import{I as h}from"./InputError-XkOi7DDO.js";import{I as w}from"./InputLabel-Cp9sWiy5.js";import{M as b}from"./Modal-C-ysj-lq.js";import{T as j}from"./TextInput-D2LPhYe3.js";import"./transition-C164aHv8.js";function l({className:o="",disabled:r,children:t,...s}){return e.jsx("button",{...s,className:`inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 ${r&&"opacity-25"} `+o,disabled:r,children:t})}function k({type:o="button",className:r="",disabled:t,children:s,...a}){return e.jsx("button",{...a,type:o,className:`inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150 ${t&&"opacity-25"} `+r,disabled:t,children:s})}function U({className:o=""}){const[r,t]=d.useState(!1),s=d.useRef(),{data:a,setData:u,delete:m,processing:f,reset:c,errors:p}=y({password:""}),x=()=>{t(!0)},g=i=>{i.preventDefault(),m(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>n(),onError:()=>s.current.focus(),onFinish:()=>c()})},n=()=>{t(!1),c()};return e.jsxs("section",{className:`space-y-6 ${o}`,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Delete Account"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."})]}),e.jsx(l,{onClick:x,children:"Delete Account"}),e.jsx(b,{show:r,onClose:n,children:e.jsxs("form",{onSubmit:g,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Are you sure you want to delete your account?"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."}),e.jsxs("div",{className:"mt-6",children:[e.jsx(w,{htmlFor:"password",value:"Password",className:"sr-only"}),e.jsx(j,{id:"password",type:"password",name:"password",ref:s,value:a.password,onChange:i=>u("password",i.target.value),className:"mt-1 block w-3/4",isFocused:!0,placeholder:"Password"}),e.jsx(h,{message:p.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(k,{onClick:n,children:"Cancel"}),e.jsx(l,{className:"ms-3",disabled:f,children:"Delete Account"})]})]})})]})}export{U as default};
