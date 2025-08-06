import { notFound } from 'next/navigation';
import { sanityClient } from '../../../../lib/sanity.client';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs: string[] = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return slugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const post = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage {
        asset->{url},
        alt
      },
      body
    }`,
    { slug }
  );

  if (!post) return notFound();

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>

      {post.mainImage?.asset?.url && (
        <Image
          src={post.mainImage.asset.url}
          alt={post.mainImage.alt || post.title}
          width={800} // Required
          height={500} // Required
          className="mb-6 w-full rounded-lg shadow-md"
          layout="responsive" // optional: for responsive resizing
        />
      )}

      <article className="prose max-w-none prose-lg prose-slate dark:prose-invert">
        <PortableText value={post.body} />
      </article>
    </main>
  );
}




















































































































// // import { sanityClient } from '../../../../lib/sanity.client';

// // export default async function PostPage({ params }: { params: { slug: string } }) {
// //   const { slug } = params;

// //   const post = await sanityClient.fetch(
// //     `*[_type == "post" && slug.current == $slug][0]`,
// //     { slug }
// //   );

// //   return (
// //     <div>
// //       <h1>{post.title}</h1>
// //       <p>{post.body}</p>
// //     </div>
// //   );
// // }


// src/app/post/[slug]/page.tsx

// app/post/[slug]/page.tsx

// import { sanityClient } from '../../../../lib/sanity.client';
// import { PortableText } from '@portabletext/react';
// import { notFound } from 'next/navigation';

// export async function generateStaticParams() {
//   const slugs = await sanityClient.fetch(`*[_type == "post"]{ "slug": slug.current }`);

//   return slugs.map((post: { slug: string }) => ({
//     slug: post.slug,
//   }));
// }

// export default async function PostPage({ params }: { params: { slug: string } }) {
//   const post = await sanityClient.fetch(
//     `*[_type == "post" && slug.current == $slug][0]{
//       title,
//       body
//     }`,
//     { slug: params.slug }
//   );

//   if (!post) return notFound();

//   return (
//     <main className="p-8">
//       <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
//       <PortableText value={post.body} />
//     </main>
//   );
// }


// src/app/post/[slug]/page.tsx
// import { sanityClient } from '../../../../lib/sanity.client';
// import { notFound } from 'next/navigation';

// type Props = {
//   params: { slug: string };
// };

// export default async function PostPage({ params }: Props) {
//   const post = await sanityClient.fetch(
//     `*[_type == "post" && slug.current == $slug][0]{
//       title,
//       body
//     }`,
//     { slug: params.slug }
//   );

//   if (!post) return notFound();

//   return (
//     <main className="p-8">
//       <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
//       <div>{/* Render body safely here */}</div>
//     </main>
//   );
// }
