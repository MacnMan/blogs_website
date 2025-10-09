// // app/success-stories-version/[slug]/page.tsx

// export const dynamic = 'force-dynamic';

// import { sanityClient } from '../../../../lib/sanity.client';
// import { groq, } from 'next-sanity';
// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import { PortableText, PortableTextBlock, PortableTextComponents } from "@portabletext/react";

// // SuccessStoriesVersionComponents
// // import components from '@/components/SuccessStoriesVersionComponents/OverviewTextDisplay';
// import DeploymentSectionDisplay from '@/components/SuccessStoriesVersionComponents/DeploymentSectionDisplay';

// // HomePageComponents
// import NavbarWrapper from '@/components/HomePageComponents/NavbarWrapper';
// import MainContactUs from '@/components/HomePageComponents/MainContactUs';
// import TermsAndConditions from '@/components/HomePageComponents/TermsAndConditions';
// import Sitemap from '@/components/HomePageComponents/Sitemap';
// import Authority from '@/components/HomePageComponents/Authority';

// // SuccessStoriesComponents
// import { Section, ListSection, ListSectionNew, ListNew } from '@/components/SuccessStoriesComponents/StorySectionsPage';
// import TopHeroSectionSuccess from '@/components/SuccessStoriesComponents/TopHeroSectionSuccessPage';
// import SectionNavigator from '@/components/SuccessStoriesComponents/SectionNavigatorPage';

// // Types
// import { SectionItem, SanityImage } from '@/types/types';
// import Link from 'next/link';

// export const revalidate = 60;

// type Props = {
// 	params: Promise<{ slug: string }>;
// };

// // ✅ Generate static paths for all slugs of successStoryVersion2
// export async function generateStaticParams() {
// 	const slugs: string[] = await sanityClient.fetch(
// 		`*[_type == "successStoryVersion2" && defined(slug.current)][].slug.current`
// 	);
// 	return slugs.map((slug) => ({ slug }));
// }

// // ✅ Fetch single successStoryVersion2 by slug
// const query = groq`
//   *[_type == "successStoryVersion2" && slug.current == $slug][0] {
//     title,
//     slug,
//     category,
//     publishedAt,
//     topImage {
//       image {
//         asset->{ _id, url },
//         alt
//       },
//       title,
//       location
//     },
//     overview,
//     introImage { asset->{ _id, url }, alt },
//     problemTitle,
//     problemDescription,
//     problems[] {
//       title,
//       description,
//       icon { asset->{ _id, url }, alt }
//     },
//     solutionTitle,
//     solutionDescription,
//     solutionFeatures[] {
//       title,
//       description,
//       icon { asset->{ _id, url }, alt }
//     },
//     architectureTitle,
//     architectureDiagram { asset->{ _id, url }, alt },
//     architectureImages[] { asset->{ _id, url }, alt },
//     architectureDescription,
//     architectureComponents[] {
//       label,
//       description,
//       image { asset->{ _id, url }, alt }
//     },
//     deploymentTitle,
//     deploymentDescription,
//     deploymentDiagram { asset->{ _id, url }, alt },
//     deploymentFeatures[] {
//       title,
//       description,
//       icon { asset->{ _id, url }, alt }
//     },
//     challengeTitle,
//     challengeImages[] { asset->{ _id, url }, alt },
//     challenges[] {
//       title,
//       description,
//       icon { asset->{ _id, url }, alt }
//     },
//     impactTitle,
//     inspectImage { asset->{ _id, url }, alt },
//     impacts[] { title, description },
//     validationTitle,
//     validationImage { asset->{ _id, url }, alt },
//     tests[] { title, description },
//     conclusionTitle,
//     conclusionDescription,
//     conclusionImage { asset->{ _id, url }, alt },
//     linksTitle,
//     exploreMore,
//     readMoreLink
//   }
// `;


// export const portableTextComponents: PortableTextComponents = {
//   // 🔹 Custom rendering for marks (inline text styles)
//   marks: {
//     strong: ({ children }) => <strong className="font-bold">{children}</strong>,
//     em: ({ children }) => <em className="italic">{children}</em>,
//     underline: ({ children }) => <span className="underline">{children}</span>,
//     "strike-through": ({ children }) => <span className="line-through">{children}</span>,
//     code: ({ children }) => <code className="bg-gray-100 px-1 rounded">{children}</code>,

