import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdpwn";
import logo from "../../assets/images/Logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navbarRef = useRef(null)
  let menuref = useRef();
  let profileref = useRef();


  useEffect(() => {
    let handler = (e)=> {
      if(!menuref.current.contains(e.target)){
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handler);
  
    return()=>{
      document.removeEventListener("mousedown",handler);
    }

  });
  useEffect(() => {
    let handler = (e)=> {
      if(!profileref.current.contains(e.target)){
        setProfileOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handler);
  
    return()=>{
      document.removeEventListener("mousedown",handler);
    }

  });

  return (
    <header className="fixed inset-x-0 top-0 nav" ref={navbarRef}>
      <nav
        className="flex items-center justify-between px-6 py-3 lg:px-8"
        aria-label="Global"
      >
        <Link to={"/"} className="lg:pe-4">
          <span className="sr-only">Your Company</span>
          <img src={logo} width={70} alt="" />
        </Link>
        <div onClick={() => setIsOpen(!isOpen)} className="flex lg:hidden">
          <div className="-m-2.5 text-lg inline-flex items-center justify-center rounded-3xl px-4 py-2 text-white bg-secondary hover:cursor-pointer">
            Menu
          </div>
        </div>
        <div className="hidden lg:flex lg:gap-x-5 capitalize lg:px-9 lg:py-3 rounded-3xl lg:bg-[#c8c7c7]">
          <NavLink to={"/"} className="font-medium text-gray-900">
            home
          </NavLink>
          <NavLink to={"cart"} className="font-medium text-gray-900">
            cart
          </NavLink>
          <NavLink to={"brands"} className="font-medium text-gray-900">
            brands
          </NavLink>
          <NavLink to={"categories"} className="font-medium text-gray-900">
            categories
          </NavLink>
          <NavLink to={"products"} className="font-medium text-gray-900">
            products
          </NavLink>
        </div>
        <div className="flex relative" >
          
          <div ref={profileref} className="flex-col flex-grow-0 justify-items-center">
            <div
              className="bg-secondary p-3 rounded-full w-fit"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="cursor-pointer fa-solid fa-user fa-2xl text-main"></div>
            </div>
            <div onClick={()=>setProfileOpen(false)}>{profileOpen ? <ProfileDropdown /> : null}</div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={isOpen ? "lg:hidden" : "hidden"} role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-x-4 top-5 z-50 origin-top rounded-3xl bg-secondary p-5 ring-1 ring-zinc-900/5 duration-150 dark:bg-zinc-900 dark:ring-zinc-800">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="-m-2.5 bg-transparent hover:bg-main hover:text-secondary rounded-md p-2.5 text-main"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div ref={menuref} className="mt-6 flow-root ">
            <div className="-my-6 divide-y divide-gray-500/10 text-center capitalize">
              <div className="space-y-2 py-6">
                <NavLink to={"/"} onClick={()=>setIsOpen(false)} className="block border-b-2 border-b-gray-700 py-2 text-base/7 font-medium text-gray-400">
                  home
                </NavLink>
                <NavLink to={"/cart"}  onClick={()=>setIsOpen(false)} className="block border-b-2 border-b-gray-700 py-2 text-base/7 font-medium text-gray-400">
                  cart
                </NavLink>
                <NavLink to={"/brands"} Ecommerce onClick={()=>setIsOpen(false)} className="block border-b-2 border-b-gray-700 py-2 text-base/7 font-medium text-gray-400">
                  brands
                </NavLink>
                <NavLink to={"/categories"}  onClick={()=>setIsOpen(false)} className="block border-b-2 border-b-gray-700 py-2 text-base/7 font-medium text-gray-400">
                  categories
                </NavLink>
                <NavLink to={"/products"}  onClick={()=>setIsOpen(false)} className="block border-b-2 border-b-gray-700 py-2 text-base/7 font-medium text-gray-400">
                  products
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}