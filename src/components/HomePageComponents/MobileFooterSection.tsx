import Image from 'next/image'
import React from 'react'
import { FaInstagram, FaSquareXTwitter, FaYoutube } from 'react-icons/fa6'
import { IoLogoLinkedin } from 'react-icons/io5'

export default function MobileFooterSection () {
  return (
    <div className='md:hidden'>
      {/* <div className='relative w-full h-96 bg-[#fafafa] mx-auto '>
        <Image
          src='/success-stories/images/mobile-footer-image.svg'
          alt='Icon'
          fill
          className='object-fill h-full w-60'
          sizes='(max-width: 425px): 100px,100px'
        />
      </div> */}

      <div className='text-[26px] font-bold text-center my-6'>
        <span className='bg-gradient-to-r from-[var(--gradient-pink)] to-[var(--gradient-blue)] text-transparent bg-clip-text'>
          Got an IoT idea?{' '}
        </span>
        <p className='text-[#333333] -mt-2'>Let’s bring it to life!</p>
      </div>

      <div className='px-6'>
        <form
          action=''
          className='flex flex-col  gap-y-4 text-[13px] bg-[#F3F3F5] rounded-3xl p-8'
        >
          <input
            type='text'
            placeholder='Your name'
            className='w-full bg-[#E6E6E6] placeholder-[var(--text-color-secondary)] rounded-full h-10 px-6 focus:outline-black'
            suppressHydrationWarning
          />
          <input
            type='email'
            placeholder='Company Email address'
            className='w-full bg-[#E6E6E6] placeholder-[var(--text-color-secondary)] rounded-full h-10 px-6 focus:outline-black'
            suppressHydrationWarning
          />
          <input
            type='text'
            placeholder='Company name'
            className='w-full bg-[#E6E6E6] placeholder-[var(--text-color-secondary)] rounded-full h-10 px-6 focus:outline-black'
            suppressHydrationWarning
          />

          <div className='relative'>
            <input
              type='number'
              placeholder='Mobile number'
              className='w-full bg-[#E6E6E6] placeholder-[var(--text-color-secondary)] rounded-full h-10 px-6 focus:outline-black'
              suppressHydrationWarning
            />
            <Image
              src='/success-stories/images/india-flag.png'
              alt='flag image'
              width={20}
              height={30}
              className='absolute right-4 top-1/2 -translate-y-1/2'
            />
          </div>

          <textarea
            name=''
            id=''
            rows={7}
            className='w-full bg-[#E6E6E6] placeholder-[var(--text-color-secondary)] rounded-2xl py-4 px-6 focus:outline-black'
            placeholder='How can we help ?'
            suppressHydrationWarning
          ></textarea>

          <div className='px-4'>
            <div className='flex items-center gap-x-2 mb-2'>
              <input
                type='checkbox'
                id='policy'
                className='h-4 w-4 rounded-[4px] bg-[#E6E6E6] checked:bg-current accent-[#E6E6E6] appearance-none checked:appearance-auto border focus:outline-black'
              />
              <label
                htmlFor='policy'
                className='text-[var(--text-color-secondary)]'
              >
                I accept the{' '}
                <a href='#' className='text-[var(--link-button)]'>
                  privacy policy
                </a>
              </label>
            </div>

            <div className='flex items-center gap-x-2'>
              <input
                type='checkbox'
                id='subscribe'
                className='h-4 w-4 rounded-[4px] bg-[#E6E6E6] checked:bg-current accent-[#E6E6E6] appearance-none checked:appearance-auto border '
              />
              <label
                htmlFor='subscribe'
                className='text-[var(--text-color-secondary)]'
              >
                I like marketing emails from Macnman
              </label>
            </div>
          </div>

          <button
            type='submit'
            className='w-40 h-10 mx-auto mt-6 rounded-full bg-gradient-to-r from-[var(--gradient-pink)] to-[var(--gradient-blue)] text-base font-medium text-white'
            suppressHydrationWarning
          >
            Send
          </button>
        </form>

        <div className='text-[26px] font-bold text-center my-6'>
          <p className='text-[var(--heading-gray-color)]'>
            We are always ready
          </p>
          <p className='text-[var(--text-color-primary)]'>
            to answer your questions
          </p>
        </div>

        {/* Icons */}
        <div className='w-1/2 mx-auto text-center '>
          <p className={`text-xl font-semibold mb-4 `}>Socials</p>
          <div className={`flex gap-4 text-3xl  `}>
            <FaYoutube />
            <FaSquareXTwitter />
            <FaInstagram />
            <IoLogoLinkedin />
          </div>
        </div>
      </div>

      <div className='bg-[#F3F3F5] w-[85%] mx-auto rounded-3xl p-6 text-[22px] my-6 font-semibold'>
        <p>LoRaWAN</p>
        <p>4G IoT</p>
        <p>WiFi Ble IoT</p>
        <p>Nb IoT</p>
        <p>Customize</p>
        <p>Maya</p>
        <p>Documentation</p>
        <p>Case Studies</p>
        <p>Blogs</p>
      </div>

      <div className='bg-[#F3F3F5] px-6 py-4 text-[var(--text-color-secondary)] text-[8px] flex flex-col gap-y-2'>
        <p>
          Our IoT products, solutions, and services are intended for business
          and industrial applications. Unauthorized use is strictly prohibited.
        </p>
        <p>
          You must not use our website or services for any illegal or
          unauthorized purposes.
        </p>
        <p>
          We reserve the right to modify or discontinue any service without
          prior notice.
        </p>
        <p>
          All content, trademarks, logos, and product designs displayed on our
          website are the intellectual property of Macnman Technologies Pvt Ltd.
        </p>
        <p>
          Any unauthorized reproduction, distribution, or commercial use of our
          materials is strictly prohibited.
        </p>
        <p>
          Our products come with a limited warranty against manufacturing
          defects. The warranty terms will be provided with the product.
        </p>
      </div>
    </div>
  )
}
