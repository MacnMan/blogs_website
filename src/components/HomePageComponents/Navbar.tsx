"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ROUTES } from "@/libs/routes";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

interface NavbarProps {
  allTabs: { tab: string; path: string; isExternal?: boolean }[];
  theme: string;
  activeDropdownIndex: number | null;
  setActiveDropdownIndex: React.Dispatch<React.SetStateAction<number | null>>;
}



function Navbar({ allTabs, theme }: NavbarProps) {
  const currentPath = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`hidden sm:flex items-center fixed top-0 left-0 w-full z-50 py-6 px-4 transition-all duration-300  
        }`}
    >
      {/* 🧠 Logo only visible BEFORE scroll */}
      {!scrolled && (
        <div
          className="w-32 absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
          onClick={() => {
            window.location.href = ROUTES.HOME;
          }}
        >
          <Image
            src="/success-stories/assets/home/logo.png"
            alt="Macnman Logo"
            width={400}
            height={200}
            className="transition-all duration-300"
          />
        </div>
      )}

      {/* 🚀 Center Section (Nav links + mini logo + search + Buy) */}
      <div className="flex-1 flex items-center justify-center gap-6">
        {/* Pills */}
        <div
          className="hidden sm:flex sm:items-center sm:space-x-2 
            backdrop-blur-4xl
            bg-white/90 dark:bg-[#dfdcdc19] 
            px-4 py-1 
            rounded-full 
            shadow-[0_4px_20px_rgba(0,0,0,0.15)] 
            backdrop-saturate-150"
        >
          <div
            className={`flex  space-x-4 max-w-2xl rounded-full items-center text-white ${theme === "dark" ? "text-white" : "text-black"
              }`}
          >
            {/* 💫 Inject Mini Logo INTO Nav when scrolled */}
            {scrolled && (
              <li
                className="list-none flex items-center gap-6 px-2 py-1"
                onClick={() => (window.location.href = ROUTES.HOME)}
              >
                <Image
                  src="/success-stories/assets/home/logo_small_red.webp"
                  alt="Mini Macnman"
                  width={30}
                  height={40}
                  className="cursor-pointer"
                />
                <span className="text-[12px] text-gray-400 leading-none flex items-center">
                  |
                </span>
              </li>
            )}

            {/* Tabs */}
            {allTabs.map((obj) => (
              <li
                key={obj.tab}
                className={`list-none px-2 py-1 rounded-full relative text-white ${currentPath === obj.path
                  ? 'after:absolute after:content-[" "] after:w-[90%] after:self-center after:-bottom-[1px] after:left-1/2 after:-translate-x-1/2 after:h-2 after:bg-gradient-to-r after:from-pink-700 after:to-indigo-700 after:[filter:blur(12px)] after:opacity-90 after:rounded-full font-semibold'
                  : ""
                  }`}
              >
                {obj.isExternal ? (
                  <a href={obj.path} target="_blank" rel="noopener noreferrer">
                    {obj.tab}
                  </a>
                ) : (
                  <Link href={obj.path}>{obj.tab}</Link>
                )}
              </li>
            ))}
          </div>

          {/* Search */}
          <div>
            <button
              className={`bg-white-600 p-1 rounded-full ml-4
                 ${theme === "dark" ? "text-white" : "text-black"}`}
              aria-label="Search"
            >
              <FiSearch className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Buy Button */}
        <div>
          <button className="bg-blue-600 py-2 px-6 rounded-full text-white ml-2 shadow-[0_4px_14px_rgba(0,0,0,0.3)]">
            Buy
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;