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
    <section id="problem" className="scroll-mt-24 mt-10 sm:mt-14 sm:max-w-8xl sm:mx-auto sm:px-4 sm:mb-10">
      {title && <h2 className="text-2xl sm:text-2xl text-center font-semibold text-gray-800 mb-6">{title}</h2>}
      <div className='px-2 sm:px-16'>
        {description && (
          <p className="text-gray-400 text-md leading-tight sm:leading-snug text-left sm:text-center max-w-3xl mx-auto mb-6">
            {description}
          </p>
        )}
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-1 gap-y-[-4] sm:gap-2 text-left sm:mx-32">
        {items?.map((item, i) => (
          <li key={i} className="p-2 sm:my-8 mb-2">
            {item.icon?.asset?.url && (
              <Image
                src={item.icon.asset.url}
                alt={item.icon.alt || ''}
                width={28}
                height={28}
                className="mb-4 sm:mb-6"
              />
            )}
            <h3 className="text-lg font-semibold mb-4 sm:leading-[16px] leading-[18px] tracking-tight ">{item.title}</h3>
            <p className="text-gray-400 sm:text-[15px] leading-tight sm:leading-tight tracking-tight">
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
    <section id="solution" className="scroll-mt-24 mt-10 max-w-8xl mx-auto sm:px-4">
      {title && <h2 className="text-2xl text-center sm:text-2xl font-semibold sm:tracking-tighter text-gray-800 mb-6">{title}</h2>}
      <div className='px-1 sm:px-16'>
        {description && (
          <p className="text-gray-400 text-md leading-tight sm:leading-snug text-left sm:text-center max-w-3xl mx-auto mb-6">
            {description}
          </p>
        )}
      </div>
      <ul className="grid grid-cols-2 gap-x-4  gap-y-1 md:grid-cols-3 sm:gap-y-5 sm:gap-x-7 sm:text-left sm:mx-44">
        {items?.map((item, i) => (
          <li key={i} className="p-2 sm:p-4 mt-2 border rounded-xl border-gray-200 ">
            <h3 className="sm:text-md font-semibold sm:mb-2 text-left leading-[18px] mb-4 mt-2">{item.title}</h3>
            <p className="text-gray-400 font-[6px] leading-[16px] sm:tracking-[.1px] sm:leading-[16px] text-left">{item.description}</p>
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
    <section id="challenges" className="scroll-mt-24 sm:m-20 mt-10 ">
      {title && <h2 className="text-2xl text-gray-800 font-semibold text-center sm:mb-8 mb-4">{title}</h2>}
      <div className="grid sm:grid-cols-3 gap-4 sm:gap-4 sm:w-full sm:mx-auto z-30">
        {[0, 1].map((i) => (
          <div key={i} className="col-span-1 row-span-2 z-30">
            {images[i]?.asset?.url && (
              <Image
                src={images[i].asset.url}
                alt={images[i].alt || `Image ${i + 1}`}
                width={400}
                height={600}
                className="sm:w-full sm:h-full object-cover sm:rounded-4xl rounded-3xl"
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
                className="w-full object-cover sm:rounded-4xl rounded-4xl"
              />
            )}
          </div>
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-4 mt-4 sm:mt-8 sm:mx-16 sm:grid-cols-2 lg:grid-cols-3 sm:gap-7 sm:gap-y-5">
        {items.map((c, i) => (
          <li key={i} className="p-3 sm:p-5 border border-gray-200 rounded-xl shadow-sm transition-shadow">
            <h2 className="font-semibold text-gray-900 sm:mb-4 sm:mt-2 mb-2 leading-[18px] ">{c.title}</h2>
            <p className="text-gray-400 text-sm tracking-[0.1px] leading-[18px] sm:leading-[16px] sm:tracking-[0.4px]">{c.description}</p>
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
    <section id="impact" className="scroll-mt-24 sm:mt-12 mt-6">
      {title && (
        <h2 className="text-2xl text-gray-800 font-semibold sm:mb-4 sm:mt-4 text-center">{title}</h2>
      )}

      <div className="flex flex-col lg:flex-row sm:gap-14 sm:mx-4 lg:mx-20">
        {/* Image Grid */}
        <div className="flex flex-wrap sm:gap-4 sm:flex-[3]">
          {images.map((img, i) =>
            img?.asset?.url ? (
              <Image
                key={i}
                src={img.asset.url}
                alt={img.alt || title || ''}
                width={900}
                height={500}
                className="rounded-xl object-contain w-full sm:my-8 my-4 sm:h-[500px] max-w-[100%]"
              />
            ) : null
          )}
        </div>

        {/* Text Column */}
        <ul className="space-y-6 flex-[2] self-center">
          {items.map((c, i) => (
            <li key={i}>
              <h4 className="font-semibold text-lg text-gray-900 sm:mb-3">
                {c.title}
              </h4>
              <p className="text-sm text-gray-400 leading-[18px] tracking-[0.1px] sm:leading-[16px] sm:tracking-[0.4px]">
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
          <h3 className="text-md font-semibold mb-2 sm:tracking-[.1px] tracking-[.1px]">{item.title}</h3>
          <p className="text-gray-400 sm:font-[6px] tracking-tight leading-tight sm:tracking-[.1px] sm:leading-[16px]">{item.description}</p>
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
    <ul className="grid grid-cols-2 md:grid-cols-2 sm:gap-y-3 sm:gap-x-24 text-left sm:mx-44 sm:mt-8">
      {items?.map((item, i) => (
        <li key={i} className="p-4 mt-2 rounded-x">
          <h3 className="text-md font-semibold mb-3">{item.title}</h3>
          <p className="text-gray-400 font-[6px] tracking-[.1px] leading-[18px]">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}