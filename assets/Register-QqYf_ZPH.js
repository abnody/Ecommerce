import{r as n,l as c,j as e,N as h,a as x}from"./index-BaUYzt0Z.js";import{c as g,a as s,b,u as p}from"./index.esm-PzdBrrRF.js";function v(){const[l,o]=n.useState(null),[d,a]=n.useState(!1);let i=c();async function u(){a(!0);try{let{data:t}=await x.post("https://ecommerce.routemisr.com/api/v1/auth/signup",r.values);a(!1),localStorage.setItem("userToken",t.token),i("/")}catch(t){o(t.response.data.message),a(!1)}}const m=g({name:s().required("name is required").min(3,"Please enter a valid name"),email:s().required("email is required").email("Please enter a valid email"),password:s().required("This field is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,"Invalid password! Must include at least one uppercase letter, one lowercase letter, one number, and one special character."),rePassword:s().required("This field is required").oneOf([b("password"),null],"Must matches Password"),phone:s().required("This field is required").matches(/^01[0-2,5]\d{8}$/,"Please enter a valid Egyption Mobile number")}),r=p({initialValues:{name:"",email:"",password:"",rePassword:"",phone:""},validationSchema:m,onSubmit:u});return e.jsx(e.Fragment,{children:e.jsxs("form",{className:"max-w-sm mx-auto py-7",onSubmit:r.handleSubmit,children:[e.jsxs("div",{className:"mb-5",children:[e.jsx("label",{htmlFor:"name",className:"block mb-2 text-sm font-medium text-white",children:"Your name"}),e.jsx("input",{type:"text",id:"name",value:r.values.name,onChange:r.handleChange,onBlur:r.handleBlur,className:"shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ",required:!0})]}),r.touched.name&&r.errors.name?e.jsx("div",{className:"p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:r.errors.name}):null,e.jsxs("div",{className:"mb-5",children:[e.jsx("label",{htmlFor:"phone",className:"block mb-2 text-sm font-medium text-white",children:"Your phone"}),e.jsx("input",{type:"tel",id:"phone",value:r.values.phone,onChange:r.handleChange,onBlur:r.handleBlur,className:"shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ",required:!0})]}),r.touched.phone&&r.errors.phone?e.jsx("div",{className:"p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:r.errors.phone}):null,e.jsxs("div",{className:"mb-5",children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-medium text-white",children:"Your email"}),e.jsx("input",{type:"email",id:"email",value:r.values.email,onChange:r.handleChange,onBlur:r.handleBlur,className:"shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ",required:!0})]}),r.touched.email&&r.errors.email?e.jsx("div",{className:"p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:r.errors.email}):null,e.jsxs("div",{className:"mb-5",children:[e.jsx("label",{htmlFor:"password",className:"block mb-2 text-sm font-medium text-white",children:"Your password"}),e.jsx("input",{type:"password",id:"password",value:r.values.password,onChange:r.handleChange,onBlur:r.handleBlur,className:"shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ",required:!0})]}),r.touched.password&&r.errors.password?e.jsx("div",{className:"p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:r.errors.password}):null,e.jsxs("div",{className:"mb-5",children:[e.jsx("label",{htmlFor:"repeat-password",className:"block mb-2 text-sm font-medium text-white",children:"Repeat password"}),e.jsx("input",{type:"password",id:"rePassword",value:r.values.rePassword,onChange:r.handleChange,onBlur:r.handleBlur,className:"shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ",required:!0})]}),r.touched.rePassword&&r.errors.rePassword?e.jsx("div",{className:"p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:r.errors.rePassword}):null,e.jsxs("div",{className:"flex items-start mb-5",children:[e.jsx("div",{className:"flex items-center h-5",children:e.jsx("input",{id:"terms",type:"checkbox",defaultValue:!0,className:"w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800",required:!0})}),e.jsxs("label",{htmlFor:"terms",className:"ms-2 text-sm font-medium text-gray-900 dark:text-gray-300",children:["I agree with the ",e.jsx("a",{href:"#",className:" text-blue-600 hover:underline dark:text-blue-500",children:"terms and conditions"})]})]}),e.jsxs("div",{className:"flex  items-center",children:[!d&&e.jsx("button",{type:"submit",className:"text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ",children:"Register new account"}),d&&e.jsx("button",{type:"button",className:"text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ",children:e.jsx("i",{className:"fas fa-spinner fa-spin fa-lg"})}),l&&e.jsxs("p",{className:"text-red-600 ps-3",children:[" ",l," "]})]}),e.jsx("div",{className:"pt-2",children:e.jsx(h,{to:"/login",className:"underline text-gray-400 pt-6  hover:text-lg duration-150",children:" Already have account"})})]})})}export{v as default};
