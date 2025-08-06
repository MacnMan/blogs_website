"use client";
import React, { useCallback, useEffect, useState } from "react";
import SubMenuCard from "./SubMenuCard";
import CardCarousel from "./CardCarousel";
import Image from "next/image";

interface ImagesProps {
  name: string;
  src: string;
  filterTags?: string[]; // 👈 ensure every image in JSON has this
}

interface HoverableWidgetDetailsProps {
  title: string;
  src: string;
  description: string;
  images: ImagesProps[];
}

interface propTypes {
  HoverableWidgetDetails: HoverableWidgetDetailsProps[];
  imageSize?: string;
  navbarItem: string;
}

export default function HoverableWidget({
  HoverableWidgetDetails,
  imageSize,
  navbarItem,
}: propTypes) {
  const FILTERS = [
    "All",
    "LoRaWAN",
    "4G Cellular",
    "WiFi 6",
    "Nb IoT",
    "Gateway",
    "Nodes",
    "Controllers",
  ];

  const [activeTab, setActiveTab] = useState(
    HoverableWidgetDetails[0]?.title || ""
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTabImages, setActiveTabImages] = useState<ImagesProps[]>([]);

  // 🚀 Handles tab switch + resets filter to 'All'
  const onActiveTabChanged = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      const foundTab = HoverableWidgetDetails.find((d) => d.title === tab);
      setActiveTabImages(foundTab?.images || []);
      setActiveFilter("All");
    },
    [HoverableWidgetDetails]
  );

  // ⏱️ Initial mount / tab update
  useEffect(() => {
    onActiveTabChanged(activeTab);
  }, [activeTab, onActiveTabChanged]);

  // 🧠 Filter images by selected tag
  const filteredImages =
    activeFilter === "All"
      ? activeTabImages
      : activeTabImages.filter((img) => img.filterTags?.includes(activeFilter));

  return (
    <section>
      {/* 🔼 Top Tabs */}
      <div className="flex flex-wrap gap-x-10 -gap-y-8 px-8">
        {HoverableWidgetDetails.map((card) => (
          <SubMenuCard
            key={card.title}
            title={card.title}
            src={card.src}
            description={card.description}
            activeTab={activeTab}
            onActiveTabChanged={onActiveTabChanged}
          />
        ))}
      </div>

      {/* 🎯 Filter Buttons (only for Product tab) */}
      {navbarItem === "Product" && (
        <div className="flex flex-wrap gap-6 px-8 mt-4">
          {FILTERS.map((filter) => (
            <label
              key={filter}
              className="flex items-center gap-2 cursor-pointer text-sm"
              onClick={() => setActiveFilter(filter)}
            >
              {/* Always-visible radio button with tick image */}
              <span className="w-4 h-4 relative rounded-full">
                <Image
                  src={
                    activeFilter === filter
                      ? "/images/check-blue.svg"
                      : "/images/check-gray.svg"
                  }
                  alt="tick"
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </span>

              {/* Text - always gray */}
              <span className="text-gray-800 ml-2">{filter}</span>

              {/* Hidden actual input for semantics (optional) */}
              <input
                type="radio"
                name="productFilter"
                value={filter}
                checked={activeFilter === filter}
                onChange={() => setActiveFilter(filter)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      )}

      {/* 🎠 Carousel */}
      {navbarItem !== "Resources" && (
        <CardCarousel images={filteredImages} imageSize={imageSize ?? "fit"} />
      )}
    </section>
  );
}