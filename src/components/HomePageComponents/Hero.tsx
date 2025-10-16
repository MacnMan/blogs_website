// 'use client'

// import Image from 'next/image';
// import { useEffect, useState } from 'react';

// interface HeroItem {
//   image: string;
//   title: string;
//   subtitle: string;
//   location: string;
// }

// const heroData: HeroItem[] = [
//   {
//     image: '/success-stories/homepagecomponents/sucess.png',
//     title: 'Enhancing Predictive Maintenance with IoT',
//     subtitle: 'A Real-World Success',
//     location: 'Bibwewadi, Pune'
//   },
//   {
//     title: 'Smart Farming Revolution',
//     image: '/success-stories/homepagecomponents/herothree.png',
//     subtitle: 'IoT-Driven Crop Optimization',
//     location: 'Baramati, Pune'
//   },
//   {
//     title: 'Industrial Automation Case Study',
//     image: '/success-stories/homepagecomponents/heroone.png',
//     subtitle: 'Achieving 99% Uptime',
//     location: 'Bibwewadi, Pune'
//   }
// ];

// export default function HeroSection() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % heroData.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative h-[30vh] md:h-[100vh] w-full overflow-hidden bg-white">
//       {heroData.map((item, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-3000 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
//             }`}
//         >
//           <Image
//             src={item.image}
//             alt={item.title}
//             fill
//             unoptimized
//             className="object-cointain"
//             priority
//           />

//           {/* Content */}
//           {/* Content */}
//           <div className="absolute bottom-0 left-0 right-0 z-20">
//             <div className="bg-white/20 backdrop-blur-md rounded-b-2xl p-3 md:p-6 text-black w-full max-w-full">
//               <h1 className="text-sm md:text-5xl font-bold md:leading-tight md:mb-2">
//                 {item.title}
//               </h1>
//               <p className="text-[10px] md:text-xl md:mb-4 mb-2">{item.subtitle}</p>

//               {/* Location with icon & text aligned */}
//               <div className="bg-white/40 backdrop-blur-sm inline-flex items-center gap-1 rounded-full md:px-3 md:py-1 px-2 py-[2px] text-[10px] md:text-sm">
//                 <Image
//                   src="/success-stories/location.svg"
//                   alt="Location icon"
//                   width={16}
//                   height={16}
//                   unoptimized
//                   className="md:w-5 md:h-5 w-4 h-4"
//                 />
//                 <span>{item.location}</span>
//               </div>
//             </div>
//           </div>


//         </div>

//       ))}

//     </section>
//   );
// }


'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HeroItem {
  image: string;
  title: string;
  subtitle: string;
  tag: string[];
  location: string;
}

const heroData: HeroItem[] = [
  {
    image: '/success-stories/homepagecomponents/sucess.png',
    title: 'Enhancing Predictive Maintenance with IoT',
    subtitle: 'A Real-World Success',
    tag: ["Smart City", "Lorawan"],
    location: 'Bibwewadi, Pune'
  },
  {
    title: 'Industrial Automation Case Study',
    image: '/success-stories/homepagecomponents/heroone.png',
    subtitle: 'Achieving 99% Uptime',
    tag: ["Smart City", "Lorawan"],
    location: 'Bibwewadi, Pune'
  },
  {
    title: 'Smart Farming Revolution',
    image: '/success-stories/homepagecomponents/herothree.png',
    subtitle: 'IoT-Driven Crop Optimization',
    tag: ["Smart City", "Lorawan"],
    location: 'Baramati, Pune'
  },
  {
    title: 'Industrial Automation Case Study',
    image: '/success-stories/homepagecomponents/heroone.png',
    subtitle: 'Achieving 99% Uptime',
    tag: ["Smart City", "Lorawan"],
    location: 'Bibwewadi, Pune'
  },
  {
    title: 'Industrial Automation Case Study',
    image: '/success-stories/homepagecomponents/heroone.png',
    subtitle: 'Achieving 99% Uptime',
    tag: ["Smart City", "Lorawan"],
    location: 'Bibwewadi, Pune'
  }
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Auto-play effect
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
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            unoptimized
            className="object-cover"
            priority
          />

          {/* Content Box */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div className="bg-white/20 backdrop-blur-md p-3 md:p-6 text-white w-full max-w-full">
              <h1 className="text-lg md:text-5xl font-bold md:leading-tight md:mb-2">
                {item.title}
              </h1>
              <p className="text-[10px] md:text-xl md:mb-4 mb-2">
                {item.subtitle}
              </p>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-2 text-black">
                {item.tag.map((tag, idx) => (
                  <span key={idx} className="bg-white/40 backdrop-blur-sm inline-flex items-center gap-1 rounded-full px-1 md:px-3 md:py-1 py-[2px] text-[10px] md:text-sm">
                    {tag}
                  </span>
                ))}
                {/* Location */}
                <div className="bg-white/40 backdrop-blur-sm inline-flex items-center gap-1 rounded-full md:px-3 md:py-1 px-1 py-[2px] text-[10px] md:text-sm">
                  <Image
                    src="/success-stories/location.svg"
                    alt="Location icon"
                    width={16}
                    height={16}
                    unoptimized
                    className="md:w-5 md:h-5 w-3 h-3"
                  />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination (clickable + animated) */}
      <div className="absolute bottom-[6px] sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {heroData.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)} // 👈 Jump to clicked slide
            className={`h-1 sm:h-2 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-white w-8 sm:w-10' : 'bg-white w-1 sm:w-2'
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
