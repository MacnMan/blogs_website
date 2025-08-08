
// app/success-stories/[slug]/page.tsx

export const dynamic = 'force-dynamic';

import { sanityClient } from '../../../../lib/sanity.client';
import { groq } from 'next-sanity';
import { notFound } from 'next/navigation';
import Image from 'next/image';
// import HeroSection from '@/components/HomePageComponents/Hero';
import NavbarWrapper from '@/components/HomePageComponents/NavbarWrapper';
// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';
import MainContactUs from '@/components/HomePageComponents/MainContactUs';
import TermsAndConditions from '@/components/HomePageComponents/TermsAndConditions';
import Sitemap from '@/components/HomePageComponents/Sitemap';
import Authority from '@/components/HomePageComponents/Authority';
import { Section, SectionNew, ListSection, ListSectionNew, ListNew } from '@/components/successStoriesComponents/StorySections';
import TopHeroSectionSuccess from '@/components/successStoriesComponents/TopHeroSectionSuccess';
// import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';


export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

// interface Props {
//   params: { slug: string }; // ✅ CORRECT
// };

export async function generateStaticParams() {
  const slugs: string[] = await sanityClient.fetch(
    `*[_type == "successStory" && defined(slug.current)][].slug.current`
  );

  return slugs.map((slug) => ({ slug }));
}

const query = groq`
  *[_type == "successStory" && slug.current == $slug][0] {
    title,
    slug,
    topImage {
      image {
        asset->{
          _id,
          _ref,
          url
        },
        alt
      },
      title,
      location
    },
    overview,
    introImage { asset->{ _id, url }, alt },
    problemTitle,
    problemDescription,
    problems[] {
      title,
      description,
      icon { asset->{ _id, url }, alt }
    },
    solutionTitle,
    solutionDescription,
    solutionFeatures[] {
      title,
      description,
      icon { asset->{ _id, url }, alt }
    },
    architectureTitle,
    architectureDiagram { asset->{ _id, url }, alt },
    architectureDescription,
    architectureComponents[] {
      label,
      description,
      image { asset->{ _id, url }, alt }
    },
    deploymentTitle,
    deploymentDescription,
    deploymentDiagram { asset->{ _id, url }, alt },
    challengeTitle,
    challengeImages[] { asset->{ _id, url }, alt },
    challenges[] {
      title,
      description,
      icon { asset->{ _id, url }, alt }
    },
    impactTitle,
    inspectImage { asset->{ _id, url }, alt },
    impacts[] { title, description },
    validationTitle,
    validationImage { asset->{ _id, url }, alt },
    tests[] { title, description },
    conclusionTitle,
    conclusionDescription,
    conclusionImage { asset->{ _id, url }, alt },
    linksTitle, 
    exploreMore,
    readMoreLink
  }
`;



