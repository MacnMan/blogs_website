import Image from 'next/image'
import React, { useCallback, useRef, useState } from 'react'
import NavbarData from '../../../data/Navbar.json'
import { MdOutlineCancel } from 'react-icons/md'
import MobileNavbarMenuCard from './MobileNavbarMenuCard'
import { IoIosSearch } from 'react-icons/io'

export default function NavbarMobileDevices () {
  const [isOpen, setIsOpen] = useState(false)

  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(
    null
  )

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const openMenu = useCallback((index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdownIndex(index)
  }, [])

  const closeMenu = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdownIndex(null)
    }, 200)
  }, [])

  return (
    <section className='fixed w-full top-0  mb-4 lg:mb-12 z-50 bg-white  flex flex-col items-start '>
      {/* Search Bar Form */}
      <form action='' className='w-full'>
        <div className='relative w-4/5 sm:w-3/5 mx-auto flex justify-center items-center my-4'>
          <input
            type='text'
            name='search'
            id='search'
            className='bg-gray-100 rounded-full min-w-full h-8 px-12 focus:outline-black'
            suppressHydrationWarning
          />
          <span className='absolute left-3'>
            <Image
              src='/images/macnman-small-logo.svg'
              alt='logo'
              width={20}
              height={20}
            />
          </span>

          {isOpen && (
            <span
              className='absolute right-3 text-lg'
              onClick={() => setIsOpen(false)}
            >
              <MdOutlineCancel />
            </span>
          )}

          {!isOpen && (
            <div className='absolute right-3 flex gap-x-3 items-center'>
              <span className='cursor-pointer text-md '>
                <IoIosSearch />
              </span>

              <Image
                src='/images/svgs/shopping-bag 1.svg'
                alt='Shopping Bag'
                width={16}
                height={16}
                className='cursor-pointer'
                sizes='(max-width:425px): 1000px,1000px'
                style={{ width: 'auto', height: 'auto' }}
              />

              <div
                className='w-4 h-4 flex flex-col justify-evenly'
                onClick={() => {
                  setIsOpen(true)
                }}
              >
                <p className='text-[1px] bg-black rounded-full'>.</p>
                <p className='w-3/4 text-[1.5px] bg-black rounded-full'>.</p>
                <p className='w-2/5 text-[1px] bg-black rounded-full'>.</p>
              </div>
            </div>
          )}
        </div>
      </form>

      {isOpen && (
        <div className='w-full flex justify-start sm:justify-center items-center space-x-4 text-black text-xs list-none overflow-x-scroll scrollbar-hide px-2 mb-3'>
          {NavbarData.map((data, index) => (
            <div
              key={index}
              onMouseEnter={() => openMenu(index)}
              onMouseLeave={closeMenu}
            >
              <p
                className={`cursor-pointer text-base text-gray-400 font-medium whitespace-nowrap ${
                  activeDropdownIndex === index &&
                  'text-[26px] font-bold text-gray-800 '
                }`}
              >
                {data.NavbarItem}
              </p>

              {activeDropdownIndex === index && (
                <div
                  className='absolute top-full left-0 w-screen bg-white z-[200] lg:min-h-screen pb-4 overflow-y-auto'
                  onMouseEnter={() => openMenu(index)}
                  onMouseLeave={closeMenu}
                >
                  {data.Details.map((card, index) => {
                    return (
                      <MobileNavbarMenuCard
                        key={index}
                        title={card.title}
                        src={card.src}
                        description={card.description}
                        images={card.images}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          ))}

          <li className='cursor-pointer text-base text-gray-400 font-medium whitespace-nowrap'>
            <a href='#'>Success Stories</a>
          </li>
        </div>
      )}
    </section>
  )
}