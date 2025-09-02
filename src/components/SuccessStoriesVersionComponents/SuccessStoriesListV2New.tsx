'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PortableTextBlock } from '@portabletext/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { useState } from 'react';

type SuccessStoryV2 = {
  _id: string;
  title: string;
  slug: { current: string };
  homeImage?: {
    asset: { url?: string };
    alt?: string;
  };
  body?: PortableTextBlock[];
  category?: string; // ✅ from Sanity schema
};

const FILTERS = [
  { title: "All", value: "all" },
  { title: "Smart Industry", value: "smart-industry" },
  { title: "Smart City", value: "smart-city" },
  { title: "Smart Building", value: "smart-building" },
  { title: "Smart Agriculture", value: "smart-agriculture" },
  { title: "Custom Development", value: "custom-development" },
  { title: "Utilities", value: "utilities" },
];

export default function SuccessStoriesListV2New({ stories }: { stories: SuccessStoryV2[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // ✅ Filter stories
  const filteredStories =
    activeFilter === "all"
      ? stories
      : stories.filter((story) => story.category === activeFilter);

  return (
    <div className="sm:space-y-6 mt-0 px-4 sm:px-6 lg:px-8">
      {/* ✅ Centered Filter Bar */}
      <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className="flex items-center gap-2 text-sm font-medium focus:outline-none"
            >
              <Image
                src={
                  isActive
                    ? "/blogs/images/check-blue.svg"
                    : "/blogs/images/check-gray.svg"
                }
                alt={isActive ? "Selected" : "Unselected"}
                width={14}
                height={14}
              />
              <span
                className={`${
                  isActive
                    ? "text-[#303031] font-semibold"
                    : "text-gray-500"
                }`}
              >
                {filter.title}
              </span>
            </button>
          );
        })}
      </div>

      <h2 className="text-xl sm:text-3xl font-semibold mb-4text-start">
        Success Stories (V2)
      </h2>

      {/* ✅ Stories Carousel */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView="auto"
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={4000}
        loop={true}
        grabCursor={true}
      >
        {filteredStories.map((story) => (
          <SwiperSlide key={story._id} style={{ width: 'auto' }}>
            <Link
              href={`/success-stories-version/${story.slug.current}`}
              className="flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition"
              style={{ width: '90vw', maxWidth: '400px' }}
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
