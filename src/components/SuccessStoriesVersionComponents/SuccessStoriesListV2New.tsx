'use client';

import Link from 'next/link';
import { PortableTextBlock } from '@portabletext/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { useState } from 'react';
import SafeImage from './SafeImage';

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
      {/* ✅ Filter Bar */}
      <div className="mb-[-14px]">
        {/* Mobile: Horizontal scroll but same style as laptop */}
        <div className="flex sm:hidden overflow-x-auto gap-6 pb-2 scrollbar-hide mt-4">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className="flex items-center gap-2 text-sm font-medium flex-shrink-0 focus:outline-none"
              >
                <SafeImage
                  src={
                    isActive
                      ? "/success-stories/images/check-blue.svg"
                      : "/success-stories/images/check-gray.svg"
                  }
                  alt={isActive ? "Selected" : "Unselected"}
                  width={14}
                  height={14}
                />
                <span
                  className={`${isActive ? "text-[#303031] font-semibold" : "text-gray-500"
                    }`}
                >
                  {filter.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop/Laptop: Original filter bar */}
        <div className="hidden sm:flex flex-wrap justify-start items-center gap-6 sm:ml-6">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className="flex items-center gap-2 text-sm font-medium focus:outline-none"
              >
                <SafeImage
                  src={
                    isActive
                      ? "/success-stories/images/check-blue.svg"
                      : "/success-stories/images/check-gray.svg"
                  }
                  alt={isActive ? "Selected" : "Unselected"}
                  width={14}
                  height={14}
                />
                <span
                  className={`${isActive ? "text-[#303031] font-semibold" : "text-gray-500"
                    }`}
                >
                  {filter.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>


      {/* Horizontal line below filters */}
      <div className="border-b border-gray-300 sm:mb-6 mb-6 mt-3 sm:ml-6"></div>


      <h2 className="text-xl sm:text-3xl font-semibold mb-4 text-start">
        Success Stories
      </h2>

      {/* ✅ Stories Carousel */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView="auto" // default for desktop
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={4000}
        loop={true}
        grabCursor={true}
        breakpoints={{
          0: { slidesPerView: 1.5, spaceBetween: 15 }, // mobile: 1.5 cards
          640: { slidesPerView: 2.7, spaceBetween: 20 }, // tablet & desktop: original behavior
        }}
      >
        {filteredStories.map((story) => (
          <SwiperSlide key={story._id} style={{ width: 'auto' }}>
            <Link
              // href={`/success-stories-version/${story.slug.current}`}
              href={`/success-stories-version/${story.slug.current}`}
              className="flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition"
              style={{ width: '90vw', maxWidth: '400px' }}
            >
              {story.homeImage?.asset?.url && (
                <div className="w-full aspect-[16/10] sm:aspect-[16/10] overflow-hidden rounded-3xl">
                  <SafeImage
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