//     // 🔹 Custom text color
//     textColor: ({ children, value }) => {
//       return <span style={{ color: value?.color || "inherit" }}>{children}</span>;
//     },

//     // 🔹 External links
//     link: ({ children, value }) => (
//       <a
//         href={value?.href || "#"}
//         target={value?.openInNewTab ? "_blank" : "_self"}
//         rel="noopener noreferrer"
//         className="text-blue-600 hover:underline"
//       >
//         {children}
//       </a>
//     ),

//     // 🔹 Internal references to other pages
//     internalLink: ({ children, value }) => {
//       if (!value?.reference?.slug?.current) return <>{children}</>;
//       return (
//         <Link href={`/success-stories-version/${value.reference.slug.current}`} className="text-blue-600 hover:underline">
//           {children}
//         </Link>
//       );
//     },
//   },

//   // 🔹 Custom rendering for block types
//   block: {
//     h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
//     h2: ({ children }) => <h2 className="text-3xl font-semibold my-3">{children}</h2>,
//     h3: ({ children }) => <h3 className="text-2xl font-semibold my-2">{children}</h3>,
//     h4: ({ children }) => <h4 className="text-xl font-semibold my-2">{children}</h4>,
//     h5: ({ children }) => <h5 className="text-lg font-semibold my-1">{children}</h5>,
//     h6: ({ children }) => <h6 className="text-base font-semibold my-1">{children}</h6>,
//     blockquote: ({ children }) => (
//       <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-500 my-2">{children}</blockquote>
//     ),
//     normal: ({ children }) => <p className="text-gray-600 my-2">{children}</p>,
//   },

//   // 🔹 Lists
//   list: {
//     bullet: ({ children }) => <ul className="list-disc list-inside ml-4">{children}</ul>,
//     number: ({ children }) => <ol className="list-decimal list-inside ml-4">{children}</ol>,
//     checkmarks: ({ children }) => <ul className="list-inside ml-4">{children}</ul>, // customize as needed
//   },

//   listItem: {
//     bullet: ({ children }) => <li className="mb-1">{children}</li>,
//     number: ({ children }) => <li className="mb-1">{children}</li>,
//     checkmarks: ({ children }) => (
//       <li className="mb-1 flex items-center gap-2">
//         <span className="text-green-600">✔</span> {children}
//       </li>
//     ),
//   },
// };



// type SectionNewProps = {
// 	title?: string;
// 	description?: string | PortableTextBlock[]; // ✅ accept both
// 	items?: SectionItem[];
// };

// export function SectionNew({ title, description, items }: SectionNewProps) {
// 	if (!title && !description && !items?.length) return null;

// 	return (
// 		<section
// 			id="solution"
// 			className="scroll-mt-36 max-w-8xl mx-auto sm:px-6 bg-[#F7F7F7] rounded-3xl pb-4"
// 		>
// 			{title && (
// 				<h2 className="text-2xl text-center sm:text-2xl font-semibold sm:tracking-tighter text-gray-800 mb-6 pt-10">
// 					{title}
// 				</h2>
// 			)}

// 			<div className="px-1 sm:px-16">
// 				{description && (
// 					<div className="text-gray-400 text-md leading-tight sm:leading-snug text-left sm:text-center max-w-3xl mx-auto mb-16">
// 						{typeof description === "string" ? (
// 							description.split("\n").map((p, i) => <p key={i}>{p}</p>) // ✅ plain string
// 						) : (
// 							<PortableText value={description} /> // ✅ rich text
// 						)}
// 					</div>
// 				)}
// 			</div>

