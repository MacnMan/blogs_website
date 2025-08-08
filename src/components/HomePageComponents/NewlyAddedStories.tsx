'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../.../../../../lib/sanityImageUrl';
import { PortableTextBlock } from '@portabletext/react';
import { groq } from 'next-sanity';

// GROQ query to fetch latest 5 success stories
export const newlyAddedQuery = groq`
  *[
    _type == "successStory" &&
    defined(publishedAt) &&
    defined(category)
  ] | order(publishedAt desc)[0...5] {
    _id,
    title,
    slug {
      current
    },
    publishedAt,
    category,
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


// TypeScript type based on GROQ structure
type successStory = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  category?:
    | 'smart-industry'
    | 'smart-city'
    | 'smart-building'
    | 'smart-agriculture'
    | 'custom-development'
    | 'utilities';
  homeImage?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  body: PortableTextBlock[];
};

export default function NewlyAddedStories({ stories }: { stories: successStory[] }) {
  // Optional local sort (in case backend ordering fails)
  const sortedStories = [...stories].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <section className="rounded-3xl my-2 px-8">
      <h2 className="text-3xl font-semibold mb-8">Newly Added</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedStories.map((story) => {
          console.log('Story:', {
            title: story.title,
            category: story.category,
            publishedAt: story.publishedAt,
          });

          return (
            <Link
              key={story._id}
              href={`/success-stories/${story.slug.current}`}
              className="w-[250px] rounded-3xl shadow-sm transition bg-gray-100 overflow-hidden"
            >
              {story.homeImage?.asset && (
                <div className="w-[250px] h-[230px] relative overflow-hidden">
                  <Image
                    src={story.homeImage.asset.url}
                    alt={story.homeImage.alt || story.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-sm font-semibold">{story.title}</h3>
                {story.category ? (
                  <p className="text-xs text-blue-600 mt-1 capitalize">
                    {story.category.replace('-', ' ')}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 mt-1 italic">No category</p>
                )}
                {story.publishedAt && (
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(story.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
