'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from 'react-icons/io'

interface imagesPropTypes {
  name?: string
  src: string
}

interface propTypes {
  images: imagesPropTypes[]
  imageSize?: string
}

export default function CardCarousel ({ images, imageSize }: propTypes) {
  const scrollRef = useRef<HTMLDivElement>(null)

  //   Scrolling Logic
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return

    const scrollAmount = container.clientWidth // Scroll by container width

    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    
    <div className='relative w-full px-1 lg:px-6 rounded-2xl overflow-hidden top-0'>
      {/* Arrows For Navigation */}
      <div className='flex justify-end gap-2 mx-8 mb-4 mt-3 text-white'>
        <button
          suppressHydrationWarning
          onClick={() => scroll('left')}
          className='p-1 text-2xl font-extrabold rounded-full bg-gray-300'
        >
          <IoMdArrowRoundBack />
        </button>
        <button
          suppressHydrationWarning
          onClick={() => scroll('right')}
          className='p-1 text-2xl font-extrabold rounded-full bg-gray-300'
        >
          <IoMdArrowRoundForward />
        </button>
      </div>

      {/* Carousel Scrollable Area */}
      <div
        ref={scrollRef}
        className='flex justify-start items-start overflow-x-auto space-x-8 scrollbar-hide scroll-smooth h-[184px] snap-x snap-mandatory'
      >
        {images.map((data, index) => (
          <div
            key={index}
            className='snap-start flex flex-col items-center w-32'
          >
            <div className='relative w-32 aspect-square rounded-xl bg-gray-100 p-8'>
              <Image
                src={data.src}
                alt={`img-${index}`}
                fill
                className={`${
                  imageSize === 'cover' ? 'object-cover' : 'object-contain'
                } rounded-xl`}
                sizes='(max-width:400px) 1000px,1000px'
              />
            </div>
           
            {data.name && (
              <p className='mt-4 text-sm font-medium text-center break-words w-full'>
                {data.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}