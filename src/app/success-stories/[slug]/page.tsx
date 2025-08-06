
// app/success-stories/[slug]/page.tsx

export const dynamic = 'force-dynamic';

import { sanityClient } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import HeroSection from '@/components/HomePageComponents/Hero';
import NavbarWrapper from '@/components/HomePageComponents/NavbarWrapper';
// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';
import MainContactUs from '@/components/HomePageComponents/MainContactUs';
import TermsAndConditions from '@/components/HomePageComponents/TermsAndConditions';
import Sitemap from '@/components/HomePageComponents/Sitemap';
import Authority from '@/components/HomePageComponents/Authority';
import { Section, SectionNew, ListSection, ListSectionNew, List } from '@/components/HomePageComponents/StorySections';


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
      <HeroSection />
      <main className="p-1 w-full px-20 mx-auto">

        <h1 className="text-4xl font-semibold my-8 text-center">{data.title}</h1>

        {data.overview && (
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed text-wrap mb-12 max-w-4xl mx-auto">
            {data.overview}
          </p>
        )}

        <div className="max-w-4xl mx-auto px-4">
          {data.introImage?.asset?.url && (
            <div className="w-full">
              <Image
                src={data.introImage.asset.url}
                alt={data.introImage.alt || 'Intro Image'}
                width={1200} // Large width for responsiveness
                height={600} // Adjusted for aspect ratio
                className="rounded-xl mb-4 w-full h-auto object-cover"
              />
            </div>
          )}
        </div>


        <Section title={data.problemTitle} description={data.problemDescription} items={data.problems} />


        <SectionNew title={data.solutionTitle} description={data.solutionDescription} items={data.solutionFeatures} />

        {/* Architecture */}
        {data.architectureTitle && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center my-4">{data.architectureTitle}</h2>
            <p className="mb-16 text-center sm:text-lg text-gray-400">{data.architectureDescription}</p>
            {data.architectureDiagram?.asset?.url && (
              <Image
                src={data.architectureDiagram.asset.url}
                alt={data.architectureDiagram.alt || 'Architecture'}
                width={1800}
                height={400}
                className="rounded-xl mb-4"
              />
            )}
            <List items={data.architectureComponents} />
          </section>
        )}

        {/* Deployment */}
        {data.deploymentTitle && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-center mb-4">{data.deploymentTitle}</h2>
            <p className="mb-2 text-center text-[18px] text-gray-500 leading-relaxed tracking-tight">{data.deploymentDescription}</p>
            {data.deploymentDiagram?.asset?.url && (
              <Image
                src={data.deploymentDiagram.asset.url}
                alt={data.deploymentDiagram.alt || 'Deployment'}
                width={1200}
                height={800}
                className="w-full max-w-5xl min-h-[300px] max-h-[400px] object-contain rounded-xl my-8 mx-auto"
              />
            )}

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
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">{data.validationTitle}</h2>
            {data.validationImage?.asset?.url && (
              <Image
                src={data.validationImage.asset.url}
                alt={data.validationImage.alt || 'Validation'}
                width={1200}
                height={400}
                className="rounded-xl mb-4"
              />
            )}
            <List items={data.tests || []} />
          </section>
        )}

        {/* Conclusion */}
        {data.conclusionTitle && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-center mb-2">{data.conclusionTitle}</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 mt-4">
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
              <div className="w-full md:w-1/2 text-gray-700 space-y-6 text-md leading-relaxed">
                {data.conclusionDescription?.split('\n\n').map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

          </section>
        )}

        {/* Links */}
        {(data.linksTitle || data.exploreMore || data.readMoreLink) && (
          <section className="mt-10">
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-300 px-6 py-4 rounded-xl shadow-sm">
              {/* Title text */}
              {data.linksTitle && (
                <p className="text-sm font-medium text-gray-800 mb-2 md:mb-0">
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

// // 🔧 Section with icons and description
// function Section({ title, description, items }: { title?: string; description?: string; items?: any[] }) {
//   if (!title && !description && !items?.length) return null;

//   return (
//     <section className="mt-10 max-w-8xl mx-auto px-4 text-center">
//       {title && (
//         <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
//           {title}
//         </h2>
//       )}

//       {description && (
//         <p className="mb-6 text-gray-400 text-base sm:text-[20px] leading-6 tracking-tight">
//           {description}
//         </p>
//       )}

//       <ul className="grid grid-cols-1 md:grid-cols-4 gap-2 text-left">
//         {items?.map((item, i) => (
//           <li key={i} className="p-4 my-8">
//             {item.icon?.asset?.url && (
//               <Image
//                 src={item.icon.asset.url}
//                 alt={item.icon.alt || ''}
//                 width={38}
//                 height={38}
//                 className="mb-2"
//               />
//             )}
//             <h3 className="text-lg font-semibold font-weight: 500">{item.title}</h3>
//             <p className="text-gray-500">{item.description}</p>
//           </li>
//         ))}
//       </ul>
//     </section>

//   );
// }


// // 🔧 Section with icons and description
// function SectionNew({ title, description, items }: { title?: string; description?: string; items?: any[] }) {
//   if (!title && !description && !items?.length) return null;

//   return (
//     <section className="mt-10 max-w-8xl mx-auto px-4 text-center">
//       {title && (
//         <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
//           {title}
//         </h2>
//       )}

//       {description && (
//         <p className="mb-10 text-gray-400 text-base sm:text-[18px] leading-6 tracking-tight">
//           {description}
//         </p>
//       )}

//       <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
//         {items?.map((item, i) => (
//           <li key={i} className="p-4 border rounded-xl border-gray-400">
//             {/* {item.icon?.asset?.url && (
//               <Image
//                 src={item.icon.asset.url}
//                 alt={item.icon.alt || ''}
//                 width={38}
//                 height={38}
//                 className="mb-2"
//               />
//             )} */}
//             <h3 className="text-lg font-semibold font-weight:500 mb-2">{item.title}</h3>
//             <p className="text-gray-500">{item.description}</p>
//           </li>
//         ))}
//       </ul>
//     </section>

//   );
// }


// // 🔧 List with optional images
// function ListSection({
//   title,
//   images = [],
//   items = [],
// }: {
//   title?: string;
//   images: any[];
//   items: any[];
// }) {
//   if (!title && !images.length && !items.length) return null;

//   return (
//     <section className="mt-10">
//       {title && <h2 className="text-2xl font-bold mb-2 text-center mb-8">{title}</h2>}
//       <div className="grid grid-cols-3 gap-4 w-full mx-auto">
//         <div className="col-span-1 row-span-2">
//           {images[0]?.asset?.url && (
//             <Image
//               src={images[0].asset.url}
//               alt={images[0].alt || 'Image 1'}
//               width={400}
//               height={600}
//               className="w-full h-full object-cover rounded-xl"
//             />
//           )}
//         </div>

//         <div className="col-span-1 row-span-2">
//           {images[1]?.asset?.url && (
//             <Image
//               src={images[1].asset.url}
//               alt={images[1].alt || 'Image 2'}
//               width={400}
//               height={600}
//               className="w-full h-full object-cover rounded-lg"
//             />
//           )}
//         </div>

//         <div className="col-span-1">
//           {images[2]?.asset?.url && (
//             <Image
//               src={images[2].asset.url}
//               alt={images[2].alt || 'Image 3'}
//               width={300}
//               height={300}
//               className="w-full object-cover rounded-lg"
//             />
//           )}
//         </div>

//         <div className="col-span-1">
//           {images[3]?.asset?.url && (
//             <Image
//               src={images[3].asset.url}
//               alt={images[3].alt || 'Image 4'}
//               width={300}
//               height={300}
//               className="w-full object-cover rounded-lg"
//             />
//           )}
//         </div>
//       </div>

//       <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {items.map((c, i) => (
//           <li
//             key={i}
//             className="p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
//           >
//             <h2 className="font-semibold text-gray-900 mb-2">{c.title}</h2>
//             <p className="text-gray-500 text-sm leading-relaxed">{c.description}</p>
//           </li>
//         ))}
//       </ul>

//     </section>


//   );
// }

// // 🔧 List with optional images - impact
// function ListSectionNew({
//   title,
//   images = [],
//   items = [],
// }: {
//   title?: string;
//   images: any[];
//   items: any[];
// }) {
//   if (!title && !images.length && !items.length) return null;

//   return (
//     <section className="mt-12 ">
//       {title && <h2 className="text-2xl font-bold mb-10 text-center">{title}</h2>}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
//         {/* Left side - Images */}
//         <div className="flex flex-wrap gap-4 ">
//           {images.map((img, i) =>
//             img?.asset?.url ? (
//               <Image
//                 key={i}
//                 src={img.asset.url}
//                 alt={img.alt || title}
//                 width={600}
//                 height={200}
//                 className="rounded-xl shadow-2xl object-contain"
//               />
//             ) : null
//           )}
//         </div>

//         {/* Right side - Impact List */}
//         <ul className="space-y-6">
//           {items.map((c, i) => (
//             <li key={i}>
//               <h4 className="font-semibold text-lg text-gray-900 mb-1">{c.title}</h4>
//               <p className="text-sm text-gray-400 leading-relaxed">{c.description}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }


// // 🔧 Generic list for simple object arrays
// function List({ items, labelField = 'title' }: { items: any[]; labelField?: string }) {
//   return (
//     <ul className="grid grid-cols-1 md:grid-cols-2 gap-12">
//       {items?.map((item, i) => (
//         <li key={i} className="p-4 border border-gray-500 rounded-xl">
//           <h3 className="font-bold mb-3">{item[labelField]}</h3>
//           <p className='text-gray-500'>{item.description}</p>
//         </li>
//       ))}
//     </ul>
//   );
// }
// // export async function generateStaticParams() {
// //   const query = groq`*[_type == "successStory" && defined(slug.current)][]{ slug }`;
// //   const slugs: { slug: { current: string } }[] = await sanityClient.fetch(query);

// //   return slugs.map(({ slug }) => ({
// //     slug: slug.current,
// //   }));
// // }
