"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { BlogSuccessPost } from "@/types/typesBlog";
import { useState } from "react";

const FILTERS = [
  { title: "All", value: "all" },
  { title: "Smart Industry", value: "smart-industry" },
  { title: "Smart City", value: "smart-city" },
  { title: "Smart Building", value: "smart-building" },
  { title: "Smart Agriculture", value: "smart-agriculture" },
  { title: "Custom Development", value: "custom-development" },
  { title: "Utilities", value: "utilities" },
];

export default function BlogSuccessStoriesList({ posts }: { posts: BlogSuccessPost[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Filter posts based on active filter
  const filteredPosts =
    activeFilter === "all"
      ? posts
      : posts.filter((post) => post.category === activeFilter);

  return (
    <div className="sm:space-y-6 px-4 sm:px-6 lg:px-8">
      {/* ✅ Filter Bar */}
      <div className="mb-[-14px]">
        {/* Mobile: Horizontal scroll filter bar (same style as desktop) */}
        <div className="flex sm:hidden overflow-x-auto gap-6 pb-2 scrollbar-hide mt-4">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className="flex items-center gap-2 text-sm font-medium flex-shrink-0 focus:outline-none"
              >
                <Image
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
        <div className="hidden sm:flex flex-wrap items-center gap-6 sm:ml-6">
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

      <h2 className="text-xl sm:text-3xl font-semibold mb-4 font-sans">
        Blogs
      </h2>

      {/* ✅ Stories Carousel */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        // slidesPerView={1}
        breakpoints={{
          0: { slidesPerView: 1.5, spaceBetween: 15 }, // mobile: 1.5 cards
          640: { slidesPerView: 2.7, spaceBetween: 20 }, // tablet & desktop: original behavior
        }}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={4000}
        loop={true}
        grabCursor={true}
      >
        {filteredPosts.map((post) => (
          <SwiperSlide key={post._id} style={{ width: "auto" }}>
            <Link
              href={`/blogs/${post.slug.current}`}
              // href={`/blog-success-story/${post.slug.current}`}
              className="flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition"
              style={{ width: "70vw", maxWidth: "300px" }}
            >
              {post.mainImage?.asset?.url && (
                <div className="w-full h-[150px] sm:h-[250px] overflow-hidden rounded-3xl">
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt || post.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-2">
                {/* Title */}
                <h3 className="text-sm sm:text-md font-semibold break-words">
                  {post.title}
                </h3>

                {/* Category */}
                {post.category && (
                  <span className="text-xs text-[#989898] tracking-wide font-medium block mb-1">
                    {post.category
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </span>
                )}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
