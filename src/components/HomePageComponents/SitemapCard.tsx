import React from 'react'

interface detailsProps {
  heading: string
  link: string
}

interface propTypes {
  title: string
  details: detailsProps[]
  theme: string
}

export default function SitemapCard({ title, details, theme }: propTypes) {
  return (
    <div className={`w-32 mt-10 ${theme === 'dark' ? 'bg-[#252525]' : 'bg-white'}`}>
      <p
        className={`text-[12px] font-medium mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-[#1e1e1e]'
        }`}
      >
        {title}
      </p>

      {details.map((item, index) => (
        <li
          key={index}
          className={`list-none text-[10px] mb-3 ${
            theme === 'dark' ? 'text-[#d1d1d1]' : 'text-[#333333]'
          }`}
        >
          <a
            href={item.link}
            className={`${
              theme === 'dark' ? 'text-[#b0b0b0]' : 'text-[#1e1e1e]'
            } hover:text-[var(--link-hover)] transition-colors duration-200`}
          >
            {item.heading}
          </a>
        </li>
      ))}
    </div>
  )
}
