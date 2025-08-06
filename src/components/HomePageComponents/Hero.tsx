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
    image: '/HomePageComponents/sucess.png',
    title: 'Enhancing Predictive Maintenance with IoT',
    subtitle: 'A Real-World Success',
    location: 'Narhe, Near Pune'
  },
  {
    image: '/HomePageComponents/sucess.png',
    title: 'Smart Farming Revolution',
    subtitle: 'IoT-Driven Crop Optimization',
    location: 'Baramati, Maharashtra'
  },
  {
    image: '/HomePageComponents/sucess.png',
    title: 'Industrial Automation Case Study',
    subtitle: 'Achieving 99% Uptime',
    location: 'Chakan MIDC'
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
    <section className="relative h-[100vh] w-full overflow-hidden bg-white">
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
          <div className="absolute bottom-10 left-10 text-white z-30">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-2">
              {item.title}
            </h1>
            <p className="text-xl mb-4">{item.subtitle}</p>
            <div className="bg-white text-black rounded-full px-4 py-2 inline-block text-sm">
              📍 {item.location}
            </div>
          </div>
        </div>

      ))}

    </section>
  );
}
