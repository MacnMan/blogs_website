// // app/page.tsx
// // 'use client'

// import { sanityClient } from '../../lib/sanity.client';
// import { blogPostsQuery } from '../../lib/queries';
// import Image from 'next/image';
// import Link from 'next/link';
// import { PortableTextBlock } from '@portabletext/types';
// import Hero from '@/components/HomePageComponents/Hero';
// import Navbar from '@/components/HomePageComponents/NavbarComponents/Navbar';
// import { useState } from 'react';

// type BlogPost = {
//   _id: string;
//   title: string;
//   slug: { current: string };
//   mainImage?: {
//     asset: { url: string };
//     alt?: string;
//   };
//   body: PortableTextBlock[];
// };

// export default async function HomePage() {
//   const posts: BlogPost[] = await sanityClient.fetch(blogPostsQuery);
//   const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null)

//   return (
//     <>
//        <Navbar
//         activeDropdownIndex={activeDropdownIndex}
//         setActiveDropdownIndex={setActiveDropdownIndex}
//       />
//       <Hero />
//       <main className="p-8">
//         <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
//         <div className="space-y-6">
//           {posts.map((post, index) => (
//             <div key={post._id} className="border rounded-lg p-4">
//               <Link href={`/post/${post.slug.current}`} className="block hover:underline">
//                 <h2 className="text-xl font-semibold">{post.title}</h2>
//               </Link>
//               {post.mainImage?.asset?.url && (
//                 <Image
//                   src={post.mainImage.asset.url}
//                   alt={post.mainImage.alt || post.title || 'Blog Image'}
//                   width={800}
//                   height={400}
//                   className="rounded-md my-2"
//                   priority={index === 0}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </main>
//     </>
//   );
// }


// app/page.tsx

import { sanityClient } from '@/lib/sanity.client';
// import { blogPostsQuery } from '@/lib/queries';
import { successStoriesQuery } from '@/lib/queries';
import Hero from '@/components/HomePageComponents/Hero';
// import BlogList from '@/components/HomePageComponents/BlogList';
// import { PortableTextBlock } from '@portabletext/types';
import NavbarWrapper from '@/components/HomePageComponents/NavbarWrapper';
import SuccessStoriesList from '@/components/HomePageComponents/SuccessStoriesList';
import NewlyAddedStories from '@/components/HomePageComponents/NewlyAddedStories';
import MainContactUs from '@/components/HomePageComponents/MainContactUs';
import TermsAndConditions from '@/components/HomePageComponents/TermsAndConditions';
import Sitemap from '@/components/HomePageComponents/Sitemap';
import Authority from '@/components/HomePageComponents/Authority';

// type BlogPost = {
//   _id: string;
//   title: string;
//   slug: { current: string };
//   mainImage?: {
//     asset: { url: string };
//     alt?: string;
//   };
//   body: PortableTextBlock[];
// };

export default async function HomePage() {
  // const posts: BlogPost[] = await sanityClient.fetch(blogPostsQuery);
  const stories = await sanityClient.fetch(successStoriesQuery);

  return (
    <>
      <NavbarWrapper />
      <div className="pt-[-80px]"> {/* Adjust this based on your navbar height */}
        <Hero />
      </div>
      <main className="ml-12 py-8 max-w-8xl mx-auto space-y-12 overflow-x-hidden">
        {/* Success Stories Section */}
        <section className='overflow-x-hidden'>
          <SuccessStoriesList stories={stories} />
        </section>
      </main>
      
      <main className="px-16 py-2 max-w-8xl mx-auto space-y-12 overflow-x-hidden">
        <NewlyAddedStories stories={stories} />

        {/* Blog Posts Section */}
        {/* <section>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 mb-8">
            Blog Posts
          </h1>
          <BlogList posts={posts} />
        </section> */}
      </main>

      
      <MainContactUs theme='light' />

      <div className='hidden md:block'>

        <TermsAndConditions theme='light' />

        <Sitemap theme="light" />
        <Authority />

      </div>

    </>
  );
}
