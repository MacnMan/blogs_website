import Image from "next/image";
import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import MobileNavbarCardCarousel from "./MobileNavbarCardCarousel";

interface imagesPropTypes {
  name?: string;
  src: string;
}

type propTypes = {
  title: string;
  src: string;
  description: string;
  images: imagesPropTypes[];
  isOpen: boolean;


  onToggle: () => void;
};

export default function MobileNavbarMenuCard({
  title,
  src,
  description,
  images,
  isOpen,
  onToggle,
}: propTypes) {
  return (
    <div
      className={`w-11/12 bg-white/10 backdrop-blur-sm z-40 mx-auto p-1 ${
        isOpen ? "border border-gray-200 rounded-md" : ""
      }`}
    >
      <div
        className="flex gap-x-6 px-2 py-3 rounded-xl cursor-pointer"
        onClick={onToggle}
      >
        <div
          className={`relative min-w-14 min-h-14 rounded-xl${
            isOpen ? "" : "grayscale"
          } transition duration-300`}
        >
          <Image
            src={src}
            alt="icon"
            fill
            className="p-4 object-contain"
            sizes="(max-width: 425px): 1000px,1000px"
          />
        </div>

        <div className="w-full">
          <p className="text-sm font-medium text-gray-800 mb-2 flex justify-between items-center">
            <span>{title}</span>
            <span className="text-gray-400">
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </p>
          <p className="text-[10px] text-gray-400">{description}</p>
        </div>
      </div>

      {isOpen && (
        <div>
          <MobileNavbarCardCarousel images={images} />
        </div>
      )}
    </div>
  );
}