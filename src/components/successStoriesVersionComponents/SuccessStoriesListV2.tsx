'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PortableTextBlock } from '@portabletext/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

type SuccessStoryV2 = {
  _id: string;
  title: string;
  slug: { current: string };
  homeImage?: {
    asset: { url?: string };
    alt?: string;
  };
  body?: PortableTextBlock[];
};

export default function SuccessStoriesListV2({ stories }: { stories: SuccessStoryV2[] }) {
  return (
    <div className="sm:space-y-6 mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-3xl font-semibold mb-4 font-sans">
        Success Stories (V2)
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView="auto"
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={4000} // smooth continuous scroll
        loop={true}
        grabCursor={true}
      >
        {stories.map((story) => (
          <SwiperSlide key={story._id} style={{ width: 'auto' }}>
            <Link
              href={`/success-stories-version/${story.slug.current}`}
              className="flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition"
              style={{ width: '90vw', maxWidth: '400px' }} // ✅ same as your ref design
            >
              {story.homeImage?.asset?.url && (
                <div className="w-full h-[150px] sm:h-[250px] overflow-hidden rounded-3xl">
                  <Image
                    src={story.homeImage.asset.url}
                    alt={story.homeImage.alt || story.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-3">
                <h3 className="text-sm sm:text-md font-semibold break-words">
                  {story.title}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
