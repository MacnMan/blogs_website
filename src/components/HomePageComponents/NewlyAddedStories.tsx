'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanityImageUrl';
import { PortableTextBlock } from '@portabletext/react';

type successStory = {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    introImage?: {
        asset: { _ref: string };
        alt?: string;
    };
    body: PortableTextBlock[];
};

export default function NewlyAddedStories({ stories }: { stories: successStory[] }) {
    // Sort by publishedAt DESC
    const sortedStories = [...stories].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return (
        <section className="my-10 px-8">
            <h2 className="text-4xl font-bold mb-8">Newly Added</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedStories.map((story) => (
                    <Link
                        key={story._id}
                        href={`/success-stories/${story.slug.current}`}
                        className="rounded-t-3xl shadow-sm hover:shadow-md transition bg-white overflow-hidden"
                    >
                        {story.introImage?.asset && (
                            <div className="w-full h-[250px] rounded-t-3xl overflow-hidden">
                                <Image
                                    src={urlFor(story.introImage).width(600).height(250).url()}
                                    alt={story.introImage.alt || story.title}
                                    width={600}
                                    height={250}
                                    className="w-full h-full object-cover rounded-t-3xl"
                                />
                            </div>
                        )}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold hover:underline">{story.title}</h3>
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
                ))}
            </div>
        </section>

    );
}
