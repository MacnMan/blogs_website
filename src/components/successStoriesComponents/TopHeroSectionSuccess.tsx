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
    <section className="relative w-full h-[520px] overflow-hidden">
      {/* Background image */}
      <Image
        src={imageUrl}
        alt={topImage?.image?.alt || topImage?.title || 'Success Story Image'}
        fill
        priority
        className="object-cover w-full h-full"
      />

      {/* Bottom gradient blur overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[34%] backdrop-blur bg-gradient-to-t from-black/10 to-transparent z-10" />

      {/* Text content */}
      <div className="absolute bottom-0 left-5 right-0 p-8 z-20 flex flex-col justify-end">
        {topImage?.title && (
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-3xl drop-shadow-lg">
            {topImage.title}
          </h1>
        )}

        {topImage?.location && (
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white w-fit">
            <MapPin size={18} />
            <span className="text-sm">{topImage.location}</span>
          </div>
        )}
      </div>
    </section>
  );
}
