'use client'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef } from 'react'
import { IoMdArrowRoundForward } from 'react-icons/io'

interface imagesPropTypes {
  name?: string
  src: string
}

interface propTypes {
  images: imagesPropTypes[]
}

export default function MobileNavbarCardCarousel ({ images }: propTypes) {
  const scrollRef = useRef<HTMLDivElement>(null)

  //   Scrolling Logic
  const scroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const scrollAmount = container.clientWidth
    const maxScrollLeft = container.scrollWidth - container.clientWidth

    // If we've reached (or passed) the end, reset to start
    if (container.scrollLeft + scrollAmount >= maxScrollLeft) {
      container.scrollTo({
        left: 0,
        behavior: 'smooth'
      })
    } else {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }, [])

  useEffect(() => {
    const intervalID = setInterval(scroll, 3000)

    return () => {
      clearInterval(intervalID)
    }
  })

  return (
    <div className='relative w-full flex justify-between items-center space-x-2 px-3 pb-6 lg:px-6 rounded-2xl overflow-hidden'>
      {/* Carousel Scrollable Area */}
      <div
        ref={scrollRef}
        className='flex justify-start items-center overflow-x-auto space-x-8 scrollbar-hide scroll-smooth h-48 snap-x snap-mandatory '
      >
        {images.map((data, index) => (
          <div key={index} className='snap-start'>
            <div className='relative w-32 aspect-square rounded-xl bg-gray-100'>
              <Image
                src={data.src}
                alt={`img-${index}`}
                fill
                className='object-contain rounded-xl'
                sizes='(max-width:425px) 1000px,1000px'
              />
            </div>
            {data.name && (
              <p className='mt-4 text-sm font-medium text-center'>
                {data.name}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* An arrow for navigation */}
      <button
        suppressHydrationWarning
        onClick={() => scroll()}
        className='p-1 text-2xl h-8 -mt-4 aspect-square font-extrabold rounded-full text-white bg-gray-200'
      >
        <IoMdArrowRoundForward />
      </button>
    </div>
  )
}