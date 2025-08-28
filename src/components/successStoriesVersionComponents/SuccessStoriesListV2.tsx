'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PortableTextBlock } from '@portabletext/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

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
    <section className="mt-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
          Success Stories (V2)
        </h2>
        <Link
          href="/success-stories-v2"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All →
        </Link>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={1200}
        loop={true}
        grabCursor={true}
        pagination={{ clickable: true }}
        className="pb-10"
      >
        {stories.map((story) => (
          <SwiperSlide key={story._id}>
            <Link
              href={`/success-stories-version/${story.slug.current}`}
              className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {story.homeImage?.asset?.url && (
                <div className="relative w-full h-[200px] sm:h-[250px]">
                  <Image
                    src={story.homeImage.asset.url}
                    alt={story.homeImage.alt || story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {story.title}
                </h3>
                <span className="mt-3 text-sm text-blue-600 font-medium group-hover:underline">
                  Read More →
                </span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
