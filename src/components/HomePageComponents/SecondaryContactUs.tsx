import React from 'react'
import { TbMoodSmileBeam } from 'react-icons/tb'
import { LuPhoneCall } from 'react-icons/lu'
import { IoHelpCircleOutline } from 'react-icons/io5'
import { IoLocationOutline } from 'react-icons/io5'
import { FaYoutube } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'
import { IoLogoLinkedin } from 'react-icons/io5'
import { IoSend } from 'react-icons/io5'

function SecondaryContactUs () {
  const randomDigit1 = Math.floor(Math.random() * 10)
  const randomDigit2 = Math.floor(Math.random() * 10)
  const puzzlevalue = randomDigit1 + ' + ' + randomDigit2

  return (
    <section className=' min-h-screen mt-10'>
      {/*  */}
      <div className='mb-8'>
        <p className='text-2xl md:text-3xl font-bold text-center '>
          Let&lsquo;s make it easy - reach out now!
        </p>
      </div>

      <div className='flex flex-row flex-wrap items-center justify-center gap-4 w-full'>
        <div className='border-2 border-gray-300 rounded-md min-w-64 p-4'>
          <TbMoodSmileBeam className='text-5xl text-gray-300 font-thin mb-10 -ml-2' />
          <p className='font-semibold text-xl mb-2'>Contact to sales</p>
          <p className='font-lg mb-2'>Talk to our friendly team</p>
          <p className='text-blue-600'>sales@macnman.com</p>
        </div>
        <div className='border-2 border-gray-300 rounded-md min-w-64 p-4'>
          <LuPhoneCall className='text-5xl text-gray-300 font-thin mb-10 -ml-2' />
          <p className='font-semibold text-xl mb-2'>Call Us</p>
          <p className='font-lg mb-2'>24 x 7 Always On</p>
          <p className='text-blue-600'>+91 7972856163</p>
        </div>
        <div className='border-2 border-gray-300 rounded-md min-w-64 p-4'>
          <IoHelpCircleOutline className='text-5xl text-gray-300 font-thin mb-10 -ml-2' />
          <p className='font-semibold text-xl mb-2'>Contact to Support</p>
          <p className='font-lg mb-2'>We are here to help</p>
          <p className='text-blue-600'>helpdesk@macnman.com</p>
        </div>
        <div className='border-2 border-gray-300 rounded-md min-w-64 p-4'>
          <IoLocationOutline className='text-5xl text-gray-300 font-thin mb-10 -ml-2' />
          <p className='font-semibold text-xl mb-2'>Visit Us</p>
          <p className='font-lg mb-2'>Visit our office HQ</p>
          <p className='text-blue-600'>View on google map</p>
        </div>
      </div>

      {/*  */}

      <div className='max-w-xl lg:max-w-5xl flex flex-col lg:flex-row lg:justify-between lg:items-start lg:gap-6 mx-auto mt-8'>
        <div className='lg:w-2/4 p-2 flex flex-col items-center sm:items-start'>
          <div>
            <p className='text-4xl md:text-5xl font-semibold mb-4 text-center sm:text-start'>
              We are{' '}
              <span className='bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent '>
                always ready
              </span>{' '}
              to help and answer your questions
            </p>
          </div>

          <div className='w-1/2  my-8 '>
            <p className='text-2xl font-semibold mb-4'>Socials</p>
            <div className='flex gap-4 text-3xl '>
              <FaYoutube />
              <FaSquareXTwitter />
              <FaInstagram />
              <IoLogoLinkedin />
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className='lg:w-1/2 p-12 bg-gray-50 rounded-2xl mt-4 lg:mt-0'>
          <p className='text-4xl font-semibold text-start mb-4'>Get in Touch</p>
          <p className='text-gray-400 mb-4'>
            Define your goals and all to value your time
          </p>
          <form className='flex flex-col gap-4 max-w-md mx-auto'>
            <input
              suppressHydrationWarning
              type='text'
              placeholder='Name'
              className='border-b-2 p-2  bg-transparent '
            />
            <input
              suppressHydrationWarning
              type='email'
              placeholder='Email'
              className='border-b-2 p-2 bg-transparent '
            />
            <input
              suppressHydrationWarning
              type='text'
              name='product'
              id='product'
              placeholder='Product'
              className='border-b-2 p-2 bg-transparent '
            />
            <input
              suppressHydrationWarning
              type='text'
              name='company'
              id='company'
              placeholder='Company Name'
              className='border-b-2 p-2 bg-transparent '
            />
            <textarea
              name='message'
              id='message'
              placeholder='Message *'
              className='border-b-2 p-2 bg-transparent'
              rows={4}
            ></textarea>

            <div className='flex flex-row justify-end items-center'>
              <div className='mr-2'>
                <input
                  suppressHydrationWarning
                  type='text'
                  name='puzzle'
                  id='puzzle'
                  value={puzzlevalue}
                  className='w-12 text-center text-gray-400 bg-gray-100 mr-4'
                  readOnly
                />
                <input
                  suppressHydrationWarning
                  type='text'
                  name='puzzleAnswer'
                  id='puzzleAnswer'
                  className='w-12 text-center text-gray-400 bg-gray-100'
                />
              </div>
              <button
                suppressHydrationWarning
                type='submit'
                className='bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors w-1/3 self-end py-2 px-4 flex items-center justify-center gap-2'
              >
                Submit <IoSend className='text-lg' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SecondaryContactUs
