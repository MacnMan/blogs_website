// // components/StorySections.tsx

// 'use client';

// import Image from 'next/image';
// // import { PortableText } from '@portabletext/react';

// // 🔧 Section with icons and description
// export function Section({ title, description, items }: { title?: string; description?: string; items?: any[] }) {
//   if (!title && !description && !items?.length) return null;

//   return (
//     <section className="mt-10 max-w-8xl mx-auto px-4 text-center">
//       {title && <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">{title}</h2>}
//       {description && <p className="mb-6 text-gray-400 text-base sm:text-[20px] leading-6 tracking-tight">{description}</p>}
//       <ul className="grid grid-cols-1 md:grid-cols-4 gap-2 text-left">
//         {items?.map((item, i) => (
//           <li key={i} className="p-4 my-8">
//             {item.icon?.asset?.url && (
//               <Image src={item.icon.asset.url} alt={item.icon.alt || ''} width={38} height={38} className="mb-2" />
//             )}
//             <h3 className="text-lg font-semibold">{item.title}</h3>
//             <p className="text-gray-500">{item.description}</p>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// // 🔧 Alternate icon section
// export function SectionNew({ title, description, items }: { title?: string; description?: string; items?: any[] }) {
//   if (!title && !description && !items?.length) return null;

//   return (
//     <section className="mt-10 max-w-8xl mx-auto px-4 text-center">
//       {title && <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">{title}</h2>}
//       {description && <p className="mb-10 text-gray-400 text-base sm:text-[18px] leading-6 tracking-tight">{description}</p>}
//       <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
//         {items?.map((item, i) => (
//           <li key={i} className="p-4 border rounded-xl border-gray-400">
//             <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
//             <p className="text-gray-500">{item.description}</p>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// // 🔧 List section with 4 images and grid
// export function ListSection({ title, images = [], items = [] }: { title?: string; images: any[]; items: any[] }) {
//   if (!title && !images.length && !items.length) return null;

//   return (
//     <section className="mt-10">
//       {title && <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>}
//       <div className="grid grid-cols-3 gap-4 w-full mx-auto">
//         {[0, 1].map((i) => (
//           <div key={i} className="col-span-1 row-span-2">
//             {images[i]?.asset?.url && (
//               <Image
//                 src={images[i].asset.url}
//                 alt={images[i].alt || `Image ${i + 1}`}
//                 width={400}
//                 height={600}
//                 className="w-full h-full object-cover rounded-xl"
//               />
//             )}
//           </div>
//         ))}
//         {[2, 3].map((i) => (
//           <div key={i} className="col-span-1">
//             {images[i]?.asset?.url && (
//               <Image
//                 src={images[i].asset.url}
//                 alt={images[i].alt || `Image ${i + 1}`}
//                 width={300}
//                 height={300}
//                 className="w-full object-cover rounded-lg"
//               />
//             )}
//           </div>
//         ))}
//       </div>
//       <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {items.map((c, i) => (
//           <li key={i} className="p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
//             <h2 className="font-semibold text-gray-900 mb-2">{c.title}</h2>
//             <p className="text-gray-500 text-sm leading-relaxed">{c.description}</p>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// // 🔧 List with images + impact list
// export function ListSectionNew({ title, images = [], items = [] }: { title?: string; images: any[]; items: any[] }) {
//   if (!title && !images.length && !items.length) return null;

//   return (
//     <section className="mt-12">
//       {title && <h2 className="text-2xl font-bold mb-10 text-center">{title}</h2>}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
//         <div className="flex flex-wrap gap-4">
//           {images.map((img, i) =>
//             img?.asset?.url ? (
//               <Image
//                 key={i}
//                 src={img.asset.url}
//                 alt={img.alt || title}
//                 width={600}
//                 height={200}
//                 className="rounded-xl shadow-2xl object-contain"
//               />
//             ) : null
//           )}
//         </div>
//         <ul className="space-y-6">
//           {items.map((c, i) => (
//             <li key={i}>
//               <h4 className="font-semibold text-lg text-gray-900 mb-1">{c.title}</h4>
//               <p className="text-sm text-gray-400 leading-relaxed">{c.description}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }

// // 🔧 Simple list component
// export function List({ items, labelField = 'title' }: { items: any[]; labelField?: string }) {
//   return (
//     <ul className="grid grid-cols-1 md:grid-cols-2 gap-12">
//       {items?.map((item, i) => (
//         <li key={i} className="p-4 border border-gray-500 rounded-xl">
//           <h3 className="font-bold mb-3">{item[labelField]}</h3>
//           <p className="text-gray-500">{item.description}</p>
//         </li>
//       ))}
//     </ul>
//   );
// }



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
    <section className="mt-10 max-w-8xl mx-auto px-4 text-center">
      {title && <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">{title}</h2>}
      {description && (
        <p className="mb-6 text-gray-400 text-base sm:text-[20px] leading-6 tracking-tight">{description}</p>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-2 text-left">
        {items?.map((item, i) => (
          <li key={i} className="p-4 my-8">
            {item.icon?.asset?.url && (
              <Image
                src={item.icon.asset.url}
                alt={item.icon.alt || ''}
                width={38}
                height={38}
                className="mb-2"
              />
            )}
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-500">{item.description}</p>
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
      {title && <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">{title}</h2>}
      {description && (
        <p className="mb-10 text-gray-400 text-base sm:text-[18px] leading-6 tracking-tight">{description}</p>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {items?.map((item, i) => (
          <li key={i} className="p-4 border rounded-xl border-gray-400">
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-500">{item.description}</p>
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
    <section className="mt-10">
      {title && <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>}
      <div className="grid grid-cols-3 gap-4 w-full mx-auto">
        {[0, 1].map((i) => (
          <div key={i} className="col-span-1 row-span-2">
            {images[i]?.asset?.url && (
              <Image
                src={images[i].asset.url}
                alt={images[i].alt || `Image ${i + 1}`}
                width={400}
                height={600}
                className="w-full h-full object-cover rounded-xl"
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
      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((c, i) => (
          <li key={i} className="p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-semibold text-gray-900 mb-2">{c.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">{c.description}</p>
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
      {title && <h2 className="text-2xl font-bold mb-10 text-center">{title}</h2>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="flex flex-wrap gap-4">
          {images.map((img, i) =>
            img?.asset?.url ? (
              <Image
                key={i}
                src={img.asset.url}
                alt={img.alt || title || ''}
                width={600}
                height={200}
                className="rounded-xl shadow-2xl object-contain"
              />
            ) : null
          )}
        </div>
        <ul className="space-y-6">
          {items.map((c, i) => (
            <li key={i}>
              <h4 className="font-semibold text-lg text-gray-900 mb-1">{c.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{c.description}</p>
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
  labelField = 'title',
}: {
  items: ListItem[];
  labelField?: keyof ListItem;
}) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {items?.map((item, i) => (
        <li key={i} className="p-4 border border-gray-500 rounded-xl">
          <h3 className="font-bold mb-3">{item[labelField]}</h3>
          <p className="text-gray-500">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