// 			<ul className="grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-3 sm:gap-y-5 sm:gap-x-7 sm:text-left sm:mx-44">
// 				{items?.map((item, i) => {
// 					const num = String(i + 1).padStart(2, "0");
// 					return (
// 						<li
// 							key={i}
// 							className="relative min-h-[200px] p-8 mt-2 rounded-xl flex flex-col items-start bg-inherit"
// 						>
// 							{/* Big faint number */}
// 							<span className="absolute top-[-42px] sm:top-[-56px] sm:left-8 text-[100px] sm:text-[120px] font-extrabold text-gray-200 opacity-70 select-none leading-none">
// 								{num}
// 							</span>

// 							{/* Title */}
// 							<h3 className="sm:text-md font-semibold mb-2 text-left leading-[18px] bg-[#F7F7F7] relative z-30">
// 								{item.title}
// 							</h3>

// 							{/* Description */}
// 							<p className="text-gray-400 text-sm leading-[18px] relative z-10 mb-5 sm:mb-0">
// 								{item.description}
// 							</p>
// 						</li>
// 					);
// 				})}
// 			</ul>
// 		</section>
// 	);
// }


// export default async function SuccessStoryVersion2Page({ params }: Props) {
// 	const { slug } = await params;

// 	const data = await sanityClient.fetch(query, { slug });

// 	// 👉 Also fetch all other V2 stories for carousel
// 	// const allStories = await sanityClient.fetch(
// 	// 	groq`*[_type == "successStoryVersion2" && defined(homeImage.asset._ref)]{
// 	//   _id,
// 	//   title,
// 	//   slug,
// 	//   homeImage { asset->{url}, alt },
// 	//   body
// 	// }`
// 	// );

// 	if (!data) return notFound();


// 	return (
// 		<>
// 			<NavbarWrapper />
// 			<TopHeroSectionSuccess topImage={data.topImage} />
// 			<div className="hidden md:block">
// 				<SectionNavigator />
// 			</div>

// 			<main className="p-1 w-full md:w-full px-4 md:px-10 2xl:px-32">
// 				<h1
// 					id="overview"
// 					className="scroll-mt-36 text-2xl font-semibold text-gray-800 my-8 text-center"
// 				>
// 					{data.title}
// 				</h1>

// 				{data.overview && (
// 					<div
// 						id="overview"
// 						className="text-md space-y-4 sm:space-y-6 text-left sm:max-w-3xl sm:mx-auto sm:mb-12"
// 					>
// 						<PortableText value={data.overview} components={portableTextComponents} />
// 					</div>
// 				)}

// 				{/* Intro Image */}
// 				{data.introImage?.asset?.url && (
// 					<div className="sm:w-full sm:px-4">
// 						<Image
// 							src={data.introImage.asset.url}
// 							alt={data.introImage.alt || 'Intro Image'}
// 							width={1900}
// 							height={1200}
// 							unoptimized
// 							className="sm:w-full sm:h-[500px] 2xl:h-[850px] rounded-4xl sm:mb-4 mt-4 object-cover"
// 						/>
// 					</div>
// 				)}

// 				{/* Sections */}
// 				<Section
// 					title={data.problemTitle}
// 					description={data.problemDescription}
// 					items={data.problems}
// 				/>
// 				<SectionNew
// 					title={data.solutionTitle}
// 					description={data.solutionDescription}
// 					items={data.solutionFeatures}
// 				/>

// 				{/* Architecture Section */}
// 				{data.architectureTitle && (
// 					<section id="architecture" className="scroll-mt-36 sm:mt-20 mt-10">
// 						<h2 className="text-2xl text-gray-800 font-semibold text-center sm:my-4 my-8">
// 							{data.architectureTitle}
// 						</h2>

// 						{/* ✅ Main required image */}
// 						{data.architectureDiagram?.asset?.url && (
// 							<div className="sm:max-w-6xl sm:mx-auto sm:px-4">
// 								<Image
// 									src={data.architectureDiagram.asset.url}
// 									alt={data.architectureDiagram.alt || "Architecture"}
// 									width={1900}
// 									height={600}
// 									className="w-full h-[300px] sm:h-[400px] object-cover rounded-xl mb-4"
// 								/>
// 							</div>
// 						)}

