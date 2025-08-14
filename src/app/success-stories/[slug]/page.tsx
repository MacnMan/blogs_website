
// app/success-stories/[slug]/page.tsx

export const dynamic = 'force-dynamic';
import { sanityClient } from '../../../../lib/sanity.client';
import { groq } from 'next-sanity';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import NavbarWrapper from '@/components/HomePageComponents/NavbarWrapper';
import MainContactUs from '@/components/HomePageComponents/MainContactUs';
import TermsAndConditions from '@/components/HomePageComponents/TermsAndConditions';
import Sitemap from '@/components/HomePageComponents/Sitemap';
import Authority from '@/components/HomePageComponents/Authority';
import { Section, SectionNew, ListSection, ListSectionNew, ListNew } from '@/components/successStoriesComponents/StorySections';
import TopHeroSectionSuccess from '@/components/successStoriesComponents/TopHeroSectionSuccess';
import SectionNavigator from '@/components/successStoriesComponents/SectionNavigator';

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

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
    category,
    publishedAt,
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

export default async function SuccessStory({ params }: Props) {
  const { slug } = await params;

  const data = await sanityClient.fetch(query, { slug });

  if (!data) return notFound();

  return (
    <>
      <NavbarWrapper />
      <TopHeroSectionSuccess topImage={data.topImage} />
      {/* <SectionNavigator /> */}
      <main className="p-1 w-full md:w-full px-4 md:px-10 2xl:px-32">

        <h1 id="overview" className=" scroll-mt-24 text-2xl font-semibold text-gray-800 my-8 text-center">{data.title}</h1>

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
            <div
  id="overview"
  className="text-gray-400 text-md leading-tight space-y-4 sm:leading-snug sm:space-y-6 text-left sm:max-w-3xl sm:mx-auto sm:mb-12"
>
  {paragraphs.map((para, idx) => (
    <p key={idx}>{para}</p>
  ))}
</div>

          );
        })()}


        <div className="sm:w-full sm:px-4">
          {data.introImage?.asset?.url && (
            <div className="sm:w-full">
              <Image
                src={data.introImage.asset.url}
                alt={data.introImage.alt || 'Intro Image'}
                width={1900}
                height={1200}
                className="sm:w-full sm:h-[500px] 2xl:h-[850px] rounded-4xl sm:mb-4 mt-4 object-cover "
              />
            </div>
          )}
        </div>



        <Section title={data.problemTitle} description={data.problemDescription} items={data.problems} />


        <SectionNew title={data.solutionTitle} description={data.solutionDescription} items={data.solutionFeatures} />

        {/* Architecture */}
        {data.architectureTitle && (
          <section id="architecture" className="scroll-mt-24  sm:mt-20 mt-10">
            <h2 className="text-2xl text-gray-800 sm:font-2xl font-semibold text-center sm:my-4 my-8">{data.architectureTitle}</h2>
            {/* <p className="mb-16 text-center sm:text-lg text-gray-400">{data.architectureDescription}</p> */}
            <div className="sm:max-w-6xl sm:mx-auto sm:px-4">
              {data.architectureDiagram?.asset?.url && (
                <div className="sm:w-full">
                  <Image
                    src={data.architectureDiagram.asset.url}
                    alt={data.architectureDiagram.alt || 'Architecture'}
                    width={1900}
                    height={600}
                    className="sm:w-full sm:h-[500px] rounded-xl mb-4 object-cover"
                  />
                </div>
              )}
            </div>
            {/* <List items={data.architectureComponents} /> */}
          </section>
        )}

        {/* Deployment */}
        {data.deploymentTitle && (
          <section id="deployment" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl text-gray-800 font-semibold text-center mb-4">{data.deploymentTitle}</h2>
            <p className="mb:20 sm:mb-10 text-left sm:mx-64 sm:text-center sm:text-md sm:text-gray-400 sm:leading-[16px] sm:tracking-[0.3px] leading-snug tracking-normal">{data.deploymentDescription}</p>
            <div className="sm:max-w-6xl sm:mx-auto sm:px-4 sm:mt-16 mt-10">
              {data.deploymentDiagram?.asset?.url && (
                <div className="sm:w-full">
                  <Image
                    src={data.deploymentDiagram.asset.url}
                    alt={data.deploymentDiagram.alt || 'Deployment'}
                    width={1900}
                    height={500}
                    className="sm:w-full sm:h-[625px] rounded-xl sm:mb-4 object-contain"
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
          <section id="validation" className=" scroll-mt-24 sm:mt-24 mt-10">
            <h2 className="text-2xl text-gray-800 font-semibold text-center sm:mb-16 mt-10">{data.validationTitle}</h2>
            <div className="max-w-6xl mx-auto sm:px-4">
              {data.validationImage?.asset?.url && (
                <div className="sm:w-full">
                  <Image
                    src={data.validationImage.asset.url}
                    alt={data.validationImage.alt || 'Validation'}
                    width={1900}
                    height={600}
                    className="sm:w-full sm:h-[450px] rounded-xl sm:mb-4 mt-4 object-cover"
                  />
                </div>
              )}
            </div>
            <ListNew items={data.tests || []} />
          </section>
        )}

        {/* Conclusion */}
        {data.conclusionTitle && (
          <section id="conclusion" className="scroll-mt-24 sm:mt-20 mt-10">
            <h2 className="text-2xl text-gray-800 font-semibold text-center sm:mb-12">{data.conclusionTitle}</h2>
            <div className="flex flex-col md:flex-row items-center sm:gap-10 sm:mt-4 sm:mx-20 my-4">
              {/* Left: Image */}
              {data.conclusionImage?.asset?.url && (
                <div className="flex-shrink-0 w-full md:w-1/2">
                  <Image
                    src={data.conclusionImage.asset.url}
                    alt={data.conclusionImage.alt || 'Conclusion'}
                    width={600}
                    height={600}
                    className="rounded-2xl object-cover sm:w-full sm:h-full"
                  />
                </div>
              )}

              {/* Right: Text Block */}
              <div className="w-full md:w-1/2 text-gray-500 space-y-6 text-md tracking-[0.4px] leading-[18px] mt-4 ">
                {data.conclusionDescription?.split('\n').map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

          </section>
        )}

        {/* Links */}
        {(data.linksTitle || data.exploreMore || data.readMoreLink) && (
          <section id="links" className="scroll-mt-24 sm:mt-10 sm:mx-16">
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 px-4 py-3 sm:rounded-full rounded-lg shadow-sm">
              {/* Title text */}
              {data.linksTitle && (
                <p className="text-xl font-semibold sm:font-xl text-gray-800 mb-2 md:mb-0">
                  {data.linksTitle}
                </p>
              )}

              {/* Buttons */}
              <div className="flex sm:gap-3 gap-10">
                {data.readMoreLink && (
                  <a
                    href={data.readMoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-[14px] border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
                  >
                    Read Now
                  </a>
                )}
                {data.exploreMore && (
                  <a
                    href={data.exploreMore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-[14px] bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
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
