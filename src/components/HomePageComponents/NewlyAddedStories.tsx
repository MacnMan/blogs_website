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
    <section className="rounded-3xl my-2 px-8 sm:px-4">
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