// 						{/* ✅ Optional extra images */}
// 						{data.architectureImages?.length > 0 && (
// 							<div className="grid grid-cols-1 sm:grid-cols-1 gap-6 sm:max-w-6xl sm:mx-auto sm:px-4">
// 								{data.architectureImages.map((img: SanityImage, idx: number) => (
// 									<Image
// 										key={idx}
// 										src={img.asset?.url || ""}
// 										alt={img.alt || `Architecture image ${idx + 1}`}
// 										width={1900}
// 										height={600}
// 										className="w-full h-[300px] sm:h-[400px] object-cover rounded-xl"
// 									/>
// 								))}
// 							</div>
// 						)}

// 					</section>
// 				)}


// 				<DeploymentSectionDisplay data={data} />


// 				{/* Challenges */}
// 				<ListSection
// 					title={data.challengeTitle}
// 					images={data.challengeImages || []}
// 					items={data.challenges || []}
// 				/>

// 				{/* Impact */}
// 				<ListSectionNew
// 					title={data.impactTitle}
// 					images={data.inspectImage?.asset?.url ? [data.inspectImage] : []}
// 					items={data.impacts || []}
// 				/>

// 				{/* Validation */}
// 				{data.validationTitle && (
// 					<section id="validation" className="scroll-mt-36 sm:mt-4 mt-10">
// 						<h2 className="text-2xl text-gray-800 font-semibold text-center sm:mb-16 mt-10">
// 							{data.validationTitle}
// 						</h2>
// 						{data.validationImage?.asset?.url && (
// 							<div className="max-w-6xl mx-auto sm:px-4">
// 								<Image
// 									src={data.validationImage.asset.url}
// 									alt={data.validationImage.alt || 'Validation'}
// 									width={1900}
// 									height={600}
// 									className="sm:w-full sm:h-[450px] rounded-4xl sm:mb-4 mt-4 object-cover"
// 								/>
// 							</div>
// 						)}
// 						<ListNew items={data.tests || []} />
// 					</section>
// 				)}

// 				{/* Conclusion */}
// 				{data.conclusionTitle && (
// 					<section id="conclusion" className="scroll-mt-36 sm:mt-20 mt-10">
// 						<h2 className="text-2xl text-gray-800 font-semibold text-center sm:mb-12">
// 							{data.conclusionTitle}
// 						</h2>
// 						<div className="flex flex-col md:flex-row items-center sm:gap-10 sm:mt-4 sm:mx-20 my-4">
// 							{data.conclusionImage?.asset?.url && (
// 								<div className="flex-shrink-0 w-full md:w-1/2">
// 									<Image
// 										src={data.conclusionImage.asset.url}
// 										alt={data.conclusionImage.alt || 'Conclusion'}
// 										width={600}
// 										height={600}
// 										className="rounded-4xl object-cover sm:w-full sm:h-full"
// 									/>
// 								</div>
// 							)}
// 							{/* <div className="w-full md:w-1/2 text-gray-500 space-y-6 text-md tracking-[0.4px] leading-[18px] mt-4">
// 								{data.conclusionDescription
// 									?.split('\n')
// 									.map((para: string, i: number) => <p key={i}>{para}</p>)}
// 							</div> */}

// 							<div className="w-full md:w-1/2 text-gray-500 space-y-6 text-md tracking-[0.4px] leading-[18px] mt-4">
// 								{data.conclusionDescription && (
// 									<PortableText value={data.conclusionDescription} components={portableTextComponents} />
// 								)}
// 							</div>
// 						</div>
// 					</section>
// 				)}

// 				{/* Links */}
// 				{(data.linksTitle || data.exploreMore || data.readMoreLink) && (
// 					<section id="links" className="scroll-mt-32 sm:mt-10 sm:mx-16">
// 						<div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 px-4 py-3 sm:rounded-full rounded-lg shadow-sm">
// 							{data.linksTitle && (
// 								<p className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">
// 									{data.linksTitle}
// 								</p>
// 							)}
// 							<div className="flex sm:gap-3 gap-10">
// 								{data.readMoreLink && (
// 									<a
// 										href={data.readMoreLink}
// 										target="_blank"
// 										rel="noopener noreferrer"
// 										className="px-4 py-2 text-[14px] border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
// 									>
// 										Read Now
// 									</a>
// 								)}
// 								{data.exploreMore && (
// 									<a
// 										href={data.exploreMore}
// 										target="_blank"
// 										rel="noopener noreferrer"
// 										className="px-4 py-2 text-[14px] bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
// 									>
// 										Explore More
// 									</a>
// 								)}
// 							</div>
// 						</div>
// 					</section>
// 				)}
// 			</main>

