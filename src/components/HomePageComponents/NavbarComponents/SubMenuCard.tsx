// src/components/home_page_components/NavbarComponents/SubMenuCard.tsx

'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

type propTypes = {
  title: string
  src: string
  link?: string // Make the link prop optional
  description: string
  activeTab: string
  onActiveTabChanged: (tab: string) => void
}

export default function SubMenuCard({
  title,
  src,
  link, // Destructure the link prop
  description,
  onActiveTabChanged,
  activeTab,
}: propTypes) {
  const isActive = activeTab === title

  // The core content and styling of the card
  const cardContent = (
    <div
      className={`cursor-pointer w-72 sm:w-80 h-24 rounded-[10px] mt-4 border transition-all duration-300 flex items-center ${
        isActive ? 'border bg-white' : 'border-gray-200 bg-transparent'
      }`}
    >
      <div className="flex items-center gap-x-4 px-4 py-3 w-full">
        {/* 🎯 Perfect Square Icon Box */}
        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
          <Image
            src={src}
            alt="icon"
            width={32}
            height={32}
            loading="lazy"
            className={`object-contain transition-all duration-300 ${
              isActive ? 'grayscale-0' : 'grayscale hover:grayscale-1'
            }`}
          />

          {/* Gradient Overlay when Active */}
          {isActive && (
            <span className="absolute inset-0 opacity-40 rounded-xl z-10" />
          )}
        </div>

        {/* 📝 Text Content */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800 mb-1">{title}</p>
          <p className="text-[10px] text-gray-500 leading-tight">
            {description}
          </p>
        </div>
      </div>
    </div>
  )

  // Conditionally wrap the card content based on the presence of a link
  if (link) {
    return (
      <Link href={link} target="_blank" rel="noopener noreferrer">
        {/*
          Next.js will automatically add a href to this div/link.
          The onClick is placed here to make the entire card a link
          while still running your onActiveTabChanged function.
        */}
        <div onClick={() => onActiveTabChanged(title)} className="cursor-pointer">
            {cardContent}
        </div>
      </Link>
    );
  }

  // If there's no link, just return the card content with the onClick handler
  return <div onClick={() => onActiveTabChanged(title)} className="cursor-pointer">{cardContent}</div>;
}