// ✅ Must be an async server component
export default async function SuccessStory({ params }: Props) {
  // const query = `*[_type == "successStory" && slug.current == $slug][0]`;
  // const data = await sanityClient.fetch(query, { slug: params.slug });
  // ✅ Use await only when params is destructured and passed as props
  // const slug = await params.slug;

  // const { slug } = await params;

  const { slug } = await params;

  // ✅ Provide slug properly to query
  const data = await sanityClient.fetch(query, { slug });

  if (!data) return notFound();


  return (
    <>
      <NavbarWrapper />
      <TopHeroSectionSuccess topImage={data.topImage} />
      <main className="p-1 w-full px-10 2xl:px-32">

        <h1 className="text-2xl font-semibold text-gray-800 my-8 text-center">{data.title}</h1>

        {data.overview && (() => {
          const sentences = data.overview
            .split('.')
            .map((s: string) => s.trim())
            .filter(Boolean)
            .map((s: string) => s + '.'); // Re-add the period

          const paragraphs: string[] = [];
          for (let i = 0; i < sentences.length; i += 3) {
            const pair = sentences.slice(i, i + 3).join(' ');
            paragraphs.push(pair);
          }

          return (
            <div className="text-gray-400 text-md leading-snug space-y-6 text-center max-w-3xl mx-auto mb-12">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          );
        })()}


        <div className="w-full px-4">
          {data.introImage?.asset?.url && (
            <div className="w-full">
              <Image
                src={data.introImage.asset.url}
                alt={data.introImage.alt || 'Intro Image'}
                width={1900}
                height={1200}
                className="w-full md:h-[500px] 2xl:h-[850px] rounded-4xl mb-4 object-cover "
              />
            </div>
          )}
        </div>



        <Section title={data.problemTitle} description={data.problemDescription} items={data.problems} />


        <SectionNew title={data.solutionTitle} description={data.solutionDescription} items={data.solutionFeatures} />

        {/* Architecture */}
        {data.architectureTitle && (
          <section className="mt-20">
            <h2 className="text-2xl text-gray-800 sm:font-2xl font-semibold text-center my-4">{data.architectureTitle}</h2>
            {/* <p className="mb-16 text-center sm:text-lg text-gray-400">{data.architectureDescription}</p> */}
            <div className="max-w-6xl mx-auto px-4">
              {data.architectureDiagram?.asset?.url && (
                <div className="w-full">
                  <Image
                    src={data.architectureDiagram.asset.url}
                    alt={data.architectureDiagram.alt || 'Architecture'}
                    width={1900}
                    height={600}
                    className="w-full h-[500px] rounded-xl mb-4 object-cover"
                  />
                </div>
              )}
            </div>
            {/* <List items={data.architectureComponents} /> */}
          </section>
        )}

        {/* Deployment */}
        {data.deploymentTitle && (
          <section className="mt-10">
            <h2 className="text-2xl text-gray-800 font-semibold text-center mb-4">{data.deploymentTitle}</h2>
            <p className="mb-10  mx-64 text-center text-md text-gray-400 leading-[16px] tracking-[0.3px]">{data.deploymentDescription}</p>
            <div className="max-w-6xl mx-auto px-4 mt-16">
              {data.deploymentDiagram?.asset?.url && (
                <div className="w-full">
                  <Image
                    src={data.deploymentDiagram.asset.url}
                    alt={data.deploymentDiagram.alt || 'Deployment'}
                    width={1200}
                    height={500}
                    className="w-full h-[625px] rounded-xl mb-4 object-contain"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Challenges */}
        <ListSection
          title={data.challengeTitle}
          images={data.challengeImages || []}
          items={data.challenges || []}
        />

        {/* Impact */}
        <ListSectionNew
          title={data.impactTitle}
          images={data.inspectImage?.asset?.url ? [data.inspectImage] : []}
          items={data.impacts || []}
        />

        {/* Validation */}
        {data.validationTitle && (
          <section className="mt-24 ">
            <h2 className="text-2xl text-gray-800 font-semibold text-center mb-16">{data.validationTitle}</h2>
            <div className="max-w-6xl mx-auto px-4">
              {data.validationImage?.asset?.url && (
                <div className="w-full">
                  <Image
                    src={data.validationImage.asset.url}
                    alt={data.validationImage.alt || 'Validation'}
                    width={1900}
                    height={600}
                    className="w-full h-[450px] rounded-xl mb-4 object-cover"
                  />
                </div>
              )}
            </div>
            <ListNew items={data.tests || []} />
          </section>
        )}

        {/* Conclusion */}
        {data.conclusionTitle && (
          <section className="mt-20">
            <h2 className="text-2xl text-gray-800 font-semibold text-center mb-12">{data.conclusionTitle}</h2>
            <div className="flex flex-col md:flex-row items-center gap-10 mt-4 mx-20">
              {/* Left: Image */}
              {data.conclusionImage?.asset?.url && (
                <div className="flex-shrink-0 w-full md:w-1/2">
                  <Image
                    src={data.conclusionImage.asset.url}
                    alt={data.conclusionImage.alt || 'Conclusion'}
                    width={600}
                    height={600}
                    className="rounded-2xl object-cover w-full h-full"
                  />
                </div>
              )}

              {/* Right: Text Block */}
              <div className="w-full md:w-1/2 text-gray-500 space-y-6 text-md tracking-[0.4px] leading-[18px] ">
                {data.conclusionDescription?.split('\n\n').map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

          </section>
        )}

        {/* Links */}
        {(data.linksTitle || data.exploreMore || data.readMoreLink) && (
          <section className="mt-10 mx-16">
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 px-12 py-4 rounded-xl shadow-sm">
              {/* Title text */}
              {data.linksTitle && (
                <p className="text-xl font-semibold sm:font-xl text-gray-800 mb-2 md:mb-0">
                  {data.linksTitle}
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                {data.readMoreLink && (
                  <a
                    href={data.readMoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 text-sm border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
                  >
                    Read Now
                  </a>
                )}
                {data.exploreMore && (
                  <a
                    href={data.exploreMore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  >
                    Explore More
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

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