// 			<Image
// 				src={'/blogs/Group 370.svg'}
// 				alt={'prodcuts image macnman'}
// 				width={100}
// 				height={10}
// 				className='w-full mt-10'
// 			/>

// 			<MainContactUs theme="light" />

// 			<div className="hidden md:block">
// 				<TermsAndConditions theme="light" />
// 				<Sitemap theme="light" />
// 				<Authority />
// 			</div>
// 		</>
// 	);
// }


// app/success-stories-version/[slug]/page.tsx

export const dynamic = "force-dynamic";

import { sanityClient } from "../../../../lib/sanity.client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { PortableText, PortableTextBlock, PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

import SafeImage from "@/components/SuccessStoriesVersionComponents/SafeImage";  // ← import SafeImage
import DeploymentSectionDisplay from "@/components/SuccessStoriesVersionComponents/DeploymentSectionDisplay";
import NavbarWrapper from "@/components/HomePageComponents/NavbarWrapper";
import MainContactUs from "@/components/HomePageComponents/MainContactUs";
import TermsAndConditions from "@/components/HomePageComponents/TermsAndConditions";
import Sitemap from "@/components/HomePageComponents/Sitemap";
import Authority from "@/components/HomePageComponents/Authority";
import { Section, ListSection, ListSectionNew, ListNew } from "@/components/SuccessStoriesComponents/StorySectionsPage";
import TopHeroSectionSuccess from "@/components/SuccessStoriesComponents/TopHeroSectionSuccessPage";
import SectionNavigator from "@/components/SuccessStoriesComponents/SectionNavigatorPage";

