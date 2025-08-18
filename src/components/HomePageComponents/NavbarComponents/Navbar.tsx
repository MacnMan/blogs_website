// 'use client'
// import { ROUTES } from '@/libs/routes'
// import Image from 'next/image'
// import React, { useCallback, useRef, useState, useEffect } from 'react'
// import { IoIosSearch } from 'react-icons/io'
// import NavbarData from '../../../data/Navbar.json'
// import HoverableWidget from './HoverableWidget'



// type propTypes = {
//   activeDropdownIndex: number | null
//   setActiveDropdownIndex: (index: number | null) => void
// }

// export default function Navbar({
//   activeDropdownIndex,
//   setActiveDropdownIndex
// }: propTypes) {
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null)
//   const [isHovering, setIsHovering] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [hasMounted, setHasMounted] = useState(false)

//   const openMenu = useCallback(
//     (index: number) => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current)
//       setActiveDropdownIndex(index)
//       setIsHovering(true)
//     },
//     [setActiveDropdownIndex]
//   )

//   const closeMenu = useCallback(() => {
//     timeoutRef.current = setTimeout(() => {
//       setActiveDropdownIndex(null)
//       setIsHovering(false)
//     }, 200)
//   }, [setActiveDropdownIndex])

//   useEffect(() => {
//     setHasMounted(true)
//   }, [])

