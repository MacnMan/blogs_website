'use client'
import Image from 'next/image'
import React from 'react'

type propTypes = {
  title: string
  src: string
  description: string
  activeTab: string
  onActiveTabChanged: (tab: string) => void
}

export default function SubMenuCard({
  title,
  src,
  description,
  onActiveTabChanged,
  activeTab,
}: propTypes) {
  const isActive = activeTab === title

  return (
    <div
      onClick={() => onActiveTabChanged(title)}
      className={`cursor-pointer w-72 sm:w-80 h-24 rounded-[10px] mt-4 border  transition-all duration-300 flex items-center ${
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
              isActive ? 'grayscale-0' : 'grayscale hover:grayscale-0'
            }`}
          />

          {/*  Gradient Overlay when Active */}
          {isActive && (
            <span className="absolute inset-0  opacity-40 rounded-xl z-10" />
          )}
        </div>

        {/* 📝 Text Content */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800 mb-1">{title}</p>
          <p className="text-[10px] text-gray-500 leading-tight">{description}</p>
        </div>
      </div>
    </div>
  )
}