import { SectionItem, SanityImage } from "@/types/types";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs: string[] = await sanityClient.fetch(
    `*[_type == "successStoryVersion2" && defined(slug.current)][].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}

const query = groq`
  *[_type == "successStoryVersion2" && slug.current == $slug][0] {
    title,
    slug,
    category,
    publishedAt,
    topImage {
      image {
        asset->{ _id, url },
        alt
      },
      title,
      location
    },
    overview,
    introImage {
      asset->{ _id, url },
      alt
    },
    problemTitle,
    problemDescription,
    problems[] {
      title,
      description,
      icon {
        asset->{ _id, url },
        alt
      }
    },
    solutionTitle,
    solutionDescription,
    solutionFeatures[] {
      title,
      description,
      icon {
        asset->{ _id, url },
        alt
      }
    },
    architectureTitle,
    architectureDiagram {
      asset->{ _id, url },
      alt
    },
    architectureImages[] {
      asset->{ _id, url },
      alt
    },
    architectureDescription,
    architectureComponents[] {
      label,
      description,
      image {
        asset->{ _id, url },
        alt
      }
    },
    deploymentTitle,
    deploymentDescription,
    deploymentDiagram {
      asset->{ _id, url },
      alt
    },
    deploymentFeatures[] {
      title,
      description,
      icon {
        asset->{ _id, url },
        alt
      }
    },
    challengeTitle,
    challengeImages[] {
      asset->{ _id, url },
      alt
    },
    challenges[] {
      title,
      description,
      icon {
        asset->{ _id, url },
        alt
      }
    },
    impactTitle,
    inspectImage {
      asset->{ _id, url },
      alt
    },
    impacts[] {
      title,
      description
    },
    validationTitle,
    validationImage {
      asset->{ _id, url },
      alt
    },
    tests[] {
      title,
      description
    },
    conclusionTitle,
    conclusionDescription,
    conclusionImage {
      asset->{ _id, url },
      alt
    },
    linksTitle,
    exploreMore,
    readMoreLink
  }
`;


export const portableTextComponents: PortableTextComponents = {
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => <span className="line-through">{children}</span>,
    code: ({ children }) => <code className="bg-gray-100 px-1 rounded">{children}</code>,

    textColor: ({ children, value }) => {
      return <span style={{ color: value?.color || "inherit" }}>{children}</span>;
    },

    link: ({ children, value }) => (
      <a
        href={value?.href || "#"}
        target={value?.openInNewTab ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {children}
      </a>
    ),

    internalLink: ({ children, value }) => {
      if (!value?.reference?.slug?.current) return <>{children}</>;
      return (
        <Link
          href={`/success-stories-version/${value.reference.slug.current}`}
          className="text-blue-600 hover:underline"
        >
          {children}
        </Link>
      );
    },
  },

  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold my-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold my-2">{children}</h4>,
    h5: ({ children }) => <h5 className="text-lg font-semibold my-1">{children}</h5>,
    h6: ({ children }) => <h6 className="text-base font-semibold my-1">{children}</h6>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-500 my-2">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="text-gray-600 my-2">{children}</p>,
  },

  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside ml-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside ml-4">{children}</ol>,
    checkmarks: ({ children }) => <ul className="list-inside ml-4">{children}</ul>,
  },

  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
    checkmarks: ({ children }) => (
      <li className="mb-1 flex items-center gap-2">
        <span className="text-green-600">✔</span> {children}
      </li>
    ),
  },
};

type SectionNewProps = {
  title?: string;
  description?: string | PortableTextBlock[];
  items?: SectionItem[];
};

export function SectionNew({ title, description, items }: SectionNewProps) {
  if (!title && !description && !items?.length) return null;

  return (
    <section
      id="solution"
      className="scroll-mt-36 max-w-8xl mx-auto sm:px-6 bg-[#F7F7F7] rounded-3xl pb-4"
    >
      {title && (
        <h2 className="text-2xl text-center sm:text-2xl font-semibold sm:tracking-tighter text-gray-800 mb-6 pt-10">
          {title}
        </h2>
      )}

      <div className="px-1 sm:px-16">
        {description && (
          <div className="text-gray-400 text-md leading-tight sm:leading-snug text-left sm:text-center max-w-3xl mx-auto mb-16">
            {typeof description === "string" ? (
              description.split("\n").map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <PortableText value={description} components={portableTextComponents} />
            )}
          </div>
        )}
      </div>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-3 sm:gap-y-5 sm:gap-x-7 sm:text-left sm:mx-44">
        {items?.map((item, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <li
              key={i}
              className="relative min-h-[200px] p-8 mt-2 rounded-xl flex flex-col items-start bg-inherit"
            >
              <span className="absolute top-[-42px] sm:top-[-56px] sm:left-8 text-[100px] sm:text-[120px] font-extrabold text-gray-200 opacity-70 select-none leading-none">
                {num}
              </span>

              <h3 className="sm:text-md font-semibold mb-2 text-left leading-[18px] bg-[#F7F7F7] relative z-30">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm leading-[18px] relative z-10 mb-5 sm:mb-0">
                {item.description}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default async function SuccessStoryVersion2Page({ params }: Props) {
  const { slug } = await params;
  const data = await sanityClient.fetch(query, { slug });

  if (!data) return notFound();

  return (
    <>
      <NavbarWrapper />
      <TopHeroSectionSuccess topImage={data.topImage} />
      <div className="hidden md:block">
        <SectionNavigator />
      </div>

      <main className="p-1 w-full md:w-full px-4 md:px-10 2xl:px-32">
        <h1
          id="overview"
          className="scroll-mt-36 text-2xl font-semibold text-gray-800 my-8 text-center"
        >
          {data.title}
        </h1>

        {data.overview && (
          <div
            id="overview"
            className="text-md space-y-4 sm:space-y-6 text-left sm:max-w-3xl sm:mx-auto sm:mb-12"
          >
            <PortableText
              value={data.overview}
              components={portableTextComponents}
            />
          </div>
        )}

        {/* Intro Image via SafeImage */}
        <SafeImage
          src={data.introImage?.asset?.url}
          alt={data.introImage?.alt || "Intro Image"}
          width={1800}
          height={1200}
          className="sm:w-full sm:h-[500px] 2xl:h-[850px] rounded-4xl sm:mb-4 mt-4 object-cover"
          unoptimized
        />

        {/* Sections */}
        <Section
          title={data.problemTitle}
          description={data.problemDescription}
          items={data.problems}
        />
        <SectionNew
          title={data.solutionTitle}
          description={data.solutionDescription}
          items={data.solutionFeatures}
        />

        {/* Architecture Section */}
        {data.architectureTitle && (
          <section id="architecture" className="scroll-mt-36 sm:mt-20 mt-10">
            <h2 className="text-2xl text-gray-800 font-semibold text-center sm:my-4 my-8">
              {data.architectureTitle}
            </h2>

            <SafeImage
              src={data.architectureDiagram?.asset?.url}
              alt={data.architectureDiagram?.alt || "Architecture"}
              width={1900}
              height={600}
              className="w-full object-cover rounded-xl mb-4"
            // className="w-full h-[300px] sm:h-[400px] object-cover rounded-xl mb-4"
            />

            {data.architectureImages?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 sm:max-w-6xl sm:mx-auto sm:px-4">
                {data.architectureImages.map((img: SanityImage, idx: number) => (
                  <SafeImage
                    key={idx}
                    src={img.asset?.url}
                    alt={img.alt || `Architecture image ${idx + 1}`}
                    width={1900}
                    height={600}
                    className="w-full h-[300px] sm:h-[400px] object-cover rounded-xl"
                  />
                ))}
              </div>
            )}
          </section>
        )}

        <DeploymentSectionDisplay data={data} />

        <ListSection
          title={data.challengeTitle}
          images={data.challengeImages || []}
          items={data.challenges || []}
        />

        {data.validationTitle && (
          <section id="validation" className="scroll-mt-36 sm:mt-4 mt-10">
            <h2 className="text-2xl text-gray-800 font-semibold text-center sm:mb-16 mt-10">
              {data.validationTitle}
            </h2>
            <SafeImage
              src={data.validationImage?.asset?.url}
              alt={data.validationImage?.alt || "Validation"}
              width={1900}
              height={600}
              className="sm:w-full sm:h-[450px] rounded-4xl sm:mb-4 mt-4 object-cover"
            />
            <ListNew items={data.tests || []} />
          </section>
        )}

        <ListSectionNew
          title={data.impactTitle}
          images={data.inspectImage?.asset?.url ? [data.inspectImage] : []}
          items={data.impacts || []}
        />

        {data.conclusionTitle && (
          <section id="conclusion" className="scroll-mt-36 sm:mt-10 mt-10">
            <h2 className="text-2xl text-gray-800 font-semibold text-center sm:mb-12">
              {data.conclusionTitle}
            </h2>

            <div className="flex flex-col md:flex-row items-center sm:gap-10 sm:mt-4 sm:mx-20 my-4">
              <SafeImage
                src={data.conclusionImage?.asset?.url}
                alt={data.conclusionImage?.alt || "Conclusion"}
                width={600}
                height={600}
                className="rounded-4xl object-cover sm:w-full sm:h-full"
              />
              <div className="w-full md:w-1/2 text-gray-500 space-y-6 text-md tracking-[0.4px] leading-[18px] mt-4">
                <PortableText
                  value={data.conclusionDescription}
                  components={portableTextComponents}
                />
              </div>
            </div>
          </section>
        )}

        {(data.linksTitle || data.exploreMore || data.readMoreLink) && (
          <section id="links" className="scroll-mt-32 sm:mt-10 sm:mx-16">
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 px-4 py-3 sm:rounded-full rounded-lg shadow-sm">
              {data.linksTitle && (
                <p className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">
                  {data.linksTitle}
                </p>
              )}
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

      <SafeImage
        src={"/blogs/Group 370.svg"}
        alt={"Products image macnman"}
        width={100}
        height={10}
        className="w-full mt-10"
      />

      <MainContactUs theme="light" />

      <div className="hidden md:block">
        <TermsAndConditions theme="light" />
        <Sitemap theme="light" />
        <Authority />
      </div>
    </>
  );
}
