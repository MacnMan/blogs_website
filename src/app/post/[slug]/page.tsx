import { sanityClient } from '../../../../lib/sanity.client';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch(`*[_type == "post" && defined(slug.current)][].slug.current`);
  return slugs.map((slug: string) => ({ slug }));
}

type Props = {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number];
};

export default async function PostPage({ params }: Props) {
  const post = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage{ asset->{url}, alt },
      body
    }`,
    { slug: params.slug }
  );

  if (!post) return notFound();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.mainImage?.asset?.url && (
        <img
          src={post.mainImage.asset.url}
          alt={post.mainImage.alt || 'Post image'}
          className="rounded-lg mb-6"
        />
      )}
      <PortableText value={post.body} />
    </main>
  );
}
