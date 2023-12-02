import Link from "next/link";
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { EazipayIcon } from "../../../../assets/icons";
import { BrandLogo } from "../brandLogo/brandLogo";

const routes = [
  {
    name: "User",
    href: "/",
  },
  {
    name: "Create User",
    href: "/user/add-user",
  },
  {
    name: "Github Repository",
    href: "https://github.com/RuchiDeve/sector-app",
  },
  { name: "Contact", href: "https://wa.link/b9yd7d" },
];

const Navbar = () => {
  const [dropNav, setDropNav] = useState(false);

  return (
    <nav className="bg-white  fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-[1100px] mx-auto p-4 flex justify-between lg:flex lg:justify-between">
        <div className="flex gap-20 justify-between  w-full">
          <Link href="/" className="flex items-center">
            <BrandLogo width={100} />
          </Link>

          <div
            className="items-center justify-between hidden  md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className=" p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 hidden lg:flex flex-col ">
              {routes.map((route, index) => (
                <li key={index} className="block py-2 pl-3 pr-4 ">
                  <Link href={route.href}>{route.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="lg:hidden">
            {!dropNav && (
              <HiMenu
                className="text-2xl transition"
                onClick={() => {
                  setDropNav(true);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="md:hidden text-black">
        {dropNav && (
          <div className="fixed top-0 right-0 w-[80%] h-full bg-white z-30">
            <div className="flex justify-between p-4">
              <HiX
                className="text-2xl transition"
                onClick={() => {
                  setDropNav(false);
                }}
              />
            </div>
            <ul className="flex flex-col p-4 font-medium rounded-lg space-y-4">
              {routes.map((route, index) => (
                <li key={index} className="block py-2 pl-3 pr-4">
                  <Link href={route.href}>{route.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
