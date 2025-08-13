import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import NavbarData from "../../../data/Navbar.json";
import { MdOutlineCancel } from "react-icons/md";
import MobileNavbarMenuCard from "./MobileNavbarMenuCard";
import { IoIosSearch } from "react-icons/io";
import { useEffect } from "react";

export default function NavbarMobileDevices() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Optional cleanup for safety
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(
    null
  );
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null); // ✅ Add this
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
const [clickedCardIndex, setClickedCardIndex] = useState<number | null>(null);

  const openMenu = useCallback((index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdownIndex(index);
  }, []);

  useEffect(() => {
    if (activeDropdownIndex !== null) {
      setOpenCardIndex(0); // Open first card by default when dropdown appears
    }
  }, [activeDropdownIndex]);

  return (
    <section className="fixed px-4 w-full top-0 mb-4 lg:mb-12 z-50 bg-transparent flex flex-col items-start">
      {/* Search Bar Form */}

      <form action="" className="w-full border mt-4 bg-gray-100 rounded-2xl">
        <div className="relative  mx-auto flex justify-center items-center my-[20px]">
          <span className="absolute left-3">
            <Image
              src="/blogs/images/macnman-small-logo.svg"
              alt="logo"
              width={30}
              height={30}
              loading="lazy"
            />
          </span>

          {isOpen && (
            <span
              className="absolute right-3 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              <MdOutlineCancel />
            </span>
          )}

          {!isOpen && (
            <div className="absolute right-3  flex gap-x-4 items-center">
              <span className="cursor-pointer text-xl ">
                <IoIosSearch />
              </span>

              <Image
                src="/blogs/images/svgs/shopping-bag 1.svg"
                alt="Shopping Bag"
                width={22}
                height={22}
                className="cursor-pointer"
              />

              <div
                className="w-4 h-4  flex flex-col justify-evenly"
                onClick={() => {
                  setIsOpen(true);
                  setActiveDropdownIndex(0); //Always open the first dropdown on hamburger click
                }}
              >
                <p className="text-[1px] bg-black rounded-full">.</p>
                <p className="w-3/4 text-[1.5px] bg-black rounded-full">.</p>
                <p className="w-2/5 text-[1px] bg-black rounded-full">.</p>
              </div>
            </div>
          )}
        </div>
      </form>

      {isOpen && (
        <div className="w-full  z-60 flex mt-4 justify-start sm:justify-center items-center space-x-4 text-black text-xs list-none overflow-x-scroll scrollbar-hide px-2 mb-3">
          {NavbarData.map((data, index) => (
            <div key={index} onMouseEnter={() => openMenu(index)}>
              <p
                className={`cursor-pointer  text-base  whitespace-nowrap ${
                  activeDropdownIndex === index
                    ? "text-xl font-bold text-black"
                    : "text-sm text-gray-400 font-medium"
                }`}
              >
                {data.NavbarItem}
              </p>

              {activeDropdownIndex === index && (
                <div
                  className="absolute top-full left-0 w-screen bg-white z-[200] lg:min-h-screen pb-4 overflow-y-auto"
                  onMouseEnter={() => openMenu(index)}
                >
                  {data.NavbarItem === "Resources" ? (
  <div className="grid gap-2 p-4">
    {data.Details.map((resource, i) => (
      <div
        key={i}
        onClick={() => {
  setClickedCardIndex(i);
  if ("link" in resource && typeof resource.link === "string") {
    window.open(resource.link, "_blank");
  } else {
    console.warn("No valid link found on resource");
  }
}}

        className={`cursor-pointer bg-white border rounded-xl p-3 shadow hover:shadow-md transition duration-300 ${
          clickedCardIndex === i ? "grayscale-0" : "grayscale"
        }`}
      >
                          <div className="relative w-14 h-14 mb-2">
                            <Image
                              src={resource.src}
                              alt={resource.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <p className="font-semibold text-sm text-black">
                            {resource.title}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">
                            {resource.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    data.Details.map((card, cardIndex) => (
                      <MobileNavbarMenuCard
                        key={cardIndex}
                        title={card.title}
                        src={card.src}
                        description={card.description}
                        images={card.images}
                        isOpen={openCardIndex === cardIndex}
                        onToggle={() =>
                          setOpenCardIndex(
                            openCardIndex === cardIndex ? null : cardIndex
                          )
                        }
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          ))}

          <li className="cursor-pointer text-base text-gray-400 font-medium whitespace-nowrap">
            <a href="#">Success Stories</a>
          </li>
        </div>
      )}
    </section>
  );
}