// app/success-stories-version/[slug]/page.tsx

export const dynamic = 'force-dynamic';

import { sanityClient } from '../../../../lib/sanity.client';
import { groq, PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import components from "@/components/successStoriesVersionComponents/overviewText";
import NavbarWrapper from '@/components/HomePageComponents/NavbarWrapper';
import MainContactUs from '@/components/HomePageComponents/MainContactUs';
import TermsAndConditions from '@/components/HomePageComponents/TermsAndConditions';
import Sitemap from '@/components/HomePageComponents/Sitemap';
import Authority from '@/components/HomePageComponents/Authority';
import DeploymentSection from '@/components/successStoriesVersionComponents/DeploymentSection';
import {Section,ListSection, ListSectionNew, ListNew} from '@/components/successStoriesComponents/StorySections';

import TopHeroSectionSuccess from '@/components/successStoriesComponents/TopHeroSectionSuccess';
import SectionNavigator from '@/components/successStoriesComponents/SectionNavigator';
import SuccessStoriesListV2 from '@/components/successStoriesVersionComponents/SuccessStoriesListV2';
import { SectionItem } from '@/types/types';

export const revalidate = 60;

type Props = {
	params: Promise<{ slug: string }>;
};

// ✅ Generate static paths for all slugs of successStoryVersion2
export async function generateStaticParams() {
	const slugs: string[] = await sanityClient.fetch(
		`*[_type == "successStoryVersion2" && defined(slug.current)][].slug.current`
	);
	return slugs.map((slug) => ({ slug }));
}

// ✅ Fetch single successStoryVersion2 by slug
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
    deploymentFeatures[] {
      title,
      description,
      icon { asset->{ _id, url }, alt }
    },
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


export function SectionNew({
	title,
	description,
	items,
}: {
	title?: string;
	description?: string;
	items?: SectionItem[];
}) {
	if (!title && !description && !items?.length) return null;

	return (
		<section
			id="solution"
			className="scroll-mt-24 max-w-8xl mx-auto sm:px-4 bg-gray-100 rounded-3xl pb-10"
		>
			{title && (
				<h2 className="text-2xl text-center sm:text-2xl font-semibold sm:tracking-tighter text-gray-800 mb-6 pt-10">
					{title}
				</h2>
			)}
			<div className="px-1 sm:px-16">
				{description && (
					<p className="text-gray-400 text-md leading-tight sm:leading-snug text-left sm:text-center max-w-3xl mx-auto mb-6">
						{description}
					</p>
				)}
			</div>
			<ul className="grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-3 sm:gap-y-5 sm:gap-x-7 sm:text-left sm:mx-44">
				{items?.map((item, i) => (
					<li
						key={i}
						className="p-4 mt-2 rounded-xl flex flex-col items-start"
					>
						{/* ✅ Icon at the top */}
						{item.icon?.asset?.url && (
							<div className="w-25 h-11 mb-3">
								<Image
									src={item.icon.asset.url}
									alt={item.icon.alt || item.title}
									width={100}
									height={45}
									className="object-contain"
								/>
							</div>
						)}

						{/* Title */}
						<h3 className="sm:text-md font-semibold mb-2 text-left bg-inherit leading-[18px]">
							{item.title}
						</h3>

						{/* Description */}
						<p className="text-gray-400 text-sm leading-[18px]">
							{item.description}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}


export default async function SuccessStoryVersion2Page({ params }: Props) {
	const { slug } = await params;

	const data = await sanityClient.fetch(query, { slug });

	// 👉 Also fetch all other V2 stories for carousel
	const allStories = await sanityClient.fetch(
		groq`*[_type == "successStoryVersion2" && defined(homeImage.asset._ref)]{
      _id,
      title,
      slug,
      homeImage { asset->{url}, alt },
      body
    }`
	);

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
					className="scroll-mt-24 text-2xl font-semibold text-gray-800 my-8 text-center"
				>
					{data.title}
				</h1>

				{data.overview && (
					<div
						id="overview"
						className="text-md space-y-4 sm:space-y-6 text-left sm:max-w-3xl sm:mx-auto sm:mb-12"
					>
						<PortableText value={data.overview} components={components} />
					</div>
				)}

				{/* Intro Image */}
				{data.introImage?.asset?.url && (
					<div className="sm:w-full sm:px-4">
						<Image
							src={data.introImage.asset.url}
							alt={data.introImage.alt || 'Intro Image'}
							width={1900}
							height={1200}
							unoptimized
							className="sm:w-full sm:h-[500px] 2xl:h-[850px] rounded-4xl sm:mb-4 mt-4 object-cover"
						/>
					</div>
				)}

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

				{/* Architecture */}
				{data.architectureTitle && (
					<section id="architecture" className="scroll-mt-24 sm:mt-20 mt-10">
						<h2 className="text-2xl text-gray-800 font-semibold text-center sm:my-4 my-8">
							{data.architectureTitle}
						</h2>
						{data.architectureDiagram?.asset?.url && (
							<div className="sm:max-w-6xl sm:mx-auto sm:px-4">
								<Image
									src={data.architectureDiagram.asset.url}
									alt={data.architectureDiagram.alt || 'Architecture'}
									width={1900}
									height={600}
									className="sm:w-full sm:h-[500px] rounded-xl mb-4 object-cover"
								/>
							</div>
						)}
					</section>
				)}

				<DeploymentSection data={data} />


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
					<section id="validation" className="scroll-mt-24 sm:mt-4 mt-10">
						<h2 className="text-2xl text-gray-800 font-semibold text-center sm:mb-16 mt-10">
							{data.validationTitle}
						</h2>
						{data.validationImage?.asset?.url && (
							<div className="max-w-6xl mx-auto sm:px-4">
								<Image
									src={data.validationImage.asset.url}
									alt={data.validationImage.alt || 'Validation'}
									width={1900}
									height={600}
									className="sm:w-full sm:h-[450px] rounded-4xl sm:mb-4 mt-4 object-cover"
								/>
							</div>
						)}
						<ListNew items={data.tests || []} />
					</section>
				)}

				{/* Conclusion */}
				{data.conclusionTitle && (
					<section id="conclusion" className="scroll-mt-24 sm:mt-20 mt-10">
						<h2 className="text-2xl text-gray-800 font-semibold text-center sm:mb-12">
							{data.conclusionTitle}
						</h2>
						<div className="flex flex-col md:flex-row items-center sm:gap-10 sm:mt-4 sm:mx-20 my-4">
							{data.conclusionImage?.asset?.url && (
								<div className="flex-shrink-0 w-full md:w-1/2">
									<Image
										src={data.conclusionImage.asset.url}
										alt={data.conclusionImage.alt || 'Conclusion'}
										width={600}
										height={600}
										className="rounded-4xl object-cover sm:w-full sm:h-full"
									/>
								</div>
							)}
							<div className="w-full md:w-1/2 text-gray-500 space-y-6 text-md tracking-[0.4px] leading-[18px] mt-4">
								{data.conclusionDescription
									?.split('\n')
									.map((para: string, i: number) => <p key={i}>{para}</p>)}
							</div>
						</div>
					</section>
				)}

				{/* Links */}
				{(data.linksTitle || data.exploreMore || data.readMoreLink) && (
					<section id="links" className="scroll-mt-24 sm:mt-10 sm:mx-16">
						<div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 px-4 py-3 sm:rounded-xl rounded-lg shadow-sm">
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

				{/* Carousel of other Version 2 stories */}
				{allStories.length > 0 && (
					<section className="overflow-x-hidden sm:mt-12">
						<SuccessStoriesListV2 stories={allStories} />
					</section>
				)}
			</main>

			<MainContactUs theme="light" />

			<div className="hidden md:block">
				<TermsAndConditions theme="light" />
				<Sitemap theme="light" />
				<Authority />
			</div>
		</>
	);
}
