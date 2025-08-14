// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { urlFor } from '../../../lib/sanityImageUrl';
// import { PortableTextBlock } from '@portabletext/react';
// import { useEffect, useRef } from 'react';

// type successStory = {
//   _id: string;
//   title: string;
//   slug: { current: string };
//   homeImage?: {
//     asset: {
//       _ref: string;
//     };
//     alt?: string;
//   };
//   body: PortableTextBlock[];
// };

// export default function SuccessStoriesList({ stories }: { stories: successStory[] }) {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const animationFrameId = useRef<number | null>(null);

//   // Auto-scroll seamlessly
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const speed = 0.5; // pixels per frame

//     const animate = () => {
//       if (!container) return;

//       container.scrollLeft += speed;

//       // If we've reached halfway, reset to start smoothly
//       if (container.scrollLeft >= container.scrollWidth / 2) {
//         container.scrollLeft = 0;
//       }

//       animationFrameId.current = requestAnimationFrame(animate);
//     };

//     animationFrameId.current = requestAnimationFrame(animate);

//     return () => {
//       if (animationFrameId.current) {
//         cancelAnimationFrame(animationFrameId.current);
//       }
//     };
//   }, []);

//   // Drag scroll support
//   // Duplicate stories more for smooth loop
//   const loopedStories = [...stories, ...stories, ...stories];

//   const scrollRef = useRef<HTMLDivElement>(null);
//   const positionRef = useRef(0);

//   useEffect(() => {
//     const speed = 0.5; // pixels per frame

//     const animate = () => {
//       if (scrollRef.current) {
//         positionRef.current -= speed;
//         // Reset position when it's scrolled one full set
//         const totalWidth = scrollRef.current.scrollWidth / 3; // since we tripled
//         if (Math.abs(positionRef.current) >= totalWidth) {
//           positionRef.current = 0;
//         }
//         scrollRef.current.style.transform = `translateX(${positionRef.current}px)`;
//       }
//       requestAnimationFrame(animate);
//     };

//     requestAnimationFrame(animate);
//   }, []);

//   // Duplicate stories for infinite loop
//   // const loopedStories = [...stories, ...stories];

//   return (
//     <section className="sm:space-y-6 ml-10 overflow-x-hidden mt-4">
//       <h2 className="sm:text-3xl text-xl font-semibold mb-4 sm:ml-4 font-sans">Success Stories Videos</h2>
//       <div
//         ref={scrollContainerRef}
//         className="flex space-x-4 sm:gap-3  overflow-x-hidden no-scrollbar cursor-grab"
//       >
//         {loopedStories.map((story, index) => (
//           <Link
//             key={`${story._id}-${index}`}
//             href={`/success-stories/${story.slug.current}`}
//             className="sm:w-[320px] w-[200px] flex-shrink-0 transition bg-white overflow-hidden"
//           >
//             {story.homeImage?.asset && (
//               <div className="mb-2">
//                 <div className="sm:w-[320px] w-[200px] sm:h-[230px] h-[130px] overflow-hidden rounded-xl sm:rounded-4xl">
//                   <Image
//                     src={urlFor(story.homeImage).url()}
//                     alt={story.homeImage.alt || story.title}
//                     width={320}
//                     height={230}
//                     className="sm:w-full sm:h-full object-cover sm:rounded-4xl"
//                   />
//                 </div>
//               </div>
//             )}
//             <div className="p-2">
//               <h3 className="sm:text-md text-sm font-semibold break-words whitespace-normal">
//                 {story.title}
//               </h3>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }


'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../../lib/sanityImageUrl';
import { PortableTextBlock } from '@portabletext/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

type successStory = {
  _id: string;
  title: string;
  slug: { current: string };
  homeImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  body: PortableTextBlock[];
};

export default function SuccessStoriesList({ stories }: { stories: successStory[] }) {
  return (
    <section className="sm:space-y-6 ml-10 overflow-x-hidden mt-4">
      <h2 className="sm:text-3xl text-xl font-semibold mb-4 sm:ml-4 font-sans">
        Success Stories Videos
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={16} // matches sm:gap-3
        slidesPerView="auto"
        autoplay={{
          delay: 0, // continuous
          disableOnInteraction: false,
        }}
        speed={4000} // smooth speed
        loop={true}
        grabCursor={true}
      >
        {stories.map((story) => (
          <SwiperSlide
            key={story._id}
            style={{ width: 'auto' }} // keep Tailwind card sizes
          >
            <Link
              href={`/success-stories/${story.slug.current}`}
              className="sm:w-[320px] w-[200px] flex-shrink-0 transition bg-white overflow-hidden"
            >
              {story.homeImage?.asset && (
                <div className="mb-2">
                  <div className="sm:w-[320px] w-[200px] sm:h-[230px] h-[130px] overflow-hidden rounded-xl sm:rounded-4xl">
                    <Image
                      src={urlFor(story.homeImage).url()}
                      alt={story.homeImage.alt || story.title}
                      width={320}
                      height={230}
                      className="sm:w-full sm:h-full object-cover sm:rounded-4xl"
                    />
                  </div>
                </div>
              )}
              <div className="p-2">
                <h3 className="sm:text-md text-sm font-semibold break-words whitespace-normal">
                  {story.title}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
