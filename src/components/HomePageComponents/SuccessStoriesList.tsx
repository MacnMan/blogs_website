'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanityImageUrl';
import { PortableTextBlock } from '@portabletext/react';
import { useEffect, useRef } from 'react';

type successStory = {
  _id: string;
  title: string;
  slug: { current: string };
  introImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  body: PortableTextBlock[];
};

export default function SuccessStoriesList({ stories }: { stories: successStory[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll infinitely
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollStep = 430;
    const interval = setInterval(() => {
      // Scroll one step
      container.scrollBy({ left: scrollStep, behavior: 'smooth' });

      // If we've scrolled halfway through (to the end of the first set), reset instantly
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollTo({ left: 0, behavior: 'auto' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate stories to create a seamless loop
  const loopedStories = [...stories, ...stories];

  return (
    <section className="space-y-6 overflow-x-hidden">
      <h2 className="text-4xl font-bold px-8 mb-10">Success Stories Videos</h2>
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 pb-4 gap-2 px-4 ml-8 scroll-smooth overflow-x-hidden no-scrollbar"
      >
        {loopedStories.map((story, index) => (
          <Link
            key={`${story._id}-${index}`} // key includes index to avoid duplication warning
            href={`/success-stories/${story.slug.current}`}
            className="min-w-[300px] flex-shrink-0 rounded-lg pb-8 shadow-sm transition hover:shadow-md bg-white"
          >
            {story.introImage?.asset && (
              <div className="mb-2">
                <div className="w-[400px] h-[250px] overflow-hidden rounded-3xl">
                  <Image
                    src={urlFor(story.introImage).url()}
                    alt={story.introImage.alt || story.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
              </div>

            )}
            <h3 className="text-md font-semibold hover:underline px-2">{story.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}










// export default function SuccessStoriesList({ stories }: { stories: successStory[] }) {
//   return (
//     <section className="space-x-8 space-y-12 overflow-x-hidden">
//       <h2 className="text-4xl font-bold ml-8">Success Stories Videos</h2>
//       <div className="flex space-x-4 overflow-x-hidden pb-4 gap-2">
//         {stories.map((story) => (
//           <Link
//             key={story._id}
//             href={`/success-stories/${story.slug.current}`}
//             className="min-w-[300px] flex-shrink-0 rounded-lg pb-8 shadow-sm transition hover:shadow-md bg-white"
//           >
//             {story.introImage?.asset && (
//               <div className="mb-2">
//                 <div className="w-[400px] h-[250px] overflow-hidden rounded-md">
//                   <Image
//                     src={urlFor(story.introImage).url()}
//                     alt={story.introImage.alt || story.title}
//                     width={400}
//                     height={250}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//               </div>
//             )}
//             <h3 className="text-md font-semibold hover:underline">{story.title}</h3>
//             {/* {story.overview && <p className="text-sm text-gray-500">{story.overview}</p>} */}
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }



// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';

// type SuccessStory = {
//   _id: string;
//   title: string;
//   slug: { current: string };
//   image?: {
//     asset: {
//       url: string;
//     };
//     alt?: string;
//   };
// };



// export default function SuccessStoriesList({ stories }: { stories: SuccessStory[] }) {
//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">Success Stories</h2>
//       <div className="grid md:grid-cols-3 gap-6">
//         {stories.map((story) => (
//           <div key={story._id} className="border rounded-lg p-4 shadow-md">
//             <Link href={`/success-stories/${story.slug.current}`}>

//               <h3 className="text-lg font-semibold mb-2 hover:underline">{story.title}</h3>

//               {story.image?.asset?.url && (
//                 <Image
//                   src={story.image.asset.url}
//                   alt={story.image.alt || story.title}
//                   width={500}
//                   height={300}
//                   className="rounded-md"
//                 />
//               )}
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }








// const [visiblestorys, setVisiblestorys] = useState(stories); // or any dynamic filtering logic

// return (
//   <>
//     <h2 className="text-2xl font-bold">Success Stories</h2>

//     <div className="space-y-6">
//       {visiblestorys.map((story, index) => (
//         <div key={story._id} className="border rounded-lg p-4">
//           <Link href={`/story/${story.slug.current}`} className="block hover:underline">
//             <h2 className="text-xl font-semibold">{story.title}</h2>
//           </Link>
//           {story.introImage?.asset && (
//             <Image
//               src={urlFor(story.introImage.asset).width(800).height(400).url()}
//               alt={story.introImage.alt || story.title || 'Blog Image'}
//               width={800}
//               height={400}
//               className="rounded-md my-2"
//               priority={index === 0}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   </>
// );







































// return (
//   <section className="space-y-6">
//     <h2 className="text-2xl font-bold">Success Stories</h2>
//     <div className="grid gap-6 md:grid-cols-3">
//       {stories.map((story) => (
//         <Link
//           key={story._id}
//           href={`/success-stories/${story.slug.current}`}
//           className="block border rounded-lg p-4 shadow-md transition hover:shadow-lg hover:border-blue-500"
//           >
//           <h3 className="text-lg font-semibold hover:underline">{story.title}</h3>
//           {story.image?.asset && (
//             <div className="mb-3">
//               <Image
//                 src={urlFor(story.image.asset).width(500).height(300).url()}
//                 alt={story.image.alt || story.title}
//                 width={500}
//                 height={300}
//                 className="rounded-md"
//               />
//             </div>
//           )}
//         </Link>
//       ))}
//     </div>
//   </section>
// );