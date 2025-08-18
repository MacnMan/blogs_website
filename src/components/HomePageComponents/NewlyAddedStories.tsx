"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableTextBlock } from "@portabletext/react";
import { groq } from "next-sanity";

// ✅ GROQ query to fetch latest 5 success stories
export const newlyAddedQuery = groq`
  *[_type == "successStory"] | order(publishedAt desc)[0...5] {
    _id,
    title,
    slug {
      current
    },
    "publishedAt": coalesce(publishedAt, _createdAt),
    "category": coalesce(category, "uncategorized"),
    homeImage {
      asset->{
        _id,
        url
      },
      alt
    },
    body
  }
`;

// ✅ TypeScript type
type SuccessStory = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category: string;
  homeImage?: {
    asset: { _id: string; url: string };
    alt?: string;
  };
  body: PortableTextBlock[];
};

// ✅ Utility: format dates consistently
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function NewlyAddedStories({ stories }: { stories: SuccessStory[] }) {
  const sortedStories = [...stories].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <section className="rounded-3xl my-2 px-8">
      <h2 className="sm:text-3xl text-xl font-semibold sm:mb-8 mb-4">Newly Added</h2>

      <div className="md:gap-6 gap-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
        {sortedStories.map((story) => (
          <Link
            key={story._id}
            href={`/success-stories/${story.slug.current}`}
            className="rounded-xl sm:rounded-3xl shadow-sm transition bg-gray-100 overflow-hidden"
          >
            {/* ✅ Image */}
            {story.homeImage?.asset && (
              <div className="w-full h-[150px] sm:h-[230px] relative overflow-hidden">
                <Image
                  src={story.homeImage.asset.url}
                  alt={story.homeImage.alt || story.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* ✅ Text Content */}
            <div className="p-2 sm:p-4">
              <h3 className="text-[12px] sm:text-sm font-semibold">{story.title}</h3>

              {/* ✅ Category + Date on the same line */}
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs capitalize text-gray-600">
                  {story.category ? story.category.replace(/-/g, " ") : "No category"}
                </p>
                <p className="text-xs text-gray-500">
                  {story.publishedAt ? formatDate(story.publishedAt) : "No date"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}



// src/components/HomePageComponents/NewlyAdded.tsx

// "use client";

// import { useEffect, useState } from "react";
// import { sanityClient } from "../../../lib/sanity.client";
// import { groq } from "next-sanity";
// import Link from "next/link";
// import Image from "next/image";

// const query = groq`
//   *[_type == "successStory"] | order(publishedAt desc)[0...4] {
//     title,
//     slug,
//     category,
//     publishedAt,
//     topImage {
//       image {
//         asset->{
//           url
//         },
//         alt
//       },
//       title
//     }
//   }
// `;

// type Story = {
//   title: string;
//   slug: { current: string };
//   category?: string;
//   publishedAt?: string;
//   topImage?: {
//     image?: { asset?: { url: string } };
//     alt?: string;
//     title?: string;
//   };
// };

// export default function NewlyAdded() {
//   const [stories, setStories] = useState<Story[]>([]);

//   useEffect(() => {
//     const fetchStories = async () => {
//       const data: Story[] = await sanityClient.fetch(query);
//       setStories(data);
//     };
//     fetchStories();
//   }, []);

//   return (
//     <section className="my-12">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//         Newly Added Stories
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stories.map((story, idx) => (
//           <Link
//             key={idx}
//             href={`/success-stories/${story.slug.current}`}
//             className="block bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden"
//           >
//             {story.topImage?.image?.asset?.url && (
//               <Image
//                 src={story.topImage.image.asset.url}
//                 alt={story.topImage.alt || story.title}
//                 width={400}
//                 height={250}
//                 className="w-full h-48 object-cover"
//               />
//             )}
//             <div className="p-4">
//               {/* Title */}
//               <h3 className="text-lg font-semibold text-gray-700 line-clamp-2">
//                 {story.title}
//               </h3>

//               {/* Category */}
//               {story.category && (
//                 <p className="text-xs mt-2 capitalize text-blue-600">
//                   {story.category.replace(/-/g, " ")}
//                 </p>
//               )}

//               {/* Published Date */}
//               {story.publishedAt && (
//                 <p className="text-xs text-gray-500 mt-1">
//                   {new Date(story.publishedAt).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </p>
//               )}
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }
