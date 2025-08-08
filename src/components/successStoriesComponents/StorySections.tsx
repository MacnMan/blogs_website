// components/StorySections.tsx

'use client';

import Image from 'next/image';
import { SectionItem, GridImage, ListItem } from '@/types/types';

// 🔧 Section with icons and description
export function Section({
  title,
  description,
  items,
}: {
  title?: string;
  description?: string;
  items?: SectionItem[];
}) {
  if (!title && !description && !items?.length) return null;

  return (
    <section className="mt-14 max-w-8xl mx-auto px-4 text-center mb-20">
      {title && <h2 className="text-2xl sm:text-2xl font-semibold text-gray-800 mb-6">{title}</h2>}
      <div className='px-16 left-4 right-4'>
        {description && (
          <p className="mb-6 px-52 text-gray-400 text-center sm:text-[15px] leading-[16px] tracking-[0.4px]">{description}</p>
        )}
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-2 text-left mx-32">
        {items?.map((item, i) => (
          <li key={i} className="p-4 my-8">
            {item.icon?.asset?.url && (
              <Image
                src={item.icon.asset.url}
                alt={item.icon.alt || ''}
                width={28}
                height={28}
                className="mb-6"
              />
            )}
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400 sm:text-[15px] leading-tight tracking-tight">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// 🔧 Alternate icon section
export function SectionNew({
  title,
  description,
  items,
}: {
  title?: string;
  description?: string;
  items?: SectionItem[];
}) {
  if (!title && !description && !items?.length) return null;

  return (
    <section className="mt-10 max-w-8xl mx-auto px-4 text-center">
      {title && <h2 className="text-2xl sm:text-2xl font-semibold tracking-tighter text-gray-800 mb-6">{title}</h2>}
      <div className='px-16 left-4 right-4'>
        {description && (
          <p className="mb-14 px-52 text-gray-400 text-center sm:text-[15px] leading-[16px] tracking-[0.4px]">{description}</p>
        )}
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-7 text-left mx-44">
        {items?.map((item, i) => (
          <li key={i} className="p-4 mt-2 border rounded-xl border-gray-400 ">
            <h3 className="text-md font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400 font-[6px] tracking-[.1px] leading-[16px]">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// 🔧 List section with 4 images and grid
export function ListSection({
  title,
  images = [],
  items = [],
}: {
  title?: string;
  images: GridImage[];
  items: ListItem[];
}) {
  if (!title && !images.length && !items.length) return null;

  return (
    <section className="m-20">
      {title && <h2 className="text-2xl text-gray-800 font-semibold  text-center mb-8">{title}</h2>}
      <div className="grid grid-cols-3 gap-4 w-full mx-auto">
        {[0, 1].map((i) => (
          <div key={i} className="col-span-1 row-span-2">
            {images[i]?.asset?.url && (
              <Image
                src={images[i].asset.url}
                alt={images[i].alt || `Image ${i + 1}`}
                width={400}
                height={600}
                className="w-full h-full object-cover rounded-4xl"
              />
            )}
          </div>
        ))}
        {[2, 3].map((i) => (
          <div key={i} className="col-span-1">
            {images[i]?.asset?.url && (
              <Image
                src={images[i].asset.url}
                alt={images[i].alt || `Image ${i + 1}`}
                width={300}
                height={300}
                className="w-full object-cover rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
      <ul className="mt-8 mx-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-5">
        {items.map((c, i) => (
          <li key={i} className="p-5 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-semibold text-gray-900 mb-4 mt-2">{c.title}</h2>
            <p className="text-gray-400 text-sm leading-[16px] tracking-[0.4px]]">{c.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// 🔧 List with images + impact list
export function ListSectionNew({
  title,
  images = [],
  items = [],
}: {
  title?: string;
  images: GridImage[];
  items: ListItem[];
}) {
  if (!title && !images.length && !items.length) return null;

  return (
    <section className="mt-12">
      {title && (
        <h2 className="text-2xl text-gray-800 font-semibold mb-20 mt-16 text-center">{title}</h2>
      )}

      <div className="flex flex-col lg:flex-row gap-14 mx-4 lg:mx-20">
        {/* Image Grid */}
        <div className="flex flex-wrap gap-4 flex-[3]">
          {images.map((img, i) =>
            img?.asset?.url ? (
              <Image
                key={i}
                src={img.asset.url}
                alt={img.alt || title || ''}
                width={900}
                height={500}
                className="rounded-xl shadow-2xl object-contain w-full h-[500px] max-w-[100%]"
              />
            ) : null
          )}
        </div>

        {/* Text Column */}
        <ul className="space-y-6 flex-[2] self-center">
          {items.map((c, i) => (
            <li key={i}>
              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                {c.title}
              </h4>
              <p className="text-sm text-gray-400 leading-[16px] tracking-[0.4px]">
                {c.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}




// 🔧 Simple list component
export function List({
  items,
  // labelField = 'title',
}: {
  items: ListItem[];
  labelField?: keyof ListItem;
}) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-7 text-left mx-44">
      {items?.map((item, i) => (
        <li key={i} className="p-4 mt-2 border rounded-xl border-gray-400 ">
          <h3 className="text-md font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-400 font-[6px] tracking-[.1px] leading-[16px]">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}



export function ListNew({
  items,
  // labelField = 'title',
}: {
  items: ListItem[];
  labelField?: keyof ListItem;
}) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-24 text-left mx-44 mt-8">
      {items?.map((item, i) => (
        <li key={i} className="p-4 mt-2 rounded-x">
          <h3 className="text-md font-semibold mb-3">{item.title}</h3>
          <p className="text-gray-400 font-[6px] tracking-[.1px] leading-[18px]">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}