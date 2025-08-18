'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HeroItem {
  image: string;
  title: string;
  subtitle: string;
  location: string;
}

const heroData: HeroItem[] = [
  {
    image: '/blogs/homepagecomponents/sucess.png',
    title: 'Enhancing Predictive Maintenance with IoT',
    subtitle: 'A Real-World Success',
    location: 'Bibwewadi, Pune'
  },
  {
    title: 'Smart Farming Revolution',
    image: '/blogs/homepagecomponents/herothree.png',
    subtitle: 'IoT-Driven Crop Optimization',
    location: 'Baramati, Pune'
  },
  {
    title: 'Industrial Automation Case Study',
    image: '/blogs/homepagecomponents/heroone.png',
    subtitle: 'Achieving 99% Uptime',
    location: 'Bibwewadi, Pune'
  }
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[30vh] md:h-[100vh] w-full overflow-hidden bg-white">
      {heroData.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-3000 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cointain"
            priority
          />

          {/* Content */}
          <div className="absolute md:bottom-10 bottom-2 left-5 md:left-10 text-white z-20">
            <h1 className="text-sm md:text-5xl font-bold md:leading-tight md:mb-2">
              {item.title}
            </h1>
            <p className="text-[10px] md:text-xl md:mb-4 mb-2">{item.subtitle}</p>
            {/* Location with icon & text aligned */}
            <div className="bg-white text-black inline-flex items-center gap-1 md:rounded-full md:px-3 md:py-1 px-2 py-[2px] text-[10px] md:text-sm rounded-full w-fit">
              <Image
                src="/blogs/location.svg"
                alt="Location icon"
                width={16}
                height={16}
                className="md:w-5 md:h-5 w-4 h-4"
              />
              <span>{item.location}</span>
            </div>
          </div>
        </div>

      ))}

    </section>
  );
}
