'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { urlFor } from '../../../lib/sanityImageUrl';

type TopImageAsset = {
  _ref?: string;
  _id?: string;
  url?: string;
};

type TopImageType = {
  image?: {
    asset?: TopImageAsset;
    alt?: string;
  };
  title?: string;
  location?: string;
};

export default function TopHeroSectionSuccess({ topImage }: { topImage?: TopImageType }) {
  const imageUrl =
    topImage?.image?.asset?.url ||
    (topImage?.image?.asset?._ref ? urlFor(topImage.image).url() : '');

  if (!imageUrl) {
    console.warn('TopHeroSectionSuccess: No valid image URL found.', topImage);
    return null;
  }

  return (
    <section className="md:w-full w-full h-[600px] sm:h-[450px] md:h-[500px] lg:h-[540px] overflow-hidden relative">
  {/* Background image */}
  <Image
    src={imageUrl}
    alt={topImage?.image?.alt || topImage?.title || 'Success Story Image'}
    fill
    priority
    className="object-cover w-full h-full"
  />

  {/* Bottom gradient blur overlay */}
  <div className="absolute bottom-0 left-0 right-0 h-[25%] sm:h-[32%] md:h-[34%] lg:h-[34%] backdrop-blur bg-gradient-to-t from-black/10 to-transparent z-10" />

  {/* Text content */}
  <div className="absolute bottom-0 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 p-4 sm:p-6 md:p-8 z-20 flex flex-col justify-end">
    {topImage?.title && (
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl drop-shadow-lg">
        {topImage.title}
      </h1>
    )}

    {topImage?.location && (
      <div className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-white w-fit text-xs sm:text-sm md:text-base">
        <MapPin size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
        <span>{topImage.location}</span>
      </div>
    )}
  </div>
</section>

  );
}
