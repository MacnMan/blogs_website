import React from 'react'
import SitemapCard from './SitemapCard'

const sitemapDetails = [
  {
    title: 'Solutions',
    details: [
      {
        heading: 'Smart Industries',
        link: '#'
      },
      {
        heading: 'Smart City',
        link: '#'
      },
      {
        heading: 'Smart Building',
        link: '#'
      },
      {
        heading: 'Smart Agriculture',
        link: '#'
      },
      {
        heading: 'Asset Tracking',
        link: '#'
      },
      {
        heading: 'Smart Parking',
        link: '#'
      }
    ]
  },
  {
    title: 'By Product Series',
    details: [
      {
        heading: 'MacSync Series',
        link: '#'
      },
      {
        heading: 'MacSet Series',
        link: '#'
      },
      {
        heading: 'MiniSync Series',
        link: '#'
      },
      {
        heading: 'Setu Series',
        link: '#'
      },
      {
        heading: 'Controller Series',
        link: '#'
      },
      {
        heading: 'Controller Series',
        link: '#'
      }
    ]
  },
  {
    title: 'By Modules',
    details: [
      {
        heading: 'LoRa Modules',
        link: '#'
      },
      {
        heading: 'LoRa + Ble Modules',
        link: '#'
      },
      {
        heading: 'WiFi + Ble Modules',
        link: '#'
      },
      {
        heading: 'WiFi Modules',
        link: '#'
      },
      {
        heading: 'Ble Modules',
        link: '#'
      },
      {
        heading: 'DevKits',
        link: '#'
      }
    ]
  },
  {
    title: 'About Macnman',
    details: [
      {
        heading: 'Blogs',
        link: '#'
      },
      {
        heading: 'News',
        link: '#'
      },
      {
        heading: 'Privacy Policy',
        link: '#'
      },
      {
        heading: 'Terms & Conditions',
        link: '/#TermsAndConditions'
      },
      {
        heading: 'Cookie Policy',
        link: '#'
      },
      {
        heading: 'Sitemap',
        link: '#'
      }
    ]
  },
  {
    title: 'More about Company',
    details: [
      {
        heading: 'About Us',
        link: '#'
      },
      {
        heading: 'Contact Us',
        link: '/#contact'
      },
      {
        heading: 'Careers',
        link: '#'
      }
    ]
  },
  {
    title: 'Resources',
    details: [
      {
        heading: 'Support / FAQs',
        link: '#'
      },
      {
        heading: 'Resources',
        link: '#'
      },
      {
        heading: 'Success Stories',
        link: '/#Success'
      },
      {
        heading: 'Partners',
        link: '#'
      },
      {
        heading: 'Developer Zone',
        link: '#'
      }
    ]
  }
]

type PropTypes = {
  theme: string;
}

export default function Sitemap({ theme }: PropTypes) {
  return (
    <div className={` ${theme === 'dark' ? 'bg-[#252525]' : 'bg-white'}`}>
    <section className="max-w-xl mx-auto   grid grid-cols-2 min-[425px]:grid-cols-3 md:grid-cols-4  justify-items-center">
      {sitemapDetails.map((item, index) => (
        <SitemapCard
          key={index}
          title={item.title}
          details={item.details}
          theme={theme}
        />
      ))}
    </section>
    </div>
  )
}
