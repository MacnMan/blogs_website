// components/BlogList.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PortableTextBlock } from '@portabletext/types';
import { useState } from 'react';

type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: {
    asset: { url: string };
    alt?: string;
  };
  body: PortableTextBlock[];
};

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [visiblePosts] = useState(posts); // or any dynamic filtering logic

  return (
    <div className="space-y-6">
      {visiblePosts.map((post, index) => (
        <div key={post._id} className="border rounded-lg p-4">
          <Link href={`/post/${post.slug.current}`} className="block hover:underline">
            <h2 className="text-xl font-semibold">{post.title}</h2>
          </Link>
          {post.mainImage?.asset?.url && (
            <Image
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt || post.title || 'Blog Image'}
              width={800}
              height={400}
              className="rounded-md my-2"
              priority={index === 0}
            />
          )}
        </div>
      ))}
    </div>
  );
}
