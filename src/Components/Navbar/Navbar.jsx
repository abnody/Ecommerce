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
    let handler = (e) => {
      if (!menuref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }

  });
  useEffect(() => {
    let handler = (e) => {
      if (!profileref.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }

  });

  return (
    <header className="fixed inset-x-0 top-0 nav" ref={navbarRef}>
      <nav
        className="flex items-center justify-between px-7 py-4 lg:px-8 bg-gray-800/80 backdrop-blur-xl"
        aria-label="Global"
      >
        <Link to={"/"} className="lg:pe-4 flex ">
          <h2 className="text-2xl font-1 font-bold text-white">ShopScoop </h2>
          <span className="bg-[#00f8ff] rounded-full w-1 h-1 inline-block place-self-end mb-[0.4rem] ml-1" ></span>
        </Link>
        <div className="hidden lg:flex lg:gap-x-5 capitalize lg:px-9  rounded-3xl">
          <NavLink to={"/"} className=" text-lg text-white">
            home
          </NavLink>
          <NavLink to={"brands"} className=" text-lg text-white">
            brands
          </NavLink>
          <NavLink to={"categories"} className=" text-lg text-white">
            categories
          </NavLink>
          <NavLink to={"products"} className=" text-lg text-white">
            products
          </NavLink>
        </div>
        <div className="flex relative gap-x-5" >
          <NavLink to={"cart"} className="font-medium text-white">
            <i className="fa-solid fa-cart-shopping fa-xl cursor-pointer text-white hover:text-green-400"></i>
          </NavLink>
          <div ref={profileref} className="flex-col flex-grow-0 justify-items-center">
            <div className="cursor-pointer fa-solid fa-user fa-xl text-white" onClick={() => setProfileOpen(!profileOpen)}></div>
            <div onClick={() => setProfileOpen(false)}>{profileOpen ? <ProfileDropdown /> : null}</div>
          </div>
          <div onClick={() => setIsOpen(!isOpen)} className="flex lg:hidden">
            <i className="fa-solid fa-bars cursor-pointer text-xl text-white hover:text-[#00f8ff]"></i>
          </div>
        </div>
      </nav>
      {/* Mobile menu */}
      <div className={isOpen ? "lg:hidden" : "hidden"} role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-50" />
        <div className="fixed end-0 top-15 z-50 origin-top h-screen bg-secondary p-5 ring-1 ring-zinc-900/5 duration-150 dark:bg-zinc-900 dark:ring-zinc-800">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="-m-2.5 bg-transparent hover:bg-white hover:text-secondary rounded-md p-2.5 text-white"
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
              <div className="w-72 space-y-6 py-6">
                <NavLink to={"/"} onClick={() => setIsOpen(false)} className="block border-b-2 border-b-gray-700 py-2 text-base/7 font-medium text-[white]">
                  home
                </NavLink>
                <NavLink to={"/cart"} onClick={() => setIsOpen(false)} className="block border-b-2 border-b-gray-700 py-2 text-base/7 font-medium text-[white]">
                  cart
                </NavLink>
                <NavLink to={"/brands"} onClick={() => setIsOpen(false)} className="block border-b-2 border-b-gray-700 py-2 text-base/7 font-medium text-[white]">
                  brands
                </NavLink>
                <NavLink to={"/categories"} onClick={() => setIsOpen(false)} className="block border-b-2 border-b-gray-700 py-2 text-base/7 font-medium text-[white]">
                  categories
                </NavLink>
                <NavLink to={"/products"} onClick={() => setIsOpen(false)} className="block border-b-2 border-b-gray-700 py-2 text-base/7 font-medium text-[white]">
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