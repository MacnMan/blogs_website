import Image from 'next/image'
import React from 'react'

type propTypes = {
  src: string
  title: string
  description: string
  contactInfo: string
  theme?: string
}

export default function ContactCard({
  src,
  title,
  description,
  contactInfo,
  theme,
}: propTypes) {
  const isEmail = contactInfo.includes('@')
  const isMap = contactInfo.toLowerCase().includes('view on google map')

  const mapURL =
    'https://www.google.com/maps/search/?api=1&query=MACNMAN,+SHOP-15,+NEW+GAJARA+SOC,+635+1B,+Vaibhav+Society,+Bibwewadi,+Pune,+Maharashtra+411037'

  const emailSubject = encodeURIComponent("Let's Talk")
  const emailBody = encodeURIComponent(
    "Hi Macnman Team,\nI'm interested in your services. Please get in touch with me."
  )

  const isPhone = /^\+?[0-9\s\-()]{7,}$/.test(contactInfo)

  const gmailLink = `https://mail.google.com/mail/?view=cm&to=${contactInfo}&su=${emailSubject}&body=${emailBody}`

  const href = isEmail
    ? gmailLink
    : isMap
    ? mapURL
    : isPhone
    ? `tel:${contactInfo.replace(/\s+/g, '')}`
    : undefined

  return (
    <div
      className={`flex justify-between sm:flex-col sm:items-start border rounded-2xl w-4/5 sm:w-64 pl-6 py-4 pr-4 sm:p-4 ${
        theme === 'dark'
          ? 'border-[var(--dark-gray-color)]'
          : 'border-gray-400'
      }`}
    >
      <div className='relative h-6 md:h-8 aspect-square mb-10 order-2 sm:order-1'>
        <Image
          src={src}
          alt='Icon'
          fill
          sizes='(max-width: 425px): 100px,100px'
        />
      </div>

      <div className='order-1 sm:order-2'>
        <p
          className={`font-medium text-base mb-2 ${
            theme === 'dark' && 'text-white'
          }`}
        >
          {title}
        </p>

        <p
          className={`text-xs mb-2 md:mb-4 ${theme === 'dark' && 'text-white'}`}
        >
          {description}
        </p>

        {isEmail ? (
          <>
            {/* Main mailto link */}
            <a
            target="_blank"
              href={gmailLink}
              className='text-xs text-[var(--link-button)] no-underline hover:opacity-80 block'
            >
              {contactInfo}
            </a>

            {/* Fallback link to open Gmail */}
            
          </>
        ) : href ? (
          <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='text-xs text-[var(--link-button)] no-underline hover:opacity-80'
          >
            {contactInfo}
          </a>
        ) : (
          <p className='text-xs text-[var(--link-button)]'>{contactInfo}</p>
        )}
      </div>
    </div>
  )
}