//   useEffect(() => {
//     document.body.style.overflow = isHovering ? 'hidden' : ''
//     return () => {
//       document.body.style.overflow = ''
//     }
//   }, [isHovering])

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   return (
//     <section className='fixed top-0 left-0 w-full flex md:justify-center items-center md:pr-4 xl:justify-center h-[90px] bg-transparent z-[100] isolate'>
//       {/* Show large logo before scroll */}
//       {hasMounted && !isScrolled && (
//         <div
//           className='absolute w-32 h-24 left-4 top-[-1px] cursor-pointer'
//           onClick={() => (window.location.href = ROUTES.HOME)}
//         >
//           <Image
//             src='/blogs/logo.png'
//             fill
//             alt='MacnMan Logo'
//             sizes='(max-width: 425px): 500px,500px'
//           />
//         </div>
//       )}

//       {/* Navbar Items */}
//       <div className='h-9 ml-20 flex justify-center items-center  bg-white   space-x-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] list-none bg-gray-80 rounded-full px-8'>

//         {/* Show small logo after scroll */}
//         {hasMounted && isScrolled && (
//           <div
//             className="flex items-center justify-center gap-5 cursor-pointer h-full"
//             onClick={() => (window.location.href = ROUTES.HOME)}
//           >
//             <div className="relative w-8 mt-1 h-6 flex items-center justify-center">
//               <Image
//                 src="/blogs/logo_small_red.webp"
//                 alt="Small Logo"
//                 fill
//                 className="object-contain"
//               />
//             </div>
//             <span className="text-[12px] text-gray-400 leading-none flex items-center h-full mr-2.5">|</span>
//           </div>
//         )}

//         {/* Static Store */}
//         <li className='text-md group relative'>
//           <a
//             href='#'
//             className='hover:text-black hover:font-semibold 
//               after:absolute after:content-[""] 
//               after:w-[100%] after:self-center 
//               after:-bottom-[3px] after:left-1/2 
//               after:-translate-x-1/2 after:h-2 
//               after:bg-gradient-to-r 
//               after:from-pink-700 after:to-indigo-700 
//               after:blur-md after:opacity-0 
//               group-hover:after:opacity-90 
//               transition-all duration-300'
//           >
//             Store
//           </a>
//         </li>

//         {/* Dynamic Items */}
//         {NavbarData.map((data, index) => (
//           <div
//             key={index}
//             onMouseEnter={() => openMenu(index)}
//             onMouseLeave={closeMenu}
//           >
//             <p
//               className={`cursor-pointer text-md relative px-2 py-1 rounded-md transition-all duration-200 ${activeDropdownIndex === index &&
//                 ' after:absolute after:content-[" "] after:w-[90%] after:self-center after:-bottom-[1px] after:left-1/2 after:-translate-x-1/2 after:h-2 after:bg-gradient-to-r after:from-pink-700 after:to-indigo-700 after:[filter:blur(12px)] after:opacity-90 after:rounded-full font-semibold text-black transition after:bg-white'
//                 }`}
//             >
//               {data.NavbarItem}
//             </p>

//             {activeDropdownIndex === index && (
//               <div
//                 className={` mt-6
//                     absolute top-14 left-1/2 -translate-x-1/2 
//                     w-[calc(100vw-170px)] pb-4 
//                     overflow-y-auto shadow-[0_4px_16px_rgba(0,0,0,0.2)] 
//                     rounded-3xl backdrop-blur-3xl
//                     transition-all duration-300 ease-in-out
//                     opacity-100 scale-100
//                     animate-dropdown-open
//                   `}
//                 onMouseEnter={() => openMenu(index)}
//                 onMouseLeave={closeMenu}
//               >
//                 <HoverableWidget
//                   HoverableWidgetDetails={data.Details}
//                   imageSize={data?.ImageSize ?? 'fit'}
//                   navbarItem={data.NavbarItem}
//                 />
//               </div>
//             )}





//           </div>
//         ))}

//         {/* Success Stories */}
//         <li className='cursor-pointer text-md group relative'>
//           <a
//             target='_blank'
//             href='https://macnman.com/blogs'
//             className='hover:text-black hover:font-semibold after:absolute after:content-[""] after:self-center after:w-full after:left-1/2 after:-translate-x-1/2 after:-bottom-[3px] after:h-2 after:bg-gradient-to-r after:from-pink-700 after:to-indigo-700 after:blur-md after:opacity-0 group-hover:after:opacity-90 transition-all duration-300'
//           >
//             Success Stories
//           </a>
//         </li>

//         {/* Search Icon */}
//         <li className='cursor-pointer text-md px-4'>
//           <IoIosSearch />
//         </li>

//         {/* Cart Icon */}
//         <Image
//           src='/blogs/shopping-bag.svg'
//           alt='Shopping Bag'
//           width={16}
//           height={16}
//           className=' cursor-pointer, text-white, fill="white"'
//           sizes='(max-width:425px): 1000px,1000px'
//           style={{ width: 'auto', height: 'auto' }}
//         />
//       </div>
//     </section>
//   )
// }



'use client'
import { ROUTES } from '@/libs/routes'
import Image from 'next/image'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { IoIosSearch } from 'react-icons/io'
import NavbarData from '../../../data/Navbar.json'
import HoverableWidget from './HoverableWidget'



type propTypes = {
  activeDropdownIndex: number | null
  setActiveDropdownIndex: (index: number | null) => void
}

export default function Navbar({
  activeDropdownIndex,
  setActiveDropdownIndex
}: propTypes) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  const openMenu = useCallback(
    (index: number) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setActiveDropdownIndex(index)
      setIsHovering(true)
    },
    [setActiveDropdownIndex]
  )

  const closeMenu = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdownIndex(null)
      setIsHovering(false)
    }, 200)
  }, [setActiveDropdownIndex])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isHovering ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isHovering])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {
        isHovering && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-md z-[90]" />
        )
      }
      <section className='fixed top-0 left-0 w-full flex md:justify-center items-center md:pr-4 xl:justify-center h-[90px] bg-transparent z-[100] isolate'>
        {/* Show large logo before scroll */}

        {hasMounted && !isScrolled && (
          <div
            className='absolute w-32 h-20 left-4 top-1 cursor-pointer'
            onClick={() => (window.location.href = ROUTES.HOME)}
          >
            <Image
              src='/blogs/logo_white.png'
              fill
              alt='MacnMan Logo'
              sizes='(max-width: 425px): 500px,700px'
            />
          </div>
        )}

        {/* Navbar Items */}
        <div className='h-10 flex justify-center items-center backdrop-blur-md space-x-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] list-none bg-gray-80 rounded-full px-8'>

          {/* Show small logo after scroll */}
          {hasMounted && isScrolled && (
            <div
              className="flex items-center justify-center gap-5 cursor-pointer h-full"
              onClick={() => (window.location.href = ROUTES.HOME)}
            >
              <div className="relative w-8 mt-1 h-6 flex items-center justify-center">
                <Image
                  src="/blogs/logo_small_red.webp"
                  alt="Small Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[12px] text-gray-400 leading-none flex items-center h-full mr-2.5">|</span>
            </div>
          )}

          {/* Static Store */}
          <li className='text-md group relative'>
            <a
              href='#'
              className='hover:text-black hover:font-semibold 
              after:absolute after:content-[""] 
              after:w-[100%] after:self-center 
              after:-bottom-[3px] after:left-1/2 
              after:-translate-x-1/2 after:h-2 
              after:bg-gradient-to-r 
              after:from-pink-700 after:to-indigo-700 
              after:blur-xl after:opacity-0 
              group-hover:after:opacity-90 
              transition-all duration-300'
            >
              Store
            </a>
          </li>

          {/* Dynamic Items */}
          {NavbarData.map((data, index) => (
            <div
              key={index}
              onMouseEnter={() => openMenu(index)}
              onMouseLeave={closeMenu}
            >
              <p
                className={`cursor-pointer text-md relative px-2 py-1 rounded-md transition-all duration-200 ${activeDropdownIndex === index &&
                  ' after:absolute after:content-[" "] after:w-[90%] after:self-center after:-bottom-[1px] after:left-1/2 after:-translate-x-1/2 after:h-2 after:bg-gradient-to-r after:from-pink-700 after:to-indigo-700 after:[filter:blur(12px)] after:opacity-90 after:rounded-full font-semibold text-black transition after:bg-white'
                  }`}
              >
                {data.NavbarItem}
              </p>

              {activeDropdownIndex === index && (
                <div
                  className={`
                    absolute top-14 left-1/2 -translate-x-1/2 
                    w-[calc(100vw-170px)] z-[200] pb-4 
                    overflow-y-auto shadow-[0_4px_16px_rgba(0,0,0,0.4)] 
                    rounded-3xl backdrop-blur-3xl
                    transition-all duration-300 ease-in-out
                    opacity-100 scale-100
                    animate-dropdown-open
                  `}
                  onMouseEnter={() => openMenu(index)}
                  onMouseLeave={closeMenu}
                >
                  <HoverableWidget
                    HoverableWidgetDetails={data.Details}
                    imageSize={data?.ImageSize ?? 'fit'}
                    navbarItem={data.NavbarItem}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Success Stories */}
          <li className='cursor-pointer text-md group relative'>
            <a
              href={ROUTES.HOME}
              className='hover:text-black hover:font-semibold after:absolute after:content-[""] after:self-center after:w-full after:left-1/2 after:-translate-x-1/2 after:-bottom-[3px] after:h-2 after:bg-gradient-to-r after:from-pink-700 after:to-indigo-700 after:blur-md after:opacity-0 group-hover:after:opacity-90 transition-all duration-300'
            >
              Success Stories
            </a>
          </li>

          {/* Search Icon */}
          <li className='cursor-pointer text-md px-4'>
            <IoIosSearch />
          </li>

          {/* Cart Icon */}
          <Image
            src='/blogs/images/svgs/shopping-bag 1.svg'
            alt='Shopping Bag'
            width={16}
            height={16}
            className=' cursor-pointer'
            sizes='(max-width:425px): 1000px,1000px'
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </section>
    </>
  )
}